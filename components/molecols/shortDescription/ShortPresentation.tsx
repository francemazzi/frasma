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
    <div className="flex flex-col items-center my-[10px]">
      <div className="flex flex-row content-center items-center p-[10px]">
        <div className="flex flex-col items-center relative ">
          <div className="rounded-[50%] h-[8rem] w-[8rem] items-center ">
            <Image
              className="rounded-[50%]"
              src={"/image/profilo.jpg"}
              layout="fill"
              objectFit="cover"
              alt="francesco profilo"
              priority
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col p-[1rem] ">
            <div className="mb-[10px]">
              <div className="font-bold text-[20px]">Ciao sono Fra!🥕</div>
              <div className="font-semibold text-[20px]">
                Amo il marketing agroalimentare
              </div>
            </div>
            <div className="text-[18px]">
              Sto cercando un progetto di startup su cui investire il mio tempo
              libero, se mi piaci ti aiuterò. Solo un progetto.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortPresentation;
