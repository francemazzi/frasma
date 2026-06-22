import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINK } from "../../../common/navbarCostants";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [isScrolled, setIsScrolled] = useState<boolean>();

  //Router modify
  // useEffect(() => {
  //   const pathName = router.pathname;
  //   setCurrentRoute(pathName);
  // }, []);

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
    <div
      className={`${
        isScrolled
          ? "bg-[#ffffff05] animate-pulse "
          : "bg-neutral-50 flex flex-col items-center justify-center"
      }`}
    >
      <div className=" py-4 px-4 flex flex-row justify-between items-center drop-shadow-lg ">
        <div>
          <a
            className={`px-5 py-2 text-[28px] ${
              currentRoute === "/" && "text-[red]"
            } text-[#000] font-bold flex items-center gap-3`}
            href={"/"}
          >
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <span>Frasma</span>
          </a>
        </div>

        {/* <div className="flex flex-row">
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
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
