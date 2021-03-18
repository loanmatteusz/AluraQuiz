import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa em branco no começo
    color: ${({ theme }) => theme.colors.contrastText}
  }

  html, body {
    min-height: 100vh;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Valorant Quiz</title>

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://preview.redd.it/shpmpl91zk761.png?width=1000&format=png&auto=webp&s=9cfd77d2b414ae91725379294b7ab6370238e409"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
