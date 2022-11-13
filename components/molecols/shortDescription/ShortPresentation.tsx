import React, { useInsertionEffect, useState, useEffect } from "react";
import Image from "next/image";

function ShortPresentation() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const breakPoint: number = 550;

  useEffect(() => {
    const changeWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);

    return window.removeEventListener("resize", changeWidth);
  }, []);

  return (
    <div
      className={
        width > breakPoint
          ? "flex flex-row content-center items-center"
          : "flex flex-col content-center items-center"
      }
    >
      <div className="w-screen">
        <div className="flex flex-col p-[2rem] ">
          <div className=" pb-[1.5rem]">
            <div className="font-bold text-[22px]">Ciao sono Fra! 🥕</div>
            <div className="font-semibold text-[20px]">
              Esperto nel marketing agroalimentare
            </div>
          </div>
          <div className="text-[18px]">
            Lo sapevi che una buona strategia marketing può aumentare il tuo
            fatturato del 75?%
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center relative ">
        <div className="bg-[red] rounded-[50%] h-[15rem] w-[15rem] items-center ">
          <Image
            className="rounded-[50%]"
            src={"/img/profilo.JPG"}
            layout="fill"
            objectFit="cover"
            alt="francesco profilo"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default ShortPresentation;
