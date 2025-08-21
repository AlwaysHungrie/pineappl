import { Button } from "../ui/button";
import { Check, Crown, Star, Zap } from "lucide-react";

const costPerMonth = 10;
export const discountedCostPerMonth = 5;

const formatMonths = (months: number) => {
  if (months === 1) {
    return `1 month`;
  }
  if (months < 12) {
    return `${months} months`;
  }
  if (months === 12) {
    return `1 year`;
  }
  return `${months / 12} years`;
};

const features = [
  "Full access to all exercises",
  "Full access to new features and updates",
  "Mobile friendly learning",
  "Request new exercises",
  "Email support",
];

export const plans: Plan[] = [
  {
    name: "Just Browsing",
    description: "Perfect for dipping your toes into programming",
    durationMonths: 3,
    icon: Zap,
    popular: false,
  },
  {
    name: "Deligient Learner",
    durationMonths: 12,
    description: "For those committed to mastering programming",
    icon: Star,
    popular: true,
  },
  {
    name: "Lifetime Member",
    durationMonths: 12 * 3,
    description: "Unlimited access to all current and future content",
    icon: Crown,
    popular: false,
  },
];

export interface Plan {
  name: string;
  description: string;
  durationMonths: number;
  icon: React.ElementType;
  popular: boolean;
}

export default function PlanCard({
  plan,
  isSelected,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`cursor-pointer relative rounded-2xl p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "bg-primary text-white ring-2 ring-primary shadow-primary/20"
          : "bg-white"
      }`}
      onClick={onSelect}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
            <Star className="mr-1 h-4 w-4" />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="text-center">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isSelected
              ? "bg-white/20"
              : "bg-gradient-to-br from-primary/10 to-yellow-500/10"
          }`}
        >
          <plan.icon
            className={`h-8 w-8 ${isSelected ? "text-white" : "text-primary"}`}
          />
        </div>
        <h3
          className={`text-xl font-bold ${
            isSelected ? "text-white" : "text-gray-900"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-2 text-sm ${
            isSelected ? "text-white/80" : "text-gray-600"
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="mt-8 text-center">
        <div className="flex items-baseline justify-center">
          <span
            className={`text-4xl font-bold ${
              isSelected ? "text-white" : "text-gray-900"
            }`}
          >
            {`$${discountedCostPerMonth * plan.durationMonths}`}
          </span>
          <span
            className={`ml-2 text-lg ${
              isSelected ? "text-white/80" : "text-gray-600"
            }`}
          >
            / {formatMonths(plan.durationMonths)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <span
            className={`text-sm line-through ${
              isSelected ? "text-white/60" : "text-gray-500"
            }`}
          >
            {`$${costPerMonth * plan.durationMonths}`}
          </span>
          <span
            className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${
              isSelected
                ? "bg-white/20 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {`Save $${
              (costPerMonth - discountedCostPerMonth) * plan.durationMonths
            }`}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-4">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start">
            <Check
              className={`mr-3 h-5 w-5 flex-shrink-0 mt-0.5 ${
                isSelected ? "text-white" : "text-green-500"
              }`}
            />
            <span
              className={`text-sm ${
                isSelected ? "text-white/90" : "text-gray-700"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-8">
        <Button
          className={`w-full ${
            isSelected
              ? "bg-white text-primary hover:bg-white/90"
              : plan.popular
              ? "bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-500/90"
              : ""
          }`}
          size="lg"
          onClick={onSelect}
        >
          {isSelected ? "Selected" : "Choose Plan"}
        </Button>
      </div>
    </div>
  );
}
