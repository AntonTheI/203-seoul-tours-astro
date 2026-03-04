import { useState, useEffect } from "react";
import Logo from "./Logo";
import Links from "./Links";

const MobileMenu = ({ currentPath = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        MobileMenu
      </button>

      {isOpen && (
        <nav className="fixed inset-0 h-full bg-white z-50 overflow-y-auto">
          <div>
            <div className="flex justify-between px-4 py-2">
              <Logo />
              <button aria-label="Close menu" onClick={() => setIsOpen(false)}>
                X
              </button>
            </div>
          </div>
          <div className="p-5">
            <Links
              className="flex flex-col gap-4 text-2xl font-semibold"
              currentPath={currentPath}
            />
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
