import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "@chakra-ui/core";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/Formular-Mono.ttf"
            as="font"
            crossOrigin=""
          />
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
