import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINK } from "../../../common/navbarCostants";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>();

  // useEffect(() => {
  //   const pathName = router.pathname;
  //   setCurrentRoute(pathName);
  // }, []);
  return (
    <div>
      <div className="bg-neutral-50 py-4 px-4  drop-shadow-lg">
        <div className="text-[#000] font-bold hover:text-[#CDFCF6] flex flex-row justify-center items-center">
          {NAV_LINK.map((link, i) => {
            return (
              <div key={i} className="text-[#000] font-bold">
                <div>
                  <a
                    className={`px-5 py-2 ${
                      currentRoute === link.href && "text-[red]"
                    } hover:text-[#CDFCF6]`}
                    href={link.href}
                  >
                    {link.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center p-[10px] flex items-center justify-center gap-2">
        <span>Made with 👽 and</span>
        <Image
          src="/logo-frasma.png"
          alt="Frasma"
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
        />
        <span>Frasma</span>
      </div>
    </div>
  );
};

export default Footer;
