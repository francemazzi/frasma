import React, { useRef, useState, useEffect } from "react";

type Props = {
  label: string;
  onClick?: () => void;
  href?: string;
};

const PrimaryButton: React.FC<Props> = ({
  label,
  onClick = () => {},
  href,
}) => {
  return (
    <>
      <button
        className="bg-[red] p-[10px] m-[20px] font-semibold rounded-[12px] text-white hover:p-[8px]  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-300 hover:text-[red] duration-300"
        type="submit"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default PrimaryButton;
