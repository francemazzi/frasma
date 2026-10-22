import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * OpenAI Ads Measurement Pixel. One init per page, near the start of head, so the
 * landing page stores the `oppref` click reference. A valid NEXT_PUBLIC_OAI_PIXEL_ID
 * overrides the campaign pixel.
 */
const CONFIGURED_PIXEL_ID = process.env.NEXT_PUBLIC_OAI_PIXEL_ID ?? "";
const OAI_PIXEL_ID = /^[A-Za-z0-9_-]{1,64}$/.test(CONFIGURED_PIXEL_ID)
  ? CONFIGURED_PIXEL_ID
  : "486zF127dHBQWpfKXd4umE";

const OAI_PIXEL_SNIPPET = `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"${OAI_PIXEL_ID}",debug:true});`;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* OpenAI Ads Measurement Pixel */}
          <script dangerouslySetInnerHTML={{ __html: OAI_PIXEL_SNIPPET }} />
          {/* Scroll reveals stay opt-in: without this class every section renders visible. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `if(window.IntersectionObserver){document.documentElement.classList.add('js-motion');}`,
            }}
          />
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59SWTWHM');`,
            }}
          />
          {/* End Google Tag Manager */}
          {/* Google tag (gtag.js) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-91NBKQG4T6"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-91NBKQG4T6');`,
            }}
          />
          {/* End Google tag (gtag.js) */}
          {/* Microsoft Clarity */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w5joon4wbg");`,
            }}
          />
          {/* Contentsquare */}
          <script async src="https://t.contentsquare.net/uxa/a9769d2931c2f.js" />
          {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
            <meta
              name="google-site-verification"
              content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
            />
          ) : null}
          {/* firebase */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-59SWTWHM"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
