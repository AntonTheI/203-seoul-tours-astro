import Links from "../nav/Links";

const mediaLinks = [
  { logoName: "instagram", logo: "/assets/images/instagram.svg" },
  { logoName: "spotify", logo: "/assets/images/spotify.svg" },
  { logoName: "linkedin", logo: "/assets/images/linkedin.svg" },
  { logoName: "facebook", logo: "/assets/images/facebook.svg" },
  { logoName: "linktree", logo: "/assets/images/linktree.svg" },
];

const Footer = () => {
  return (
    <footer className=" text-dark-atmospheric-teal ">
      <div className="bg-dark-chromatic-teal">
        <div className="max-w-7xl mx-auto flex flex-col py-6 px-5 lg:flex-row md:px-22 md:py-10 lg:py-14 lg:px-32 lg:justify-between">
          <div className="flex flex-col lg:flex-1">
            <img
              src="/assets/images/logo wide.svg"
              alt="wide logo"
              className="flex justify-center h-15 w-auto lg:h-23"
            />

            <div>
              <div>
                <p className="text-center text-lg">
                  Seoul · Curiosity · Walking tours · Stories
                </p>
              </div>

              <div className="flex justify-center gap-4 my-6">
                {mediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex rounded-full border p-2 lg:min-w-13.5"
                  >
                    <img
                      src={link.logo}
                      alt={link.logoName}
                      className="flex justify-center items-center h-6.25 w-6.25 lg:h-9 lg:w-9 "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:flex-1 lg:flex lg:justify-center">
            <hr />
            <div className="w-[0.5px] bg-dark-atmospheric-teal"></div>
          </div>

          <div className="flex justify-between lg:flex-1">
            <div className="mt-6">
              <h4 className="text-accent-orange-23 text-sm mb-4">EXPLORE</h4>
              <Links className="flex flex-col gap-2" />
            </div>
            <div className="mt-6">
              <h4 className="text-accent-orange-23 text-sm mb-4">
                GET IN TOUCH
              </h4>
              <p className="underline">contact@jitsejager.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-teal ">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-4 text-dark-atmospheric-teal p-5 lg:flex-row lg:justify-between lg:px-32 ">
          <h4 className="text-xs">
            © 2026 이공삼 (Igongsam). All rights reserved.
          </h4>
          <p className="text-[10px] text-center ">
            상호: 이공삼 (Igongsam) | 대표자: Jitse Jager | 등록번호:
            548-27-02017
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
