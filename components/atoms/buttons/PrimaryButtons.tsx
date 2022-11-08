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
      <button className="input__submit" type="submit" onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default PrimaryButton;
