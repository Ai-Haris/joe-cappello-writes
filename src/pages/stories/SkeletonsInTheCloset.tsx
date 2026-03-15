import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";

const SkeletonsInTheCloset = () => (
  <PageLayout>
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">For Laughs</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Skeletons in the Closet (and in the Bay)
          </h1>
          <div className="w-16 h-1 bg-primary mb-10" />
          <figure className="mb-10">
            <img
              src="/images/skeletons-illustration.png"
              alt="Watercolor illustration of a wooden pier stretching into the bay, by Michelle Kohari"
              className="w-full max-h-[600px] object-contain rounded-lg shadow-lg"
            />
            <figcaption className="text-sm text-muted-foreground mt-3 italic">
              Illustration by Michelle Kohari
            </figcaption>
          </figure>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
            <p>I heard this family story many times growing up, though I doubted its veracity. My Italian aunts and uncles would repeat it after draining a keg of beer at a family picnic, or ducking out to a bar to avoid saying the rosary at a wake. I still recall those red faces and bug eyes as they launched into the tale, speech slurred, droplets of spit exploding in the air like watery fireworks.</p>

            <p>At one event my Uncle Nunzio, after a few drinks, swore on his mother's grave that it was true until someone reminded him his mother, my grandmother, was still alive.</p>

            <p>It involved my Uncle Paulie Mannucci. In the 1950's Uncle Paulie got the bright idea to book numbers in the small New Jersey beach community of Bayport. He took bets from seniors in the local nursing home, moms with kids in carriages and punk high school greasers with shiny leather jackets who threatened to kick his ass if he told their parents. He even got grammar school kids to bet their lunch money (only the ones who knew their numbers, of course).</p>

            <p>But booking numbers in New Jersey at the time was the mob's turf, headed by a guy named Enrico Contada. Enrico's creative skills at rearranging anatomy were always on full display whenever a shallow grave coughed up a body or the cement shoes didn't set hard enough to prevent a body from bobbing to the surface of a local lake. There, one could see rearranged faces, limbs twisted and heads completely turned around, like Dali surreal paintings. Uncle Paulie's friends warned him about the dangers of booking under the mob boss' nose, but he ignored them.</p>

            <p>"I'm small potatoes," he said. "Enrico Contada's got better things to do."</p>

            <p>One day, Enrico didn't have anything better to do, so he decided to deal with "that Jersey beach culo sucking up my profits." (When I was a kid, I asked my Aunt Theresa what culo meant. She said it was a bad word she couldn't say. Then she winked at me and pointed to her backside.)</p>

            <p>He sent one of his top lieutenants to Bayport with instructions to rough up Paulie and throw him in the bay.</p>

            <p>The guy he sent was a tall, beefy hood named Luigi Balbastro. He had been on Enrico's "A" team of mob enforcers ever since the day he beat up the insurance man who came to his mother's house with eyes not only on the monthly premium, but on his mother as well. That earned him a special place in Enrico's heart.</p>

            <p>Luigi cornered Uncle Paulie on the Bayport pier and was about to jump him when he suddenly stopped. "Paulie? Paulie Mannucci, is that you?" he asked. They both realized they had gone to Saint Joe's grammar school together in Bayport. Luigi hugged his long-lost school chum. They sat on a bench together reminiscing about old times as Luigi ate a bacon and egg sandwich on an Italian role.</p>

            <p>"Remember the day we helped Sister Grace at the convent and she hugged us to her chest when we were done? We both thought the same thing, right?"</p>

            <p>Paulie smiled and nodded. "Breasts," he said. "She rammed our heads into her breasts."</p>

            <p>"I never believed nuns had breasts until that day." Luigi shook his head. "They were plenty big, too. What a waste." Luigi finished his sandwich and wiped his mouth on his shirt sleeve. "Anyway, down to business. Sorry, Paulie, but I gotta throw you in the bay."</p>

            <p>"But why, Luigi? We're shootin' the breeze here, havin' such a good time."</p>

            <p>"I know and I hate to see it end, but you been bookin' numbers under Enrico Contado's nose. That's pretty dumb."</p>

            <p>"Okay, I promise to stop."</p>

            <p>"I don't think that would fly." Luigi leaned closer to Paulie. "I'm up for a promotion. Made man. Now, how they gonna make me if I don't make you?" He laughed and poked Paulie in the chest. "Get it. Make me if I don't make you."</p>

            <p>According to my Aunt Rose, that's when those Mannucci survival genes kicked in. Uncle Paulie talked faster than an auctioneer on a sinking ship auctioning off life boats. "Rough me up a bit to make it look good, then lower me gently over the side of the pier into the bay. You know, so I make a soft landing." Paulie laughed nervously. "Like falling on Sister Grace's big breasts. I'll stay out there all night, then pretend to get washed up on the shore in the morning. You can tell Enrico I survived somehow. Like it's some kind of miracle."</p>

            <p>Luigi blessed himself. "Enrico believes in miracles. Claims a Saint Christopher medal he was wearing around his neck once stopped an assassin's bullet. He kissed the medal and thanked Saint Christopher. Then, he wrapped it around the assassin's neck and strangled him with it."</p>

            <p>And supposedly that, according to my inebriated relatives, is how Uncle Paulie Mannucci escaped the mob.</p>

            <p>Years later, I happened to come across a photo in the local Bayport newspaper with the headline, "Local Man Survives Mob Hit; Mob Boss Calls it a Miracle." It showed my Uncle Paulie, sprawled out on the beach, a little kid standing over him and poking him with a stick.</p>

            <p>It was true. My Uncle Paulie was the skeleton in the family closet who nearly became a literal one in the bay. I told my relatives that from now on, I would never doubt any of their family stories.</p>

            <p>Until they insisted the milkman was really my father.</p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-primary my-10"
          />
          <p className="text-foreground font-semibold italic text-xl">
            Please subscribe. Join me in the search.
          </p>
        </motion.div>
      </div>
    </section>
    <SubscribeSection />
  </PageLayout>
);

export default SkeletonsInTheCloset;
