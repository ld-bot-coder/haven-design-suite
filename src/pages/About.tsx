import { motion } from "framer-motion";
import { UserLayout } from "@/components/layout/UserLayout";
import { Award, Users, Target, Heart } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/bedroom-interior.jpg";

const values = [
  {
    icon: Target,
    title: "Precision Craftsmanship",
    description:
      "Every piece we create is crafted with meticulous attention to detail, ensuring perfection in every stitch and joint.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your vision is our mission. We listen, understand, and deliver solutions that exceed expectations.",
  },
  {
    icon: Award,
    title: "Quality Materials",
    description:
      "We source only the finest fabrics and materials, ensuring durability and timeless elegance.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our designers and craftsmen bring decades of combined experience to every project.",
  },
];

const milestones = [
  { year: "2008", event: "Founded in Bangalore with a vision for luxury interiors" },
  { year: "2012", event: "Expanded to Mumbai and Delhi NCR" },
  { year: "2016", event: "Launched custom furniture manufacturing unit" },
  { year: "2020", event: "Celebrated 2000+ completed projects" },
  { year: "2024", event: "Recognized as India's top interior solution provider" },
];

const About = () => {
  return (
    <UserLayout>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Our design studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>

        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-gold tracking-wider uppercase">
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-3 mb-6">
              Crafting Dreams Into Reality
            </h1>
            <p className="text-ivory/80 text-lg leading-relaxed">
              For over 15 years, ArtisanHome has been transforming houses into
              homes with our bespoke furniture and interior solutions. We blend
              traditional Indian craftsmanship with contemporary design to
              create spaces that inspire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-primary tracking-wider uppercase">
                Who We Are
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2008 by a team of passionate designers and master
                  craftsmen, ArtisanHome began as a small workshop in Bangalore
                  with a simple mission: to bring world-class interior solutions
                  to Indian homes.
                </p>
                <p>
                  Today, we're proud to be one of India's most trusted names in
                  custom furniture and interior design. Our journey has been
                  marked by an unwavering commitment to quality, innovation, and
                  customer satisfaction.
                </p>
                <p>
                  Every project we undertake is a collaboration between our
                  expert designers and our clients, resulting in spaces that are
                  uniquely personal and beautifully functional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={bedroomImage}
                alt="Our craftsmanship"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-2xl">
                <p className="text-4xl font-serif font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary tracking-wider uppercase">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-4">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary tracking-wider uppercase">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-4">
              Milestones
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20">
                  <span className="text-2xl font-serif text-primary font-bold">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default About;
