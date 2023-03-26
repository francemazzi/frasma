import Head from "next/head";
import Image from "next/image";
import SliderOne from "../components/molecols/sliders/Header";
import Footer from "../components/molecols/footer/Footer";
import ShortDescription from "../components/molecols/shortDescription/ShortDescription";
import ShortPresentation from "../components/molecols/shortDescription/ShortPresentation";
import Why from "../components/molecols/sliders/Why";
import Portofolio from "../components/molecols/portfolio/Portofolio";
import InputField from "../components/molecols/inputs/InputField";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frasma - Food web3 Onfire</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SliderOne label="Investo il mio tempo nella tua startup" />
      <ShortPresentation />
      <ShortDescription />
      <Why />
      <Portofolio />
      <InputField />
      <Footer />
    </>
  );
}
