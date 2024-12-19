import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

interface CustomFields {
  matomoUrl: string;
  matomoSiteId: string;
}

declare global {
  interface Window {
    _paq: Array<unknown>;
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

    // Type assertion to handle the customFields
    const matomoConfig = {
      matomoUrl: (customFields as { matomoUrl: string }).matomoUrl,
      matomoSiteId: (customFields as { matomoSiteId: string }).matomoSiteId,
    };

    window._paq = window._paq || [];
    window._paq.push(["setCookieDomain", "*.overture.bio"]);
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
    window._paq.push(['setTrackerUrl', `${matomoConfig.matomoUrl}/matomo.php`]);
    window._paq.push(['setSiteId', matomoConfig.matomoSiteId]);
  }, []);

  return null;
}