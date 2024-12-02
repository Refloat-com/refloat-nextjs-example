# Refloat Integration Demo with Next.js

This documentation provides detailed instructions on how to integrate [**Refloat**](https://refloat.com/) into any [**Next.js**](https://nextjs.org/) application using the official Refloat SDK. It serves as a comprehensive guide to help developers seamlessly integrate Refloat, enabling businesses to optimize growth through improved customer retention strategies.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Set Up Environment Variables](#set-up-environment-variables)
  - [Running the Application](#running-the-application)
- [Understanding the Application Structure](#understanding-the-application-structure)
- [Integrating Refloat SDK](#integrating-refloat-sdk)
  - [1. Include the Refloat SDK Script](#1-include-the-refloat-sdk-script)
  - [2. Generate Secure HMAC Hash](#2-generate-secure-hmac-hash)
  - [3. Initialize the Refloat SDK](#3-initialize-the-refloat-sdk)
  - [4. TypeScript Type Definitions](#4-typescript-type-definitions)
- [Authentication and Authorization](#authentication-and-authorization)
- [Testing the Integration](#testing-the-integration)
- [Troubleshooting](#troubleshooting)
- [Additional Information](#additional-information)
  - [Live Mode vs. Test Mode](#live-mode-vs-test-mode)
  - [Subscription ID](#subscription-id)
  - [Security Considerations](#security-considerations)
  - [Handling Dark Mode in Next.js](#handling-dark-mode-in-nextjs)
- [Conclusion](#conclusion)

---

## Introduction

This repository hosts a **Next.js** demo application designed to assist developers in integrating the Refloat SDK into their Next.js projects. The demo application simulates a tenant website integrating with Refloat, providing:

- A practical example of integrating the Refloat SDK within a Next.js application.
- A framework for loading the official Refloat SDK script.
- Guidance on best practices for seamless integration.

By following this guide, developers can leverage Refloat's comprehensive solutions to manage and enhance customer retention effectively.

---

## Prerequisites

Before proceeding, ensure that you have the following installed on your development machine:

- **Node.js:** Version **LTS (v20)** or above.
- **npm:** The Node.js package manager.

---

## Getting Started

This section outlines the steps to set up the development environment, install dependencies and run the demo application locally using your Refloat account details.

### Clone the Repository

Begin by cloning the repository to your local machine:

```bash
git clone https://github.com/Refloat-com/refloat-nextjs-example.git
cd refloat-nextjs-example
```

### Install Dependencies

Install the necessary dependencies using `npm ci`:

```bash
npm ci
```

**Note:** `npm ci` installs dependencies based on the `package-lock.json` file and ensures a clean installation by removing the existing `node_modules` folder.

### Set Up Environment Variables

Create a `.env` file in the root directory and populate it with the required environment variables. Use the `.env.template` file as a reference:

```bash
cp .env.template .env
```

Update the `.env` file with your Refloat account details:

```env
NEXT_REFLOAT_SDK_URL=https://assets.refloat.com/snippet.js
NEXT_REFLOAT_API_KEY=your_refloat_api_key
NEXT_REFLOAT_TENANT_ID=your_refloat_tenant_id
REFLOAT_CLIENT_SECRET=your_refloat_secret_key
```

**Important:** Ensure that all sensitive information is securely managed and **not** committed to version control.

### Running the Application

Start the application in development mode:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## Understanding the Application Structure

The source code of the demo application is organized within the `app` directory for modularity and ease of development:

```
refloat-nextjs-example/
├── app/
│   ├── api/
│   │   └── hmac.route.ts
│   ├── components/
│   ├── mocks/
│   ├── utils/
│   └── page.tsx
├── .env.template
├── package.json
├── tsconfig.json
└── next.config.js
```

- **app/**: Contains the main application code.
  - **api/**: API routes for server-side functionality (e.g., securely generating HMAC hash, using Stripe user ID and Refloat client secret).
  - **components/**: Reusable UI components.
  - **mocks/**: Mock data for users and plans (this is a mock data, representing the active user on your application, that corresponds to the Stripe dashboard user with active subscription and ID).
  - **page.tsx**: The main page of the application (Refloat SDK integration is primarily contained in this file).
  - **utils/**: Utility functions (e.g., Refloat HMAC hash generation).
- **.env.template**: Template for environment variables.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **next.config.js**: Next.js configuration.

---

## Integrating Refloat SDK

Follow the steps below to integrate the Refloat SDK into your Next.js application.

### 1. Include the Refloat SDK Script

The Refloat SDK needs to be included in your application to initialize the cancellation flow modal. Place the following script in the `<head>` of your HTML document or dynamically load it in your Next.js application.

**In Next.js, you can dynamically add the script using the `useEffect` hook:**

```tsx
// app/page.tsx

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = process.env.NEXT_REFLOAT_SDK_URL!;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Rest of your component code...
}
```

**Note:**

- Replace `process.env.NEXT_REFLOAT_SDK_URL` with the actual URL if not using environment variables. Follow [official integration instructions](https://app.refloat.com/dashboard/integration-instructions) on how to connect to Refloat using official SDK. 
- Ensure the script is loaded before attempting to initialize the Refloat SDK.

### 2. Generate Secure HMAC Hash

To authenticate requests to the Refloat Public API, generate an HMAC hash using the Stripe Customer ID and your Refloat Secret Key (you can obtain from [Refloat dashboard](https://refloat-staging-portal.onrender.com/dashboard/integration-instructions#:~:text=%24api_key%22-,API%20Credentials,-For%20your%20reference)).

**Create a server-side API route to generate the HMAC hash:**

```ts
// app/api/hmac.route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { customerId } = await request.json();
  const REFLOAT_CLIENT_SECRET = process.env.REFLOAT_CLIENT_SECRET;

  if (!REFLOAT_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'Server configuration error: Missing Refloat Secret Key.' },
      { status: 500 }
    );
  }

  try {
    const hmac = crypto
      .createHmac('sha256', REFLOAT_CLIENT_SECRET)
      .update(customerId)
      .digest('hex');

    return NextResponse.json({ hmac });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate HMAC hash.' },
      { status: 500 }
    );
  }
}
```

**Explanation:**

- The API route `/api/hmac` accepts a `POST` request with the `customerId`. Behind the scene, you should use some type of middleware to check if the user is authenticated/authorized to make such a request (it is out of scope of this demo).
- It uses the Refloat Secret Key (`REFLOAT_CLIENT_SECRET`) to generate an HMAC hash.
- The hash is then sent back to the client for use in initializing the Refloat SDK.

### 3. Initialize the Refloat SDK

Initialize the Refloat SDK by calling the `window.refloat.init` method with the required parameters when the user triggers the cancellation flow (e.g., clicking a *"Cancel Subscription"* button on your platform).

**Example:**

```tsx
// app/page.tsx

import { useState } from "react";

export default function Home() {
  // State to manage the active customer
  const [activeCustomer, setActiveCustomer] = useState({
    id: 'customer_123',
    subscriptionId: 'sub_456',
  });

  const handleCancel = async () => {
    try {
      // Fetch the HMAC hash from the server
      const response = await fetch('/api/hmac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: activeCustomer.id }),
      });

      const { hmac } = await response.json();

      // Initialize the Refloat SDK
      window.refloat?.init && window.refloat.init({
        tenantId: process.env.NEXT_REFLOAT_TENANT_ID!, // Your Refloat Tenant ID
        apiKey: process.env.NEXT_REFLOAT_API_KEY!, // Your Refloat API Key
        mode: "test", // "test" or "live"
        stripeCustomerId: activeCustomer.id, // Stripe Customer ID
        stripeSubscriptionId: activeCustomer.subscriptionId, // Optional
        authHash: hmac, // Generated HMAC hash
      });
    } catch (error) {
      console.error('Failed to initialize Refloat:', error);
    }
  };

  return (
    <div>
      {/* Your component UI */}
      <button onClick={handleCancel}>Cancel Subscription</button>
    </div>
  );
}
```

**Explanation:**

- When the user clicks the "Cancel Subscription" button, `handleCancel` is invoked.
- It fetches the HMAC hash by making a POST request to `/api/hmac`.
- Once the HMAC hash is received, it initializes the Refloat SDK with the necessary parameters.
- The cancellation modal is then displayed to the user.

---

### 4. TypeScript Type Definitions

When integrating the Refloat SDK into a TypeScript-based Next.js application, you might encounter TypeScript errors due to the absence of type definitions for the `window.refloat` object. To overcome these errors and ensure type safety, you should create a global declaration file that defines the necessary interfaces and extends the `Window` interface.

#### Steps to Set Up TypeScript Definitions

1. **Create a Type Declaration File**

   Create a new file named `refloat.d.ts` in the root directory of your project (or in a suitable directory like `types/` if you prefer). This file will contain the type definitions for the Refloat SDK.

   ```ts
   // refloat.d.ts

   // Declare the interface for Refloat initialization options
   export interface TenantRefloatInitOptions {
     readonly stripeCustomerId: string;
     readonly stripeSubscriptionId?: string;
     readonly tenantId: string;
     readonly authHash: string;
     readonly apiKey: string;
     readonly playbookId?: string;
     readonly mode?: 'test' | 'live';
   }

   // Extend the global Window interface to include the Refloat SDK
   declare global {
     interface Window {
       refloat?: {
         created?: boolean;
         initialized?: boolean;
         init?: (options: TenantRefloatInitOptions) => void;
       };
     }
   }
   ```

   **Explanation:**

   - `TenantRefloatInitOptions`: Defines the structure of the options object required by `window.refloat.init`.
   - Extending the `Window` interface allows TypeScript to recognize `window.refloat` and provides proper type checking when you use it in your code.

2. **Include the Type Declaration in `tsconfig.json`**

   To ensure TypeScript recognizes the new type definitions, you need to include the `refloat.d.ts` file in your project's `tsconfig.json` configuration.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // ... other compiler options ...
       "typeRoots": ["./node_modules/@types", "./"], // Include the current directory
       // ... other compiler options ...
     },
     "include": [
       "next-env.d.ts",
       "**/*.ts",
       "**/*.tsx",
       "refloat.d.ts" // IMPORTANT: Add this line
     ],
     "exclude": ["node_modules"]
   }
   ```

   **Note:**

   - Ensure that the `refloat.d.ts` file is included in the `include` array.
   - Adjust the `typeRoots` if necessary to include custom type definitions.

3. **Usage in Your Code**

   With the type definitions in place, you can now use `window.refloat` in your TypeScript code without encountering type errors.

   ```tsx
   // Example usage in a component

   const handleCancel = async () => {
     // ... fetch HMAC hash ...

     window.refloat?.init && window.refloat.init({
       tenantId: process.env.NEXT_REFLOAT_TENANT_ID!,
       apiKey: process.env.NEXT_REFLOAT_API_KEY!,
       mode: "test",
       stripeCustomerId: activeCustomer.id,
       stripeSubscriptionId: activeCustomer.subscriptionId,
       authHash: hmac,
     });
   };
   ```

   **Benefits:**

   - Provides IntelliSense support in editors like VSCode.
   - Ensures type safety and catches potential errors at compile time.
   - Avoids the need to use TypeScript ignore comments (e.g., `// @ts-ignore`).

---

## Authentication and Authorization

Refloat's Public API implements authentication and authorization mechanisms to secure communications with the SDK running on the client (browser).

### Authentication Mechanism

- **API Key Verification:**
  - Every request to the Refloat Public API must include a valid Public API key in the `X-Refloat-API-Key` header.
  - If the API key is missing or invalid, the server responds with a `403 Forbidden` status code.

- **HMAC Hash Verification:**
  - The request payload must include an HMAC hash generated using the Stripe Customer ID and your Refloat Secret Key.
  - The hash is computed using the **SHA-256** algorithm.
  - The server validates the hash to ensure the authenticity of the request.
  - If the auth hash is invalid or the customer ID does not match the tenant ID, a `403 Forbidden` status code is returned.

### Authorization Rules

- **Tenant Matching:**
  - The Public API key must correspond to the provided tenant ID.
  - The Stripe Customer ID must be scoped under that tenant, ensuring that each customer belongs to only one tenant.

- **Subscription Validation:**
  - If a `stripeSubscriptionId` is provided, it must be an active subscription associated with the provided Stripe Customer ID and tenant.
  - If not, a `404 Bad request` status code is returned.

---

## Testing the Integration

To verify your integration, you can test the Refloat Public API endpoint. This endpoint validates the `authHash` along with other required information.

**Using cURL:**

```bash
export TENANT_ID="your_refloat_tenant_id"
export CUSTOMER_ID="customer_123"
export AUTH_HASH="computed_hmac_hash"
export API_KEY="your_refloat_api_key"

curl "https://public-api.refloat.com/v1/verify/integration" \
  -d "{
    \"tenant\": \"$TENANT_ID\",
    \"customerId\": \"$CUSTOMER_ID\",
    \"authHash\": \"$AUTH_HASH\"
  }" \
  -H "Accept: */*" \
  -H "Content-Type: application/json" \
  -H "X-Refloat-Api-Key: $API_KEY"
```

**Expected Response:**

- A `200 OK` status code indicates successful validation.
- Any other status code signifies an error in the provided information.

---

## Troubleshooting

If you encounter issues during development or integration, refer to the following troubleshooting steps.

### Common Issues

#### 1. Dependency Installation Failures

**Symptoms:**

- Errors during `npm ci` installation.
- Missing or incompatible packages.

**Solutions:**

- Ensure you are using the correct Node.js version (**LTS v20** or above).
- Delete `node_modules` and perform a clean install:

  ```bash
  rm -rf node_modules
  npm ci
  ```

- Verify the integrity of `package-lock.json`.

#### 2. Refloat SDK Loading Issues

**Symptoms:**

- Refloat SDK fails to load.
- Errors related to the `NEXT_REFLOAT_SDK_URL` configuration.

**Solutions:**

- Verify that the `NEXT_REFLOAT_SDK_URL` environment variable is correctly set.
- Ensure that the Refloat SDK is accessible at the specified URL.
- Check network requests in the browser console for loading errors or network issues.

#### 3. Cancellation Modal Not Appearing

**Symptoms:**

- The cancellation modal does not display when triggered.
- The `iframe` does not render within the application.

**Solutions:**

- Ensure all required fields (`tenantId`, `apiKey`, `stripeCustomerId`, `authHash`) are correctly provided (`stripeSubscriptionId` is optional and only required if you allow multiple subscriptions per single customer).
- Verify that the Refloat SDK is properly initialized.
- Check the browser console for JavaScript errors or CORS issues.

#### 4. Authentication Errors

**Symptoms:**

- Requests to the Refloat Public API are rejected due to authentication failures.
- HMAC hash generation issues.

**Solutions:**

- Ensure that the `authHash` is correctly generated and matches the Stripe Customer ID.
- Verify that the Secret Key used for HMAC generation is correct and securely managed.
- Check the server logs for detailed error messages.

---

## Additional Information

### Live Mode vs. Test Mode

- **Live Mode (`mode: "live"`):**
  - Actions such as pause, discount and cancel will be performed based on user interactions in the cancellation flow.
  - This is what you would use in your **production** environment.

- **Test Mode (`mode: "test"`):**
  - No actions will be performed on customer subscriptions.
  - Useful for testing the integration without affecting real subscriptions.
  - Useful for staging environment, without affecting the Stripe *test* mode data.

### Subscription ID

- The `stripeSubscriptionId` parameter is optional.
- Use this parameter if customers have multiple active subscriptions and you need to specify which one to target.
- If customers have only one active subscription, this parameter can be omitted.

### Security Considerations

- **Secret Key Management:**
  - The Refloat Secret Key (`REFLOAT_CLIENT_SECRET`) should be stored securely and not exposed on the client side.
  - Avoid committing sensitive keys to version control.

- **Environment Variables:**
  - Use environment variables to manage sensitive information.
  - Consider using tools like `dotenv` for local development and secure secret management systems in production.

### Handling Dark Mode in Next.js

When implementing dark mode in your Next.js application, especially using UI component libraries or theme providers (like `next-themes`), you might encounter an issue where the Refloat cancellation modal renders with an unintended solid grey backdrop. This happens because some libraries set the `color-scheme` CSS property to `dark` on the `<html>` root element, which can affect the rendering of child components and iframes.

#### Issue Explanation

- **Cause:** The `color-scheme: dark;` style on the `<html>` element influences the styling of the Refloat modal, which is embedded via an `iframe`. This can lead to visual inconsistencies, such as a grey backdrop that doesn't match your application's theme.
- **Effect:** Users may experience a modal that doesn't align with the expected look and feel of your application, potentially impacting user experience during the cancellation flow.

#### Solution: Disable Automatic Color Scheme Adjustment

If you are using the `next-themes` package to manage themes in your Next.js application, you can prevent this issue by disabling the automatic application of the `color-scheme` property. This is achieved by setting the `enableColorScheme` prop to `false` in your `ThemeProvider`.

##### Steps to Implement the Fix

1. **Modify Your Theme Provider Component**

   Update your `ThemeProvider` component to include the `enableColorScheme={false}` prop.

   ```tsx
   // app/components/theme-provider.tsx

   "use client";

   import * as React from "react";
   import { ThemeProvider as NextThemesProvider } from "next-themes";

   export function ThemeProvider({
     children,
     ...props
   }: React.ComponentProps<typeof NextThemesProvider>) {
     return (
       <NextThemesProvider {...props} enableColorScheme={false}>
         {children}
       </NextThemesProvider>
     );
   }
   ```

   **Explanation:**

   - The `enableColorScheme` prop controls whether the `color-scheme` property is added to the `html` element.
   - Setting `enableColorScheme={false}` prevents `next-themes` from automatically adjusting the `color-scheme`, thereby avoiding unintended styling on the Refloat modal.

2. **Use the Updated Theme Provider in Your Application**

   Ensure that you are using the modified `ThemeProvider` in your application, typically wrapping your entire app in `_app.tsx` or a similar root component.

   ```tsx
   // app/layout.tsx or pages/_app.tsx

   import { ThemeProvider } from "./components/theme-provider";

   function MyApp({ Component, pageProps }) {
     return (
       <ThemeProvider attribute="class" defaultTheme="system">
         <Component {...pageProps} />
       </ThemeProvider>
     );
   }

   export default MyApp;
   ```

   **Note:**

   - The `attribute="class"` prop is commonly used to control theme switching via CSS classes.
   - Adjust the `defaultTheme` prop based on your application's requirements.

3. **Test the Refloat Modal Rendering**

   After implementing the above changes, test the Refloat cancellation modal in both light and dark modes to ensure it renders correctly without the grey backdrop issue.

#### Alternative Solutions

- **Override CSS Styles:** If not using `next-themes`, you can manually override the `color-scheme` property in your global CSS or directly on the `<html>` element.
- **Adjust Refloat Modal Styling:** Contact Refloat support to inquire about customizing the modal's appearance to better integrate with your application's theme.

#### Benefits

- **Consistent User Experience:** Ensures that the Refloat modal aligns with your application's theming and provides a seamless experience for users.
- **Maintainability:** Centralizes theme management without unintended side effects on third-party components.

**By addressing these considerations, you can enhance the robustness of your integration and provide a better experience for your users.**

---

## Conclusion

By following this guide, you should have a fully functional integration of the Refloat SDK within your Next.js application. This integration enables you to leverage Refloat's capabilities to manage customer cancellations effectively and improve retention rates.

For further assistance or inquiries, please refer to the [Refloat Documentation](https://docs.refloat.com) or contact Refloat support.

---

**Happy Coding!**
