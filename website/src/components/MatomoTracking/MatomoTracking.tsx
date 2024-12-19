import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// See https://developer.matomo.org/guides/spa-tracking

declare global {
  interface Window {
    _paq: Array<any>;
  }
}

export default function MatomoTracking(): JSX.Element | null {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    var _paq = window._paq = window._paq || [];
    _paq.push(["setCookieDomain", "*.overture.bio"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const u = "https://webstats.oicr.on.ca/piwik/";
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

    // Track page views in Docusaurus SPA
    require('@docusaurus/router').default.events.on('routeDidUpdate', () => {
      _paq.push(['setCustomUrl', window.location.pathname]);
      _paq.push(['trackPageView']);
    });

  }, []);

  return null;
}
