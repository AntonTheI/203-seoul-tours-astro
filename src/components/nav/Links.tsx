import { useState, useEffect } from "react";
import type { Tour } from "@/types/tour";
interface Props {
  className?: string;
  currentPath?: string;
  linkProps?: string;
  tours?: Tour[];
}

interface NavItem {
  href?: string;
  label: string;
  tours?: Array<{ href: string; label: string }>;
}

const Links = ({
  className = "",
  currentPath = "",
  linkProps = "",
  tours = [],
}: Props) => {
  const [toursOpen, setToursOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/concierge", label: "Concierge" },
    {
      label: "Tours",
      tours: tours.map((tour) => ({
        href: `/tours/${tour.slug.current}`,
        label: tour.title,
      })),
    },
    { href: "/tailored-walks", label: "Tailored walks" },
  ];

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
                className="cursor-pointer text-medium-chromatic-teal hover:text-accent-orange-23"
              >
                {item.label}
              </button>
              {toursOpen && (
                <ul className="absolute p-2 -left-2 -bottom-34 bg-natural-light/80 backdrop-blur-xs">
                  {item.tours.map((tour) => (
                    <li key={tour.href}>
                      <a className={` ${linkProps}`} href={tour.href}>
                        {tour.label}
                      </a>
                    </li>
                  ))}
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
