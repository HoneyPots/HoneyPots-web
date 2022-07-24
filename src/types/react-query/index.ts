import type { DehydratedState } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PropsWithDehydrateState<T = {}> = {
  dehydratedState: DehydratedState;
} & T;
