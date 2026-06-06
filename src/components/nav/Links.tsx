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
  tailoredMade?: { href: string; label: string };
}

const Links = ({
  className = "",
  currentPath = "",
  linkProps = "",
  tours = [],
}: Props) => {
  const [toursOpen, setToursOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Tours",
      tours: tours.map((tour) => ({
        href: `/tours/${tour.slug.current}`,
        label: tour.title,
      })),
      tailoredMade: { href: "/tailored-walks", label: "Tailored made" },
    },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    // { href: "/concierge", label: "Concierge" },
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
                <ul className="absolute p-2 -left-2 bg-natural-light/80 backdrop-blur-xs py-5">
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
