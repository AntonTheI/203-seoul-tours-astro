const services = [
  {
    name: "Personalised experience",
    description: "Built around your curiosity",
    icon: "/assets/target.svg",
  },
  {
    name: "Flexible in time and pace",
    description: "From a few hours to several days",
    icon: "/assets/lucide_clock.svg",
  },
  {
    name: "Theme- and location-driven",
    description: "Neighborhoods, themes, stories",
    icon: "/assets/mountain.svg",
  },
];

const TailoredWalks = () => {
  return (
    <div className="bg-medium-chromatic-teal">
      <div className="max-w-7xl mx-auto px-5  md:px-22 lg:px-32  py-section-lg">
        <div className=" text-center flex flex-col gap-4">
          <p className="flex justify-center accent-label lg:justify-start">
            TAILORED WALKS
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
            <div className="flex flex-1 flex-col w-full gap-4 lg:items-start lg:justify-between ">
              <h2 className="reveal text-section font-semibold leading-none lg:text-start text-natural-light">
                Looking for something more specific?
              </h2>
              <p className=" text-light-atmospheric-teal-70 lg:text-start">
                If you have particular interests, a limited time frame, or
                simply want my recommendation, I'm happy to design a walk that
                fits you.
              </p>
              <a
                href="/tailored-walks"
                className="flex justify-center w-full bg-accent-orange-23 px-14 py-4 rounded-full text-natural-light font-semibold"
              >
                Let's design a walk
              </a>
            </div>

            <div className="reveal w-full  flex flex-col flex-1 gap-4 lg:justify-between">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex self-start bg-[rgb(255,255,255,0.15)] w-full p-4 md:p-5 lg:p-5 rounded-3xl gap-4"
                >
                  <div className="p-2 bg-[rgb(255,255,255,0.20)] rounded-2xl w-14 h-14 flex justify-center items-center">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-9"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-baseline py-1">
                    <p className="text-natural-light">{service.name}</p>
                    <p className="text-xs text-light-atmospheric-teal-70">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailoredWalks;
