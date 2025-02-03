/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: true, // ✅ Next.js의 기본 SVG 처리 비활성화
    },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    appDir: false, // ✅ Next.js의 appDir 사용을 비활성화 (Webpack 적용 확실하게)
  },
};

module.exports = nextConfig; // ✅ 반드시 CommonJS 방식
