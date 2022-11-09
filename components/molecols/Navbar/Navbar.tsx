import { useState, useEffect } from "react";
import { navBarLinks } from "../../../common/navbarCostants";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>();

  useEffect(() => {
    const pathName = router.pathname;
    setCurrentRoute(pathName);
  }, []);

  return (
    <div className="bg-neutral-50 py-4 px-4 flex flex-row justify-between items-center drop-shadow-lg">
      {navBarLinks.map((link, i) => {
        return (
          <div key={i} className="text-[#000] font-bold">
            <a
              className={`px-5 py-2 ${
                currentRoute === link.href && "text-[red]"
              } hover:text-[#CDFCF6]`}
              href={link.href}
            >
              {link.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
