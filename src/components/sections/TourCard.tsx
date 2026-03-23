import { type Tour, TourTag } from "@/lib/api";

const tagColors: Record<TourTag, string> = {
  [TourTag.popular]: "rgba(191, 231, 255)",
  [TourTag.scenery]: "#46718C",
  [TourTag.food]: "#335266",
  [TourTag.culture]: "#8C6646",
  [TourTag.history]: "#4a8a8a",
  [TourTag.none]: "",
};

const TourCard = ({ tours = [] }: { tours: Tour[] }) => {
  console.log(tours);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 py-section-lg px-5 md:px-22 lg:px-32">
        <p className="accent-label">EXPLORE TOURS</p>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-section font-semibold">
              Hand crafted experiences
            </h2>
            <p>
              Each of the following tours is carefully designed around a
              specific theme or destination, allowing you to experience a
              distinct side of Seoul.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex overflow-x-auto gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.slug}
                  className="flex shrink-0 w-90 flex-col rounded-4xl bg-white overflow-hidden border-[0.5px] border-gray-400 my-4"
                >
                  <div className="relative">
                    <img
                      loading="lazy"
                      className="aspect-3/2 object-cover"
                      src={
                        tour.acf.hero_image || "/assets/images/marketLady.jpg"
                      }
                      alt={tour.acf.card_describtion}
                    />
                    {tour.acf.tag && tour.acf.tag !== "none" && (
                      <div
                        className="absolute top-6 -left-10 text-medium-chromatic-teal py-2 text-[15px] px-14 font-medium -rotate-45"
                        style={{ background: tagColors[tour.acf.tag] }}
                      >
                        {tour.acf.tag.charAt(0).toUpperCase() +
                          tour.acf.tag.slice(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-6">
                    <div>
                      <h3 className="text-subsection font-semibold mb-4">
                        {tour.title.rendered}
                      </h3>
                      <p className="text-[15px]/6 font-normal text-[#555555]">
                        {tour.acf.card_description}
                      </p>
                    </div>

                    <div className="text-sm bg-natural-light border-accent-orange-23 p-3 border-l-3 mt-auto rounded-r-md">
                      <h4 className="text-accent-orange-23 mb-2 text-[13px]">
                        Why i like this walk:
                      </h4>
                      <p className="italic text-medium-chromatic-teal text-sm">
                        {tour.acf.why_i_like_this_tour}
                      </p>
                    </div>

                    <div className="flex justify-center rounded-full border-accent-orange-23 border py-3.5 px-6 mb-4">
                      <a
                        href={`/tours/${tour.slug}`}
                        className="font-medium text-accent-orange-23 self-end"
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
  );
};

export default TourCard;
