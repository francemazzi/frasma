import React from "react";
import Image from "next/image";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";

type prop = {
  label: string;
};

const SliderOne: React.FC<prop> = ({ label }) => {
  return (
    <div className="w-screen h-screen relative">
      <div className="flex flex-col justify-center items-center bg-[#141414]   bg-no-repeat bg-cover absolute top-0 left-0 right-0 bottom-0 w-screen h-screen">
        {/* <Image
          objectFit="cover"
          layout="fill"
          src="/public/img/slideIntro.jpg"
          alt="header background"
        /> */}
        <div className="font-bold text-white text-6xl p-[2rem]">{label}</div>
        <PrimaryButton label="Scopri di più"></PrimaryButton>
      </div>
    </div>
  );
};

export default SliderOne;
