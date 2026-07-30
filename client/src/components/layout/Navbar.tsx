"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold text-primary">ZOLVEX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition">
              Home
            </Link>
            <Link href="/about" className="text-muted hover:text-primary font-medium transition">
              About Us
            </Link>
            <Link href="/services" className="text-muted hover:text-primary font-medium transition">
              Services
            </Link>
            <Link href="/track" className="text-muted hover:text-primary font-medium transition">
              Track Booking
            </Link>
            <Link href="/faq" className="text-muted hover:text-primary font-medium transition">
              FAQ
            </Link>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:+918089631909" 
              className="flex items-center text-muted hover:text-primary font-medium"
            >
              <Phone className="w-4 h-4 mr-2 fill-current" />
              +91 80896 31909
            </a>
            <Button className="bg-primary text-white hover:bg-[#D4AF37] px-6 py-2 text-base font-semibold">
              Book a Service
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-muted hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-muted hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/track" 
                className="text-muted hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Booking
              </Link>
              <Link 
                href="/faq" 
                className="text-muted hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 border-t border-border">
                <a 
                  href="tel:+918089631909" 
                  className="flex items-center text-muted hover:text-primary font-medium py-2"
                >
                  <Phone className="w-4 h-4 mr-2 fill-current" />
                  +91 80896 31909
                </a>
                <Button className="w-full bg-primary text-white hover:bg-[#D4AF37] mt-4">
                  Book a Service
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}