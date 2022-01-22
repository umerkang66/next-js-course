// _app.tsx is your application shell, you can imagine app.tsx as your root component inside the body of the html document
// _document.tsx file enables you to customize entire html document
// You need to add a special class based component that will inherit the Document component from 'next/document'

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    // This should be special jsx code with a very specific structure
    // This is the default structure
    // For example if you want to add the lang attribute to the html document, that could be only done here in the MyDocument file
    // Our Next js application in the end is rendered by this Main component
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* We can add model overlays here in the body, that should not be added in the components or pages */}
          <div className="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
