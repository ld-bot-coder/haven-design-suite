import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Eye, Phone, Mail, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";

const enquiries = [
  {
    id: 1,
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya@email.com",
    city: "Mumbai",
    requirement: "Looking for custom curtains for my 3BHK living room. Prefer neutral colors.",
    status: "new",
    date: "2024-01-15",
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
  },
];

const AdminEnquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<typeof enquiries[0] | null>(null);
  const [notes, setNotes] = useState("");

  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-primary/10 text-primary";
      case "contacted":
        return "bg-gold/10 text-gold";
      case "converted":
        return "bg-sage/10 text-sage";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl">Enquiries</h1>
        <p className="text-muted-foreground mt-1">
          Manage customer enquiries and leads
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "New", count: 2, color: "bg-primary/10 text-primary" },
          { label: "Contacted", count: 2, color: "bg-gold/10 text-gold" },
          { label: "Converted", count: 1, color: "bg-sage/10 text-sage" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card text-center"
          >
            <p className={`text-3xl font-serif font-semibold`}>{stat.count}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="admin-card"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-input bg-background text-sm">
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>
        </div>
      </motion.div>

      {/* Enquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="admin-card overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {enquiry.phone}
                    </span>
                    <span className="text-xs flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {enquiry.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{enquiry.city}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {enquiry.requirement}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
                      enquiry.status
                    )}`}
                  >
                    {enquiry.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(enquiry.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedEnquiry(enquiry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">
                          Enquiry Details
                        </DialogTitle>
                      </DialogHeader>
                      {selectedEnquiry && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-muted-foreground">Name</Label>
                              <p className="font-medium">{selectedEnquiry.name}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">City</Label>
                              <p className="font-medium">{selectedEnquiry.city}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Phone</Label>
                              <p className="font-medium">{selectedEnquiry.phone}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Email</Label>
                              <p className="font-medium">{selectedEnquiry.email}</p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-muted-foreground">Requirement</Label>
                            <p className="mt-1">{selectedEnquiry.requirement}</p>
                          </div>

                          <div>
                            <Label className="text-muted-foreground">Status</Label>
                            <select className="mt-1 w-full px-4 py-2 rounded-lg border border-input bg-background">
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                            </select>
                          </div>

                          <div>
                            <Label className="text-muted-foreground">Internal Notes</Label>
                            <Textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Add notes about this enquiry..."
                              className="mt-1"
                              rows={3}
                            />
                          </div>

                          <div className="flex gap-3">
                            <Button variant="hero" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                            <Button variant="secondary" className="flex-1">
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default AdminEnquiries;
