"use client"

import { useState, useEffect } from "react"
import { users } from "refloat-nextjs-integration/app/mocks/users"
import { plans } from "refloat-nextjs-integration/app/mocks/plans"
import { UserSelector } from "refloat-nextjs-integration/app/components/UserSelector"
import { PricingCard } from "refloat-nextjs-integration/app/components/PricingCard"
import { ThemeToggle } from "refloat-nextjs-integration/app/components/ThemeToggle"

export default function Home() {
  const REFLOAT_API_KEY = process.env.NEXT_REFLOAT_API_KEY;
  const REFLOAT_TENANT_ID = process.env.NEXT_REFLOAT_TENANT_ID;

  const [activeTestCustomer, setActiveTestCustomer] = useState(users[0])

  const handleUserChange = (userId: string) => {
    const newUser = users.find(u => u.id === userId)
    if (newUser) setActiveTestCustomer(newUser)
  }

  const handleCancel = async () => {
    try {
      const response = await fetch('/api/hmac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeTestCustomer.id
        })
      });

      const { hmac } = await response.json();

      window.refloat?.init && window.refloat.init({
        tenantId: REFLOAT_TENANT_ID!, // Your Refloat Tenant ID
        apiKey: REFLOAT_API_KEY!, // Your Refloat API Key
        mode: "test", // If test mode is used, then no actions will be performed to customer's subscriptions (useful for testing the integration, without affecting customer's subscription data).
        stripeCustomerId: activeTestCustomer.id, // Replace value with actual Stripe Customer ID
        stripeSubscriptionId: activeTestCustomer.subscriptionId || "", // Optional, otherwise omit. If customers may have multiple subscriptions, use this parameter to choose which subscription to launch the flow for
        authHash: hmac, // Replace value with calculated HMAC hash
      })
    } catch (error) {
      console.error('Failed to initialize Refloat:', error);
    }
  };

  useEffect(() => {
    const a = document.createElement('script');
    a.src = 'https://staging-sdk.onrender.com/snippet.js';
    a.async = true;
    const b = document.getElementsByTagName('script')[0];
    b.parentNode?.insertBefore(a, b);

    return () => {
      document.body.removeChild(a);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <nav className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">ACME Corp. (Refloat Integration Demo)</h2>
            </div>
            <div className="flex items-center space-x-4">
              <UserSelector testCustomers={users} activeTestCustomer={activeTestCustomer} onCustomerChange={handleUserChange} />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="container py-16">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
            Supercharge Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Customer Retention
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Optimize your company's growth with our comprehensive solutions for managing and improving customer retention rates.
          </p>
        </div>

        <div className="w-full grid gap-8 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isActive={plan.id === activeTestCustomer.plan}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
