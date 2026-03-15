import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
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
          )}          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group h-full"
              >
                <Link to={`/events/${event.slug || event.id}`} className="flex flex-col h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-primary/5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                         <Calendar size={64} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow bg-[#FDFBF7]">
                    <div className="flex flex-col gap-3">
                      <time className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <h2 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h2>
                      {event.location && (
                        <p className="text-xs text-muted-foreground italic">
                          {event.location}
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

export default Events;
