import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      {/* Hero banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-4">
              Reflections
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured image */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <img
              src="/images/blog-header.jpg"
              alt="Joe Cappello writing"
              className="w-full shadow-xl max-h-[450px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Intro context */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              Welcome Writers, Readers,<br />Fellow Word Searchers
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                The last thing you need is another blog, especially one written by an old guy whom you might think is about to share the benefits of his years of experience.
              </p>
              <p>
                You know what experience old folks have? Mistakes, screwups. A ton of them. Because they've lived a lot longer than you and have had plenty of time to make them.
              </p>
              <p>
                Here's my angle. I'd rather share this journey of life with you, the one we are on now. The one all of us, young and old, are struggling to understand. As equals.
              </p>
              <p className="text-foreground text-xl italic font-normal">As fellow human beings.</p>
              <p>
                Let's start with a renewed understanding of life. It's transient, temporary. As such, it is precious, and I can tell you it becomes more so as each day goes by. You don't want to waste it on the small stuff.
              </p>
              <p>
                I'm not advocating shirking our daily obligations and responsibilities. I'm suggesting that, in addition, we make room for the profound things that lie just beneath our consciousness.
              </p>
              <p>
                That means focusing on the moment, this moment, the one you are spending reading a stranger's blog. If you're like me, you're reading this because you want more from this moment, to discover something outside of yourself more important than a social media post or a scroll through the daily news feed.
              </p>
              <p>
                So, here's the story. My blog is about just that. Story. I'd like to talk about what gets my creative engine revving. Maybe we can do a little back and forth action. Are you thinking the same thing? Are we on the same page, or maybe just dabbling in a margin?
              </p>
              <p>
                No matter; we're here and we're searching. For our humanity, our intrinsic good and most of all, the right words to express all of it.
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[2px] bg-primary my-8"
              />

              <p className="text-foreground font-semibold italic text-xl">
                Please subscribe. Join me in the search.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post listing */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <h3 className="text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-10 text-center">
              Latest Posts
            </h3>
          </motion.div>

          {loading && (
            <p className="text-center text-muted-foreground">Loading posts…</p>
          )}

          {!loading && posts.length === 0 && (
            <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex flex-col bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {post.image_url && (
                    <div className="overflow-hidden aspect-[4/3]">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col flex-grow bg-[#FDFBF7]">
                    <div className="flex flex-col gap-4">
                      {post.category && (
                        <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-black">
                          {post.category}
                        </span>
                      )}
                      <h2 className="text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-sm font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-8">
                       {post.author_credits && (
                        <p className="text-[11px] italic text-muted-foreground/80 mb-0">
                          {post.author_credits}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
    </PageLayout>
  );
};

export default Blog;
