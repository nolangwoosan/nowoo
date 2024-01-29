import Script from 'next/script'

const GoogleAnalytics = () => {
  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=G-VNFC8HCCQ5`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-VNFC8HCCQ5');
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
