import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Send } from "lucide-react";
import { toast } from "sonner";
import { storage, GalleryImage } from "@/lib/storage";

// Categories matching the admin gallery
const categories = [
  { value: "all", label: "All Categories" },
  { value: "Curtains", label: "Curtains" },
  { value: "Curtain Rods", label: "Curtain Rods" },
  { value: "Bed Sheets", label: "Bed Sheets" },
  { value: "Diwan Sets", label: "Diwan Sets" },
  { value: "Doormats", label: "Doormats" },
  { value: "Sofa Cloth", label: "Sofa Cloth" },
  { value: "Wallpapers", label: "Wallpapers" },
  { value: "Pillows", label: "Pillows" },
  { value: "Vertical Blinds", label: "Vertical Blinds" },
  { value: "Wooden Blinds", label: "Wooden Blinds" },
  { value: "Customized Wallpapers", label: "Customized Wallpapers" },
  { value: "Wooden Flooring", label: "Wooden Flooring" },
  { value: "Gym Flooring", label: "Gym Flooring" },
  { value: "Carpets", label: "Carpets" },
  { value: "All Other Interiors", label: "All Other Interiors" },
];


const Collections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch gallery items
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const params = selectedCategory !== "all" ? { category: selectedCategory } : {};
      const data = await storage.getGalleryImages(params);
      setGallery(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  // Filter gallery
  const filteredProducts = gallery.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Our Collections
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our curated range of premium interior furnishings and covers
              designed to transform your living spaces. Contact us for pricing and details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found. Upload images from the admin panel to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button variant="hero" size="sm" asChild>
                        <a
                          href={`https://wa.me/919930087841?text=Hi, I'm interested in ${product.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Enquire on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-xl mb-2">{product.title}</h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <a
                        href={`https://wa.me/919930087841?text=Hi, I'm interested in ${product.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact for Details
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default Collections;
