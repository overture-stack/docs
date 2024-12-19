import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// See https://developer.matomo.org/guides/spa-tracking
interface CustomFields {
  matomoUrl: string;
  matomoSiteId: string;
}

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
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setCookieDomain", "*.overture.bio"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const u = customFields.matomoUrl;
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', customFields.matomoSiteId]);

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