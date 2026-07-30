import { Metadata } from "next";
import { ServicesGrid } from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Our Services | ZOLVEX",
  description: "Explore our premium cleaning and home services in Trivandrum and Ernakulam.",
};

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Services
          </h1>
          <p className="text-muted text-lg">
            Professional cleaning and home services tailored to your needs
          </p>
        </div>

        {/* Services Grid (Client Component) */}
        <ServicesGrid />
      </div>
    </div>
  );
}