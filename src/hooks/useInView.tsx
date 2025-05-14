
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  root?: Element | null;
}

// Default the type parameter T to HTMLDivElement
export function useInView<T extends Element = HTMLDivElement>({
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false,
  root = null,
}: UseInViewOptions = {}): {
  ref: RefObject<T>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
} {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const previousRef = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (previousRef.current && previousRef.current !== ref.current && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    previousRef.current = ref.current;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);
          const isIntersecting = entry.isIntersecting;
          setInView(isIntersecting);

          if (isIntersecting && triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        },
        { rootMargin, threshold, root }
      );

      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return { ref, inView, entry };
}
