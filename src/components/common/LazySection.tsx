
import React from 'react';
import { useInView } from '@/hooks/useInView'; // Use the local custom hook
import { useIsMobile } from '@/hooks/use-mobile';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
  threshold?: number;
  placeholder?: React.ReactNode;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  priority = false,
  threshold = 0.1,
  placeholder
}) => {
  const isMobile = useIsMobile();
  // Use generic to ensure ref is correctly typed for div
  const { ref, inView } = useInView<HTMLDivElement>({
    triggerOnce: true,
    rootMargin: isMobile ? '50px' : '200px',
    threshold,
  });

  if (priority || inView) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`${className} min-h-[100px]`}>
      {placeholder || null}
    </div>
  );
};

export default LazySection;
