import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Bio = () => (
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
        </motion.div>
      </div>
    </section>

    {/* Photo + intro */}
    <section className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="grid md:grid-cols-[380px_1fr] gap-14 md:gap-20 items-start">
          <div>
            <motion.img
              src="/images/author-secondary.jpg"
              alt="Joe Cappello in Galisteo, New Mexico"
              className="w-full shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <p className="text-sm text-muted-foreground mt-4 italic text-center">
              Galisteo, New Mexico
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
            <p>
              Joe Cappello's first encounter with his dormant, creative side, occurred during a stint in the Army in 1971. The post where he was stationed staged a production of "The Crucible" by Arthur Miller and the director cast him in a minor role (Ezekiel Cheever, Clerk of the Court).
            </p>
            <p>
              Being on stage terrified him, yet he couldn't resist the challenge and allure of a live performance. When he returned home to New Jersey, he took on a variety of community theatre roles including Oscar Madison in "The Odd Couple" and Silvio in "Pvt. Wars," a black comedy about three Vietnam War veterans. He studied acting at Herbert Burghoff Studios in New York City and appeared in an Off-Off Broadway production of Sam Shephard's "Buried Child" as the alcoholic, one-legged patriarch, Dodge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* A Writer's Evolution */}
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-6 font-medium">
            A Writer's Evolution
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-primary mb-14"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              era: "Playwright",
              text: `He began writing short skits for children and, after casting his sons and other kids in the neighborhood, staged them at the local theatre. His interests broadened to include adult one act and full-length plays, which he also cast and produced at local community theatres and similar venues. "The Stars of Orion," his play about a college military drill team, received an honorable mention in the 2020 Bridge Award contest sponsored by Arts in the Armed Forces (AIAF).`,
            },
            {
              era: "Short Stories",
              text: `But the logistics of staging plays proved too time consuming. In his early 30's he started writing short stories and flash fiction and submitting these works for publication. Early published work reflected his workplace experience as a marketing manager in a manufacturing facility. This led to "The Clean Room," a story about a manufacturing facility about to lose a major client to a cheaper, foreign supplier. In "Assault," a clash of management philosophies pits team building with employees against old fashion fear and intimidation.`,
            },
            {
              era: "Broader Themes",
              text: `His interests soon broadened to include subjects like language, demonstrating in his story, "The Codex of Lady Lucy Bugg," the need for language to return to its original function as a uniter and conveyer of truth. He also took a humorous look at families and their dysfunction in two works, "A Cat in the Box for Mom" and "Genesis," the characters in both stories getting a second chance to reconnect with one another.`,
            },
          ].map((phase, i) => (
            <motion.div
              key={phase.era}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <span className="text-6xl font-bold text-primary/10 font-serif">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="border-l-2 border-primary/30 pl-6 mt-2">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {phase.era}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {phase.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Present day */}
    <section className="py-20 bg-card">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeUp} className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
          <p>
            These days, Joe spends time with family and grandchildren. He has also discovered the benefits of exercise, good diet and meditation, the latter discipline revealing the mysterious beauty of being in the moment in a quiet, blissful state.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Closing invitation */}
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div {...fadeUp} className="space-y-8">
          <p className="text-foreground font-normal text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed">
            One that he hopes will inform his writing as he continues his search for the combination of words and stories that will one day bring us all together in a shared humanity based on dignity, respect and love for all.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-primary mx-auto"
          />
        </motion.div>
      </div>
    </section>

    <SubscribeSection />
  </PageLayout>
);

export default Bio;
