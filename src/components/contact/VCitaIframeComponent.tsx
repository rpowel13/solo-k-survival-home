
import React, { useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface VCitaIframeComponentProps {
  onError: () => void;
  onWrapper: (ref: React.RefObject<HTMLDivElement>) => void;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

const VCitaIframeComponent: React.FC<VCitaIframeComponentProps> = ({ 
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
  
  // Lazy load the iframe content with improved performance tracking
  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (iframeRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load the iframe source when it comes into view
            const iframe = entry.target as HTMLIFrameElement;
            
            // Add loading event listener before setting src
            iframe.addEventListener('load', () => {
              console.log('vCita iframe loaded successfully');
            });
            
            iframe.src = "https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true";
            observer.unobserve(iframe);
            
            // Add performance monitoring with more details
            if ('PerformanceObserver' in window) {
              try {
                const perfObserver = new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  entries.forEach(entry => {
                    if (entry.entryType === 'resource' && entry.name.includes('vcita')) {
                      console.log('vCita resource loaded:', {
                        name: entry.name,
                        duration: Math.round(entry.duration) + 'ms',
                        size: entry.encodedBodySize ? (entry.encodedBodySize / 1024).toFixed(1) + 'KB' : 'unknown'
                      });
                    }
                  });
                });
                perfObserver.observe({entryTypes: ['resource']});
              } catch (e) {
                console.error('Performance monitoring error:', e);
              }
            }
          }
        });
      }, { threshold: 0.1, rootMargin: '300px' });  // Increased root margin for even earlier loading
      
      observer.observe(iframeRef.current);
    }
    
    return () => {
      if (observer && iframeRef.current) {
        observer.disconnect();
      }
    };
  }, [iframeRef]);
  
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
        data-src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true" 
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
};

export default VCitaIframeComponent;
