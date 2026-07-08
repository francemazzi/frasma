import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import WebMcpProvider from "../components/agent/WebMcpProvider";
import { LanguageProvider } from "../lib/i18n/context";

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
      <WebMcpProvider />
      <Component {...pageProps} />
      {showChat && <ChatWidget />}
    </LanguageProvider>
  );
}
