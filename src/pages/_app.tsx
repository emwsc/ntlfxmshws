/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";

import Theme from "../components/Theme";

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>ntlfxmshws</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald:wght@700&display=swap" rel="stylesheet" /> 
      </Head>
      <Theme />
      <Component {...pageProps} />
    </>
  );
};

export default App;
