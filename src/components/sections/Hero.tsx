const Hero = () => {
  return (
    <div className="relative max-w-7xl mx-auto flex justify-center items-center h-125 md:h-116 lg:h-150">
      {/* <img
        className="w-full h-full"
        src="/assets/images/namsan.jpg"
        alt="graffity of namsan"
      /> */}
      <div className="absolute flex flex-col gap-5 px-4 max-w-md text-center ">
        <h1 className="text-hero font-bold leading-none">
          Seoul. Beyond the obvious
        </h1>
        <p className="text-lg">
          Unhurried, thoughtful walking tours People, places, and the rhythms of
          daily life.
        </p>
        <button className="text-lg bg-accent-orange-23 rounded-full p-3.5 font-semibold text-natural-light">
          Book a Walk
        </button>
      </div>
    </div>
  );
};

export default Hero;
