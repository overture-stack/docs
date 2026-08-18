import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useLocation } from '@docusaurus/router';

declare global {
  interface Window {
    _paq: Array<any>;
  }
}

export default function MatomoTracking(): React.JSX.Element | null {
  const location = useLocation();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    // Production only. Without this, `npm start` and a local `npm run serve`
    // report real page views into site 76, recorded against whatever host the
    // browser is on, which for a development run is http://localhost. The
    // Gatsby site that served overture.bio set `dev: false` on
    // gatsby-plugin-matomo for exactly this reason.
    //
    // Webpack replaces NODE_ENV with a literal, so the production bundle keeps
    // the tracking and the development bundle never reaches it.
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const _paq = (window._paq = window._paq || []);
    
    // Initialize Matomo tracking
    const initializeMatomo = () => {
      const u = "https://webstats.oicr.on.ca/piwik/";
      _paq.push(['setTrackerUrl', u + 'piwik.php']); // Using piwik.php instead of matomo.php
      _paq.push(['setSiteId', '76']);
      
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = u + 'piwik.js'; // Using piwik.js instead of matomo.js
      g.onerror = () => {
        console.error('Failed to load Matomo tracking script');
      };
      if (s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
    };

    // Track page view
    const trackPageView = () => {
      _paq.push(["setCookieDomain", "*.overture.bio"]);
      _paq.push(['setDocumentTitle', document.title]);
      _paq.push(['setCustomUrl', location.pathname + location.search]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
    };

    // Initialize Matomo if it hasn't been initialized yet
    if (!window._paq.length) {
      initializeMatomo();
    }

    // Track the current page
    trackPageView();

  }, [location]);

  return null;
}