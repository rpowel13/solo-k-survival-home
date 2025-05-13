
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to check if two objects are equal
 * Used for memoization comparisons
 */
export function shallowEqual(objA: any, objB: any): boolean {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]
    ) {
      return false;
    }
  }

  return true;
}

/**
 * More efficient implementation of React.memo for components with complex props
 */
export function shouldComponentUpdate<P>(
  prevProps: P, 
  nextProps: P, 
  propKeysToCompare: Array<keyof P>
): boolean {
  for (const key of propKeysToCompare) {
    if (prevProps[key] !== nextProps[key]) {
      return true;
    }
  }
  return false;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExec = 0;

  return function executedFunction(...args: Parameters<F>): void {
    const now = Date.now();
    const elapsed = now - lastExec;

    const execute = () => {
      lastExec = Date.now();
      func(...args);
    };

    if (elapsed > waitFor) {
      execute();
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(execute, waitFor - elapsed);
    }
  };
}
