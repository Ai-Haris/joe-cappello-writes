import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Contact = () => {
  const email = "joe@example.com";
  const subject = encodeURIComponent("Hello Joe!");
  const mailtoLink = `mailto:${email}?subject=${subject}`;

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
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Contact</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-primary mx-auto mb-6"
            />
            <p className="text-muted-foreground leading-relaxed text-lg font-light max-w-lg mx-auto mb-10">
              Have a comment, question, or just want to say hello? Drop Joe a line — he'd love to hear from you.
            </p>
            <Button asChild size="lg" className="px-10">
              <a href={mailtoLink}>
                <Mail className="mr-2 h-5 w-5" />
                Send Joe an Email
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
