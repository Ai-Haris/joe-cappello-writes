import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";

const BeginningAtTheEnd = () => (
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
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Workplace</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Beginning at the End
          </h1>
          <div className="w-16 h-1 bg-primary mb-10" />
          <figure className="mb-10">
            <img
              src="/images/beginning-illustration.png"
              alt="Watercolor illustration for Beginning at the End, by Michelle Kohari"
              className="w-full max-h-[600px] object-contain rounded-lg shadow-lg"
            />
            <figcaption className="text-sm text-muted-foreground mt-3 italic">
              Illustration by Michelle Kohari
            </figcaption>
          </figure>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
            <p>I am in a meeting at our England location in a typical rectangular conference room walled off from the real world of work taking place outside. Suddenly, I am a spirit floating above my colleagues, as though I had died only seconds earlier and am waiting to be transported to my final destination. Or, is my mind merely wandering, my eyes vacant like when you talk to someone and you know he isn't listening. I suppose it is the latter, as my German colleague, Martin, asks me a question that snaps me back to the pretend reality of the conference room, coffee and laptop in front of me, my stomach sour from the traditional English breakfast I consumed earlier.</p>

            <p>How do customer service people handle pricing, he wants to know. But I am suddenly seized by a deja vu moment. I heard a question like this many times before, perhaps spoken in a different tone, or phrased differently during my 30 year tenure with the company. I respond not as one present, but as one who is playing a recording made many years ago and filed in my brain under "C" for "Canned answers." I press my mental button and the answer plays automatically. I might as well not be there.</p>

            <p>If you do it that way, you are leaving money on the table, Martin says, his face coming as close to a smile as I have ever see on him. The two English guys on my right sit quietly not willing to get involved in the discussion.</p>

            <p>The meeting ebbs and flows, a series of staccato conversations that simultaneously become animated, then are reduced to hushed tones. Private talks that no one really hears in groups of two's or three's, topics that are not on the agenda projected on the monitor hanging on the wall. The German office is trying to take control…the English guys don't follow procedures…why doesn't the US office leave us alone, we know our market better…it's cultural…it's different…you don't know..leave us alone…</p>

            <p>No, leave me alone, I want to shout. I am at the end, close to my retirement. I don't want to hear these problems. Let someone else deal with them. I need to stay another year until my house is sold and my wife is retired. But I fear it will never end, a perpetual ground hog day like in the movie or a version of hell that forces you to re-live your worst days over and over. My face is a plea. I can't help you, I am drained. Can't you see that? Let me go…let me go.</p>

            <p>My mind returns to the table focusing on empty bottles of water and half-eaten cookies on paper plates. My English colleague is talking about dinner tonight. An Italian restaurant, up the street from your hotel, he says. Bella Don something, (Corleone, for all I know). Sounds good, we say, bowing to the obligatory extension of the work day.</p>

            <p>We sit at a circular table, making jokes about the waiter who seems more English than Italian and trying to figure out what the Italian dishes really contain. A round of beer, a good wine for the table, it is a performance we've presented a thousand times in cities around the world at all of our global locations. It is the time to be social, ask questions about spouses and kids, complain about the boss, but in a joking way in case any of the banter gets back to him. We promise each other an early night, but my colleague wants to buy a gift for his wife. Earrings, he says, ruby colored, but not heart shaped. Is there any place close by?</p>

            <p>Meadowhall, my English colleague says. I remember. It is a king size mall in a country known for its kings. They close at nine; it's eight now. If we hustle, we can make it. Don't bother, he says, it's too late. But the same mechanism that has functioned in me for years is now at work as I visualize the motorway entrance ramp and the outline of the giant mall lit up against the gray English night. Pay the bill, gents, I say, as I beckon my colleague to follow.</p>

            <p>I'm on the M1 motorway, my foreground busy plotting directions, my background wondering what the hell I am doing. It's dark and I have problems driving on the left side of the road. I miss the exit and have to turn around. It's 20 past eight, my colleague informs me, we won't make it. But I ignore him.</p>

            <p>We arrive at the mall and he buys two pairs of earrings. As we walk back to the car, we can hear the sound of metal gates sliding in front of the store entrances in preparation for closing.</p>

            <p>I am flying back home. Why do I do this? To make a living, I assure myself, though not really self-assured. If I had been a farmer, I would have seen the fruits of my work. The clearing, plowing, seeding and harvesting would have yielded a tangible crop. But my work has been an avalanche of intangibles, printed memos and reports the first few years, followed by 0's and 1's drifting along a coded highway of new technology the last few. Soft hands, clean clothes… nothing to soil myself with, nothing to say I was even here.</p>

            <p>I look out the window of the plane and it seems suspended by a thread. When I was afraid to fly, I used to see the clouds a short distance below and foolishly think we could land safely there if we had a problem. But it isn't safe, only a metaphor for the fear, dread and anxiety that have mixed with the utter banality of my work life. It will be different on my next trip, I think. Different.</p>
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

export default BeginningAtTheEnd;
