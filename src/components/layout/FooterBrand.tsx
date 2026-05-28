const mediaLinks = [
  { logoName: "instagram", logo: "/assets/instagram.svg" },
  { logoName: "spotify", logo: "/assets/spotify.svg" },
  { logoName: "linkedin", logo: "/assets/linkedin.svg" },
  { logoName: "facebook", logo: "/assets/facebook.svg" },
  { logoName: "linktree", logo: "/assets/linktree.svg" },
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
          {mediaLinks.map((link, index) => (
            <div
              key={index}
              className="flex rounded-full border p-2 lg:min-w-13.5 "
            >
              <img
                src={link.logo}
                alt={link.logoName}
                className="flex justify-center items-center h-6.25 w-6.25 lg:h-9 lg:w-9 hover:text-accent-orange-23"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBrand;
