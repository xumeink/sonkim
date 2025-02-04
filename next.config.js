const path = require('path'); //path 모듈

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
  experimental: {
    //appDir: false, // ✅ Next.js의 appDir 사용을 비활성화 (Webpack 적용 확실하게)
    
    // 빌드 캐시 설정
    outputFileTracing: true,
    outputFileTracingRoot: path.join(__dirname, '..'),
  },
};

module.exports = nextConfig; // ✅ 반드시 CommonJS 방식
