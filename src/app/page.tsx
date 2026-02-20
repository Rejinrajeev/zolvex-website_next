import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle2, Sparkles, Shield, Clock } from "lucide-react";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: 'Zolvex - Professional Home Cleaning Services in Trivandrum & Ernakulam',
  description: 'Expert deep cleaning for homes and offices. Eco-friendly, reliable, and affordable. Book your free quote today!',
};

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Tagline */}
              <div className="inline-flex items-center space-x-2 bg-secondary/20 text-primary px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">READY TO REVIVE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                READY TO REVITALIZE
                <br />
                <span className="text-primary">YOUR SPACE?</span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-muted max-w-lg">
                Expert Deep Cleaning Services Tailored to Your Needs.
                <span className="block mt-2 text-base lg:text-lg">
                  Experience the transformation with Zolvex professional cleaning solutions.
                </span>
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  className="bg-primary text-white hover:bg-primaryHover px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get a Free Quote
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">Vetted Professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">100% Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">Flexible Scheduling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">Eco-Friendly</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
   <Image
    src="/images/hero_img.jpg"  // your actual image path
    alt="Professional cleaning service"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
    priority
  />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Decorative Badges */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-foreground">✨ Premium Service</p>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-primary/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-white">⭐ 5 Star Rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-secondaryBg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseUs />
    </div>
  );
}