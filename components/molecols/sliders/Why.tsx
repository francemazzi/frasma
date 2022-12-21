import React, { useInsertionEffect, useState, useEffect } from "react";
import { WORK_WHY } from "../../../common/navbarCostants";

function Why() {
  return (
    <div className="flex flex-col items-center w-screen my-[20px] lg:my-[7rem]">
      <div className="text-[22px] text-center ">Perchè contattarmi?</div>
      <div className="flex flex-col justify-center items-center lg:flex-row ">
        {WORK_WHY.map((why, link) => {
          return (
            <div key={link} className="p-[1rem] my-[10px]">
              <div className="text-[18px] p-[0.4rem]">{why.title}</div>
              <div>{why.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Why;
