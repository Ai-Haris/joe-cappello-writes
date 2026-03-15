import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// TODO: Replace this with your actual Mailchimp Form Action URL
// You can get this from Mailchimp: Audience -> Sign Up Forms -> Embedded Forms -> Form Action URL
const MAILCHIMP_URL = "https://gmail.us12.list-manage.com/subscribe/post?u=48bc390c7faafb0fe9c506bf5&id=38690cf10d&v_id=1538&f_id=00697be0f0";

const subscribeToMailchimp = (url: string, email: string, name: string) => {
  return new Promise((resolve, reject) => {
    // Convert standard /post URL to /post-json for JSONP
    const endpoint = url.replace("/post?", "/post-json?");

    // Based on your latest screenshot, you created a new field with tag NAME.
    const params = new URLSearchParams({
      EMAIL: email,
      NAME: name,
      FNAME: name, // keeping FNAME as fallback
    });

    const callbackName = `mailchimpCallback_${Date.now()}`;
    params.append("c", callbackName);

    const script = document.createElement("script");
    script.src = `${endpoint}&${params.toString()}`;

    // @ts-ignore
    window[callbackName] = (response: any) => {
      // @ts-ignore
      delete window[callbackName];
      document.body.removeChild(script);

      if (response.result === "success") {
        resolve(response);
      } else {
        reject(new Error(response.msg || "Subscription failed"));
      }
    };

    script.onerror = () => {
      // @ts-ignore
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("Network error occurred"));
    };

    document.body.appendChild(script);
  });
};

const SubscribeSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsLoading(true);
    try {
      await subscribeToMailchimp(MAILCHIMP_URL, email, name);

      toast({
        title: "Thank you!",
        description: "You have been successfully subscribed."
      });
      setName("");
      setEmail("");
    } catch (error: any) {
      let errorMessage = "There was a problem sending your request. Please try again.";
      if (error.message.includes("is already subscribed")) {
        errorMessage = "This email is already on the mailing list.";
      } else if (error.message && typeof error.message === "string") {
        // sometimes Mailchimp sends HTML error msg
        const tmp = document.createElement("DIV");
        tmp.innerHTML = error.message;
        errorMessage = tmp.textContent || tmp.innerText || errorMessage;
      }

      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Stay in Touch</h2>
          <p className="text-primary-foreground/80 mb-8 leading-relaxed">
            Subscribe to receive notifications of new posts, events, and news of new book releases and short stories.
            It's totally free and you can opt out at any time.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              name="FNAME"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
              disabled={isLoading}
            />
            <Input
              type="email"
              name="EMAIL"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
              disabled={isLoading}
            />
            <Button type="submit" variant="secondary" className="whitespace-nowrap" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribeSection;
