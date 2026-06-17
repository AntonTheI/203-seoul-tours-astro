import { SiInstagram, SiSubstack, SiLinktree } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiSubstack, label: "Substack", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: SiLinktree, label: "Linktree", href: "#" },
];

const FooterBrand = () => {
  return (
    <div className="flex flex-col lg:flex-1">
      <img
        src="/assets/logo wide.svg"
        alt="wide logo"
        className="flex justify-center h-15 w-auto lg:h-23"
      />
      <div>
        <p className="text-center text-lg">
          Seoul · Curiosity · Walking tours · Stories
        </p>
        <div className="flex justify-center gap-4 my-6">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border w-10 h-10 lg:w-13.5 lg:h-13.5 border-medium-atmospheric-teal text-medium-atmospheric-teal hover:text-accent-orange-23 hover:border-accent-orange-23 transition-colors duration-200"
            >
              <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBrand;
