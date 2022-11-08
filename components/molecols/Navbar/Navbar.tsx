import { useState } from "react";
import { navBarLinks } from "../Navbar/navbarCostants";

const NavBar = () => {
  return (
    <div className="bg-neutral-50 py-4 px-4 flex flex-row justify-between items-center drop-shadow-lg">
      {navBarLinks.map((link, i) => {
        return (
          <div key={i} className="text-[#000] font-bold">
            <a
              className="px-5 py-2 hover:text-[#CDFCF6]"
              href={
                link === "Frasma 🔥"
                  ? "/"
                  : link === "About Me"
                  ? "/AboutMe"
                  : "/ContactMe"
              }
            >
              {link}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
