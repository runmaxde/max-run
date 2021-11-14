import Page from '@/comp/Page'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="bg-dark">
        <Head />
        <body className="text-gray-200 ">
          <Page>
            <Main />
            <NextScript />
          </Page>
        </body>
      </Html>
    )
  }
}

export default MyDocument