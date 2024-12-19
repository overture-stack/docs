import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// See https://developer.matomo.org/guides/spa-tracking

declare global {
  interface Window {
    _paq: Array<any>;
  }
}

export default function MatomoTracking(): JSX.Element | null {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    var _paq = window._paq = window._paq || [];
    _paq.push(["setCookieDomain", "*.overture.bio"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const u = "https://webstats.oicr.on.ca/piwik/";
   
    // const u = window.location.protocol + "//webstats.oicr.on.ca/piwik/";

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
  }, []);

  return null;
}