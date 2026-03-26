import React from "react";

const Introduction = () => {
  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto py-section-lg px-5 md:px-22 lg:px-32">
        {/* <img
        className="w-32 h-32 rounded-full object-cover float-right m-2"
        src="/assets/images/jitseProfilePic.jpg"
        alt="picture of Jitse"
      /> */}
        <div className="space-y-3">
          <p className="accent-label">YOUR GUIDE</p>
          <h2 className="text-section font-semibold">Walk with me for a bit</h2>
          <p>
            Seoul can feel overwhelming once you step off familiar paths.
            <br />
            I'm Jitse, a Dutch guide living in Seoul with my Korean wife. I've
            come to know the city by walking it, by watching it, and by living
            it.
          </p>
          <p className="text-accent-orange-90">Learn more about me</p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
