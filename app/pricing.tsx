"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out the service",
    features: [
      "5 repositories per month",
      "Basic file summaries",
      "README.md generation",
      "7-day data retention",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$19",
    description: "For developers working on multiple projects",
    features: [
      "50 repositories per month",
      "Advanced file summaries",
      "README.md & CONTRIBUTING.md generation",
      ".env.example generation",
      "30-day data retention",
      "Priority support",
    ],
    buttonText: "Subscribe",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    description: "For development teams and organizations",
    features: [
      "Unlimited repositories",
      "Advanced file summaries",
      "All documentation generation",
      "Unlimited data retention",
      "Team collaboration features",
      "API access",
      "Priority support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
  },
];

const Pricing = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that&apos;s right for you or your team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border ${
                tier.popular
                  ? "border-primary bg-secondary/30"
                  : "border-border bg-secondary/20"
              } backdrop-blur-sm overflow-hidden`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">{tier.description}</p>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    asChild
                    variant={tier.buttonVariant}
                    className="w-full"
                  >
                    <Link href="/auth/sign-in">{tier.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
