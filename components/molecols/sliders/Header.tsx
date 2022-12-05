import React from "react";
import Image from "next/image";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";

type prop = {
  label: string;
};

const SliderOne: React.FC<prop> = ({ label }) => {
  return (
    <div className="w-full">
      <div className="h-screen relative">
        <div className="flex flex-col justify-center items-center bg-[#141414]  absolute right-0 bottom-0 w-screen h-screen">
          <Image
            objectFit="cover"
            layout="fill"
            src="/image/slideIntro.jpg"
            alt="header background"
            priority
          />
          <div className="relative flex flex-col justify-center items-center">
            <div className="font-bold text-white text-5xl px-[20px] ">
              {label}
            </div>
            <PrimaryButton
              label="Fissa ora un incontro"
              onClick={() => {
                window.open(
                  "https://calendly.com/francescomazzi/15min",
                  "_blank"
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderOne;
