import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import WebMcpProvider from "../components/agent/WebMcpProvider";
import { LanguageProvider } from "../lib/i18n/context";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const ChatWidget = dynamic(
  () => import("../components/organism/ChatWidget"),
  { ssr: false, loading: () => null }
);

const HIDE_CHAT_PATHS = ["/manifattura", "/vibeup"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showChat = !HIDE_CHAT_PATHS.includes(router.pathname);

  return (
    <LanguageProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <div className={`${satoshi.variable} ${geistMono.variable} font-sans`}>
        <WebMcpProvider />
        <Component {...pageProps} />
        {showChat && <ChatWidget />}
      </div>
    </LanguageProvider>
  );
}
