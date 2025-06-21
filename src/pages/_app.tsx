import Toaster from "@/components/toast";
import { useAchievements } from "@/hooks/useAchievements";
import "@/styles/globals.css";
import { AnimatePresence } from "motion/react";
import type { AppProps } from "next/app";
import { Geist, Libre_Baskerville } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { unlock, hasAchievement } = useAchievements();

  useEffect(() => {
    if (!hasAchievement("first_visit")) {
      unlock("first_visit");
    }
  }, [hasAchievement, unlock]);

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          defer
          data-domain="jack.bio"
          src="https://plausible.verbose.faith/js/script.js"
        ></script>
      </Head>

      <AnimatePresence mode="popLayout">
        <Toaster />
        <Component {...pageProps} />;
      </AnimatePresence>
    </>
  );
}
