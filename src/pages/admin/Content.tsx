import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Image as ImageIcon, Quote, FileText, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/hooks/useStore";
import type { ContentItem } from "@/lib/store";

const contentTypes = [
  { value: "banner", label: "Banners", icon: ImageIcon },
  { value: "testimonial", label: "Testimonials", icon: Quote },
  { value: "about", label: "About", icon: FileText },
] as const;

const AdminContent = () => {
  const { content, addContent, updateContent, deleteContent } = useContent();
  const [activeTab, setActiveTab] = useState<"banner" | "testimonial" | "about">("banner");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ContentItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: "banner" as ContentItem["type"],
    title: "",
    content: "",
    imageUrl: "",
    author: "",
    active: true,
  });

  const filteredContent = content.filter((item) => item.type === activeTab);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      type: activeTab,
      title: "",
      content: "",
      imageUrl: "",
      author: "",
      active: true,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      content: item.content,
      imageUrl: item.imageUrl || "",
      author: item.author || "",
      active: item.active,
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingItem) {
      updateContent(editingItem.id, formData);
      toast.success("Content updated successfully");
    } else {
      addContent(formData);
      toast.success("Content added successfully");
    }

    setIsFormOpen(false);
  };

  const handleToggleActive = (item: ContentItem) => {
    updateContent(item.id, { active: !item.active });
    toast.success(`Content ${item.active ? "hidden" : "shown"} successfully`);
  };

  const handleDelete = () => {
    if (deletingItem) {
      deleteContent(deletingItem.id);
      toast.success("Content deleted successfully");
      setIsDeleteOpen(false);
      setDeletingItem(null);
    }
  };

  const renderContentCard = (item: ContentItem) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`admin-card ${!item.active ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium truncate">{item.title}</h3>
            {!item.active && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                Hidden
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
          {item.author && (
            <p className="text-xs text-muted-foreground mt-2">— {item.author}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => handleToggleActive(item)}>
            {item.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setDeletingItem(item);
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Content</h1>
          <p className="text-muted-foreground mt-1">
            Manage website banners, testimonials, and content
          </p>
        </div>
        <Button variant="hero" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          {contentTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value} className="gap-2">
              <type.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {contentTypes.map((type) => (
          <TabsContent key={type.value} value={type.value} className="space-y-4 mt-6">
            {filteredContent.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="admin-card text-center py-12"
              >
                <type.icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No {type.label.toLowerCase()} added yet</p>
                <Button variant="outline" className="mt-4" onClick={handleAdd}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {type.label.slice(0, -1)}
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map(renderContentCard)}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingItem ? "Edit Content" : "Add Content"}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the content details." : "Add new content to your website."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ContentItem["type"]) => setFormData({ ...formData, type: value })}
                disabled={!!editingItem}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label.slice(0, -1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter content..."
                rows={4}
              />
            </div>
            {formData.type === "testimonial" && (
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name, Location"
                />
              </div>
            )}
            {formData.type === "banner" && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/src/assets/hero-living-room.jpg"
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Show on website</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
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
            <AlertDialogTitle>Delete Content</AlertDialogTitle>
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

export default AdminContent;
