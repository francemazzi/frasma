import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LanguageProvider } from "../lib/i18n/context";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
      <div className={poppins.className}>
        <Component {...pageProps} />
        {showChat && <ChatWidget />}
      </div>
    </LanguageProvider>
  );
}
