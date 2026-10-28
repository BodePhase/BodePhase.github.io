import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

function usePrefersReducedMotion() {
  // Inizializza a false sia in SSR che nel primo passo di idratazione React 18
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(!mediaQueryList.matches);

    const listener = event => {
      setPrefersReducedMotion(!event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
      return () => mediaQueryList.removeListener(listener);
    }
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
