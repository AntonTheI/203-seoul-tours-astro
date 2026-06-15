import { useState, useEffect } from "react";
import type { Tour } from "@/types/tour";
import { getNavItems } from "./navItems";
import { CircleChevronDown } from "lucide-react";

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
                className="cursor-pointer flex justify-center items-center gap-1 hover:text-accent-orange-23 text-medium-chromatic-teal"
              >
                {item.label}
                <p
                  className={`transition-transform duration-300 ease-out ${toursOpen ? "rotate-180" : ""}`}
                >
                  <CircleChevronDown size={12} />
                </p>
              </button>
              {toursOpen && (
                <ul
                  className={`pt-2 -left-6 px-6  ${mobile ? "relative" : "absolute bg-natural-light backdrop-blur-xs py-5 shadow"}`}
                >
                  {item.tours.map((tour) => (
                    <li key={tour.href} className="max-lg:px-4 max-md:mb-1">
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
                  <li>
                    <a
                      href="/about/#seoulphotoworkshops"
                      className="text-medium-chromatic-teal hover:text-accent-orange-23"
                    >
                      Seoul Photography Workshops
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
