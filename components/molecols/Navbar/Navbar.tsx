import { useState } from "react";
import { navBarLinks } from "../Navbar/navbarCostants";

const NavBar = () => {
  return (
    <div className="bg-black flex justify-between items-center py-4 px-10">
      <div>
        <div className="text-white flex">
          {navBarLinks.map((link, i) => {
            return (
              <div key={i}>
                <a
                  className="px-5 py-2 hover:text-green-400"
                  href={
                    link === "Home Page"
                      ? "/"
                      : link === "About Us"
                      ? "/aboutUs"
                      : "/contactUs"
                  }
                >
                  {link}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-white">LOGO</div>
    </div>
  );
};

export default NavBar;
