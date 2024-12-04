import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/molecols/Navbar/Navbar";
import Footer from "../components/molecols/footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
