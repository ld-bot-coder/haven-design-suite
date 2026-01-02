import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/bedroom-interior.jpg";
import kidsImage from "@/assets/kids-room.jpg";
import officeImage from "@/assets/home-office.jpg";

const solutions = [
  {
    id: "living",
    title: "Living Room",
    description:
      "Create inviting spaces where family and friends gather. From luxurious sofas to elegant curtains, we design living rooms that reflect your lifestyle.",
    image: heroImage,
    features: [
      "Custom Sofa Sets",
      "Designer Curtains",
      "Wall Panels",
      "Coffee Tables",
    ],
  },
  {
    id: "bedroom",
    title: "Bedroom",
    description:
      "Transform your bedroom into a serene sanctuary. Our bespoke bedroom solutions ensure comfort meets sophistication.",
    image: bedroomImage,
    features: [
      "Luxury Beds",
      "Blackout Curtains",
      "Wardrobes",
      "Nightstands",
    ],
  },
  {
    id: "kids",
    title: "Kids Room",
    description:
      "Fun, functional, and safe spaces for your little ones. We create vibrant interiors that grow with your children.",
    image: kidsImage,
    features: [
      "Playful Furniture",
      "Colorful Drapes",
      "Study Desks",
      "Storage Solutions",
    ],
  },
  {
    id: "office",
    title: "Home Office",
    description:
      "Productive workspaces designed for focus and comfort. Our home office solutions blend functionality with elegance.",
    image: officeImage,
    features: [
      "Ergonomic Desks",
      "Light-Control Blinds",
      "Comfortable Seating",
      "Shelving Systems",
    ],
  },
];

const Solutions = () => {
  return (
    <UserLayout>
      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              Interior Solutions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete room transformations tailored to your lifestyle. From
              concept to installation, we handle everything.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding">
        <div className="container-luxury">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              id={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index !== solutions.length - 1 ? "mb-24" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal/50 to-transparent" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-sm font-medium text-primary tracking-wider uppercase">
                  Complete Solutions
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-4">
                  {solution.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="hero" asChild>
                  <Link to="/contact">
                    Get Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-ivory/60 mb-8 max-w-xl mx-auto">
              Book a free consultation and let our designers create your dream
              interior.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Solutions;
