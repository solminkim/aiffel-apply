import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <Script id='pretendard'>
            <link
              rel='stylesheet'
              as='style'
              crossOrigin={'anonymous'}
              href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css'
            />
          </Script>

          <Script
            id='gtm-script'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MHQMP3K');`,
            }}
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-MHQMP3K'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </Html>
    );
  }
}
