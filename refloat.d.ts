//  Declare global types for Refloat SDK
export interface TenantRefloatInitOptions {
  readonly stripeCustomerId: string
  readonly stripeSubscriptionId: string
  readonly tenantId: string
  readonly authHash: string
  readonly apiKey: string
  readonly playbookId?: string
  readonly mode?: 'test' | 'live'
}

//  This is required in order to avoid TypeScript errors
//  when using the Refloat SDK in the browser
//  (instead of suppressing the errors with `// @ts-ignore`)
//  in the code that uses the SDK.
//  This is a global declaration file for the Refloat SDK.
declare global {
  interface Window {
    refloat?: {
      created?: boolean
      initialized?: boolean
      init?: (options: TenantRefloatInitOptions) => void
    }
  }
}
