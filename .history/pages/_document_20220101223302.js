// We will change the way that Next basically render the pages
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Head from 'next/head';
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