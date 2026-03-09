import { useForm } from "react-hook-form";
import { TourBookingForm } from "../forms/TourBookingForm";
import PracticalInfo from "../tour/PracticalInfo";

const Tours = () => {
  return (
    <div className=" bg-natural-light ">
      {/* Hero img */}
      <div className="relative h-116 overflow-hidden">
        <img
          className=" object-cover w-full h-full object-[50%_70%]"
          src="/assets/images/marketWideShot.jpg"
          alt="Market female vendor"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl lg:text-7xl text-white">
          Seoul Market Tour
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row  md:px-22 lg:px-32 gap-5 my-12 ">
        {/* Desktop - Left Col */}
        <PracticalInfo className="md:rounded-2xl lg:hidden bg-white p-5" />
        <div className="flex flex-col flex-2 gap-8 bg-white md:rounded-3xl px-5">
          <div className="pt-5">
            <img
              src="/assets/images/marketLady.jpg"
              alt="market lady"
              className="object-cover w-full h-full max-w-165 max-h-110"
            />
          </div>

          {/* Market tour description */}
          <div className="flex flex-col ">
            <h2 className="text-section font-semibold mb-4">
              A Journey to the Market
            </h2>

            <div className="flex h-9 justify-center shrink-0">
              <div className="h-0.5 bg-accent-orange-23 w-[40%]"></div>
            </div>

            <h3 className="font-extrabold">
              Seoul is a city of contrasts, where centuries of tradition meet a
              fast-moving technological future. While much of life in South
              Korea now unfolds online, the streets are still where the magic
              happens and nowhere is that more evident than in its bustling
              markets.
            </h3>
            <p>
              <br />
              Let me take you into the world of some of Seoul's most vivid
              marketplaces. We explore Yangnyeong Market, known for its
              traditional Korean medicine, and Gyeongdong Market, one of the
              city's largest day markets, where fresh produce changes hands from
              early morning onward.
              <br />
              <br />A journey among the people running their daily shopping
              errands, the nicely laid out market stalls, the bartering of
              selling and buying, and the unmistakable aromas of herbs and
              fruit. This isn't just a tour; it's an invitation to learn about
              the traditional Korean dining table, and to savour the essence of
              Seoul's market culture.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center text-xl font-bold text-natural-light bg-accent-orange-23 rounded-full w-9 h-9">
                  1
                </div>
                <div>
                  <h3 className="text-subsection font-semibold">
                    Yangnyeong Market
                  </h3>
                  <p className="text-xs text-black/60">
                    Korea's largest herbal medicine market
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex justify-center w-9 shrink-0">
                  <div className="w-px bg-gray-300 h-full"></div>
                </div>

                <div>
                  <p className="mb-4">
                    Our journey begins at Yangnyeong Market, Korea's largest
                    herbal medicine market. As we leave the metro station, the
                    air carries the scents of ginseng, dried herbs, and
                    medicinal roots. Much of the country's traditional medicine
                    trade still takes place here, reaching far beyond Korea's
                    borders. Shops and clinics line the streets, alongside a
                    modest museum dedicated to centuries-old practices. A good
                    place to pause for a herbal tea, or perhaps experience a
                    treatment yourself.
                  </p>
                  <img
                    className="rounded-2xl"
                    src="/assets/images/medicine_market.jpg"
                    alt="medicine_market"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center text-xl font-bold text-natural-light bg-accent-orange-23 rounded-full w-9 h-9">
                  2
                </div>
                <div>
                  <h3 className="text-subsection font-semibold">
                    Gyeongdong Market
                  </h3>
                  <p className="text-xs text-black/60">
                    One of Seoul's largest day markets
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex justify-center w-9 shrink-0">
                  <div className="w-px bg-gray-300 h-full"></div>
                </div>

                <div>
                  <p className="mb-4">
                    From here, we continue into Gyeongdong Market, one of
                    Seoul's largest and liveliest produce markets. Open from
                    early morning, its narrow lanes form a maze of stalls
                    selling seasonal fruits, fresh seafood, and more roots and
                    herbs that seem to have followed us across the street.
                    Vendors call out, shoppers negotiate, deliveries weave
                    through the crowd. Along the way, there's time to browse,
                    make a small purchase, or settle into one of the modest
                    eateries tucked inside the market.
                  </p>
                  <img
                    className="rounded-2xl"
                    src="/assets/images/Gyeongdong_Market.webp"
                    alt="medicine_market"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center text-xl font-bold text-accent-orange-23 bg-medium-chromatic-teal rounded-full w-9 h-9">
                  !
                </div>
                <div>
                  <h3 className="text-subsection font-semibold">
                    A small suggestion
                  </h3>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex justify-center w-9 shrink-0">
                  <div className="w-px bg-gray-300 h-full"></div>
                </div>

                <div>
                  <p className="mb-4">
                    In summer, I like to end the walk with a bowl of naengmyeon
                    — cold buckwheat noodles served in an icy broth. On cold
                    winter days, I usually opt for hotteok — warm pancakes
                    filled with syrup and nuts, eaten straight from a paper cup.
                  </p>
                  <img
                    className="rounded-2xl"
                    src="/assets/images/medicine_market.jpg"
                    alt="medicine_market"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center text-xl font-bold bg-accent-orange-23 text-natural-light rounded-full w-9 h-9">
                  ?
                </div>
                <div>
                  <h3 className="text-subsection font-semibold">
                    If you'd like to go further
                  </h3>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex justify-center w-9 shrink-0">
                  {/* <div className="w-px bg-gray-300 h-full"></div> */}
                </div>

                <div>
                  <p className="mb-4">
                    If you'd like to continue, the markets can be just the
                    beginning. We might hop on a metro and walk a stretch of the
                    old city wall, or head to Seongsu-dong where the industrial
                    past meets contemporary Seoul, or stay nearby and walk the
                    streets around Cheongnyangni — a district shaped in the
                    decades after the Korean War. The day can easily grow from
                    there; just let me know if you'd like to explore a little
                    further.
                  </p>
                  {/* <img
                    className="rounded-2xl"
                    src="/assets/images/medicine_market.jpg"
                    alt="medicine_market"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:self-start flex-1 sticky top-17">
          <PracticalInfo className="md:rounded-2xl hidden lg:block bg-white mb-8 px-5 py-10" />
          <TourBookingForm className="flex flex-col gap-10 md:rounded-2xl bg-white px-5 py-10" />
        </div>
      </div>

      <div className="bg-medium-chromatic-teal">
        <div className="max-w-7xl mx-auto px-5 md:px-22 lg:px-32 py-12 md:py-22 lg:py-32">
          <div className="border-l-2 border-accent-orange-23 px-10 lg:mx-10">
            <h2 className="text-section font-semibold text-accent-orange-23">
              A personal note
            </h2>
            <div className="flex h-9 shrink-0">
              {/* <div className="h-0.5 bg-gray-800/50 w-[15%]"></div> */}
            </div>

            <p className="text-natural-light">
              Visiting Gyeongdong Market always stirs up memories of my first
              holiday in Korea. The first winter I spent in Korea, my
              mother-in-law brought me to Gyeongdong Market to shop for the
              upcoming Lunar New Year. The scale of it all felt overwhelming at
              first — as Seoul can do to first time travellers — but over time
              it has become one of the places I return to most. And then there
              are the smells of Yangnyeong Medicine Market. The dried herbs and
              roots carry a scent that always reminds me of Dutch 'drop', the
              licorice candy I grew up with. Small associations like that make
              this place feel both distant and familiar at once.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;
