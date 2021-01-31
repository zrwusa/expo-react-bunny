import { getInitialProps } from '@expo/next-adapter/document';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

class CustomDocument extends Document {
    render() {
        return (
            <Html>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <script
                    async
                    defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCdDf8m_Kaf0t6J_egFFZ8ASgwUnctUL4"
                    type="text/javascript" />
            </Head>
            <body>
            <Main />

            <NextScript />
            </body>
            </Html>
        );
    }
}

// Import the getInitialProps method and assign it to your component to ensure the react-native-web styles are used.
CustomDocument.getInitialProps = getInitialProps;

// OR...

CustomDocument.getInitialProps = async props => {
    const result = await getInitialProps(props);
    // Mutate result...
    return result;
};

export default CustomDocument;