"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
  icon: any;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <service.icon className="w-6 h-6 text-primary" />
            Book {service.name}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-6">
          <p className="text-muted mb-4">{service.description}</p>
          
          <div className="bg-secondaryBg/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Service Price</span>
              <span className="text-2xl font-bold text-primary">{service.price}</span>
            </div>
          </div>

          {/* Add your booking form here */}
          <div className="space-y-4">
            <p className="text-center text-muted text-sm">
              Booking form will be implemented here.
            </p>
            <Button className="w-full bg-primary text-white hover:bg-primaryHover">
              Continue to Book
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}