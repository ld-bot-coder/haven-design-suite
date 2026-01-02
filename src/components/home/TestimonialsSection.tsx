import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "ArtisanHome transformed our living room beyond expectations. The custom curtains and sofa perfectly match our vision. Truly exceptional craftsmanship!",
    project: "Living Room Makeover",
  },
  {
    name: "Rajesh Gupta",
    location: "Bangalore",
    rating: 5,
    text: "Professional from start to finish. The team's attention to detail and commitment to quality made our dream home a reality. Highly recommended!",
    project: "Complete Home Interior",
  },
  {
    name: "Ananya Krishnan",
    location: "Chennai",
    rating: 5,
    text: "The window treatments they designed for our villa are stunning. Perfect blend of functionality and elegance. Outstanding service!",
    project: "Villa Window Solutions",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-charcoal">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 mb-4 text-ivory">
            What Our Clients Say
          </h2>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners who trusted us with their
            interior dreams.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-charcoal border border-ivory/10 rounded-2xl p-8 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-ivory/80 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-ivory/10 pt-6">
                <p className="font-medium text-ivory">{testimonial.name}</p>
                <p className="text-sm text-ivory/50">{testimonial.location}</p>
                <p className="text-sm text-gold mt-1">{testimonial.project}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
