"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Sparkles, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// Service data – update image paths to match your actual files
const services = [
  {
    id: 1,
    title: "Deep Clean",
    description: "Comprehensive cleaning of every corner, perfect for regular maintenance.",
    price: "₹2,999",
    duration: "3-4 hours",
    image: "/images/work_img_1.jpeg", 
    rating: 4.9,
    reviews: 128,
    features: ["Kitchen deep clean", "Bathroom sanitization", "Floor scrubbing"]
  },
  {
    id: 2,
    title: "Move In/Out",
    description: "Complete cleaning for moving spaces, ensuring a fresh start.",
    price: "₹3,999",
    duration: "4-5 hours",
    image: "/images/work_img_2.jpeg",       // Place your image here
    rating: 4.8,
    reviews: 96,
    features: ["Cabinet cleaning", "Carpet shampoo", "Wall spot cleaning"]
  },
  {
    id: 3,
    title: "Post-Construction",
    description: "Remove all construction dust and debris for a spotless finish.",
    price: "₹4,999",
    duration: "5-6 hours",
    image: "/images/work_img_3.jpeg", // Place your image here
    rating: 4.7,
    reviews: 64,
    features: ["Dust removal", "Debris cleanup", "Window cleaning"]
  },
  {
  id: 4,
  title: "Deep Home Cleaning",
  description: "Thorough cleaning of every corner, including hidden spots and hard-to-reach areas.",
  price: "₹3,999",
  duration: "4-5 hours",
  image: "/images/work_img_4.jpeg", // Place your image here
  rating: 4.8,
  reviews: 112,
  features: ["Kitchen scrubbing", "Bathroom sanitization", "Furniture dusting"]
},
{
  id: 5,
  title: "Office Cleaning",
  description: "Professional cleaning service to maintain a spotless and productive workspace.",
  price: "₹6,499",
  duration: "6-7 hours",
  image: "/images/work_img_5.jpeg", // Place your image here
  rating: 4.6,
  reviews: 89,
  features: ["Desk sanitization", "Carpet vacuuming", "Glass cleaning"]
},
{
  id: 6,
  title: "Move-In/Move-Out Cleaning",
  description: "Complete cleaning to prepare your home for moving in or handing over.",
  price: "₹5,499",
  duration: "5-6 hours",
  image: "/images/work_img_6.jpeg", // Place your image here
  rating: 4.7,
  reviews: 76,
  features: ["Appliance cleaning", "Floor mopping", "Cabinet sanitization"]
},
{
  id: 7,
  title: "Carpet & Upholstery Cleaning",
  description: "Specialized cleaning for carpets, sofas, and upholstery to restore freshness.",
  price: "₹2,999",
  duration: "3-4 hours",
  image: "/images/work_img_7.jpeg", // Place your image here
  rating: 4.5,
  reviews: 54,
  features: ["Stain removal", "Odor treatment", "Fabric-safe cleaning"]
},
{
  id: 8,
  title: "Window & Glass Cleaning",
  description: "Crystal-clear window and glass cleaning for homes and offices.",
  price: "₹1,999",
  duration: "2-3 hours",
  image: "/images/work_img_8.jpeg", // Place your image here
  rating: 4.6,
  reviews: 47,
  features: ["Streak-free finish", "Frame dusting", "Mirror polishing"]
}
];

export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll left/right on arrow click
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // approximate card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  // Update arrow visibility on scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondaryBg/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">PREMIUM SERVICES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Cleaning <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-muted text-lg">
            Choose from our range of specialized cleaning services tailored to your needs
          </p>
        </div>

        {/* Carousel / grid area */}
        <div className="relative">
          {/* Desktop navigation arrows */}
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl border border-border hover:border-primary transition-all"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-5 h-5 text-foreground hover:text-primary" />
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl border border-border hover:border-primary transition-all"
              aria-label="Next services"
            >
              <ChevronRight className="w-5 h-5 text-foreground hover:text-primary" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory ${
              isMobile ? 'scrollbar-hide' : 'overflow-x-hidden'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="flex-none w-full sm:w-[350px] snap-center group cursor-pointer"
              >
                {/* Service card */}
                <div className="bg-white rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image area */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 350px"
                    />
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{service.rating}</span>
                      <span className="text-xs text-muted">({service.reviews})</span>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                      <div className="text-right">
                        <span className="text-sm text-muted">Starting at</span>
                        <p className="text-2xl font-bold text-primary">{service.price}</p>
                      </div>
                    </div>
                    <p className="text-muted mb-4 line-clamp-2">{service.description}</p>

                    {/* Feature bullets */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Book button */}
                    <Button className="w-full bg-primary text-white hover:bg-primaryHover transition-all duration-300">
                      Book Now
                    </Button>
                  </div>

                  {/* "Most Popular" badge for first service */}
                  {service.id === 1 && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      MOST POPULAR
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all services button */}
        <div className="mt-12 text-center">
          <Link href="/services">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 group"
            >
              View All Services
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

    </section>
  );
}