import React, { useInsertionEffect, useState, useEffect } from "react";
import { WORK_WHY } from "../../../common/navbarCostants";

function Why() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const breakPoint: number = 580;

  useEffect(() => {
    const changeWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);

    return window.removeEventListener("resize", changeWidth);
  }, [width]);

  console.log(width);

  return (
    <div>
      <div className="text-[22px] text-center w-full ">Perchè contattarmi?</div>
      <div
        className={
          width < breakPoint
            ? "flex flex-col items-center"
            : "flex flex-row items-center"
        }
      >
        {WORK_WHY.map((why, link) => {
          return (
            <div key={link} className="p-[1rem] m-[10px] w-[30rem]">
              <div className="text-[18px] p-[0.8rem]">{why.title}</div>
              <div>{why.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Why;
