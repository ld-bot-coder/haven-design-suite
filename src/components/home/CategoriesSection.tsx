import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import curtainsImage from "@/assets/curtains-closeup.jpg";
import sofaImage from "@/assets/sofa-seating.jpg";
import blindsImage from "@/assets/blinds-shades.jpg";
import wallpaperImage from "@/assets/wallpaper-panels.jpg";
import bedroomImage from "@/assets/bedroom-interior.jpg";

const categories = [
  {
    name: "Curtains & Drapes",
    description: "Elegant window dressing for every room",
    image: curtainsImage,
    href: "/collections?category=curtains",
  },
  {
    name: "Sofas & Seating",
    description: "Premium comfort meets timeless design",
    image: sofaImage,
    href: "/collections?category=sofas",
  },
  {
    name: "Blinds & Shades",
    description: "Modern light control solutions",
    image: blindsImage,
    href: "/collections?category=blinds",
  },
  {
    name: "Wallpapers & Panels",
    description: "Transform walls into art",
    image: wallpaperImage,
    href: "/collections?category=wallpapers",
  },
  {
    name: "Bedroom Furniture",
    description: "Create your perfect sanctuary",
    image: bedroomImage,
    href: "/collections?category=bedroom",
  },
];

export function CategoriesSection() {
  return (
    <section className="section-padding bg-background">
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
            Our Collections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From custom curtains to complete interior solutions, discover our
            curated range of premium home furnishings.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 || index === 3 ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <Link to={category.href} className="block h-full">
                <div
                  className={`relative overflow-hidden ${
                    index === 0 || index === 3
                      ? "h-[400px] lg:h-full min-h-[400px]"
                      : "h-[280px]"
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-ivory mb-2">
                          {category.name}
                        </h3>
                        <p className="text-ivory/70 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="h-5 w-5 text-charcoal" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
