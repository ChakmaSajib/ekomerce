// We will change the way that Next basically render the pages
import { ServerStyleSheets } from '@mui/styles';
import React from "react"
import App from 'next/app';
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

// This will render before above component
MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
        return originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });
    };

    const initialProps = await Document.getInitialProps(ctx)
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles), sheets.getStyleElement()
        ]
    }
}
