import { Button } from "@/components/ui/button";
import {
  Clock,
  Loader2,
  Mail,
  MailOpen,
  MessageSquare,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import type { ContactInquiry } from "../../backend.d";
import { useGetAllInquiries, useMarkInquiryRead } from "../../hooks/useQueries";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "Unknown date";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function InquiryCard({
  inquiry,
  index,
  onMarkRead,
  isMarking,
}: {
  inquiry: ContactInquiry;
  index: number;
  onMarkRead: () => void;
  isMarking: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-sm shadow-card p-5 border-l-4 ${
        inquiry.isRead ? "border-brand-beige" : "border-brand-gold"
      }`}
      data-ocid={`inquiries.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-display text-sm font-semibold text-brand-charcoal">
              {inquiry.name}
            </p>
            {!inquiry.isRead && (
              <span className="font-body text-xs bg-brand-gold/15 text-brand-gold px-2 py-0.5 rounded-sm">
                New
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <a
                href={`tel:${inquiry.phone}`}
                className="font-body text-xs hover:text-brand-gold transition-colors"
                data-ocid="inquiries.link"
              >
                {inquiry.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-body text-xs">
                {formatDate(inquiry.timestamp)}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              {inquiry.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0">
          {!inquiry.isRead && (
            <Button
              size="sm"
              variant="outline"
              onClick={onMarkRead}
              disabled={isMarking}
              className="font-body text-xs tracking-wider uppercase h-8 px-3"
              data-ocid={`inquiries.button.${index + 1}`}
            >
              {isMarking ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <MailOpen className="h-3.5 w-3.5 mr-1" />
                  Mark Read
                </>
              )}
            </Button>
          )}
          {inquiry.isRead && (
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <MailOpen className="h-3.5 w-3.5" />
              <span className="font-body text-xs">Read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const { data: inquiries = [], isLoading } = useGetAllInquiries();
  const markRead = useMarkInquiryRead();

  const sorted = [...inquiries].sort((a, b) => {
    // Unread first, then by timestamp desc
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
    return Number(b.timestamp) - Number(a.timestamp);
  });

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  const handleMarkRead = async (id: bigint) => {
    try {
      await markRead.mutateAsync(id);
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-charcoal">
            Contact Inquiries
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {inquiries.length} total
            {unreadCount > 0 && (
              <span className="ml-2 font-body text-xs bg-brand-gold/15 text-brand-gold px-2 py-0.5 rounded-sm">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-20"
          data-ocid="inquiries.loading_state"
        >
          <Loader2 className="h-8 w-8 text-brand-gold animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="inquiries.empty_state"
        >
          <Mail className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p className="font-body text-sm">No inquiries yet.</p>
          <p className="font-body text-xs mt-1 opacity-60">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((inquiry, idx) => (
            <InquiryCard
              key={inquiry.id.toString()}
              inquiry={inquiry}
              index={idx}
              onMarkRead={() => handleMarkRead(inquiry.id)}
              isMarking={markRead.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
