"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Sparkles, Clock, Star } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { CdnImage } from "@/components/ui/CdnImage";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  base_price: number | null;
  image?: string;
  rating?: number;
  reviews?: number;
  variations?: Array<{ id: string; name: string; price: number }>;
  inclusions?: Array<{ id: string; description: string }>;
}

export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/v1/services");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const mapped = data.data.map((s: any) => ({
            id: s._id || s.id,
            name: s.name,
            slug: s.slug,
            description: s.description,
            category: s.category,
            base_price: s.basePrice || s.base_price,
            image: s.image,
            rating: s.rating,
            reviews: s.reviews,
            variations: (s.variations || []).map((v: any) => ({ id: v._id || v.id, name: v.name, price: v.price })),
            inclusions: (s.inclusions || []).map((i: any) => ({ id: i._id || i.id, description: i.description }))
          }));
          setServices(mapped);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch services from Express API:", e);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const handleOpenBooking = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
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
            Choose from our range of specialized deep cleaning services tailored to your space
          </p>
        </div>

        {/* Carousel / grid area */}
        <div className="relative">
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-card rounded-full p-3 shadow-lg hover:shadow-xl border border-border hover:border-primary transition-all"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-5 h-5 text-foreground hover:text-primary" />
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-card rounded-full p-3 shadow-lg hover:shadow-xl border border-border hover:border-primary transition-all"
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
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="flex-none w-full sm:w-[350px] bg-card rounded-2xl h-[420px] animate-pulse border border-border" />
              ))
            ) : (
              services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleOpenBooking(service)}
                  className="flex-none w-full sm:w-[350px] snap-center group cursor-pointer"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/40 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    
                    {/* Image area using CdnImage */}
                    <div className="relative h-56 overflow-hidden bg-secondaryBg">
                      <CdnImage
                        src={service.image || `/images/work_img_${(index % 8) + 1}.jpeg`}
                        alt={service.name}
                        fill
                        className="group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 350px"
                      />
                      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg z-10">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold">{service.rating || 4.9}</span>
                        <span className="text-xs text-muted">({service.reviews || 120})</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs flex items-center gap-1 z-10">
                        <Clock className="w-3 h-3" />
                        <span>3-5 hours</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{service.name}</h3>
                          <div className="text-right">
                            <span className="text-[10px] text-muted block">Starting at</span>
                            <p className="text-xl font-extrabold text-primary">₹{(service.base_price || 2999).toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-muted text-sm mb-4 line-clamp-2">{service.description}</p>

                        {/* Feature bullets */}
                        {service.inclusions && (
                          <div className="space-y-1.5 mb-6">
                            {service.inclusions.slice(0, 3).map((inc, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-muted">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="line-clamp-1">{inc.description}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-primary text-white hover:bg-primaryHover font-bold py-3 transition-all duration-300 shadow-md">
                        Book Now
                      </Button>
                    </div>

                    {index === 0 && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg tracking-wider uppercase z-10">
                        <Sparkles className="w-3 h-3" />
                        MOST POPULAR
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
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

      <BookingFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}