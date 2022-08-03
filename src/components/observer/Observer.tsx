import { FC, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ObserverContainer = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};
`;

interface ObserverProps {
  rootMargin?: string;
  threshold?: number;
  height: string;
  onObserve: VoidFunction;
}

const Observer: FC<ObserverProps> = ({
  rootMargin = '0px',
  threshold = 0.3,
  height,
  onObserve,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) onObserve();
    },
    [onObserve],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin,
      threshold,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver, rootMargin, threshold]);

  return <ObserverContainer height={height} ref={observerRef} />;
};

export default Observer;
