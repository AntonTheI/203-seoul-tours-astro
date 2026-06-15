import type { Tour } from "@/types/tour";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tagColors: Record<string, string> = {
  popular: "rgb(191, 231, 255)",
  scenery: "#46718C",
  food: "#335266",
  culture: "#8C6646",
  history: "#4a8a8a",
  none: "",
};

const TourCard = ({ tours = [] }: { tours: Tour[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 py-section-lg px-5 md:px-22 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="reveal flex flex-col flex-2/3">
            <p className="accent-label mb-4">EXPLORE TOURS</p>
            <h2 className="text-section leading-none font-semibold">
              Hand crafted experiences
            </h2>
            <p className="mt-4">
              Each of the following tours is carefully designed around a
              specific theme or destination, allowing you to experience a
              distinct side of Seoul.
            </p>
          </div>

          <div className="hidden lg:flex flex-1/3 justify-end gap-4">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={() => api?.scrollPrev()}
              className="p-1 text-gray-400 hover:text-medium-chromatic-teal transition-colors border rounded-full cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              aria-label="Next tour"
              onClick={() => api?.scrollNext()}
              className="p-1 text-gray-400 hover:text-medium-chromatic-teal transition-colors border rounded-full cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="w-full reveal"
        >
          <CarouselContent>
            {tours.map((tour) => (
              <CarouselItem
                key={tour.slug.current}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col rounded-4xl bg-white overflow-hidden border-[0.5px] border-gray-400 h-full">
                  <div className="relative shrink-0">
                    <img
                      loading="lazy"
                      className="aspect-3/2 object-cover w-full"
                      src={
                        tour.heroImage.url || "/assets/images/marketLady.jpg"
                      }
                      alt={tour.heroImage.alt}
                    />
                    {tour.tags?.[0] && (
                      <div
                        className="absolute top-6 -left-10 text-medium-chromatic-teal py-2 text-[15px] px-14 font-medium -rotate-45"
                        style={{ background: tagColors[tour.tags[0]] }}
                      >
                        {tour.tags[0].charAt(0).toUpperCase() +
                          tour.tags[0].slice(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div>
                      <h3 className="text-subsection font-semibold mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-[15px]/6 font-normal text-[#555555] line-clamp-3">
                        {tour.cardDescription}
                      </p>
                    </div>
                    <div className="flex justify-center rounded-full border-accent-orange-23 border py-4 px-6 mt-auto group hover:bg-accent-orange-23 transition-colors">
                      <a
                        href={`/tours/${tour.slug.current}`}
                        className="font-medium text-medium-chromatic-teal group-hover:text-natural-light transition-colors"
                      >
                        Explore this tour
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center items-center gap-3">
          {tours.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to tour ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 bg-accent-orange-23"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
