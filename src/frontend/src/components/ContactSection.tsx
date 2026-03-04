import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ExternalLink,
  Instagram,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useQueries";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await submitInquiry.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try WhatsApp instead.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-brand-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="font-body text-xs text-brand-gold tracking-[0.25em] uppercase">
              Contact
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-charcoal">
            Get In{" "}
            <span className="italic font-normal text-brand-gold">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-2">
                Start a Conversation
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Whether you have a project in mind or simply want to explore
                possibilities, we'd love to hear from you. Reach out and let's
                create something exceptional together.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-5">
              <a
                href="https://wa.me/918286885154"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                data-ocid="contact.link"
              >
                <div className="w-11 h-11 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <p className="font-body text-sm font-medium text-brand-charcoal group-hover:text-brand-gold transition-colors">
                    082868 85154
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-brand-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Address
                  </p>
                  <p className="font-body text-sm font-medium text-brand-charcoal">
                    Jogeshwari West, Mumbai, Maharashtra
                  </p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/charoliaarchitects"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                data-ocid="contact.link"
              >
                <div className="w-11 h-11 bg-pink-50 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-pink-100 transition-colors">
                  <Instagram className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Instagram
                  </p>
                  <p className="font-body text-sm font-medium text-brand-charcoal group-hover:text-pink-500 transition-colors">
                    @charoliaarchitects
                  </p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/qNVHDgqDke5vxrPm9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                data-ocid="contact.link"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Google Maps
                  </p>
                  <p className="font-body text-sm font-medium text-brand-charcoal group-hover:text-blue-500 transition-colors">
                    View our location
                  </p>
                </div>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918286885154"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.primary_button"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#1DAA55] text-white font-body font-semibold tracking-widest uppercase border-0 h-12">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 gap-4"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-brand-charcoal">
                  Message Received!
                </h3>
                <p className="font-body text-sm text-muted-foreground max-w-xs">
                  Thank you for reaching out. We'll get back to you shortly. You
                  can also contact us directly on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-body text-xs text-brand-gold hover:underline mt-4"
                  data-ocid="contact.secondary_button"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-6">
                  Send Us a Message
                </h3>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Aditya Kumar"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="font-body border-brand-beige focus:border-brand-gold bg-white h-11"
                    data-ocid="contact.input"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="font-body border-brand-beige focus:border-brand-gold bg-white h-11"
                    data-ocid="contact.input"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    rows={5}
                    className="font-body border-brand-beige focus:border-brand-gold bg-white resize-none"
                    data-ocid="contact.textarea"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="w-full bg-brand-charcoal hover:bg-brand-dark text-white font-body font-semibold tracking-widest uppercase border-0 h-12"
                  data-ocid="contact.submit_button"
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
