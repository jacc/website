import "@/styles/globals.css";
import { Lenis } from "lenis/react";
import type { AppProps } from "next/app";
import { Geist, Libre_Baskerville } from "next/font/google";
import Head from "next/head";

const body = Geist({
  subsets: ["latin"],
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-serif: ${serif.style.fontFamily};
            --font-sans: ${body.style.fontFamily};
          }
        `}
      </style>

      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Lenis root>
        <Component {...pageProps} />;
      </Lenis>
    </>
  );
}
