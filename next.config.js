const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: true, // ✅ Next.js의 기본 SVG 처리 비활성화
    },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "@svgr/webpack",
        {
          loader: 'url-loader', // 또는 'file-loader'
          options: {
              limit: 8192, // 파일 크기에 따라 데이터 URL로 변환
              name: '[name].[hash].[ext]', // 파일명 형식 지정
          },
        },
      ],
    });
    return config;
  },
  cache: {
    type: 'filesystem',
  },
};

module.exports = nextConfig; // ✅ 반드시 CommonJS 방식
