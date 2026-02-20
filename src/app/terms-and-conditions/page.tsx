import { Metadata } from "next";
import { FileText, Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | ZOLVEX",
  description: "Read our terms and conditions for using Zolvex home services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Terms & Conditions
          </h1>
          <p className="text-muted text-sm md:text-base">
            ZOLVEX HOME SERVICES – TERMS & CONDITIONS
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. Services Overview */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              1. Services Overview
            </h2>
            <p className="text-muted leading-relaxed">
              Zolvex Home Services provides residential and commercial services including cleaning, maintenance, repairs, installation, and related home support services. All services are delivered by trained, verified, and professional technicians.
            </p>
          </section>

          {/* 2. Booking & Service Confirmation */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              2. Booking & Service Confirmation
            </h2>
            <ul className="list-disc list-inside text-muted space-y-2">
              <li>Bookings can be made via phone, WhatsApp, website, or authorized platforms.</li>
              <li>A booking is confirmed only after acceptance by Zolvex.</li>
              <li>Service timings are approximate and may change due to traffic, weather, site conditions, or prior job delays.</li>
            </ul>
          </section>

          {/* 3. Pricing & Payments */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              3. Pricing & Payments
            </h2>
            <ul className="list-disc list-inside text-muted space-y-2">
              <li>Service prices depend on the type of service, scope of work, location, and duration.</li>
              <li>Final charges may vary if additional work is requested or if on-site conditions differ from the original booking details.</li>
              <li>Payments can be made via cash, UPI, bank transfer, or other approved digital methods.</li>
              <li>Any advance payment, if collected, is non-refundable once the service has started.</li>
            </ul>
          </section>

          {/* 4. Cancellations & Rescheduling */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              4. Cancellations & Rescheduling
            </h2>
            <ul className="list-disc list-inside text-muted space-y-2">
              <li>Cancellation or rescheduling requests must be made at least 24–48 hours before the scheduled service time.</li>
              <li>Late cancellations may attract a cancellation fee.</li>
              <li>Zolvex reserves the right to reschedule or cancel services due to unavoidable circumstances.</li>
            </ul>
          </section>

          {/* 5. Scope of Work */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              5. Scope of Work
            </h2>
            <ul className="list-disc list-inside text-muted space-y-2">
              <li>Only services agreed upon at the time of booking will be provided.</li>
              <li>Any additional requests will be charged separately.</li>
              <li>Zolvex is not responsible for issues arising from pre-existing damage, poor infrastructure, or prior faulty work.</li>
            </ul>
          </section>

          {/* 6. Materials & Spare Parts */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              6. Materials & Spare Parts
            </h2>
            <ul className="list-disc list-inside text-muted space-y-2">
              <li>Materials or spare parts supplied by Zolvex will be charged separately unless otherwise mentioned.</li>
              <li>Manufacturer warranty applies only to Zolvex-supplied materials.</li>
              <li>No warranty is provided for customer-supplied materials or parts.</li>
            </ul>
          </section>

          {/* 7. Pre-Existing Conditions */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              7. Pre-Existing Conditions
            </h2>
            <p className="text-muted leading-relaxed">
              The customer confirms that Zolvex is not responsible for pre-existing issues such as cracks, paint peel-off, loose fittings, rust, scratches, discoloration, wear and tear, or structural weaknesses.
            </p>
            <p className="text-muted leading-relaxed mt-3">
              Zolvex will take reasonable care during service but is not liable for damages resulting from such conditions.
            </p>
          </section>

          {/* 8. Customer Responsibilities */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              8. Customer Responsibilities
            </h2>
            <p className="text-muted leading-relaxed mb-2">Customers must ensure:</p>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Safe and clear access to the service location</li>
              <li>Availability of water, electricity, and basic facilities</li>
              <li>Children and pets are kept away from the work area</li>
              <li>Accurate service details are shared during booking</li>
              <li>Personal belongings and valuables are secured before service begins</li>
            </ul>
            <p className="text-muted leading-relaxed mt-3">
              Zolvex is not responsible for delays or incomplete work due to lack of access or utilities.
            </p>
          </section>

          {/* 9. Personal Belongings & Valuables */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              9. Personal Belongings & Valuables
            </h2>
            <p className="text-muted leading-relaxed">
              Customers must secure cash, jewellery, documents, electronics, and other valuables before service.
            </p>
            <p className="text-muted leading-relaxed mt-2">
              Zolvex shall not be responsible for loss or misplacement of unsecured personal belongings.
            </p>
          </section>

          {/* 10. Technician Verification & Conduct */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              10. Technician Verification & Conduct
            </h2>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>All Zolvex technicians are background-verified, police-cleared, and professionally trained.</li>
              <li>Technicians are expected to maintain honesty, discipline, hygiene, and professionalism.</li>
              <li>Zolvex follows strict internal safety and conduct policies to ensure customer trust.</li>
            </ul>
          </section>

          {/* 11. Extended or Multi-Day Services */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              11. Extended or Multi-Day Services
            </h2>
            <p className="text-muted leading-relaxed">
              Some services may extend beyond one day due to site conditions or work complexity. Such extensions are considered part of the same service unless otherwise agreed.
            </p>
          </section>

          {/* 12. Service Completion & Acceptance */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              12. Service Completion & Acceptance
            </h2>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Customers are requested to inspect the service upon completion.</li>
              <li>Any concerns must be raised before the service team leaves the premises.</li>
              <li>Complaints raised after team exit may not be entertained.</li>
            </ul>
          </section>

          {/* 13. Damage & Liability */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              13. Damage & Liability
            </h2>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Zolvex takes reasonable care while delivering services.</li>
              <li>Any damage claims must be reported within 24 hours of service completion.</li>
              <li>Liability, if applicable, is limited to the value of the service provided and excludes indirect or consequential losses.</li>
            </ul>
          </section>

          {/* 14. Service Warranty */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              14. Service Warranty
            </h2>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Service warranties, if applicable, will be communicated clearly.</li>
              <li>Warranty becomes void if services are altered, misused, or handled by third parties.</li>
            </ul>
          </section>

          {/* 15. Safety & Right to Refuse Service */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              15. Safety & Right to Refuse Service
            </h2>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Zolvex professionals follow standard safety and hygiene practices.</li>
              <li>Zolvex reserves the right to refuse or stop services in unsafe environments or in cases of abusive, threatening, or inappropriate behavior.</li>
            </ul>
          </section>

          {/* 16. Intellectual Property */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              16. Intellectual Property
            </h2>
            <p className="text-muted leading-relaxed">
              All content, branding, logos, and materials related to Zolvex Home Services are the intellectual property of Zolvex and may not be used without written permission.
            </p>
          </section>

          {/* 17. Authorization */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              17. Authorization
            </h2>
            <p className="text-muted leading-relaxed">
              By booking or availing Zolvex services, the customer confirms that they have read, understood, and agreed to these Terms & Conditions and authorize Zolvex to proceed with the selected service.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Contact Information
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              For any questions regarding these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-muted">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1" />
                <span>Email: info@zolvex.in</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1" />
                <span>Phone: +91 8089631909, +91 8590570373</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-1" />
                <span>Business Hours: Monday to Saturday, 8:00 AM to 8:00 PM</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-xs text-muted border-t border-border pt-6">
          <p>© {new Date().getFullYear()} Zolvex. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}