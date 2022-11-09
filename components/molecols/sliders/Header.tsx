import React from "react";
import Image from "next/image";

type prop = {
  label: string;
};

const Header: React.FC<prop> = ({ label }) => {
  return (
    <div className="bg-[url('/public/img/slideIntro.jpg')] w-full h-100  bg-no-repeat bg-cover">
      <div className="font-bold text-black text-6xl p-2">{label}</div>
    </div>
  );
};

export default Header;
