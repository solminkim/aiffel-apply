import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <>
          <Component {...pageProps} />
        </>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
