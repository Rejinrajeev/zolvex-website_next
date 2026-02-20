"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Droplets, 
  Sofa, 
  Bath, 
  Wind, 
  Brush, 
  Hammer, 
  Wrench,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking/BookingModal";

// Service data with icons and images
const services = [
  {
    id: 1,
    name: "Deep Cleaning",
    description: "Complete home deep cleaning for a spotless, healthy living space.",
    icon: Sparkles,
    image: "/images/services/deep-cleaning.jpg",
    price: "₹2,999",
    duration: "3-4 hrs",
    popular: true,
    category: "cleaning"
  },
  {
    id: 2,
    name: "Water Tank Cleaning",
    description: "Safe and thorough cleaning of your water storage tanks.",
    icon: Droplets,
    image: "/images/services/water-tank.jpg",
    price: "₹1,499",
    duration: "1-2 hrs",
    popular: false,
    category: "cleaning"
  },
  {
    id: 3,
    name: "Sofa Cleaning",
    description: "Deep cleaning for all types of sofas – fabric, leather, and more.",
    icon: Sofa,
    image: "/images/services/sofa-cleaning.jpg",
    price: "₹1,999",
    duration: "2-3 hrs",
    popular: true,
    category: "cleaning"
  },
  {
    id: 4,
    name: "Bathroom Cleaning",
    description: "Sanitization and deep cleaning of bathrooms and toilets.",
    icon: Bath,
    image: "/images/services/bathroom.jpg",
    price: "₹1,299",
    duration: "1-2 hrs",
    popular: false,
    category: "cleaning"
  },
  {
    id: 5,
    name: "AC Service & Repair",
    description: "Comprehensive AC maintenance, gas refill, and repair services.",
    icon: Wind,
    image: "/images/services/ac-service.jpg",
    price: "₹499",
    duration: "1 hr",
    popular: true,
    category: "repair"
  },
  {
    id: 6,
    name: "Kitchen Cleaning",
    description: "Degreasing and deep cleaning of kitchen surfaces and appliances.",
    icon: Brush,
    image: "/images/services/kitchen.jpg",
    price: "₹1,799",
    duration: "2-3 hrs",
    popular: false,
    category: "cleaning"
  },
  {
    id: 7,
    name: "Carpentry Services",
    description: "Expert carpentry for furniture repair, installation, and more.",
    icon: Hammer,
    image: "/images/services/carpentry.jpg",
    price: "₹399",
    duration: "1 hr",
    popular: false,
    category: "repair"
  },
  {
    id: 8,
    name: "Plumbing Services",
    description: "Professional plumbing repairs, installations, and maintenance.",
    icon: Wrench,
    image: "/images/services/plumbing.jpg",
    price: "₹349",
    duration: "1 hr",
    popular: true,
    category: "repair"
  }
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Services" },
  { id: "cleaning", name: "Cleaning" },
  { id: "repair", name: "Repairs & Maintenance" }
];

export function ServicesGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services by category and search
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle card click
  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Location and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-border mb-8 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Location:</span>
          <span className="text-primary font-semibold">TRIVANDRUM</span>
          <span className="text-xs text-muted bg-secondaryBg px-2 py-1 rounded-full ml-2">+ ERNAKULAM</span>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? "bg-primary text-white shadow-md"
                : "bg-white border border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-secondaryBg">
                {/* Fallback gradient if image doesn't exist */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <service.icon className="w-16 h-16 text-primary/30" />
                </div>
                {/* Uncomment when you have actual images */}
                {/* <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                /> */}
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    POPULAR
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {service.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <service.icon className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                
                <p className="text-sm text-muted mb-3 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted">Starting at</span>
                    <p className="text-xl font-bold text-primary">{service.price}</p>
                  </div>

                  {/* Book Now Button - Desktop Only */}
                  <Button 
                    className="hidden lg:inline-flex bg-primary text-white hover:bg-primaryHover text-sm px-4 py-2 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                  >
                    Book Now
                  </Button>
                </div>

                {/* Mobile indicator that card is clickable */}
                <div className="lg:hidden mt-3 text-xs text-primary flex items-center justify-end gap-1">
                  Tap to book <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <Sparkles className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted">No services found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Most Used Services Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Most Used Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.slice(0, 8).map((service) => (
            <div
              key={`popular-${service.id}`}
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-xl border border-border/50 p-4 text-center hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground">{service.name}</h3>
              <p className="text-xs text-muted mt-1">{service.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Based on your interests section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Based on your interests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((service) => (
            <div
              key={`trend-${service.id}`}
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-xl border border-border/50 p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted mt-1 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-lg font-bold text-primary mt-2">{service.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
}