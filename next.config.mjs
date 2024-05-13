/** @type {import('next').NextConfig} */
import SemiNext from "@douyinfe/semi-next";
import nextPwa from "next-pwa";

const isDevelopment = process.env.NODE_ENV === "development";
const nextConfig = {
  transpilePackages: [
    "@douyinfe/semi-ui",
    "@douyinfe/semi-icons",
    "@douyinfe/semi-illustrations",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "api.chat.aieo.cn",
      },
      {
        hostname: "192.168.1.3",
      },
    ],
  },
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chat",
        permanent: false,
      },
    ];
  },
};

const semi = SemiNext.default({});

const withPWA = nextPwa({
  dest: "public",
  disable: isDevelopment,
  register: !isDevelopment,
  runtimeCaching: [
    {
      urlPattern: /.*/,
      handler: "StaleWhileRevalidate",
    },
  ],
});

export default isDevelopment ? semi(nextConfig) : withPWA(semi(nextConfig));
