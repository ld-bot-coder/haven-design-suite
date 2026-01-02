import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useGallery } from "@/hooks/useStore";
import type { GalleryItem } from "@/lib/store";

import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/bedroom-interior.jpg";
import kidsImage from "@/assets/kids-room.jpg";
import officeImage from "@/assets/home-office.jpg";
import curtainsImage from "@/assets/curtains-closeup.jpg";
import sofaImage from "@/assets/sofa-seating.jpg";

const categories = ["Curtains", "Sofas", "Blinds", "Wallpapers", "Bedroom"];
const roomTypes = ["Living Room", "Bedroom", "Kids Room", "Office", "Dining Room"];

const placeholderImages = [heroImage, bedroomImage, kidsImage, officeImage, curtainsImage, sofaImage];

const AdminGallery = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    roomType: "",
    imageUrl: "",
    description: "",
  });

  // Filter gallery
  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "",
      roomType: "",
      imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      description: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      roomType: item.roomType,
      imageUrl: item.imageUrl,
      description: item.description,
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.roomType) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, formData);
      toast.success("Gallery item updated successfully");
    } else {
      addGalleryItem(formData);
      toast.success("Gallery item added successfully");
    }

    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingItem) {
      deleteGalleryItem(deletingItem.id);
      toast.success("Gallery item deleted successfully");
      setIsDeleteOpen(false);
      setDeletingItem(null);
    }
  };

  const getImageSrc = (item: GalleryItem) => {
    // Handle both imported images and path strings
    if (item.imageUrl.startsWith("/src/assets/")) {
      const filename = item.imageUrl.split("/").pop();
      switch (filename) {
        case "hero-living-room.jpg":
          return heroImage;
        case "bedroom-interior.jpg":
          return bedroomImage;
        case "kids-room.jpg":
          return kidsImage;
        case "home-office.jpg":
          return officeImage;
        case "curtains-closeup.jpg":
          return curtainsImage;
        case "sofa-seating.jpg":
          return sofaImage;
        default:
          return heroImage;
      }
    }
    return item.imageUrl;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Manage project photos and portfolio images ({gallery.length} items)
          </p>
        </div>
        <Button variant="hero" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
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
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredGallery.length === 0 ? (
          <div className="col-span-full admin-card text-center py-12">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No gallery items found</p>
          </div>
        ) : (
          filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="admin-card overflow-hidden group"
            >
              <div className="relative aspect-[4/3] -mx-6 -mt-6 mb-4">
                <img
                  src={getImageSrc(item)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setDeletingItem(item);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium truncate">{item.title}</h3>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {item.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {item.roomType}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
              )}
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the image details." : "Add a new project photo to your gallery."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type *</Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the project..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Preview Image</Label>
              <div className="aspect-video rounded-lg bg-secondary overflow-hidden">
                <img
                  src={formData.imageUrl || heroImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Note: In production, you would upload images here. Using placeholder for demo.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingItem ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingItem?.title}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminGallery;
