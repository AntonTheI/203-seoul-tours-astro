import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-section-sm lg:gap-col-gap py-section-lg px-5 md:px-22 lg:px-32">
        <div className=" w-full flex flex-col gap-4 lg:flex-1 justify-end lg:self-start max-lg:text-center">
          <p className="accent-label">REVIEWS</p>
          <h2 className="text-section font-semibold leading-none">
            Don't just take my word for it
          </h2>
        </div>

        <div className=" w-full flex flex-col gap-4 min-w-0 lg:flex-1 items-center">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {reviews.map((review, i) => (
                <CarouselItem key={i}>
                  <div className="bg-white rounded-2xl px-10 py-10 flex flex-col gap-6 justify-center items-center">
                    <Quote size={28} className="text-accent-orange-23" />
                    <p className="text-center leading-relaxed">
                      {review.review}
                    </p>
                    <div className="text-center">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-black/50">{review.country}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center gap-3 justify-center">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => api?.scrollPrev()}
              className=" cursor-pointer p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300  cursor-pointer ${
                  i === current
                    ? "w-6 bg-accent-orange-23"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}

            <button
              type="button"
              aria-label="Next review"
              onClick={() => api?.scrollNext()}
              className="cursor-pointer p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
