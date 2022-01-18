import '../styles/globals.css';
import type { AppProps } from 'next/app';

// This is a root component where different page components render in. This Component is
function MyApp({ Component, pageProps }: AppProps) {
  // This means we can wrap it with some layout component or Fragment
  return <Component {...pageProps} />;
}

export default MyApp;
