import React, { useInsertionEffect, useState, useEffect } from "react";
import { WORK_FLOW } from "../../../common/navbarCostants";
import SwiperCore, { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ShortDescription() {
  // const [showGradient, setShowGradient] = useState(true);
  // // const widthWindow: number = window.innerWidth;
  // const [width, setWidth] = useState(
  //   typeof window !== "undefined" && window.innerWidth
  // );
  // const breakPoint: number = 550;

  // SwiperCore.use([Mousewheel]);

  // useEffect(() => {
  //   const changeWidth = () => setWidth(window.innerWidth);
  //   window.addEventListener("resize", changeWidth);

  //   return window.removeEventListener("resize", changeWidth);
  // }, [width]);

  return (
    <div
      className="flex flex-row lg:items-center lg:justify-center overflow-x-scroll py-[20px]"
      // slidesPerView={width < breakPoint ? 2 : 3}
      // // slidesPerView={"auto"}
      // freeMode
      // grabCursor
      // keyboard
      // mousewheel
      // onReachEnd={() => setShowGradient(false)}
      // onFromEdge={() => setShowGradient(true)}
    >
      {WORK_FLOW.map((work, i) => {
        return (
          <div key={i}>
            <div className="h-30px  p-[15px] rounded-[12px] m-[10px] text-center shadow-lg w-[14rem]">
              {work.work}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShortDescription;
