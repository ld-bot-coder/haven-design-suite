import { motion } from "framer-motion";
import { Ruler, Palette, Truck, Shield, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Ruler,
    title: "Custom Measurements",
    description: "Free home visit for precise measurements tailored to your space.",
  },
  {
    icon: Palette,
    title: "Design Consultation",
    description: "Expert guidance to match furniture with your home's aesthetic.",
  },
  {
    icon: Truck,
    title: "Professional Installation",
    description: "Skilled craftsmen ensure perfect fitting and finishing.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Premium materials with extended warranty on all products.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal design consultant throughout your journey.",
  },
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "Recognized for excellence in interior craftsmanship.",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 mb-4">
            The ArtisanHome Difference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of craftsmanship, quality, and personalized
            service that sets us apart.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
