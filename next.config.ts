import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile lives in the
  // parent home directory, which otherwise confuses Turbopack).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
