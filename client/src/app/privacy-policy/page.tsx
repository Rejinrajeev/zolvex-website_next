import { Metadata } from "next";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ZOLVEX",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted text-sm md:text-base">
            Effective Date: January 1, 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. Introduction */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              1. Introduction
            </h2>
            <p className="text-muted leading-relaxed">
              Welcome to Zolvex. Zolvex (“we”, “our”, “us”) respects your privacy and is committed to protecting the personal information of users who visit our website and use our home services.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website or services, in accordance with applicable laws in India, including the Information Technology Act, 2000.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">a. Personal Information</h3>
                <p className="text-muted leading-relaxed">
                  When you use our website or services, we may collect:
                </p>
                <ul className="list-disc list-inside text-muted mt-2 space-y-1">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Home or service address</li>
                  <li>Service request details</li>
                  <li>Booking information</li>
                  <li>Payment details (processed securely via third-party payment gateways)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">b. Automatically Collected Information</h3>
                <p className="text-muted leading-relaxed">
                  We may automatically collect:
                </p>
                <ul className="list-disc list-inside text-muted mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Cookies and usage data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              3. How We Use Your Information
            </h2>
            <p className="text-muted leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted space-y-1">
              <li>Schedule and deliver home services (cleaning, plumbing, electrical, etc.)</li>
              <li>Respond to enquiries and customer support requests</li>
              <li>Process online bookings and payments</li>
              <li>Send service updates, confirmations, and invoices</li>
              <li>Improve our website, services, and user experience</li>
              <li>Send promotional emails or messages (with opt-out options)</li>
            </ul>
          </section>

          {/* 4. Cookies & Tracking Technologies */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              4. Cookies & Tracking Technologies
            </h2>
            <p className="text-muted leading-relaxed">
              Our website uses cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-muted mt-2 space-y-1">
              <li>Analyze website traffic (Google Analytics)</li>
              <li>Improve marketing performance (Facebook Pixel)</li>
              <li>Enhance user experience</li>
            </ul>
            <p className="text-muted leading-relaxed mt-4">
              You can choose to disable cookies through your browser settings, though some features of the website may not function properly.
            </p>
          </section>

          {/* 5. Sharing of Information */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              5. Sharing of Information
            </h2>
            <p className="text-muted leading-relaxed">
              We may share your information only with:
            </p>
            <ul className="list-disc list-inside text-muted mt-2 space-y-1">
              <li>Authorized employees and service professionals</li>
              <li>Payment gateway providers</li>
              <li>Website hosting and analytics providers</li>
              <li>Legal or regulatory authorities if required by law</li>
            </ul>
            <p className="text-muted leading-relaxed mt-4">
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          {/* 6. Online Payments */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              6. Online Payments
            </h2>
            <p className="text-muted leading-relaxed">
              All online payments are processed through secure third-party payment gateways. Zolvex does not store your credit/debit card or UPI details.
            </p>
          </section>

          {/* 7. Data Security */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              7. Data Security
            </h2>
            <p className="text-muted leading-relaxed">
              We take reasonable and appropriate security measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside text-muted mt-2 space-y-1">
              <li>Secure servers</li>
              <li>Limited access to personal data</li>
              <li>Industry-standard security practices</li>
            </ul>
            <p className="text-muted leading-relaxed mt-4">
              However, no method of online transmission is 100% secure.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              8. Your Rights
            </h2>
            <p className="text-muted leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt out of promotional communications at any time</li>
            </ul>
            <p className="text-muted leading-relaxed mt-4">
              To exercise these rights, contact us using the details below.
            </p>
          </section>

          {/* 9. Third-Party Links */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              9. Third-Party Links
            </h2>
            <p className="text-muted leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              10. Children's Privacy
            </h2>
            <p className="text-muted leading-relaxed">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children.
            </p>
          </section>

          {/* 11. Changes to This Privacy Policy */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* 12. Contact Information */}
          <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              12. Contact Information
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-muted">
              <div className="flex items-start gap-3">
                <span className="font-medium text-foreground min-w-[100px]">Business Name:</span>
                <span>Zolvex</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1" />
                <span>Email: info@zolvex.in</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1" />
                <span>Phone: +91 8089631909, +91 8590570373</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>Location: Kerala, India</span>
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