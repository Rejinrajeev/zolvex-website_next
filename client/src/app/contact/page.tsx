"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Sparkles, Send, CheckCircle2, Clock, Star, MessageSquarePlus, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "testimonial">("contact");

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    service: "Deep Cleaning",
    message: ""
  });

  // Testimonial Form State
  const [reviewData, setReviewData] = useState({
    customerName: "",
    customerLocation: "Trivandrum",
    email: "",
    rating: 5,
    comment: "",
    serviceName: "Full Home Deep Cleaning"
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg(json.message || "Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", service: "Deep Cleaning", message: "" });
      } else {
        throw new Error(json.message || "Failed to send message");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while sending your message.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/v1/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg("Thank you! Your review has been submitted and is currently pending moderation.");
        setReviewData({
          customerName: "",
          customerLocation: "Trivandrum",
          email: "",
          rating: 5,
          comment: "",
          serviceName: "Full Home Deep Cleaning"
        });
      } else {
        throw new Error(json.message || "Failed to submit review");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while submitting your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground transition-colors duration-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-12 md:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>WE'RE HERE TO HELP</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Get in Touch with <span className="text-primary">Zolvex</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto">
            Have a question about our deep cleaning packages, need an enterprise quote, or want to share feedback? Reach out today.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <main className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Details Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">Contact Information</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Phone Hotline</p>
                    <a href="tel:+918089631909" className="text-muted hover:text-primary transition-colors block font-mono text-xs">
                      +91 80896 31909
                    </a>
                    <a href="tel:+918590570373" className="text-muted hover:text-primary transition-colors block font-mono text-xs">
                      +91 85905 70373
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Email Inquiry</p>
                    <a href="mailto:info@zolvex.in" className="text-muted hover:text-primary transition-colors text-xs font-mono">
                      info@zolvex.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Service Locations</p>
                    <p className="text-muted text-xs">Trivandrum & Ernakulam, Kerala</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Working Hours</p>
                    <p className="text-muted text-xs">Mon - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Link href="/services">
                  <Button className="w-full bg-primary text-white hover:bg-primaryHover font-bold text-xs py-3 shadow-xs">
                    Explore Services & Instant Quotes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Form Mode Selector */}
            <div className="flex space-x-3 border-b border-border pb-3">
              <button
                onClick={() => {
                  setActiveTab("contact");
                  setSuccessMsg("");
                  setErrorMsg("");
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === "contact"
                    ? "bg-primary text-white shadow-md"
                    : "bg-card text-muted border border-border hover:border-primary"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Send Contact Inquiry</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("testimonial");
                  setSuccessMsg("");
                  setErrorMsg("");
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === "testimonial"
                    ? "bg-primary text-white shadow-md"
                    : "bg-card text-muted border border-border hover:border-primary"
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Submit Customer Review</span>
              </button>
            </div>

            {/* Notifications */}
            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-xs">
              {activeTab === "contact" ? (
                /* Contact Form */
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">Send Us a Message</h2>
                  <p className="text-muted text-xs mb-4">Fill out the form below and our supervisor will call you back within 30 minutes.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Mobile Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Service Category</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      >
                        <option value="Deep Cleaning">Full House Deep Cleaning</option>
                        <option value="Kitchen Deep Cleaning">Kitchen Deep Cleaning</option>
                        <option value="Bathroom Cleaning">Bathroom Sanitization</option>
                        <option value="Sofa Upholstery">Sofa & Upholstery</option>
                        <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                        <option value="Commercial">Commercial / Office Cleaning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">Message / Special Instructions *</label>
                    <textarea
                      rows={4}
                      required
                      minLength={10}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your space size, location, or preferred cleaning time..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white hover:bg-primaryHover font-bold text-xs py-3.5 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry Message</span>
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                /* Testimonial Submission Form */
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">Submit Customer Review</h2>
                  <p className="text-muted text-xs mb-4">Share your experience with Zolvex Deep Clean. Your review will be submitted for moderation.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewData.customerName}
                        onChange={(e) => setReviewData({ ...reviewData, customerName: e.target.value })}
                        placeholder="Dr. Lakshmi Nair"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Location (City / District)</label>
                      <input
                        type="text"
                        value={reviewData.customerLocation}
                        onChange={(e) => setReviewData({ ...reviewData, customerLocation: e.target.value })}
                        placeholder="Trivandrum"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Service Received</label>
                      <select
                        value={reviewData.serviceName}
                        onChange={(e) => setReviewData({ ...reviewData, serviceName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      >
                        <option value="Full Home Deep Cleaning">Full Home Deep Cleaning</option>
                        <option value="Kitchen Deep Cleaning">Kitchen Deep Cleaning</option>
                        <option value="Bathroom Sanitization">Bathroom Sanitization</option>
                        <option value="Sofa & Upholstery Cleaning">Sofa & Upholstery Cleaning</option>
                        <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Rating (1 to 5 Stars)</label>
                      <div className="flex items-center space-x-2 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                            className="p-1 text-amber-500 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-6 h-6 ${star <= reviewData.rating ? "fill-amber-500" : "text-border"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">Your Testimonial Review *</label>
                    <textarea
                      rows={4}
                      required
                      minLength={10}
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      placeholder="Write about our team's punctuality, cleaning quality, and professionalism..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white hover:bg-primaryHover font-bold text-xs py-3.5 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Star className="w-4 h-4" />
                        <span>Submit Review for Moderation</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
