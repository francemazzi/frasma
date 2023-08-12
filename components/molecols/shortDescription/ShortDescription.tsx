import React, { useInsertionEffect, useState, useEffect } from "react";
import { WORK_FLOW } from "../../../common/navbarCostants";

function ShortDescription() {
  return (
    <div className="flex flex-row lg:items-center lg:justify-center overflow-x-scroll py-[50px]">
      {WORK_FLOW.map((work, i) => {
        return (
          <div key={i}>
            <div className="h-[30px] p-[15px] rounded-[12px] m-[10px] text-center shadow-lg w-[14rem]  ">
              {work.work}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShortDescription;
