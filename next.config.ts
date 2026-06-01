import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next infer the wrong workspace
  // root. Pin it to this project so file tracing and HMR resolve correctly.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
