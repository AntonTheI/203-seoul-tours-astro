import Links from "../nav/Links";
import Logo from "../nav/Logo";
import Book from "../nav/Book";
import MobileMenu from "../nav/MobileMenu";
import { useEffect, useState } from "react";

interface Props {
  currentPath?: string;
}

const Navbar = ({ currentPath = "" }: Props) => {
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
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center lg:hidden">
          <MobileMenu currentPath={currentPath} />
          <Book />
        </div>

        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center">
          <Logo />
          <Links
            className="hidden md:flex justify-between gap-8"
            currentPath={currentPath}
          />
          <div className="flex justify-end">
            <Book />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
