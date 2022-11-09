import React from "react";
import Image from "next/image";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";

type prop = {
  label: string;
};

const SliderOne: React.FC<prop> = ({ label }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('/public/img/slideIntro.jpg')] w-full h-[90vh]  bg-no-repeat bg-cover">
      <div className="font-bold text-black text-6xl p-2">{label}</div>
      <PrimaryButton label="Scopri di più"></PrimaryButton>
    </div>
  );
};

export default SliderOne;
