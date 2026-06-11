import type { Tour } from "@/types/tour";

const tagColors: Record<string, string> = {
  popular: "rgba(191, 231, 255)",
  scenery: "#46718C",
  food: "#335266",
  culture: "#8C6646",
  history: "#4a8a8a",
  none: "",
};

const TourCard = ({ tours = [] }: { tours: Tour[] }) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 py-section-lg px-5 md:px-22 lg:px-32">
        <p className="reveal accent-label">EXPLORE TOURS</p>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1/3">
                <h2 className="text-section leading-none font-semibold mb-4">
                  Hand crafted experiences
                </h2>
                <p>
                  Each of the following tours is carefully designed around a
                  specific theme or destination, allowing you to experience a
                  distinct side of Seoul.
                </p>
              </div>

              <div className="reveal overflow-hidden flex-2/3">
                <div className="flex overflow-x-auto gap-6">
                  {tours.map((tour) => (
                    <div
                      key={tour.slug.current}
                      className="flex shrink-0 w-81 flex-col rounded-4xl bg-white overflow-hidden border-[0.5px] border-gray-400 my-4"
                    >
                      <div className="relative">
                        <img
                          loading="lazy"
                          className="aspect-3/2 object-cover"
                          src={
                            tour.heroImage.url ||
                            "/assets/images/marketLady.jpg"
                          }
                          alt={tour.heroImage.alt}
                        />
                        {tour.tags?.[0] && (
                          <div
                            className="absolute top-6 -left-10 text-medium-chromatic-teal py-2 text-[15px] px-14 font-medium -rotate-45"
                            style={{ background: tagColors[tour.tags![0]] }}
                          >
                            {tour.tags![0].charAt(0).toUpperCase() +
                              tour.tags![0].slice(1)}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col gap-6">
                        <div>
                          <h3 className="text-subsection font-semibold mb-2">
                            {tour.title}
                          </h3>
                          <p className="text-[15px]/6 font-normal text-[#555555]">
                            {tour.cardDescription}
                          </p>
                        </div>

                        <div className="flex justify-center rounded-full border-accent-orange-23 border py-4 px-6 mb-3 group cursor-pointer hover:bg-accent-orange-23  transition-colors mt-auto">
                          <a
                            href={`/tours/${tour.slug.current}`}
                            className="font-medium text-medium-chromatic-teal group-hover:text-natural-light self-end transition-colors"
                          >
                            Explore this tour
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
