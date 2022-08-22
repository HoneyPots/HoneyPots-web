import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from 'styles/GlobalStyles';
import { wrapper } from 'libs/store';
import theme from 'styles/theme';
import { AppPropsWithLayout } from 'types/nextjs';
import AuthGuard from 'components/auth/AuthGuard';
import Loading from 'components/loading/Loading';
import useLoading from 'hooks/useLoading';
import * as gtag from '../utills/gtags';

export const LOADING_MUTATION = ['LOADING_MUTATION'];

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
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
  const { appLoading, endLoading, startLoading } = useLoading();

  useEffect(() => {
    queryClient.setMutationDefaults(LOADING_MUTATION, {
      onMutate: () => {
        startLoading();
      },
      onSettled: () => {
        endLoading();
      },
    });
  }, [startLoading, endLoading, queryClient]);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <ChakraProvider>
            <GlobalStyles />
            <Head>
              <title>꿀단지</title>
              <link rel="shortcut icon" href="/images/logo_icon.ico" />
              <link rel="icon" href="/images/logo_icon.ico" />
              <link rel="apple-touch-icon" href="/images/logo_icon.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, user-scalable=0, maximum-scale=1.0"
              />
            </Head>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
            {appLoading && <Loading />}
          </ChakraProvider>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  );
};

export default wrapper.withRedux(App);
