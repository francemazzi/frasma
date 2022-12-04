import React, { useEffect, useState } from "react";
import SwiperCore, { Mousewheel } from "swiper";
import { PORTFOLIO } from "../../../common/navbarCostants";
import Image from "next/image";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";
import Link from "next/link";

function Portofolio() {
  const [showGradient, setShowGradient] = useState(true);

  return (
    <div className="my-[30px]">
      <div className="text-[22px] text-center font-bold my-[10px]">
        La mia esperienza
      </div>
      <div className="flex flex-row items-center md:justify-center overflow-x-scroll">
        {PORTFOLIO.map((data, i) => {
          return (
            <div
              key={i}
              className="flex flex-col w-[40rem] items-center rounded-[12px] shadow-lg mx-[5px] h-[40rem] lg:h-[30rem] relative "
            >
              <div className="relative h-[15rem] w-full">
                <Image
                  src={data.img}
                  alt="photo not upload"
                  objectFit="cover"
                  layout="fill"
                  className="rounded-t-[12px]"
                  priority
                />
              </div>
              <div className="p-[1rem]">
                <div className="p-[0.8rem] text-[18px]">{data.titolo}</div>
                <div>{data.description}</div>
              </div>

              <Link
                href={data.site}
                target="_blank"
                className="p-[0.5rem] bg-slate-300 rounded-[12px] m-[10px] absolute  bottom-0"
              >
                Visita il sito
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Portofolio;
