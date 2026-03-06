import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "../lib/i18n/context";
import ChatWidget from "../components/organism/ChatWidget";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <ChatWidget />
    </LanguageProvider>
  );
}
