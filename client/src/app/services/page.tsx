import { Metadata } from "next";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Sparkles, ShieldCheck, Clock, Award, CheckCircle2, PhoneCall, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Trivandrum & Ernakulam | ZOLVEX",
  description: "Explore our premium home and commercial deep cleaning services. Book online instantly with transparent pricing and 100% satisfaction guarantee.",
};

const benefits = [
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Disinfection",
    description: "Eco-friendly non-toxic solutions and industrial UV-C / steam sanitization equipment."
  },
  {
    icon: Award,
    title: "100% Vetted Technicians",
    description: "Rigorous background checks, intensive training, and insured service specialists."
  },
  {
    icon: Clock,
    title: "Transparent & Fixed Pricing",
    description: "Instant price calculation before booking. Zero hidden fees or surprise surcharges."
  },
  {
    icon: Sparkles,
    title: "24-Hour Re-Clean Guarantee",
    description: "If you are not 100% satisfied with our service, we re-clean your space free of charge."
  }
];

const steps = [
  {
    number: "01",
    title: "Select Service & Custom Add-ons",
    description: "Choose deep cleaning, sofa upholstery, kitchen, or bathroom service and customize variations."
  },
  {
    number: "02",
    title: "Pick Preferred Slot",
    description: "Select your preferred date and time slot for Trivandrum or Ernakulam locations."
  },
  {
    number: "03",
    title: "Professional Deep Clean",
    description: "Our uniformed team arrives with industrial equipment and completes the service."
  },
  {
    number: "04",
    title: "Inspect & Enjoy",
    description: "Review the results with our team supervisor and enjoy your pristine, germ-free space."
  }
];

const faqs = [
  {
    q: "What is included in a Zolvex Deep Clean package?",
    a: "Our deep cleaning includes complete dusting, degreasing, high-pressure steam sanitization of surfaces, floor scrubbing, window pane cleaning, bathroom descaling, and eco-friendly disinfection."
  },
  {
    q: "Do I need to supply cleaning equipment or chemicals?",
    a: "No! Our professional technicians arrive fully equipped with heavy-duty vacuum cleaners, steam machines, single-disc scrubbers, micro-fiber cloths, and hospital-grade non-toxic cleaning agents."
  },
  {
    q: "How is the pricing determined for each service?",
    a: "Pricing is calculated based on your selected service tier, room count, square footage variation, and any optional add-ons. The total price is transparently shown before booking."
  },
  {
    q: "Can I reschedule or cancel my booking?",
    a: "Yes, free rescheduling or cancellation is available up to 4 hours before your scheduled appointment time through our support hotline."
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-12 md:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>CERTIFIED HYGIENE CATALOG</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4 leading-tight">
            Our Premium <span className="text-primary">Cleaning Services</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Professional deep cleaning solutions engineered for homes, apartments, villas, and commercial offices across Trivandrum and Ernakulam.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Trivandrum & Ernakulam
            </span>
            <span className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Instant Dynamic Pricing
            </span>
            <span className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              100% Satisfaction Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog & Services Grid */}
      <main className="container mx-auto px-4 lg:px-8 py-10 md:py-14">
        <ServicesGrid />
      </main>

      {/* Why Choose Zolvex Section */}
      <section className="bg-secondaryBg/40 py-12 md:py-16 border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Choose <span className="text-primary">Zolvex Deep Clean</span>?
            </h2>
            <p className="text-muted text-sm md:text-base">
              We deliver industrial-strength cleaning precision backed by uncompromised customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-card p-6 rounded-2xl border border-border/60 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              How Simple Booking Works
            </h2>
            <p className="text-muted text-sm md:text-base">
              Book your professional cleaning in under 2 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="relative bg-card p-6 rounded-2xl border border-border/60 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-primary/30 mb-2 block">{s.number}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-secondaryBg/30 py-12 md:py-16 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>GOT QUESTIONS?</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details 
                key={idx} 
                className="group bg-card rounded-2xl border border-border/70 p-5 cursor-pointer transition-all duration-200 [&[open]]:shadow-md"
              >
                <summary className="text-sm font-bold text-foreground list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-primary font-bold transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="text-xs text-muted mt-3 leading-relaxed border-t border-border/30 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Need a Custom Commercial or Building Cleaning Package?
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto">
            Our team specializes in customized cleaning solutions for corporate offices, commercial showrooms, and post-construction projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="tel:+918089631909">
              <Button className="bg-primary text-white hover:bg-primaryHover text-sm font-bold px-6 py-3 h-auto shadow-lg flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Call +91 80896 31909
              </Button>
            </a>
            <Link href="/services">
              <Button variant="outline" className="border-white/30 text-white hover:bg-card/10 text-sm font-bold px-6 py-3 h-auto">
                Explore All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}