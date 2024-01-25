'use client'

import Script from 'next/script'

const GoogleAnalytics = () => {
  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=G-1PM7NG5MDT`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-1PM7NG5MDT');
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
