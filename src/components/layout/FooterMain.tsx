import Links from "../nav/Links";
import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";

const mediaLinks = [
  { logoName: "instagram", logo: "/assets/images/instagram.svg" },
  { logoName: "spotify", logo: "/assets/images/spotify.svg" },
  { logoName: "linkedin", logo: "/assets/images/linkedin.svg" },
  { logoName: "facebook", logo: "/assets/images/facebook.svg" },
  { logoName: "linktree", logo: "/assets/images/linktree.svg" },
];
const FooterMain = () => {
  return (
    <div className="bg-dark-chromatic-teal">
      <div className="max-w-7xl mx-auto flex flex-col py-6 px-5 lg:flex-row md:px-22 md:py-10 lg:py-14 lg:px-32 lg:justify-between">
        <FooterBrand />
        <div className="lg:flex-1 lg:flex lg:justify-center">
          <hr />
          <div className="w-[0.5px] bg-dark-atmospheric-teal"></div>
        </div>
        <FooterNav />
      </div>
    </div>
  );
};

export default FooterMain;
