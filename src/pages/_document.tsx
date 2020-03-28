import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { BASE_URL } from 'lib/constants'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initProps = await Document.getInitialProps(ctx)
    return { ...initProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#303030" />
          <meta property="og:site_name" content="Kola" />
          <meta property="og:url" content={`${BASE_URL}`} />
          <meta property="og:title" content="Visual database builder" />
          <meta
            property="og:description"
            content="Easily generate database schemas in your favorite framework🚀💻"
          />
          <meta
            property="og:image"
            content={`${BASE_URL}/static/images/logo.png`}
          />
        </Head>
        <body
          style={{
            font: '15px Roboto',
            color: '#fff',
            fontWeight: 300,
            lineHeight: '1.5em',
            padding: '0px 0px 0px 0px !important',
            letterSpacing: '0.01em',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
