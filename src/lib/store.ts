// Simple in-memory store for demo purposes
// In production, this would be replaced with a database

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  status: "new" | "contacted" | "converted";
  date: string;
  notes: string;
}

export interface Appointment {
  id: number;
  enquiryId?: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  date: string;
  time: string;
  type: "measurement" | "consultation" | "installation";
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  notes: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  roomType: string;
  imageUrl: string;
  description: string;
}

export interface SiteSettings {
  businessName: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  whatsappNumber: string;
  businessHours: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ContentItem {
  id: string;
  type: "banner" | "testimonial" | "about";
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  active: boolean;
}

// Initial data
const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya@email.com",
    city: "Mumbai",
    requirement: "Looking for custom curtains for my 3BHK living room. Prefer neutral colors.",
    status: "new",
    date: "2024-01-15",
    notes: "",
  },
  {
    id: 2,
    name: "Rajesh Gupta",
    phone: "+91 87654 32109",
    email: "rajesh@email.com",
    city: "Delhi",
    requirement: "Interested in modular sofa set. Budget around 1 lakh.",
    status: "contacted",
    date: "2024-01-14",
    notes: "Called on 14th Jan, interested in Milano collection",
  },
  {
    id: 3,
    name: "Ananya Krishnan",
    phone: "+91 76543 21098",
    email: "ananya@email.com",
    city: "Chennai",
    requirement: "Complete bedroom interior including bed, wardrobe, and curtains.",
    status: "new",
    date: "2024-01-14",
    notes: "",
  },
  {
    id: 4,
    name: "Vikram Patel",
    phone: "+91 65432 10987",
    email: "vikram@email.com",
    city: "Bangalore",
    requirement: "Roman blinds for home office. Need light control.",
    status: "converted",
    date: "2024-01-13",
    notes: "Order placed for 3 windows",
  },
  {
    id: 5,
    name: "Meera Reddy",
    phone: "+91 54321 09876",
    email: "meera@email.com",
    city: "Hyderabad",
    requirement: "Wall panels for TV unit background. Modern design preferred.",
    status: "contacted",
    date: "2024-01-12",
    notes: "Site visit scheduled for next week",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    customerName: "Priya Sharma",
    phone: "+91 98765 43210",
    address: "Flat 12A, Oberoi Heights, Goregaon",
    city: "Mumbai",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "measurement",
    status: "scheduled",
    notes: "Living room curtains measurement",
  },
  {
    id: 2,
    customerName: "Ananya Krishnan",
    phone: "+91 76543 21098",
    address: "Villa 8, Palm Meadows",
    city: "Chennai",
    date: "2024-01-18",
    time: "2:00 PM",
    type: "consultation",
    status: "scheduled",
    notes: "Complete bedroom interior consultation",
  },
  {
    id: 3,
    customerName: "Vikram Patel",
    phone: "+91 65432 10987",
    address: "23, Indiranagar",
    city: "Bangalore",
    date: "2024-01-22",
    time: "11:00 AM",
    type: "installation",
    status: "scheduled",
    notes: "Roman blinds installation - 3 windows",
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "Curtains",
    roomType: "Living Room",
    imageUrl: "/src/assets/3.jpeg",
    description: "Elegant sheer curtains with blackout lining",
  },
  {
    id: 2,
    title: "Luxe Bedroom Suite",
    category: "Bedroom",
    roomType: "Bedroom",
    imageUrl: "/src/assets/4.jpeg",
    description: "Complete bedroom makeover with custom furniture",
  },
  {
    id: 3,
    title: "Kids Paradise",
    category: "Wallpapers",
    roomType: "Kids Room",
    imageUrl: "/src/assets/5.jpeg",
    description: "Playful wallpaper design for children's room",
  },
  {
    id: 4,
    title: "Executive Home Office",
    category: "Blinds",
    roomType: "Office",
    imageUrl: "/src/assets/6.jpeg",
    description: "Motorized blinds for light control",
  },
];

const initialContent: ContentItem[] = [
  {
    id: "banner-1",
    type: "banner",
    title: "Wholesale & Retailer of Home Furnishings",
    content: "Transform your home with our extensive collection of curtains, blinds, wallpapers, and more.",
    imageUrl: "/src/assets/3.jpeg",
    active: true,
  },
  {
    id: "banner-2",
    type: "banner",
    title: "Premium Home Decor",
    content: "Discover our exclusive collection of curtains, blinds, wallpapers, and wooden flooring.",
    imageUrl: "/src/assets/4.jpeg",
    active: true,
  },
  {
    id: "testimonial-1",
    type: "testimonial",
    title: "Exceptional craftsmanship",
    content: "The attention to detail in our custom curtains is remarkable. The team understood exactly what we wanted and delivered beyond our expectations.",
    author: "Priya Mehta, Mumbai",
    active: true,
  },
  {
    id: "testimonial-2",
    type: "testimonial",
    title: "Transformed our home",
    content: "From consultation to installation, the entire experience was seamless. Our living room looks like it's straight out of a magazine.",
    author: "Rahul Sharma, Delhi",
    active: true,
  },
  {
    id: "about-1",
    type: "about",
    title: "Our Story",
    content: "Sri Venkateswara Furnishings is your premier destination for high-quality home decor, offering a wide range of products including curtains, bed sheets, wallpapers, customized wallpapers, wooden flooring, gym flooring, and carpets.",
    active: true,
  },
];

const initialSettings: SiteSettings = {
  businessName: "Sri Venkateswara Furnishings",
  phone1: "+91 90300 08781",
  phone2: "+91 96400 08781",
  email: "hello@srivenkateswara.in",
  address: "#6-87/2B, Opp. Hymavathi Hospital, Main Road, Gopalapatnam, Visakhapatnam-530027",
  whatsappNumber: "+919030008781",
  businessHours: "Mon - Sat: 10:00 AM - 7:00 PM, Sunday: By Appointment",
  metaTitle: "HOME DECOR - Sri Venkateswara Furnishings",
  metaDescription: "Wholesale & Retailer of Home Furnishings. Transform your home with custom curtains, blinds, and wallpapers.",
};

// Store class with event emitter pattern
class Store {
  private enquiries: Enquiry[] = [...initialEnquiries];
  private appointments: Appointment[] = [...initialAppointments];
  private gallery: GalleryItem[] = [...initialGallery];
  private content: ContentItem[] = [...initialContent];
  private settings: SiteSettings = { ...initialSettings };
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Enquiries
  getEnquiries() {
    return [...this.enquiries];
  }

  addEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "date" | "notes">) {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Date.now(),
      status: "new",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    };
    this.enquiries = [newEnquiry, ...this.enquiries];
    this.notify();
    return newEnquiry;
  }

  updateEnquiry(id: number, updates: Partial<Enquiry>) {
    this.enquiries = this.enquiries.map((e) =>
      e.id === id ? { ...e, ...updates } : e
    );
    this.notify();
  }

  deleteEnquiry(id: number) {
    this.enquiries = this.enquiries.filter((e) => e.id !== id);
    this.notify();
  }

  // Appointments
  getAppointments() {
    return [...this.appointments];
  }

  addAppointment(appointment: Omit<Appointment, "id">) {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now(),
    };
    this.appointments = [newAppointment, ...this.appointments];
    this.notify();
    return newAppointment;
  }

  updateAppointment(id: number, updates: Partial<Appointment>) {
    this.appointments = this.appointments.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );
    this.notify();
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter((a) => a.id !== id);
    this.notify();
  }

  // Gallery
  getGallery() {
    return [...this.gallery];
  }

  addGalleryItem(item: Omit<GalleryItem, "id">) {
    const newItem: GalleryItem = {
      ...item,
      id: Date.now(),
    };
    this.gallery = [newItem, ...this.gallery];
    this.notify();
    return newItem;
  }

  updateGalleryItem(id: number, updates: Partial<GalleryItem>) {
    this.gallery = this.gallery.map((g) =>
      g.id === id ? { ...g, ...updates } : g
    );
    this.notify();
  }

  deleteGalleryItem(id: number) {
    this.gallery = this.gallery.filter((g) => g.id !== id);
    this.notify();
  }

  // Content
  getContent() {
    return [...this.content];
  }

  updateContent(id: string, updates: Partial<ContentItem>) {
    this.content = this.content.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    this.notify();
  }

  addContent(item: Omit<ContentItem, "id">) {
    const newItem: ContentItem = {
      ...item,
      id: `${item.type}-${Date.now()}`,
    };
    this.content = [...this.content, newItem];
    this.notify();
    return newItem;
  }

  deleteContent(id: string) {
    this.content = this.content.filter((c) => c.id !== id);
    this.notify();
  }

  // Settings
  getSettings() {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<SiteSettings>) {
    this.settings = { ...this.settings, ...updates };
    this.notify();
  }
}

export const store = new Store();
