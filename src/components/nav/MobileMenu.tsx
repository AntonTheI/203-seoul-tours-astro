import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import Links from "./Links";
import { XIcon } from "lucide-react";
import FooterBrand from "../layout/FooterBrand";
import type { Tour } from "@/types/tour";

interface Props {
  currentPath?: string;
  tours?: Tour[];
}

const MobileMenu = ({ currentPath = "", tours = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="">
      <button
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        MobileMenu
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <nav className="flex flex-col fixed inset-0 h-full bg-white z-100 overflow-y-auto">
            <div className="flex justify-between px-4 py-2">
              <Logo />
              <button aria-label="Close menu" onClick={() => setIsOpen(false)}>
                <XIcon />
              </button>
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <Links
                className="flex flex-col gap-4 text-2xl font-semibold p-5 text-medium-chromatic-teal"
                currentPath={currentPath}
                tours={tours}
              />
              <div className="bg-dark-chromatic-teal py-10">
                <FooterBrand />
              </div>
            </div>
          </nav>,
          document.body,
        )}
    </div>
  );
};

export default MobileMenu;
