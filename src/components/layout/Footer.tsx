"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondaryBg border-t border-border relative">
      {/* Back to top button */}
<button
  onClick={scrollToTop}
  suppressHydrationWarning
  className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary-hover transition-all duration-300 hover:scale-110"
  aria-label="Back to top"
>
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* ... rest of the footer content ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-primary">ZOLVEX</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Premium home cleaning services with eco-friendly products and professional, vetted technicians.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-muted hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground relative inline-block">
              Legal
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-muted">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>+91 80896 31909</p>
                  <p>+91 85905 70373</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="mailto:info@zolvex.in" className="hover:text-primary transition-colors">
                  info@zolvex.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted text-center md:text-left">
            © {new Date().getFullYear()} ZOLVEX. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}