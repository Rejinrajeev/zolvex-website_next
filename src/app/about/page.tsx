import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Users, Clock, Award, Shield,
  Heart, Target, TrendingUp, Star,
  ChevronRight, CheckCircle2, Sparkles
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | ZOLVEX",
  description: "Learn about Zolvex - your trusted home service partner in Trivandrum and Ernakulam.",
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">WELCOME TO ZOLVEX</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Your Complete Home Service Solution
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                Zolvex Home Service started with a simple belief: every homeowner and business owner deserves reliable, professional, and affordable home services from a single trusted partner. In just 6 months, we've served over 1,000 service requests and earned the trust of 800+ satisfied customers in Trivandrum. Now, we're proudly expanding to Ernakulam to bring the same trusted service to more families and businesses.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button className="bg-primary text-white hover:bg-primaryHover px-6 py-3">
                  Book a Service
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Get Free Quote
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero_img.jpeg"
                alt="Zolvex team with happy customer"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-foreground">✨ 800+ Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Growth Story */}
      <section className="py-16 md:py-24 bg-secondaryBg/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero_img.jpeg"
                alt="Zolvex professional team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                From One Person to a <span className="text-primary">20+ Professional Team</span>
              </h2>
              <p className="text-muted leading-relaxed">
                What started as one person's passion has grown into something bigger. Today, we're a team of 20+ highly trained professionals, and we're still growing. This isn't luck—it's because our customers keep coming back and recommending us. Every team member is carefully selected and thoroughly trained in professional service delivery, safety protocols, and customer care. We're not just building a company; we're building a movement where home services become simple, reliable, and truly affordable.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">20+ Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">Growing Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Expert Cleaning Services for <span className="text-primary">Every Space</span>
              </h2>
              <p className="text-muted leading-relaxed">
                Whether it's your home, office, restaurant, or retail space, we handle it all with expertise. Our services include deep cleaning, general cleaning, and specialized cleaning tailored to your specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Licensed & Certified</h4>
                    <p className="text-sm text-muted">We're licensed for rope access work and trained in advanced cleaning techniques.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Safe & Professional</h4>
                    <p className="text-sm text-muted">We use only safe, eco-friendly chemicals and follow proven procedures that protect your health and family.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Thorough Training</h4>
                    <p className="text-sm text-muted">Every team member undergoes rigorous training in both technical skills and safety standards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Transparent Process</h4>
                    <p className="text-sm text-muted">We're open about what we do, how we do it, and why—no hidden practices.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero_img.jpeg"
                alt="Zolvex team cleaning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-secondaryBg/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Zolvex? <span className="text-primary">Four Promises We Keep</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Punctuality & Professionalism</h3>
              <p className="text-muted text-sm leading-relaxed">
                Your time is valuable. We arrive when scheduled, dress professionally, and treat your space with utmost respect. Reliability isn't a promise—it's our standard.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Honest Pricing, Real Value</h3>
              <p className="text-muted text-sm leading-relaxed">
                Quality shouldn't come with a premium price tag. Our pricing is transparent, fair, and designed to fit your budget. What you see is what you pay—no hidden charges, no surprises.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">We Build Trust, Not Just Business</h3>
              <p className="text-muted text-sm leading-relaxed">
                Trust is everything. We're transparent about our work, our team's qualifications, and our processes. Your satisfaction isn't just our goal—it's our responsibility.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Your Time & Emotions Matter</h3>
              <p className="text-muted text-sm leading-relaxed">
                We understand that inviting someone into your home or business is personal. We respect your space, your privacy, your concerns, and your peace of mind. We're guests in your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Numbers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero_img.jpeg"
                alt="Happy Zolvex customers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Trusted by Over <span className="text-primary">800+ Customers</span>
              </h2>
              <p className="text-muted leading-relaxed">
                In just 6 months, here's what we've achieved together. These numbers aren't just statistics—they're real families and businesses who trusted us. That's what drives us.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">1,000+</div>
                  <p className="text-sm text-muted">Services Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">800+</div>
                  <p className="text-sm text-muted">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <p className="text-sm text-muted">Team Members</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <p className="text-sm text-muted">Satisfaction Rate</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>Licensed & Certified for specialized services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            One Platform. <span className="text-primary">All Your Home Service Needs.</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mb-8">
            Right now, we're delivering the best cleaning services across Trivandrum and Ernakulam. But we're thinking bigger. Coming soon, we're adding plumbing, electrical work, and other essential home services to our platform.
          </p>
          <p className="text-muted max-w-2xl mx-auto mb-10">
            Our vision? A single call for any home service need. No more juggling multiple vendors or hoping you've found the right person. One trusted partner. One quality standard. One promise kept every single time.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-primary text-white hover:bg-primaryHover px-8 py-3">
              Join the Movement
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Whether you need a deep clean today or are planning ahead, Zolvex is here to serve you in Trivandrum and Ernakulam. Let's start building that trust.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/booking">
              <Button className="bg-primary text-white hover:bg-primaryHover px-8 py-3 text-lg">
                Book a Service
              </Button>
            </Link>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg">
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}