import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es-ES">
        <Head>
          <link rel="icon" href="http://localhost:8080/images/Aritsan_Web/Logo_Artisan_ICO.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
