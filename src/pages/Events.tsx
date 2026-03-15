import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

interface Section {
  subtitle: string;
  paragraph: string;
  images: string[];
  layout: "text-left" | "text-right" | "images-top" | "images-bottom";
}

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      const transformed = (data || []).map(event => {
        let sections: Section[] = [];
        try {
          sections = typeof event.content === 'string' && event.content.startsWith('[')
            ? JSON.parse(event.content)
            : [];
        } catch (e) {
          sections = [];
        }
        return { ...event, sections };
      });
      setEvents(transformed);
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
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-4">Appearances</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Events</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {loading && (
            <p className="text-center text-muted-foreground">Loading events…</p>
          )}

          {!loading && events.length === 0 && (
            <div>
              {/* Fallback code remains... */}
            </div>
          )}

          <div className="space-y-32">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="space-y-12"
              >
                {/* Event Hero Area */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                  <div className="flex flex-col">
                    <time className="text-xs tracking-[0.4em] uppercase text-accent font-semibold">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-5 leading-tight">
                      {event.title}
                    </h2>
                    <div className="w-10 h-[2px] bg-primary mb-6" />
                    
                    {event.image_url && (
                      <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-primary/5">
                        <img 
                          src={event.image_url} 
                          alt={event.title} 
                          className="w-full h-auto max-h-[500px] object-cover" 
                        />
                      </div>
                    )}

                    {event.location && (
                      <p className="text-sm text-muted-foreground mb-4 font-medium italic">
                        Location: {event.location}
                      </p>
                    )}
                    <div
                      className="prose prose-lg max-w-none text-muted-foreground leading-relaxed prose-headings:text-foreground prose-a:text-primary rich-text-content"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </div>
                  {/* Event could have a main image if we add it laterally, but sections are key now */}
                </div>

                {/* Content Sections for Event */}
                <div className="space-y-24 mt-12 pl-4 md:pl-12 border-l-2 border-primary/10">
                  {event.sections.map((section: Section, idx: number) => {
                    const hasImages = section.images && section.images.length > 0;

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
                          <h3 className="text-2xl font-bold mb-4 text-foreground">{section.subtitle}</h3>
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
                      <div key={idx} className="space-y-8">
                        {section.layout === "images-top" && (
                          <>
                            {hasImages && <ImageGrid />}
                            <TextContent />
                          </>
                        )}
                        {section.layout === "images-bottom" && (
                          <>
                            <TextContent />
                            {hasImages && <ImageGrid />}
                          </>
                        )}
                        {section.layout === "text-left" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <TextContent />
                            {hasImages && <ImageGrid />}
                          </div>
                        )}
                        {section.layout === "text-right" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                              {hasImages && <ImageGrid />}
                            </div>
                            <div className="order-1 lg:order-2">
                              <TextContent />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
    </PageLayout>
  );
};

export default Events;
