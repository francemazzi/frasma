import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/molecols/sliders/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frasma - Food web3 Onfire</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center h-screen bg-header-back w-full">
        <Header label="Food on Web3 is on fire " />
      </div>
    </div>
  );
}
