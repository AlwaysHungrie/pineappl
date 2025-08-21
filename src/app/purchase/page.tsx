"use client";

import Navbar from "@/components/common/navbar";
import { useState } from "react";
import { discountedCostPerMonth, plans } from "@/components/purchase/planCard";
import PlanCard from "@/components/purchase/planCard";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { email } from "../terms-of-use/page";

const faq = [
  {
    question: "What happens after I complete the payment?",
    answer:
      "You'll receive an email with your private access code. You will be asked to enter it once while using the website.",
  },
  {
    question: "What is the difference between the plans?",
    answer:
      "All plans come with the same amazing features! The only difference is how long you'd like to have access. There is NO subscription based plans, only one time payments.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We're unable to offer refunds. Please note that we do not offer any subscription based payment plan that might need to be cancelled.",
  },
  {
    question:
      "What should I do if my access code was accidentally shared with someone else?",
    answer: `Just reach out to our support team at ${email} from your registered email, and we'll help you get a new access code.`,
  },
];

export default function PurchasePage() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-bold tracking-tight text-gray-900 text-4xl sm:text-5xl md:text-6xl">
            An adventure of a
            <span className="block bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              lifetime awaits.
            </span>
          </h1>
          <p className="mx-auto mt-6 text-lg text-gray-600">
            Start your programming journey with Pineappl.
            <br />
            Choose the plan that fits your learning style and goals.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === index}
              onSelect={() => setSelectedPlan(index)}
            />
          ))}
        </div>
      </div>

      {/* Complete Purchase */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trusted by thousands worldwide.
            </h2>
            <p className="text-lg text-gray-600">
              Please enter your email to complete your purchase of ${plans[selectedPlan].durationMonths * discountedCostPerMonth}.
            </p>

            <div className="max-w-md mx-auto text-left flex gap-2 my-12">
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 flex-3"
              />
              <Button className="py-3 flex-1">
                Complete Payment
              </Button>
            </div>

            <div className="mt-8 flex justify-center text-sm text-gray-500 flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure payment.
              </div>

              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant access.
              </div>

              <div className="flex items-center gap-1">
                By completing your purchase, you agree to our
                <Link
                  target="_blank"
                  href="/terms-of-use"
                  className="text-primary"
                >
                  Terms of Service.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faq.map(({ question, answer }) => (
              <div key={question} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {question}
                </h3>
                <p className="text-gray-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
