import "@/styles/globals.css";
import { AnimatePresence } from "motion/react";
import type { AppProps } from "next/app";
import { Geist, Libre_Baskerville } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const body = Geist({
  subsets: ["latin"],
  weight: ["400"],
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const click = new Audio("/click.mp3");
    click.volume = 0.5;
    void click.play().catch(() => null);
  }, [router.pathname]);

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

      <AnimatePresence mode="popLayout">
        <Component {...pageProps} />;
      </AnimatePresence>
    </>
  );
}
