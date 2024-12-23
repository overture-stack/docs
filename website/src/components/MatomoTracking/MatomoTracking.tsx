import { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useLocation } from '@docusaurus/router';

declare global {
  interface Window {
    _paq: Array<any>;
  }
}

export default function MatomoTracking(): JSX.Element | null {
  const location = useLocation();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const _paq = (window._paq = window._paq || []);
    
    // Initialize Matomo tracking
    const initializeMatomo = () => {
      const u = "//piwik-prod-www.oicr.on.ca/piwik/";
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '76']);
      
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = u + 'matomo.js';
      if (s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
    };

    // Track page view
    const trackPageView = () => {
      _paq.push(["setCookieDomain", "*.overture.bio"]);
      _paq.push(['setDocumentTitle', document.title]);
      _paq.push(['setCustomUrl', location.pathname + location.search]); // Include search parameters
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
    };

    // Initialize Matomo if it hasn't been initialized yet
    if (!window._paq.length) {
      initializeMatomo();
    }

    // Track the current page
    trackPageView();

    // Cleanup function
    return () => {
      // Clean up any necessary listeners
    };
  }, [location]); // Re-run effect when location changes

  return null;
}