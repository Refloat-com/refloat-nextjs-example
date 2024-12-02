import { Plan } from 'refloat-nextjs-integration/app/types';

//  NOTE: The following plans are used for testing purposes ONLY
//  and are ment to showcase the Refloat integration in a demo environment.
//  In your production (or staging) environment(s), you should replace these
//  with actual product/plan data from your Stripe account.
//  Usually, you would fetch this data from your database or an external service (such as Stripe).
//  These plans are used to simulate different subscription plans and multiple test cases
//  showing different modal flows (e.g. switching plans, canceling plans, etc.).
//  These plans, users and subscriptions are created in the Stripe "test" mode.
//  They need to exist on your Stripe account, in order for the integration to work.

export const plans: Plan[] = [
  {
    id: 'test_plan_yearly_eur_Mzg2NDAy',
    name: 'Bronze plan',
    price: { int: 99, float: 99 }
  },
  {
    id: 'test_plan_yearly_eur_NWE5Njkz',
    name: 'Silver plan',
    price: { int: 399, float: 99 }
  },
  {
    id: 'test_plan_yearly_eur_YTkyOGJh',
    name: 'Gold plan',
    price: { int: 999, float: 99 }
  }
];
