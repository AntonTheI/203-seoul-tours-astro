import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    review:
      "When I went to Seoul, I had a lot of questions about this beautiful country and the best way to learn about a country is talking to locals. Jitse absorbed everything there is to know about the country, the history, the people, the food and all the curiosities in the country!",
    name: "John Doe",
    country: "Denmark",
  },
  {
    review:
      "The market tour was the highlight of my entire trip to Korea. Jitse knew every vendor by name and the stories behind each stall made it feel like stepping into a living museum. I left with full hands and an even fuller heart.",
    name: "Sophie Laurent",
    country: "France",
  },
  {
    review:
      "I've done walking tours in cities all over the world and this was genuinely one of the best. The pace was perfect, the history was fascinating, and Jitse had a gift for making everything feel personal rather than scripted.",
    name: "Marcus Webb",
    country: "United Kingdom",
  },
  {
    review:
      "We did the 3-day group workshop and came back with photos we're genuinely proud of. Beyond the photography tips, we got an insider's view of Seoul that no guidebook could give you.",
    name: "Annika Johansson",
    country: "Sweden",
  },
  {
    review:
      "I was nervous about joining a group tour as a solo traveler but the group was warm and the atmosphere was relaxed from the start. By the end of day one we all felt like old friends exploring the city together.",
    name: "Carlos Mendes",
    country: "Brazil",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = (newIndex: number, dir: "left" | "right") => {
    setVisible(false);
    setDirection(dir);
    setTimeout(() => {
      setIndex(newIndex);
      setVisible(true);
    }, 250);
  };

  const next = () => goTo((index + 1) % reviews.length, "right");
  const prev = () => goTo(index <= 0 ? reviews.length - 1 : index - 1, "left");

  useEffect(() => {
    const timer = setTimeout(() => next(), 3000);
    return () => clearTimeout(timer);
  }, [index]);

  const review = reviews[index];

  const translateClass = visible
    ? "translate-x-0"
    : direction === "right"
      ? "-translate-x-6"
      : "translate-x-6";

  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 px-5 py-section-lg md:px-22 lg:px-32">
        <h4 className="reveal accent-label text-center">REVIEWS</h4>
        <h2 className="reveal text-section font-semibold leading-none text-center">
          Don't just take my word for it
        </h2>

        <div className="overflow-hidden w-full max-w-2xl">
          <div
            className={`bg-white rounded-2xl px-10 py-12 w-full flex flex-col items-center gap-6 transition-all duration-300 ease-in-out ${translateClass} ${visible ? "opacity-100" : "opacity-0"}`}
          >
            <Quote size={32} className="text-accent-orange-23" />
            <p className="text-center text-lg leading-relaxed">{review.review}</p>
            <div className="text-center">
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-black/50">{review.country}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 cursor-pointer transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > index ? "right" : "left")}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${i === index ? "bg-accent-orange-23" : "bg-zinc-300"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 cursor-pointer transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
