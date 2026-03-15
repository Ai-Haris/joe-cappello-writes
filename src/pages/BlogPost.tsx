import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";
import { supabase } from "@/lib/supabase";

interface Section {
  subtitle: string;
  paragraph: string;
  images: string[];
  layout: "text-left" | "text-right" | "images-top" | "images-bottom";
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error(error);
    } else {
      let sections: Section[] = [];
      try {
        // Try to parse JSON content from the new structured builder
        sections = typeof data.content === 'string' && data.content.startsWith('[')
          ? JSON.parse(data.content)
          : [{ subtitle: '', paragraph: data.content || '', images: [], layout: 'images-top' }];
      } catch (e) {
        // Fallback for old content or parsing errors
        sections = [{ subtitle: '', paragraph: data.content || '', images: [], layout: 'images-top' }];
      }
      setPost({ ...data, sections });
    }
    setLoading(false);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="pt-40 pb-32 text-center">
          <p className="text-muted-foreground animate-pulse">Loading post...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <section className="pt-40 pb-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </section>
      </PageLayout>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(post.video_url);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/blog" className="text-xs tracking-[0.3em] uppercase text-primary font-semibold hover:underline">
              ← Blog
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-6 mb-4 leading-tight">
              {post.title}
            </h1>
            <time className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Cover Image (if no video or just as fallback) */}
        {!embedUrl && post.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto rounded-xl shadow-2xl max-w-3xl max-h-[500px] object-contain mx-auto"
            />
          </motion.div>
        )}

        {/* Content Sections */}
        <div className="space-y-32">
          {post.sections.map((section: Section, idx: number) => {
            const hasImages = section.images && section.images.length > 0;
            const isSideLayout = section.layout === "text-left" || section.layout === "text-right";

            const ImageGrid = () => (
              <div className={`grid gap-4 ${section.images.length === 1 ? 'grid-cols-1' :
                  section.images.length === 2 ? 'grid-cols-2' :
                    'grid-cols-1 md:grid-cols-3'
                }`}>
                {section.images.map((img, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    className="relative rounded-lg overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <img src={img} className="w-full h-auto max-h-[400px] object-contain mx-auto" alt={`Section ${idx + 1} Image ${iIdx + 1}`} />
                  </motion.div>
                ))}
              </div>
            );

            const TextContent = () => (
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
                {section.subtitle && (
                  <h2 className="text-3xl font-bold mb-6 text-foreground">{section.subtitle}</h2>
                )}
                {section.paragraph && (
                  <div
                    className="whitespace-normal leading-relaxed text-balance text-muted-foreground rich-text-content"
                    dangerouslySetInnerHTML={{ __html: section.paragraph }}
                  />
                )}
              </div>
            );

            return (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Image Top */}
                {section.layout === "images-top" && (
                  <div className="space-y-8">
                    {hasImages && <ImageGrid />}
                    <TextContent />
                  </div>
                )}

                {/* Image Bottom */}
                {section.layout === "images-bottom" && (
                  <div className="space-y-8">
                    <TextContent />
                    {hasImages && <ImageGrid />}
                  </div>
                )}

                {/* Text Left / Image Right */}
                {section.layout === "text-left" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <TextContent />
                    {hasImages ? <ImageGrid /> : <div className="bg-muted/30 rounded-xl aspect-square flex items-center justify-center text-muted-foreground italic">No images in section</div>}
                  </div>
                )}

                {/* Text Right / Image Left */}
                {section.layout === "text-right" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                      {hasImages ? <ImageGrid /> : <div className="bg-muted/30 rounded-xl aspect-square flex items-center justify-center text-muted-foreground italic">No images in section</div>}
                    </div>
                    <div className="order-1 lg:order-2">
                      <TextContent />
                    </div>
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>

        {/* Video at the bottom */}
        {embedUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl mt-24 mb-16 bg-black flex justify-center items-center"
          >
            <iframe
              src={embedUrl}
              className="w-full h-full max-w-4xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        )}

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          className="h-[2px] bg-primary my-16"
        />

        <p className="text-foreground font-semibold italic text-xl text-center">
          Please subscribe. Join me in the search.
        </p>
      </div>

      <SubscribeSection />
    </PageLayout>
  );
};

export default BlogPost;
