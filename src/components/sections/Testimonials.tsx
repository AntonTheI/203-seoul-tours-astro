import { useState } from "react";
import Review from "../ui/Review";

const reviews = [
  {
    review:
      "When I went to Seoul, I had a lot of questions about this beautiful country and the best way to learn about a country is talking to locals. Jitse absorbed everything there is to know about the country, the history, the people, the food and all the curiosities in the country!",
    name: "John Doe",
    country: "Denmark",
  },
  {
    review:
      "When I went to Seoul, I had a lot of questions about this beautiful country and the best way to learn about a country is talking to locals. Jitse absorbed everything there is to know about the country, the history, the people, the food and all the curiosities in the country!",
    name: "John Snow",
    country: "England",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => {
      if (i >= reviews.length - 1) return i;
      return i + 1;
    });
  };

  const prev = () => {
    setIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-4 px-5 py-section-lg  md:px-22 lg:px-32  ">
        <h4 className="accent-label text-center">REVIEWS</h4>
        <h2 className="text-section font-semibold leading-none text-center">
          Don't just take my word for it
        </h2>
        <div className="bg-white p-10 rounded-2xl">
          <Review review={reviews[index]} />
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={() => next()}>Next</button>
          <button onClick={() => prev()}>Prev</button>
        </div>
        <button></button>
      </div>
    </div>
  );
};

export default Testimonials;
