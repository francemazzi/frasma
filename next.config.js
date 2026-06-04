/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react",
      "framer-motion",
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/.well-known/api-catalog",
        headers: [
          {
            key: "Content-Type",
            value:
              'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
          },
        ],
      },
      {
        source: "/openapi.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/openapi+json",
          },
        ],
      },
      {
        source: "/.well-known/agent-skills/index.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      {
        source: "/.well-known/agent-skills/contact-francesco/SKILL.md",
        headers: [
          {
            key: "Content-Type",
            value: "text/markdown; charset=utf-8",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
