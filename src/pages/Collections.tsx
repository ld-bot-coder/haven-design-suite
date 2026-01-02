import { useState } from "react";
import { motion } from "framer-motion";
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Send } from "lucide-react";
import curtainsImage from "@/assets/curtains-closeup.jpg";
import sofaImage from "@/assets/sofa-seating.jpg";
import blindsImage from "@/assets/blinds-shades.jpg";
import wallpaperImage from "@/assets/wallpaper-panels.jpg";
import bedroomImage from "@/assets/bedroom-interior.jpg";
import heroImage from "@/assets/hero-living-room.jpg";

const products = [
  {
    id: 1,
    name: "Royal Velvet Drapes",
    category: "curtains",
    roomType: "living",
    price: "₹12,500",
    image: curtainsImage,
  },
  {
    id: 2,
    name: "Milano Modular Sofa",
    category: "sofas",
    roomType: "living",
    price: "₹85,000",
    image: sofaImage,
  },
  {
    id: 3,
    name: "Elegant Roman Blinds",
    category: "blinds",
    roomType: "bedroom",
    price: "₹8,200",
    image: blindsImage,
  },
  {
    id: 4,
    name: "Geometric Wall Panels",
    category: "wallpapers",
    roomType: "living",
    price: "₹4,500/sqft",
    image: wallpaperImage,
  },
  {
    id: 5,
    name: "Luxe King Bed Set",
    category: "bedroom",
    roomType: "bedroom",
    price: "₹1,25,000",
    image: bedroomImage,
  },
  {
    id: 6,
    name: "Classic Linen Curtains",
    category: "curtains",
    roomType: "bedroom",
    price: "₹9,800",
    image: heroImage,
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "curtains", label: "Curtains & Drapes" },
  { value: "sofas", label: "Sofas & Seating" },
  { value: "blinds", label: "Blinds & Shades" },
  { value: "wallpapers", label: "Wallpapers" },
  { value: "bedroom", label: "Bedroom" },
];

const roomTypes = [
  { value: "all", label: "All Rooms" },
  { value: "living", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "office", label: "Office" },
  { value: "kids", label: "Kids Room" },
];

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesRoom =
      selectedRoom === "all" || product.roomType === selectedRoom;
    return matchesSearch && matchesCategory && matchesRoom;
  });

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
              Discover our curated range of premium furniture and interior
              solutions designed to transform your living spaces.
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
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {roomTypes.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label}
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
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="hero" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Enquire
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 capitalize">
                    {product.category.replace("-", " ")}
                  </p>
                  <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                  <p className="text-primary font-medium">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default Collections;
