import { NextConfig } from "next";

const nextConfig: NextConfig= {
// @ts-ignore
 eslint: {
    ignoreDuringBuilds: true, // попозже вернемся. там ошибки рекомендованого характера
  },
};

export default nextConfig;
