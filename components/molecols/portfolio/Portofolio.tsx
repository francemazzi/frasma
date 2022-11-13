import React, { useEffect, useState } from "react";
import SwiperCore, { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PORTFOLIO } from "../../../common/navbarCostants";
import Image from "next/image";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";
import Link from "next/link";

function Portofolio() {
  SwiperCore.use([Mousewheel]);
  const [showGradient, setShowGradient] = useState(true);
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const breakPoint: number = 550;

  SwiperCore.use([Mousewheel]);

  useEffect(() => {
    const changeWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);

    return window.removeEventListener("resize", changeWidth);
  }, [width]);
  return (
    <div className="p-[2rem]">
      <div className="text-[22px] text-center font-bold">La mia esperienza</div>
      <Swiper
        className="flex flex-row items-center"
        slidesPerView={width < breakPoint ? 2 : 5}
        freeMode
        grabCursor
        keyboard
        mousewheel
        onReachEnd={() => setShowGradient(false)}
        onFromEdge={() => setShowGradient(true)}
      >
        {PORTFOLIO.map((data, i) => {
          return (
            <SwiperSlide
              key={i}
              className="w-[22rem]  flex flex-col items-center rounded-[12px] shadow-lg m-[10px]"
            >
              {/* <div className="h-[8rem] w-full absolute right-0 top-0"> */}
              <Image
                objectFit="cover"
                width={500}
                height={500}
                src={data.img}
                alt="header background"
                className="rounded-t-[12px]"
                priority
              />
              {/* </div> */}
              <div className="p-[2rem]">
                <div className="p-[0.8rem] text-[18px]">{data.titolo}</div>
                <div>{data.description}</div>
              </div>

              <Link
                href={data.site}
                target="_blank"
                className="p-[0.5rem] bg-slate-300 rounded-[12px] m-[10px]"
              >
                Visita il sito
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Portofolio;
