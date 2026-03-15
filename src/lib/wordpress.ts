/**
 * WordPress REST API integration.
 *
 * SETUP — Replace the URL below with the WordPress site used to manage content.
 * Works with WordPress.com (free) or any self-hosted WordPress.
 *
 * Content convention:
 *   • "Blog" posts  → default category (or any category except "Events")
 *   • "Events" posts → posts assigned to a category whose slug is "events"
 */

const WP_SITE_URL = "https://YOUR-SITE.wordpress.com";

// ── Types ────────────────────────────────────────────────────────────────────

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  /** Featured image URL resolved via _embed */
  featuredImage?: string;
  categories: number[];
}

export interface WPCategory {
  id: number;
  slug: string;
  name: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const api = (path: string) => `${WP_SITE_URL}/wp-json/wp/v2${path}`;

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function extractFeaturedImage(embedded: any): string | undefined {
  try {
    return embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  } catch {
    return undefined;
  }
}

function mapPost(raw: any): WPPost {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    content: raw.content,
    date: raw.date,
    featuredImage: extractFeaturedImage(raw._embedded),
    categories: raw.categories ?? [],
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Fetch the category ID for a given slug (cached per session). */
let eventsCategoryId: number | null = null;

async function getEventsCategoryId(): Promise<number | null> {
  if (eventsCategoryId !== null) return eventsCategoryId;
  try {
    const res = await fetch(api("/categories?slug=events"));
    if (!res.ok) return null;
    const cats: WPCategory[] = await res.json();
    eventsCategoryId = cats.length > 0 ? cats[0].id : null;
    return eventsCategoryId;
  } catch {
    return null;
  }
}

/** Fetch blog posts (excludes the "events" category). */
export async function fetchBlogPosts(perPage = 20): Promise<WPPost[]> {
  const eventsId = await getEventsCategoryId();
  const exclude = eventsId ? `&categories_exclude=${eventsId}` : "";
  const res = await fetch(api(`/posts?per_page=${perPage}&_embed${exclude}`));
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(mapPost);
}

/** Fetch a single post by slug. */
export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(api(`/posts?slug=${encodeURIComponent(slug)}&_embed`));
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? mapPost(data[0]) : null;
}

/** Fetch events (posts in the "events" category). */
export async function fetchEvents(perPage = 20): Promise<WPPost[]> {
  const eventsId = await getEventsCategoryId();
  if (!eventsId) return [];
  const res = await fetch(api(`/posts?categories=${eventsId}&per_page=${perPage}&_embed`));
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(mapPost);
}

export { stripHtml };
