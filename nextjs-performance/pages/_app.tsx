import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from 'components/layout/layout';

// This is a root component where different page components render in. This Component is actually page component
function MyApp({ Component, pageProps }: AppProps) {
  // This means we can wrap it with some layout component or Fragment
  return (
    <Layout>
      <Head>
        {/* The head component on the app js file and the head component on the other pages, will merge, and the head that is deployed to the production will contains the content of the both heads, if it has conflicts, the latest will apply */}
        {/* Giving the general title, and description, if some pages does not have this data, this data will apply  */}
        <title>Next Events</title>
        <meta name="description" content="Next Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
