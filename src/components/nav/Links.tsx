interface Props {
  className?: string;
  currentPath?: string;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/concierge", label: "Concierge" },
  { href: "/tours/seoul-markets-tour", label: "Tours" },
  { href: "/tailored-walks", label: "Tailored walks" },
];

const Links = ({ className = "", currentPath = "" }: Props) => {
  return (
    <ul className={className}>
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            // className={currentPath === item.href ? "text-accent-orange-23" : ""}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Links;
