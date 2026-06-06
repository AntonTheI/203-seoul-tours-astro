import Links from "../nav/Links";
import Logo from "../nav/Logo";
import Book from "../nav/Book";
import MobileMenu from "../nav/MobileMenu";
import { useEffect, useState } from "react";
import type { Tour } from "@/types/tour";

interface Props {
  currentPath?: string;
  linkProps?: string;
  tours?: Tour[];
}

const Navbar = ({ currentPath = "", tours = [] }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full py-2 top-0 z-50 transition-all duration-300 bg-natural-light ${scrolled ? "border-b-[0.5px] border-gray-200 bg-natural-light/80 backdrop-blur-xs" : "text-dark-chromatic-teal"}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-22 lg:px-32  ">
        <div className="flex justify-between items-center lg:hidden">
          <MobileMenu currentPath={currentPath} tours={tours} />
          <Book />
        </div>

        <div className="hidden lg:flex lg:justify-between items-center">
          <Logo />
          <Links
            className="hidden md:flex justify-between gap-8 "
            currentPath={currentPath}
            linkProps="text-medium-chromatic-teal hover:text-accent-orange-23 flex"
            tours={tours}
          />
          {/* <div className="flex justify-end">
            <Book />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
