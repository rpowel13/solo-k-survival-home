import React from 'react';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '50px' : '200px',
    threshold,
  });

  // Always render high priority sections or when in view
  if (priority || inView) {
    return <div className={className}>{children}</div>;
  }

  // Otherwise show placeholder or empty div with same height
  return (
    <div ref={ref} className={`${className} min-h-[100px]`}>
      {placeholder || null}
    </div>
  );
};

export default LazySection;
