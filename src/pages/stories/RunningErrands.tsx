import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SubscribeSection from "@/components/SubscribeSection";

const RunningErrands = () => (
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
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Big Picture</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Running Errands
          </h1>
          <div className="w-16 h-1 bg-primary mb-10" />
          <figure className="mb-10">
            <img
              src="/images/running-errands-illustration.png"
              alt="Watercolor illustration for Running Errands, by Michelle Kohari"
              className="w-full max-h-[600px] object-contain rounded-lg shadow-lg"
            />
            <figcaption className="text-sm text-muted-foreground mt-3 italic">
              Illustration by Michelle Kohari
            </figcaption>
          </figure>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
            <p>Meditation slows down the merry-go-round of thoughts in my head, enough time to experience another realm, or at least push against it. A shoulder to the door, as I imagine it. The push is not a physical force, but my breath, the only connection to me and this figurative door. It opens a crack and I sense a faint connection with the Other: an alternate reality on a straight-line trajectory from my consciousness to what lies inside that door. I hear the sound of my raspy breathing, getting me closer to Nirvana, when another sound intrudes. It's not the divine missive I long for, but a text on my cell phone from the hospice nurse. She needs several items before she arrives to look in on my wife today.</p>

            <p>Forget Nirvana. I have errands to run.</p>

            <p>"We're running low on these items, Mr. Day," her text reads. "Please have them there when I come this afternoon." She put one of those emoji suns with a halo over it because she said I was my wife, Marj's, saint. Saint Lenny Day, at your service. I accept the high priority afforded errands. Like a fire drill or threat of a hurricane or wildfire. You drop what you're doing and give it your full attention.</p>

            <p>I plan my errand route based on the items listed in the text, a mental GPS guiding me from one point to the next. Disposable gloves, wet wipes, bandages, morphine, and compazine for nausea and vomiting at the pharmacy; soups, yogurt, applesauce and pudding at the grocery store; ATM at the bank for cash (Oops! that should be first).</p>

            <p>I ease my hybrid onto the street. Errands give us purpose, something we can accomplish without putting an abundance of thought or effort into it. It's a break from the nagging terror of existence, its haunting secrets and threat of oblivion. For now, my immediate future is in my control and as clear to me as an image in a crystal ball. I will run my errands and will inevitably arrive at home with the necessary items before my wife's nurse arrives.</p>

            <p>I get everything put away in time for Doria's visit. Marj lies in a hospital bed set up in a space once occupied by the dining room table. "Look who's here," I say as if an old friend had come to visit. But I see by the look on her face, the protruding eyes from their sockets, the caved-in cheeks, that she doesn't appreciate my weak joke. She wears her usual gray head wrap, her hair having fallen out during her chemotherapy treatments, the excess tied behind her head to make it look like a pony tail.</p>

            <p>There's a look of resignation on her face as she submits to Doria's routine checks of temperature, blood pressure, and pulse. The look fades to annoyance as Doria emerges from the bathroom with a basin of soap and warm water, signaling it is time for her sponge bath. We put on our gloves and wash her face and hands first, then the rest of her body. Despite the number of times Doria and I have done this, I am still embarrassed seeing my wife exposed to a stranger. I always see myself next to her in happier times, just the two of us laughing like naughty children.</p>

            <p>"So, how's she doing, Doria?" I ask as I follow her down the stairs.</p>

            <p>"She's doing as well as can be expected, Mr. Day."</p>

            <p>"I know she is close." I feel my eyes welling up. I take a deep breath. "I mean, what have you heard people like her say, when they are where, you know, she is?"</p>

            <p>Doria turns to face me. "Oh, one thing I noticed when we were bathing her. Her bottom looks like it's developing bed sores." She grabs a pad from her pocket and begins scribbling on it. "This cream should help. I suggest getting it and putting it on her as soon as possible." She rips the sheet from her pad and hands it to me. She shifts her medical case from one hand to the other as she reaches the door. It's late afternoon and I can hear the school bus making its usual stop across the street. The sound of the kids running to their houses and shouting at one another fills the momentary silence. I want to hear more from Doria than her clinical observations of my wife's bottom.</p>

            <p>"Anything else, Mr. Day?" I shake my head as Doria opens the door and steps through it.</p>

            <p>I stare at the paper in my hand.</p>

            <p>I sit with Marj feeding her spoonful's of chicken broth, one of the few foods she is able to hold down. She closes her eyes and lets out a low groan when I bring the spoon to her lips. I know she is finished. I put the bowl and spoon down and push the portable tray table away from her bed.</p>

            <p>"I have to run another errand," I say.</p>

            <p>"What for?"</p>

            <p>"Doria says I'm supposed to buy this creme. For your bottom."</p>

            <p>"What about my bottom?"</p>

            <p>"It's irritated."</p>

            <p>"So, you were nosing around my bottom?"</p>

            <p>"Yup. Me and Doria."</p>

            <p>"Wow. A threesome, and I didn't even know it."</p>

            <p>I laugh as I gesture to the end table next to her bed. I had placed an empty mason jar there a few days ago along with a pad and a pen.</p>

            <p>"I see you haven't put anything in the jar."</p>

            <p>Marj bats the comment away like an annoying fly. "What exactly are you expecting me to write? If I want to tell you something, I'll say it to your face, not stuff it in an empty jar."</p>

            <p>"Sometimes those things are easier to write than say."</p>

            <p>"What things? Lenny, for God sakes, stop harassing me."</p>

            <p>I shrug. "I don't mean to, I just thought you might mention what you see or feel, when you sleep or…" I trail off, not sure of what it is I am even trying to say. Marj lies back and looks at me. For a moment I see a hint of recognition in her eyes, like she knows what I want. But the moment quickly fades. She folds her hands and looks down at them.</p>

            <p>"Better go out for the creme," she says. "I don't want any more scrutinizing of my bottom by you and that nosey Doria."</p>

            <p>I sit quietly in the living room, my eyes closed as I meditate. I am nowhere near Nirvana's door. Instead, all I can think about is the errand I am about to run. One never goes on an errand for only one thing. It violates the circular nature of errands. So, there must be other items I can pick up while I am out. I know the bulb is out on the living room lamp and the TV remote needs batteries. The car is running on fumes. So, my route will include stops at the pharmacy for the skin creme, the hardware store for the bulbs and the gas station for a top off. A three-point circle, smaller than usual, but the most efficient use of my time.</p>

            <p>First stop, the pharmacy. A group of homeless people cluster outside, trying to comply with the unspoken mandate to be invisible, despite the human impulse to be seen. One of them stands apart, talking to the others as they tend to their "rigs": shopping carts and backpacks.</p>

            <p>"Do not despair, my friends," he says. His clothes hang from his skinny frame and shake as he speaks. "You are all special. Special. Don't let anyone tell you different."</p>

            <p>I walk by him, eyes cast down. It's not that I don't want to help; it's the encounter I am keen to avoid.</p>

            <p>"Even though, God, my friends, the exalted one, is made in man's image." The man's words trip me up before I reach the door.</p>

            <p>I turn to him, unable to stop myself. "Excuse me," I say, "You got it wrong."</p>

            <p>The man smiles. "What, friend. What did I get wrong?"</p>

            <p>"Man is made in God's image. Not the other way around."</p>

            <p>"Really? But, my friend, look around you? If man was truly made in God's image, would these folks be wondering where their next meal is coming from? Or, where they'll be sleeping tonight? I'm afraid your view of the divine is not supported by the reality of what you see here."</p>

            <p>I shake my head, wanting to counter him, but wary of engaging him further. Instead, I reach into my pocket for a five-dollar bill. "Here," I say, handing it to him, "share it with your other godly friends."</p>

            <p>I finish and head back home. I can't deny the satisfaction that comes with completing a circular set of tasks. I think of the homeless man and wonder if God accepts man-made errands as an aspect of his image. When I was a kid, I used to love the rides at the amusement park. The Tilt-A-Whirl, the Whip, the Roller Coaster; they all go in circles. But you still wind up where you started. Dizzy, a little nauseous, but curiously happy. As I deposit my shopping bag on the counter, I realize my life has been one big roundabout I keep driving into, but keep missing the exits like that guy in the European Vacation movie.</p>

            <p>As the morphine slowly takes effect, Marj's breathing settles into a slow, steady rhythm. Her lids close, pulsing gently in response to rapid eye movement behind them. Her body relaxes, released from the burden it carried while awake.</p>

            <p>The open blinds allow the fading rays of the sun to spread across her face and chest. I watch her carefully, timing my breath to coincide with hers as if she needs help getting from one breath to the next. I become acutely aware of the cycle of breathing in a way I had never before experienced it. It reminds me of Sisyphus, the King of Corinth, sentenced for eternity by Zeus for repeatedly defying the gods to rolling a stone up a hill, then doing it all over again after it rolls down.</p>

            <p>Marj and I are doing the same thing, only instead of a rock, our task is to take in a breath, let it out, then do the same thing. Over and over, for our entire life, the earthly version of eternity.</p>

            <p>I marvel at how philosophers have fretted over this, seeing it as an absurd act, yet one in which Sisyphus takes a perverse joy. Is our version of this the same? In exchange for the monotony of breath, we experience life? Or, are we being punished, Zeus style, for some prior infraction?</p>

            <p>Maybe Marj, like so many others in her situation, instinctively knows. But I fear I'll never know for my dear is running out of time. Doria has been over more than usual. This morning, she gripped my shoulder. "It won't be long, Mr. Day. She'll be at peace soon."</p>

            <p>But I can't bear to let her go without knowing there is a better space for her, a caring one that feigns circular existence and its culture of avoidance and fear.</p>

            <p>I notice a piece of paper in the jar. My hand trembles as I retrieve it. The paper feels moist, like it was briefly left out in the rain. As I read it, I can hear Marj's voice accompanying her scrawl.</p>

            <p>It's a series of errands she has written out for me "after I am gone," she notes, "so you won't forget the important stuff."</p>

            <p>I fold it and close my eyes as my mind instinctively plans a route, a circular one, like pushing a rock to the top of a hill and watching it roll to the bottom, circular, efficient and heartbreakingly sad.</p>
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

export default RunningErrands;
