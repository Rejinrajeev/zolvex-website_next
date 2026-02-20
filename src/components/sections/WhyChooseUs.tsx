import { Users, Sparkles, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Experienced Professionals",
    description:
      "Our team consists of trained, background-checked professionals with years of experience in deep cleaning services.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "We use only eco-friendly, professional-grade cleaning products and equipment to ensure the best results.",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description:
      "We respect your time and ensure our services are completed within the promised timeframe with minimal disruption.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    description:
      "Your satisfaction is our priority. We offer a 100% satisfaction guarantee on all our cleaning services.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            WHY CHOOSE <span className="text-primary">ZOLVEX</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <feature.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}