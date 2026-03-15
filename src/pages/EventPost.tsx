import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin } from "lucide-react";

interface Section {
  subtitle: string;
  paragraph: string;
  images: string[];
  layout: "text-left" | "text-right" | "images-top" | "images-bottom";
}

const EventPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error(error);
    } else {
      let sections: Section[] = [];
      try {
        sections = typeof data.content === 'string' && data.content.startsWith('[')
          ? JSON.parse(data.content)
          : [];
      } catch (e) {
        sections = [];
      }
      setEvent({ ...data, sections });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="pt-40 pb-32 text-center">
          <p className="text-muted-foreground animate-pulse">Loading event...</p>
        </div>
      </PageLayout>
    );
  }

  if (!event) {
    return (
      <PageLayout>
        <section className="pt-40 pb-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Event not found</h1>
          <Link to="/events" className="text-primary hover:underline">
            ← Back to Events
          </Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/events" className="text-xs tracking-[0.3em] uppercase text-primary font-semibold hover:underline">
              ← Events
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-6 mb-8 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Cover Image */}
        {event.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-auto rounded-xl shadow-2xl max-w-4xl max-h-[600px] object-contain mx-auto border border-primary/5"
            />
          </motion.div>
        )}

        {/* Intro Description */}
        {event.description && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-lg max-w-3xl mx-auto mb-20 text-muted-foreground leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        )}

        {/* Content Sections */}
        <div className="space-y-32">
          {event.sections.map((section: Section, idx: number) => {
            const hasImages = section.images && section.images.length > 0;

            const ImageGrid = () => (
              <div className={`grid gap-6 ${section.images.length === 1 ? 'grid-cols-1' :
                  section.images.length === 2 ? 'grid-cols-2' :
                    'grid-cols-1 md:grid-cols-3'
                }`}>
                {section.images.map((img, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    className="relative rounded-lg overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl bg-white p-2"
                  >
                    <img src={img} className="w-full h-auto max-h-[450px] object-contain mx-auto rounded" alt={`Section ${idx + 1} Image ${iIdx + 1}`} />
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
                    className="whitespace-normal leading-relaxed text-muted-foreground rich-text-content"
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
                  <div className="space-y-12">
                    {hasImages && <ImageGrid />}
                    <TextContent />
                  </div>
                )}

                {/* Image Bottom */}
                {section.layout === "images-bottom" && (
                  <div className="space-y-12">
                    <TextContent />
                    {hasImages && <ImageGrid />}
                  </div>
                )}

                {/* Text Left / Image Right */}
                {section.layout === "text-left" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <TextContent />
                    {hasImages && <ImageGrid />}
                  </div>
                )}

                {/* Text Right / Image Left */}
                {section.layout === "text-right" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                      {hasImages && <ImageGrid />}
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

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          className="h-[2px] bg-primary my-16 mx-auto"
        />

        <p className="text-foreground font-semibold italic text-xl text-center">
          Catch me at the next one!
        </p>
      </div>

      <SubscribeSection />
    </PageLayout>
  );
};

export default EventPost;
