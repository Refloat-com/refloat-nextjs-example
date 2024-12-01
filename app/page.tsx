'use client';

import { useState, useEffect } from 'react';
import { users } from 'refloat-nextjs-integration/app/mocks/users';
import { plans } from 'refloat-nextjs-integration/app/mocks/plans';
import UserDropdown from 'refloat-nextjs-integration/app/components/UserDropdown';
import PricingPlan from 'refloat-nextjs-integration/app/components/PricingPlan';

declare global {
  export interface TenantRefloatInitOptions {
    readonly stripeCustomerId: string
    readonly stripeSubscriptionId: string
    readonly tenantId: string
    readonly authHash: string
    readonly apiKey: string
    readonly playbookId?: string
    readonly mode?: 'test' | 'live'
  }
  export interface Window {
    refloat?: {
      created?: boolean
      initialized?: boolean
      init?: (options: TenantRefloatInitOptions) => void
    }
  }
}

export default function Home() {
  const REFLOAT_API_KEY = process.env.NEXT_REFLOAT_API_KEY;
  const REFLOAT_TENANT_ID = process.env.NEXT_REFLOAT_TENANT_ID;
  const REFLOAT_SDK_URL = process.env.NEXT_NEXT_REFLOAT_SDK_URL;


  const [activeTestCustomer, setActiveTestCustomer] = useState(users[0]);

  const handleUserChange = (userId: string) => {
    const newUser = users.find(u => u.id === userId);
    if (newUser) setActiveTestCustomer(newUser);
  };

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
        mode: "test", // Or "test". If test mode is used, then no actions will be performed to customer's subscriptions.
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
    a.src = REFLOAT_SDK_URL!;
    a.async = true;
    const b = document.getElementsByTagName('script')[0];
    b.parentNode?.insertBefore(a, b);

    return () => {
      document.body.removeChild(a);
    };
  }, []);

  return (
    <main>
      <UserDropdown activeUser={activeTestCustomer} onUserChange={handleUserChange} />

      <div className="py-6">
        <div className="xl:container m-auto px-6 text-gray-500 md:px-12">
          <h2 className="text-2xl text-gray-600 md:text-4xl">
            A better way to <span className="text-blue-600 font-bold">supercharge</span> all aspects of customer retention
            <br className="lg:block hidden" />
            and <span className="text-blue-600 font-bold">optimize</span> your company's growth
          </h2>
        </div>

        <div className="xl:container m-auto px-6 my-6 md:px-12 lg:px-20">
          <div className="grid items-center gap-6 md:grid-cols-2 lg:flex lg:space-x-8">
            {plans.map(plan => (
              <PricingPlan
                key={plan.id}
                plan={plan}
                isActive={plan.id === activeTestCustomer.plan}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
