import React, { useInsertionEffect, useState, useEffect } from "react";
import { WORK_FLOW } from "../../../common/navbarCostants";
import SwiperCore, { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ShortDescription() {
  const [showGradient, setShowGradient] = useState(true);

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakPoint: number = 550;
  const [isPhone, setIsPhone] = useState(false);

  SwiperCore.use([Mousewheel]);

  const widthWindow: number = window.innerWidth;

  useEffect(() => {
    const changeWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);

    return window.removeEventListener("resize", changeWidth);
  }, []);

  return (
    <Swiper
      slidesPerView={width < breakPoint ? 3 : 5}
      freeMode
      grabCursor
      keyboard
      mousewheel
      onReachEnd={() => setShowGradient(false)}
      onFromEdge={() => setShowGradient(true)}
    >
      {WORK_FLOW.map((work, i) => {
        return (
          <SwiperSlide key={i}>
            <div className=" h-20px  p-[0.5rem] rounded-[6px] m-[2rem] text-center shadow-lg w-[10rem]">
              {work.work}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ShortDescription;
