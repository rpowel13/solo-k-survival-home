
/// <reference types="vite/client" />

// Add declaration for loading attribute on HTML elements if needed
interface HTMLAttributes {
  loading?: 'lazy' | 'eager' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
}

// Add declaration for aspect ratio support
interface AspectRatioProps {
  ratio?: number;
}
