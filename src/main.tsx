import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Preload critical CSS
const preloadCriticalCSS = () => {
  const links = [
    '/src/index.css',
    '/src/App.css'
  ];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  if ('PerformanceObserver' in window) {
    try {
      // Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          // Log important metrics
          if (entry.entryType === 'largest-contentful-paint' ||
              entry.entryType === 'first-input' ||
              entry.entryType === 'layout-shift') {
            console.log(`Performance: ${entry.entryType}`, entry);
          }
        });
      });
      
      // Observe important performance metrics
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance monitoring error:', e);
    }
  }
};

// Run optimizations
preloadCriticalCSS();
initPerformanceMonitoring();

// Render the app with priority
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

if (document.readyState === 'loading') {
  // Wait for DOMContentLoaded if still loading
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // Otherwise render immediately
  renderApp();
}
