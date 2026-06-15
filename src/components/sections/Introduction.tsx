import React from "react";

const Introduction = () => {
  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto py-section-lg px-5 md:px-22 lg:px-32">
        <div className="flex gap-section-sm items-center flex-col md:flex-row">
          <div className="reveal space-y-3 flex-1">
            <p className="accent-label">YOUR GUIDE</p>
            <h2 className="text-section font-semibold">
              Walk with me for a bit
            </h2>
            <p>
              Seoul can feel overwhelming once you step off familiar paths.
              <br />
              I'm Jitse, a Dutch guide living in Seoul with my Korean wife. I've
              come to know the city by walking it, by watching it, and by living
              it.
            </p>
            <a href="/about/">
              <p className="text-medium-chromatic-teal hover:text-accent-orange-23">
                Learn more about me
              </p>
            </a>
          </div>
          <div className="reveal w-52 h-52 shrink-0">
            <img
              className="w-full h-full rounded-full object-cover"
              src="/assets/images/jitseProfilePic.jpg"
              alt="picture of Jitse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
