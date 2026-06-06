import type { Tour } from "@/types/tour";

export interface NavItem {
  href?: string;
  label: string;
  tours?: Array<{ href: string; label: string }>;
  tailoredMade?: { href: string; label: string };
}

export function getNavItems(tours: Tour[]) {
  return [
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
}
