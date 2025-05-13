
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Initialize performance monitoring and mark start
performance.mark('app-init-start');

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
      // Observe important performance metrics
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
      
      observer.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    } catch (e) {
      console.warn('Performance monitoring error:', e);
    }
  }
};

// Run optimizations in parallel
Promise.all([
  new Promise(resolve => {
    preloadCriticalCSS();
    resolve(true);
  }),
  new Promise(resolve => {
    initPerformanceMonitoring();
    resolve(true);
  })
]).then(() => {
  // Render the app immediately
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  
  // Mark render completed
  performance.mark('app-render-complete');
  performance.measure('time-to-render', 'app-init-start', 'app-render-complete');
  const renderTime = performance.getEntriesByName('time-to-render')[0];
  console.log(`App rendered in ${Math.round(renderTime.duration)}ms`);
});
