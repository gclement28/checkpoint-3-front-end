// _app.tsx

import { ApolloProvider } from '@apollo/client';
import client from '../graphql/client';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
