import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/chat": ["./vault/**/*.md"],
  },
};

export default nextConfig;
