"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Sparkles, Send, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Deep Cleaning",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
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
            Have a question about our deep cleaning services or need a custom enterprise quote? Reach out to our customer support team.
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
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Phone Hotline</p>
                    <a href="tel:+918089631909" className="text-muted hover:text-primary transition-colors block">
                      +91 80896 31909
                    </a>
                    <a href="tel:+918590570373" className="text-muted hover:text-primary transition-colors block">
                      +91 85905 70373
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Email Inquiry</p>
                    <a href="mailto:info@zolvex.in" className="text-muted hover:text-primary transition-colors">
                      info@zolvex.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Service Locations</p>
                    <p className="text-muted">Trivandrum & Ernakulam, Kerala</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Working Hours</p>
                    <p className="text-muted">Mon - Sun: 8:00 AM - 8:00 PM</p>
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
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-xs">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted text-xs mb-6">Fill out the form below and our customer support supervisor will call you back within 30 minutes.</p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-xs text-muted max-w-md mx-auto">Thank you for reaching out. A Zolvex service specialist will contact you shortly.</p>
                  <Button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", service: "Deep Cleaning", message: "" });
                    }}
                    className="bg-primary text-white hover:bg-primaryHover text-xs font-bold px-6 py-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      <label className="block text-xs font-bold text-foreground mb-1.5">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">Service Interest</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                      >
                        <option value="Deep Cleaning">Full House Deep Cleaning</option>
                        <option value="Kitchen Deep Cleaning">Kitchen Deep Cleaning</option>
                        <option value="Bathroom Cleaning">Bathroom Sanitization</option>
                        <option value="Sofa Upholstery">Sofa & Upholstery</option>
                        <option value="Commercial">Commercial / Office Cleaning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">Message / Special Instructions</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your space size, location, or preferred time..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondaryBg/20 text-foreground focus:border-primary outline-none text-xs font-medium"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white hover:bg-primaryHover font-bold text-xs py-3 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry Message</span>
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
