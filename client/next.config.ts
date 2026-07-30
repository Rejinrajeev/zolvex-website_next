import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: "..",
  },
  allowedDevOrigins: ["192.168.1.5:3000", "192.168.1.5", "localhost:3000"],
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://127.0.0.1:5002/api/v1/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5002/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
