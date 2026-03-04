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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Image, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { PortfolioItem } from "../../backend.d";
import { useFileUpload } from "../../hooks/useFileUpload";
import {
  useAddPortfolioItem,
  useDeletePortfolioItem,
  useGetPortfolioItems,
  useUpdatePortfolioItem,
} from "../../hooks/useQueries";

const CATEGORIES = [
  "Architectural Design",
  "Interiors",
  "Commercial",
  "Residential",
  "Landscape",
];

type FormState = {
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  displayOrder: string;
};

const DEFAULT_FORM: FormState = {
  title: "",
  category: "Interiors",
  imageUrl: "",
  caption: "",
  displayOrder: "0",
};

export default function AdminPortfolio() {
  const { data: items = [], isLoading } = useGetPortfolioItems();
  const addItem = useAddPortfolioItem();
  const updateItem = useUpdatePortfolioItem();
  const deleteItem = useDeletePortfolioItem();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploadProgress, isUploading } = useFileUpload();

  const sorted = [...items].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );

  const openAdd = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setImagePreview("");
    setDialogOpen(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      caption: item.caption,
      displayOrder: item.displayOrder.toString(),
    });
    setImagePreview(item.imageUrl);
    setDialogOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.imageUrl.trim()) {
      toast.error("Please upload an image");
      return;
    }

    const params = {
      title: form.title,
      category: form.category,
      imageUrl: form.imageUrl,
      caption: form.caption,
      displayOrder: BigInt(Number.parseInt(form.displayOrder) || 0),
    };

    try {
      if (editingItem) {
        await updateItem.mutateAsync({ id: editingItem.id, ...params });
        toast.success("Portfolio item updated");
      } else {
        await addItem.mutateAsync(params);
        toast.success("Portfolio item added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteItem.mutateAsync(deleteId);
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-charcoal">
            Portfolio
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {items.length} items
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-body font-semibold text-xs tracking-widest uppercase border-0"
          data-ocid="portfolio.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Photo
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div
          className="flex justify-center py-20"
          data-ocid="portfolio.loading_state"
        >
          <Loader2 className="h-8 w-8 text-brand-gold animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="portfolio.empty_state"
        >
          <Image className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p className="font-body text-sm">
            No portfolio items yet. Add your first photo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sorted.map((item, idx) => (
            <div
              key={item.id.toString()}
              className="group bg-white rounded-sm shadow-card overflow-hidden"
              data-ocid={`portfolio.item.${idx + 1}`}
            >
              <div className="relative h-40 bg-brand-beige/50">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="p-1.5 bg-white/20 hover:bg-white/30 rounded text-white transition-colors"
                    data-ocid={`portfolio.edit_button.${idx + 1}`}
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="p-1.5 bg-red-500/60 hover:bg-red-500/80 rounded text-white transition-colors"
                    data-ocid={`portfolio.delete_button.${idx + 1}`}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-display text-xs font-semibold text-brand-charcoal truncate">
                  {item.title}
                </p>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {item.category}
                </p>
                <p className="font-body text-xs text-muted-foreground/60 mt-0.5">
                  Order: {item.displayOrder.toString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg" data-ocid="portfolio.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-semibold text-brand-charcoal">
              {editingItem ? "Edit Portfolio Item" : "Add Portfolio Photo"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                Photo
              </Label>
              <button
                type="button"
                className="w-full border-2 border-dashed border-brand-beige rounded-sm h-44 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold transition-colors overflow-hidden relative"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload portfolio image"
                data-ocid="portfolio.dropzone"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8 opacity-40" />
                    <p className="font-body text-xs">Click to upload image</p>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                    <p className="font-body text-xs text-white">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="portfolio.upload_button"
              />
              {form.imageUrl && (
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs text-green-600">
                    ✓ Image uploaded
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((f) => ({ ...f, imageUrl: "" }));
                      setImagePreview("");
                    }}
                    className="font-body text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Title
                </Label>
                <Input
                  placeholder="e.g. Luxury Living Room"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="font-body"
                  data-ocid="portfolio.input"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="portfolio.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        className="font-body text-sm"
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Display Order
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, displayOrder: e.target.value }))
                  }
                  className="font-body"
                  data-ocid="portfolio.input"
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Caption (optional)
                </Label>
                <Textarea
                  placeholder="Brief description..."
                  value={form.caption}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, caption: e.target.value }))
                  }
                  rows={2}
                  className="font-body resize-none"
                  data-ocid="portfolio.textarea"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="font-body text-xs tracking-wider uppercase"
              data-ocid="portfolio.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                addItem.isPending || updateItem.isPending || isUploading
              }
              className="bg-brand-charcoal hover:bg-brand-dark text-white font-body text-xs tracking-wider uppercase border-0"
              data-ocid="portfolio.save_button"
            >
              {addItem.isPending || updateItem.isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : editingItem ? (
                "Save Changes"
              ) : (
                "Add Photo"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="portfolio.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Portfolio Item?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This action cannot be undone. The photo will be permanently
              removed from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="font-body text-xs tracking-wider uppercase"
              data-ocid="portfolio.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteItem.isPending}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-body text-xs tracking-wider uppercase"
              data-ocid="portfolio.delete_button"
            >
              {deleteItem.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
