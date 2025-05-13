
import React, { useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface VCitaIframeComponentProps {
  onError: () => void;
  onWrapper: (ref: React.RefObject<HTMLDivElement>) => void;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

// Use intersection observer for lazy loading
const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '300px' }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [ref, callback]);
};

const VCitaIframeComponent: React.FC<VCitaIframeComponentProps> = React.memo(({ 
  onError,
  onWrapper,
  iframeRef
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Set up the wrapper ref for the parent component
  useEffect(() => {
    if (wrapperRef.current) {
      onWrapper(wrapperRef);
    }
  }, [onWrapper]);
  
  // Load iframe when it comes into view to improve page load time
  useIntersectionObserver(wrapperRef, () => {
    if (iframeRef.current) {
      // Add loading event listener before setting src
      iframeRef.current.addEventListener('load', () => {
        console.log('vCita iframe loaded successfully');
      });
      
      iframeRef.current.src = "https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true";
      
      // Add performance monitoring
      if ('PerformanceObserver' in window) {
        try {
          const perfObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              if (entry.entryType === 'resource' && entry.name.includes('vcita')) {
                console.log('vCita resource loaded:', {
                  name: entry.name,
                  duration: Math.round(entry.duration) + 'ms',
                  size: entry instanceof PerformanceResourceTiming ? 
                        (entry.transferSize / 1024).toFixed(1) + 'KB' : 'unknown'
                });
              }
            });
          });
          perfObserver.observe({entryTypes: ['resource']});
          
          // Disconnect after 10 seconds to avoid memory leaks
          setTimeout(() => perfObserver.disconnect(), 10000);
        } catch (e) {
          console.error('Performance monitoring error:', e);
        }
      }
    }
  });
  
  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
    toast({
      title: "Connection Error",
      description: "Could not load the contact form. Please try again later.",
      variant: "destructive"
    });
    onError();
  };

  return (
    <div ref={wrapperRef} className="w-full cursor-pointer">
      <iframe 
        ref={iframeRef}
        width="100%" 
        height="600" 
        scrolling="no" 
        frameBorder="0" 
        onError={handleIframeError}
        title="Contact Form"
        className="w-full min-h-[600px]"
        loading="lazy"
      >
        <p>Please contact me via my contact form at vcita:</p>
        <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
          Contact Form for Survival 401k, LLC
        </a>
      </iframe>
    </div>
  );
});

VCitaIframeComponent.displayName = 'VCitaIframeComponent';

export default VCitaIframeComponent;
