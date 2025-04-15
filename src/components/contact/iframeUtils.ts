
/**
 * Utility functions for detecting form submissions in iframes
 */

export const setupFormSubmissionDetection = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
  submitButtonSelector: string,
  onSubmitDetected: () => void
) => {
  // Try to access iframe content and attach click handlers to submit buttons
  try {
    if (!iframeRef.current || !iframeRef.current.contentDocument) return;
    
    const buttons = iframeRef.current.contentDocument.querySelectorAll(submitButtonSelector);
    console.log(`Found ${buttons.length} potential submit buttons in iframe`);
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        console.log("Submit button clicked inside iframe");
        setTimeout(onSubmitDetected, 100);
      });
    });
  } catch (e) {
    console.log("CORS prevented direct submit button access", e);
  }
};

export const setupMessageEventHandler = (
  onMessageReceived: (event: MessageEvent) => void
) => {
  window.addEventListener('message', onMessageReceived);
  return () => window.removeEventListener('message', onMessageReceived);
};

export const handleIframeWrapperClick = (
  e: MouseEvent,
  iframeWrapperRef: React.RefObject<HTMLDivElement>,
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onPossibleSubmit: () => void
) => {
  if (!iframeWrapperRef.current || !iframeRef.current) return;
  
  const iframe = iframeRef.current;
  const rect = iframe.getBoundingClientRect();
  
  // Check if click is in the bottom 40% of the iframe (likely submit button area)
  const y = e.clientY - rect.top;
  const threshold = rect.height * 0.6; // Bottom 40% of iframe
  
  if (y > threshold) {
    console.log("Click detected in the likely submit button area");
    // Use a debounced approach to allow the real click to process
    setTimeout(() => {
      try {
        // Try to directly check for submission indicators in the iframe
        if (iframeRef.current && iframeRef.current.contentWindow) {
          const iframeDoc = iframeRef.current.contentWindow.document;
          const formElements = iframeDoc.querySelectorAll('form');
          
          // If only one form exists, this is likely a submission
          if (formElements.length === 1) {
            console.log("Single form detected, likely submission");
            onPossibleSubmit();
          }
        }
      } catch (e) {
        // Silent catch for CORS
        console.log("Click in submit area - showing consent dialog");
        onPossibleSubmit();
      }
    }, 300);
  }
};

export const checkIframeForSuccessIndicators = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onSuccessDetected: () => void
) => {
  try {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Try to access the iframe content - if it's a new URL this could indicate submission
      const currentUrl = iframeRef.current.contentWindow.location.href;
      if (currentUrl.includes("success") || 
          currentUrl.includes("thank-you") || 
          currentUrl.includes("submitted")) {
        console.log("Iframe URL change indicating submission:", currentUrl);
        onSuccessDetected();
        return true;
      }
      
      // Look for success messages in the iframe content
      try {
        const iframeDoc = iframeRef.current.contentWindow.document;
        const successElements = iframeDoc.querySelectorAll('.success-message, .thank-you-message, .form-submitted');
        if (successElements.length > 0) {
          console.log("Success elements found in iframe");
          onSuccessDetected();
          return true;
        }
      } catch (e) {
        // Silent catch for CORS errors
      }
    }
  } catch (e) {
    // Silent catch for CORS errors
  }
  return false;
};
