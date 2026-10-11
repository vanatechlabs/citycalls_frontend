import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal self-contained server bundle for the Docker image (.next/standalone).
  output: "standalone",

  // The citycalls/ parent folder has its own package-lock.json; pin the
  // workspace root to this app so Turbopack/tracing don't pick the parent.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },

  // Bundled images/icons rarely change — let browsers keep them for a week
  // instead of re-checking on every visit.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
