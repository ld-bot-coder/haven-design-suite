import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/30">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            Start Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Schedule a free consultation with our design experts. We'll visit
            your home, understand your vision, and create bespoke solutions
            that exceed your expectations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="premium-outline" size="xl" asChild>
              <Link to="/collections">Browse Collections</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border"
          >
            {[
              "Free Home Visit",
              "No Hidden Costs",
              "Premium Materials",
              "5-Year Warranty",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
