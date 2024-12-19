import { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

declare global {
  interface Window {
    _paq: Array<any>;
  }
}

export default function piwikiTracking(): JSX.Element | null {
    useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
          return;
        }
    
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["setCookieDomain", "*.overture.bio"]);
        _paq.push(['setDocumentTitle', document.title]); 
        _paq.push(['setCustomUrl', window.location.pathname]); 
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
    
        (function() {
          var u="//webstats.oicr.on.ca/piwik/";
          _paq.push(['setTrackerUrl', u+'piwiki.php']);
          _paq.push(['setSiteId', '76']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'piwiki.js'; s.parentNode.insertBefore(g,s);
        })();
    
        // Track route changes
        const router = require('@docusaurus/router').default;
        router.events.on('routeDidUpdate', () => {
          _paq.push(['setDocumentTitle', document.title]);
          _paq.push(['setCustomUrl', window.location.pathname]);
          _paq.push(['trackPageView']);
        });
    
    }, []);

  return null;
}