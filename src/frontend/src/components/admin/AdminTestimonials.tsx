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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Quote, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Testimonial } from "../../backend.d";
import { useActor } from "../../hooks/useActor";
import {
  useAddTestimonial,
  useDeleteTestimonial,
  useUpdateTestimonial,
} from "../../hooks/useQueries";

type FormState = {
  clientName: string;
  location: string;
  rating: string;
  reviewText: string;
  isActive: boolean;
};

const DEFAULT_FORM: FormState = {
  clientName: "",
  location: "",
  rating: "5",
  reviewText: "",
  isActive: true,
};

function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["allTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      // getActiveTestimonials returns all as admin sees all
      return actor.getActiveTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export default function AdminTestimonials() {
  const { data: items = [], isLoading } = useGetAllTestimonials();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const openAdd = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setDialogOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditingItem(item);
    setForm({
      clientName: item.clientName,
      location: item.location,
      rating: item.rating.toString(),
      reviewText: item.reviewText,
      isActive: item.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.clientName.trim() || !form.reviewText.trim()) {
      toast.error("Client name and review are required");
      return;
    }

    const params = {
      clientName: form.clientName,
      location: form.location,
      rating: BigInt(Number.parseInt(form.rating) || 5),
      reviewText: form.reviewText,
      isActive: form.isActive,
    };

    try {
      if (editingItem) {
        await updateTestimonial.mutateAsync({ id: editingItem.id, ...params });
        toast.success("Testimonial updated");
      } else {
        await addTestimonial.mutateAsync(params);
        toast.success("Testimonial added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteTestimonial.mutateAsync(deleteId);
      toast.success("Testimonial deleted");
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-charcoal">
            Testimonials
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {items.length} reviews
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-body font-semibold text-xs tracking-widest uppercase border-0"
          data-ocid="testimonials.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Review
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-20"
          data-ocid="testimonials.loading_state"
        >
          <Loader2 className="h-8 w-8 text-brand-gold animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="testimonials.empty_state"
        >
          <Quote className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p className="font-body text-sm">No testimonials yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id.toString()}
              className="bg-white rounded-sm shadow-card p-5 flex items-start justify-between gap-4"
              data-ocid={`testimonials.item.${idx + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display text-sm font-semibold text-brand-charcoal">
                    {item.clientName}
                  </p>
                  <span
                    className={`font-body text-xs px-1.5 py-0.5 rounded ${item.isActive ? "bg-green-50 text-green-600" : "bg-brand-beige text-muted-foreground"}`}
                  >
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground mb-2">
                  {item.location}
                </p>
                <div className="flex gap-0.5 mb-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Number(item.rating) ? "fill-brand-gold text-brand-gold" : "text-brand-beige"}`}
                    />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 italic">
                  &ldquo;{item.reviewText}&rdquo;
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="p-2 text-muted-foreground hover:text-brand-gold hover:bg-brand-beige/50 rounded transition-colors"
                  data-ocid={`testimonials.edit_button.${idx + 1}`}
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded transition-colors"
                  data-ocid={`testimonials.delete_button.${idx + 1}`}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="testimonials.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Client Name
                </Label>
                <Input
                  placeholder="e.g. Priya Sharma"
                  value={form.clientName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, clientName: e.target.value }))
                  }
                  className="font-body"
                  data-ocid="testimonials.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  Location
                </Label>
                <Input
                  placeholder="e.g. Andheri West"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="font-body"
                  data-ocid="testimonials.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                Rating (1-5)
              </Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, rating: n.toString() }))
                    }
                    className={`p-1 rounded transition-colors ${Number.parseInt(form.rating) >= n ? "text-brand-gold" : "text-brand-beige"}`}
                    data-ocid="testimonials.toggle"
                  >
                    <Star
                      className={`h-5 w-5 ${Number.parseInt(form.rating) >= n ? "fill-brand-gold" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                Review Text
              </Label>
              <Textarea
                placeholder="Client review..."
                value={form.reviewText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reviewText: e.target.value }))
                }
                rows={4}
                className="font-body resize-none"
                data-ocid="testimonials.textarea"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
                data-ocid="testimonials.switch"
              />
              <Label className="font-body text-sm">Show on website</Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="font-body text-xs tracking-wider uppercase"
              data-ocid="testimonials.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addTestimonial.isPending || updateTestimonial.isPending}
              className="bg-brand-charcoal hover:bg-brand-dark text-white font-body text-xs tracking-wider uppercase border-0"
              data-ocid="testimonials.save_button"
            >
              {addTestimonial.isPending || updateTestimonial.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : editingItem ? (
                "Save Changes"
              ) : (
                "Add Review"
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
        <AlertDialogContent data-ocid="testimonials.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Testimonial?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="font-body text-xs"
              data-ocid="testimonials.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteTestimonial.isPending}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-body text-xs"
              data-ocid="testimonials.delete_button"
            >
              {deleteTestimonial.isPending ? (
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
