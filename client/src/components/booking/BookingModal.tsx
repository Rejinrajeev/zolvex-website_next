"use client";

import { BookingFlowModal } from "./BookingFlowModal";

export function BookingModal({ isOpen, onClose, service }: any) {
  if (!service) return null;

  const adaptedService = {
    id: service._id || service.id || "srv-001",
    name: service.name,
    slug: service.slug || "service",
    description: service.description || "",
    base_price: service.basePrice || service.price || 1999,
    variations: service.variations || [],
    inclusions: service.inclusions || []
  };

  return (
    <BookingFlowModal
      isOpen={isOpen}
      onClose={onClose}
      service={adaptedService as any}
    />
  );
}