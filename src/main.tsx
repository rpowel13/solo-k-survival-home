
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

// Make sure loader is visible before attempting to render
const ensureLoaderVisible = () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    // Ensure loader is visible
    loader.style.opacity = '1';
    loader.style.display = 'flex';
  }
};

// Run optimizations
preloadCriticalCSS();
initPerformanceMonitoring();
ensureLoaderVisible();

// Render the app with priority but with a small delay to ensure loader is seen
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

if (document.readyState === 'loading') {
  // Wait for DOMContentLoaded if still loading
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure loader is visible on mobile
    setTimeout(renderApp, 100);
  });
} else {
  // Small delay even if DOM is already loaded
  setTimeout(renderApp, 100);
}
