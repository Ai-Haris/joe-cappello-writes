import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const stories = [
  {
    category: "For Laughs",
    title: "Skeletons in the Closet (and in the Bay)",
    description: "Uncle Paulie Manucci learns a lesson about crossing the mob in this family story that seems more legend than truth.",
    illustration: "/images/skeletons-illustration.png",
    illustrationCredit: "Illustration by Michelle Kohari",
    link: "/stories/skeletons-in-the-closet",
  },
  {
    category: "Workplace",
    title: "Beginning at the End",
    description: "A sobering moment in the work life of a soon-to-be retired business person.",
    illustration: "/images/beginning-illustration.png",
    illustrationCredit: "Illustration by Michelle Kohari",
    link: "/stories/beginning-at-the-end",
  },
  {
    category: "Big Picture",
    title: "Running Errands",
    description: "Lenny Day's wife is dying. What does she see as the end approaches? Is there more to life than the circular avoidance Lenny sees in the endless errands he runs?",
    illustration: "/images/running-errands-illustration.png",
    illustrationCredit: "Illustration by Michelle Kohari",
    link: "/stories/running-errands",
  },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero — cinematic */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10 z-10" />
        <img
          src="/images/author-hero.jpg"
          alt="Joe Cappello"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-primary mb-8"
            />
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-5 font-medium">
              Author &amp; Word Searcher
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05] mb-6">
              Joe<br />Cappello
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-md font-light">
              Finding the right words to connect, challenge, inspire and move us to tears of laughter.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/bio">About Joe <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/blog">Read the Blog</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Bio intro — elegant quote style */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Subtle texture pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div {...fadeUp} className="text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.08, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[12rem] font-serif text-foreground leading-none pointer-events-none select-none"
            >
              "
            </motion.span>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light relative">
              Joe Cappello draws inspiration for his work from his home in the beautiful desert country of Galisteo, New Mexico. 
              It has been his lifelong goal to find the right words to structure stories, novels and plays that reveal the challenges 
              we face with life, its meaning and its ultimate end.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              All with a touch of humor, hope and a profound belief that the 
              answers we seek lie in our ability to embrace one another.
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[2px] bg-primary mx-auto mt-10"
            />
          </motion.div>
        </div>
      </section>

      {/* Accolades — refined */}
      <section className="py-20 bg-card relative overflow-hidden">
        {/* Diagonal decorative line */}
        <div className="absolute -top-20 -right-20 w-96 h-96 border border-primary/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 border border-primary/5 rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div {...fadeUp}>
            <p className="text-xs tracking-[0.4em] uppercase text-primary text-center mb-3 font-semibold">Recognition</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">Awards &amp; Honors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { year: "2024", title: "Hemingway Shorts Competition — Finalist", work: '"Running Errands"' },
                { year: "2023", title: "Southwest Writers Short Story — 1st Place", work: '"They Only Showed Elvis from the Waist Up"' },
                { year: "2022", title: "National Federation of Press Women — 1st Place", work: '"The Secret of the Smiling Rock Man"' },
                { year: "2022", title: "Susan Hansell Drama Award — 1st Place", work: '"Monarch"' },
              ].map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start bg-background/60 rounded-lg p-5 border border-border/50 backdrop-blur-sm"
                >
                  <span className="text-3xl md:text-4xl font-bold text-primary/20 font-serif leading-none shrink-0">
                    {award.year}
                  </span>
                  <div className="border-l-2 border-primary/30 pl-5">
                    <h3 className="text-lg font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 italic">{award.work}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex items-center justify-center py-6 bg-background">
        <div className="h-[1px] w-16 bg-border" />
        <Feather className="mx-4 h-4 w-4 text-primary/30" />
        <div className="h-[1px] w-16 bg-border" />
      </div>

      {/* Book Preview */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 bg-secondary/50 rounded-xl py-16 md:py-20 px-8 md:px-16 relative border border-border/30 shadow-sm">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <motion.img
                src="/images/book-cover.jpg"
                alt="The Secret of the Smiling Rock Man — Book Cover"
                className="max-w-[340px] w-full shadow-2xl rounded-sm"
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-accent font-semibold">Coming Soon</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-5 text-foreground leading-tight">
                The Secret of the<br />Smiling Rock Man
              </h2>
              <div className="w-12 h-[2px] bg-primary mb-6" />
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">A Short Story Collection</p>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Short stories featuring characters with "rocks in their heads," as they struggle with their own crazy ideas 
                about coping with a life that has little rhyme or reason and ends as abruptly as it begins. So, they take charge 
                and come up with outlandish ways to solve their problems, confront their fears and move forward!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories — side by side */}
      <section className="py-20 bg-card relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-48 h-48 border border-primary/5 rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-3">From the Collection</p>
            <h2 className="text-3xl md:text-4xl font-semibold">Short Stories</h2>
            <p className="text-foreground/70 mt-4 font-medium tracking-wide">
              Watercolor Illustrations by Michelle Kohari
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <Link to={story.link} key={story.title} className="group">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-background rounded-lg overflow-hidden shadow-md border border-border/40 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={story.illustration!}
                      alt={`Illustration for ${story.title}`}
                      className="w-full object-contain bg-muted/30 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs tracking-[0.4em] uppercase text-accent font-semibold">
                      {story.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-foreground leading-tight group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {story.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4 italic font-medium">
                      {story.illustrationCredit}
                    </p>
                    <span className="text-sm text-primary font-semibold mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Story →
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <SubscribeSection />
    </PageLayout>
  );
};

export default Index;
