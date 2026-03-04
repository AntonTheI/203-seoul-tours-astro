const AboutTours = () => {
  return (
    <div className="relative bg-medium-chromatic-teal h-85">
      <img
        className="w-full h-full object-cover"
        src="/assets/images/namsan.jpg"
        alt="graffity of namsan"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto  px-5 py-14 lg:py-16 space-y-3 md:px-22 lg:px-32">
        <h2 className="text-dark-chromatic-teal text-section font-semibold">
          Curiosity leads the way
        </h2>
        <p className="text-medium-chromatic-teal">
          These tours are not built around highlights, but around a desire to
          understand Seoul as it is lived today. By paying attention to the
          people who live here, their everyday routines, and lived spaces, the
          city begins to explain itself. Past and present are never far apart in
          Seoul.
        </p>
      </div>
    </div>
  );
};

export default AboutTours;
