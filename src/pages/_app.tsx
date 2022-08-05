import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from 'styles/GlobalStyles';
import { wrapper } from 'libs/store';
import theme from 'styles/theme';
import BottomTabNav from 'components/navigation/BottomTabNav';
import { AppPropsWithLayout } from 'types/nextjs';
import AuthGuard from 'screens/auth/AuthGuard';

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
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <ChakraProvider>
              <GlobalStyles />
              <Head>
                <title>꿀단지</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/images/favicon.ico" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, user-scalable=0, maximum-scale=1.0"
                />
              </Head>
              <Component {...pageProps} />
            </ChakraProvider>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthGuard>,
  );
};

export default wrapper.withRedux(App);
