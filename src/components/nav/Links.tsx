import { useState, useEffect } from "react";
import type { Tour } from "@/types/tour";
import { getNavItems } from "./navItems";

interface Props {
  className?: string;
  currentPath?: string;
  linkProps?: string;
  tours?: Tour[];
  mobile?: boolean;
}

const Links = ({
  className = "",
  currentPath = "",
  linkProps = "",
  tours = [],
  mobile = false,
}: Props) => {
  const [toursOpen, setToursOpen] = useState(false);

  const navItems = getNavItems(tours);

  return (
    <ul className={className}>
      {navItems.map((item) => (
        <li key={item.label}>
          {item.label === "Tours" && item.tours ? (
            <div
              onMouseEnter={() => setToursOpen(true)}
              onMouseLeave={() => setToursOpen(false)}
              className="relative"
            >
              <button
                onClick={() => setToursOpen(!toursOpen)}
                className="cursor-pointer  hover:text-accent-orange-23 text-medium-chromatic-teal"
              >
                {item.label}
              </button>
              {toursOpen && (
                <ul className={`py-2 -left-2 pl-6 ${mobile ? "relative" : "absolute bg-natural-light/80 backdrop-blur-xs py-5"}`}>
                  {item.tours.map((tour) => (
                    <li key={tour.href}>
                      <a
                        className={`w-full whitespace-nowrap ${linkProps}`}
                        href={tour.href}
                      >
                        {tour.label}
                      </a>
                    </li>
                  ))}
                  <div className="p-3">
                    <hr />
                  </div>
                  <li>
                    <a
                      href={item.tailoredMade?.href}
                      className="text-medium-chromatic-teal hover:text-accent-orange-23"
                    >
                      {item.tailoredMade?.label}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <a href={item.href} className={linkProps}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Links;
