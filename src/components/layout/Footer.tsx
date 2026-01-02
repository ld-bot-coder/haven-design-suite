import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Curtains & Drapes", href: "/collections?category=curtains" },
    { name: "Sofas & Seating", href: "/collections?category=sofas" },
    { name: "Blinds & Shades", href: "/collections?category=blinds" },
    { name: "Wallpapers", href: "/collections?category=wallpapers" },
    { name: "Bedroom Furniture", href: "/collections?category=bedroom" },
  ],
  solutions: [
    { name: "Living Room", href: "/solutions#living" },
    { name: "Bedroom", href: "/solutions#bedroom" },
    { name: "Kids Room", href: "/solutions#kids" },
    { name: "Home Office", href: "/solutions#office" },
    { name: "Commercial", href: "/solutions#commercial" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Process", href: "/about#process" },
    { name: "Projects", href: "/collections#projects" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main Footer */}
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold">
                <span className="text-gold">Artisan</span>
                <span className="text-ivory">Home</span>
              </span>
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-sm mb-8">
              Crafting bespoke furniture and interior solutions that transform
              houses into homes. Experience the art of luxury living with our
              custom designs tailored to your vision.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@artisanhome.in"
                className="flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>hello@artisanhome.in</span>
              </a>
              <div className="flex items-start gap-3 text-ivory/70">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  Design Studio, 42 MG Road,
                  <br />
                  Bangalore, Karnataka 560001
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-ivory/50">
            © {new Date().getFullYear()} ArtisanHome. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
