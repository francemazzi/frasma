import { useState, useEffect } from "react";
import { NAV_LINK } from "../../../common/navbarCostants";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [isScrolled, setIsScrolled] = useState<boolean>();

  //Router modify
  useEffect(() => {
    const pathName = router.pathname;
    setCurrentRoute(pathName);
  }, []);

  //scroll menu trasnparent
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${isScrolled ? "bg-[#ffffff09]" : "bg-neutral-50"}`}>
      <div className=" py-4 px-4 flex flex-row justify-between items-center drop-shadow-lg">
        <div>
          <a
            className={`px-5 py-2 ${
              currentRoute === "/" && "text-[red]"
            } text-[#000] font-bold `}
            href={"/"}
          >
            Frasma 🔥
          </a>
        </div>

        <div className="flex flex-row">
          {NAV_LINK.map((link, i) => {
            return (
              <div key={i}>
                <a
                  className={`px-5 py-2 text-[#000] font-bold ${
                    currentRoute === link.href
                  } hover:text-[#CDFCF6]`}
                  href={link.href}
                >
                  {link.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
