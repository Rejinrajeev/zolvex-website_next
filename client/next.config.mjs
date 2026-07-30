/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: "..",
  },
  allowedDevOrigins: ["192.168.1.5:3000", "192.168.1.5", "localhost:3000"],
  async rewrites() {
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      return [
        {
          source: "/api/v1/:path*",
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
        },
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
        },
      ];
    }
    if (process.env.NODE_ENV === "development") {
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
    }
    return [];
  },
};

export default nextConfig;
