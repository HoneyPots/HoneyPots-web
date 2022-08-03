import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyles from 'styles/GlobalStyles';
import { wrapper } from 'libs/store';
import theme from 'styles/theme';
import BottomTabNav from 'components/navigation/BottomTabNav';
import { AppPropsWithLayout } from 'types/nextjs';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      }),
  );
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link rel="icon" href="/images/favicon.ico" />
            <link rel="apple-touch-icon" href="/images/favicon.ico" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  );
};

export default wrapper.withRedux(App);
