
import { useEffect, useRef } from 'react';
import { 
  setupFormSubmissionDetection, 
  setupMessageEventHandler, 
  handleIframeWrapperClick,
  checkIframeForSuccessIndicators
} from '@/components/contact/iframeUtils';

interface UseIframeSubmitDetectionProps {
  onSubmitDetected: () => void;
  submitButtonSelector?: string;
}

export const useIframeSubmitDetection = ({ 
  onSubmitDetected,
  submitButtonSelector = ".button-container button, .vcita-form-submit, [type='submit'], button.submit-button"
}: UseIframeSubmitDetectionProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force check for buttons after iframe loads
    const checkForSubmitButtons = () => {
      setupFormSubmissionDetection(iframeRef, submitButtonSelector, onSubmitDetected);
    };

    // Enhanced message event handling
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from iframe:", event.data);
      
      // Check for ANY form-related events from vCita
      if (typeof event.data === 'object') {
        const eventStr = JSON.stringify(event.data).toLowerCase();
        if (eventStr.includes('submit') || 
            eventStr.includes('form') || 
            eventStr.includes('success') || 
            eventStr.includes('complete')) {
          console.log("Form-related message detected:", eventStr);
          onSubmitDetected();
          return;
        }
      }
      
      // Check for string messages
      if (typeof event.data === 'string') {
        const dataStr = event.data.toLowerCase();
        if (dataStr.includes('submit') || 
            dataStr.includes('form') || 
            dataStr.includes('success') || 
            dataStr.includes('complete')) {
          console.log("Form-related string message detected:", dataStr);
          onSubmitDetected();
          return;
        }
      }
    };
    
    const cleanupMessageHandler = setupMessageEventHandler(handleMessage);
    
    // Monitor for clicks in the iframe container
    const handleClickWrapper = (e: MouseEvent) => {
      handleIframeWrapperClick(e, iframeWrapperRef, iframeRef, onSubmitDetected);
    };
    
    if (iframeWrapperRef.current) {
      iframeWrapperRef.current.addEventListener('click', handleClickWrapper as EventListener);
    }
    
    // Monitor window URL changes that might indicate a form submission
    const handleLocationChange = () => {
      if (window.location.href.includes("success") || 
          window.location.href.includes("thank-you") || 
          window.location.href.includes("submitted")) {
        console.log("URL change indicating submission:", window.location.href);
        onSubmitDetected();
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    // Set up a periodic checker to detect form submission
    const intervalCheck = setInterval(() => {
      checkIframeForSuccessIndicators(iframeRef, onSubmitDetected);
    }, 1000);
    
    // Handle iframe load event to attach button listeners and check content
    const handleIframeLoad = () => {
      console.log("Iframe loaded");
      setTimeout(checkForSubmitButtons, 1000);
      setTimeout(checkForSubmitButtons, 2000);
      setTimeout(checkForSubmitButtons, 3000);
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }
    
    // Create a Mutation Observer to monitor for changes in the iframe's attributes
    let observer: MutationObserver;
    if (iframeRef.current) {
      observer = new MutationObserver(() => {
        console.log("Iframe mutation detected");
        setTimeout(checkForSubmitButtons, 500);
      });
      
      observer.observe(iframeRef.current, { 
        attributes: true,
        childList: false,
        subtree: false
      });
    }
    
    return () => {
      cleanupMessageHandler();
      window.removeEventListener('popstate', handleLocationChange);
      
      if (iframeWrapperRef.current) {
        iframeWrapperRef.current.removeEventListener('click', handleClickWrapper as EventListener);
      }
      
      if (observer) {
        observer.disconnect();
      }
      
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
      
      clearInterval(intervalCheck);
    };
  }, [onSubmitDetected, submitButtonSelector]);

  return { iframeRef, iframeWrapperRef };
};
