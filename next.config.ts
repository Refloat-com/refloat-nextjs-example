import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_REFLOAT_API_KEY: process.env.NEXT_REFLOAT_API_KEY,
    NEXT_REFLOAT_TENANT_ID: process.env.NEXT_REFLOAT_TENANT_ID,
  }
};

export default nextConfig;
