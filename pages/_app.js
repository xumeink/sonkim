import '../styles/global.css'; // 전역 CSS 가져오기

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
