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
        className="bg-red p-[5px] m-[20px] font-semibold"
        type="submit"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default PrimaryButton;
