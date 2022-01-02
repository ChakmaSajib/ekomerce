// We will change the way that Next basically render the pages
import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
                {/** here, the body element does not comming from NextJS */}
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
}