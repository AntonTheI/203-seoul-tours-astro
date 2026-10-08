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
      "Jitse took us through the Euljiro industrial area and Changsin-dong (sewing and fashion district) and this is exactly how I wish to experience a culture or city; by seeing and understanding its people and its daily life. It was all very informative and I came back with much more insight of Korea and Koreans. \n\nA tall Dutch guy on itself already invites smalltalk and interaction, and the added value is the tall guy speaks a bit of Korean.\n\nTotally recommend! ",

    name: "Gijs Dekker",
    country: "Netherlands",
  },
  {
    review:
      "My experience with Seoul was really amazing thanks to Jitse! \n\nWhen I went to Seoul, I had a lot of questions about this beautiful country and the best way to learn about a country is talking to locals. Jitse absorbed everything there is to know about the country, the history, the people, the food and all the curiosities in the country! So I could ask all my questions. He took us on several walks with amazing views and provided us with extra tips to go to. \n\nI would not hesitate a second to meet him again if I were to go to Seoul again. Thanks Jitse!",
    name: "Pieter Ruijssenaars",
    country: "Netherlands",
  },
  {
    review:
      "I have had the pleasure of meeting Jitse by a funny coincidence of having read his article in the KLM magazine just prior to travelling to Seoul. He is a Dutchman living in Seoul with a great passion for the city. This shows! \n\nWe have had an incredible time on our tailored tour where we ventured off the prescribed paths normally used by tourists. We saw the real Seoul, and things we would have otherwise never seen. We learned a lot about the city and its people.\n\nJitse has a Korean wife and is strongly connected with the Korean people. He has many funny and interesting stories to share. I can recommend Jitse's tours to anybody and will definitely hit him up again the next time I am visiting Seoul.",
    name: "Giuseppe Sisto",
    country: "Netherlands",
  },
];

// Placeholder images with varying aspect ratios (portrait & landscape)
// Using picsum.photos with different dimensions
const placeholderImages = [
  {
    src: "/assets/images/review photo carrousel - 1.jpeg ",
    alt: "Seoul street scene",
  }, // 3:4 portrait
  {
    src: "/assets/images/review photo carrousel - 2.jpg ",
    alt: "Market alley",
  }, // 4:3 landscape
  {
    src: "/assets/images/review photo carrousel - 3.jpg ",
    alt: "Market alley",
  }, // 4:3 landscape
  {
    src: "/assets/images/review photo carrousel - 4.jpg ",
    alt: "Market alley",
  }, // 4:3 landscape
  {
    src: "/assets/images/review photo carrousel - 5.jpeg ",
    alt: "Market alley",
  }, // 4:3 landscape
  {
    src: "/assets/images/review photo carrousel - 6.jpg ",
    alt: "Market alley",
  }, // 4:3 landscape
  {
    src: "/assets/images/review photo carrousel - 7.jpeg ",
    alt: "Market alley",
  }, // 4:3 landscape
];

const Testimonials = () => {
  const [reviewsApi, setReviewsApi] = useState<CarouselApi>();
  const [reviewsCurrent, setReviewsCurrent] = useState(0);
  const [imagesApi, setImagesApi] = useState<CarouselApi>();
  const [imagesCurrent, setImagesCurrent] = useState(0);

  useEffect(() => {
    if (!reviewsApi) return;
    setReviewsCurrent(reviewsApi.selectedScrollSnap());
    reviewsApi.on("select", () =>
      setReviewsCurrent(reviewsApi.selectedScrollSnap()),
    );
  }, [reviewsApi]);

  useEffect(() => {
    if (!imagesApi) return;

    const id = setInterval(() => {
      imagesApi.scrollNext();
    }, 4000);

    return () => clearInterval(id);
  }, [imagesApi, imagesCurrent]);

  return (
    <div className="bg-natural-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-section-sm lg:gap-col-gap py-section-lg px-5 md:px-22 lg:px-32">
        {/* LEFT COLUMN: Reviews heading + Reviews carousel */}
        <div className="reveal w-full flex flex-col gap-4 lg:flex-[1.5] min-w-0">
          <div className="max-lg:text-center">
            <p className="accent-label mb-4">REVIEWS</p>
            <h2 className="text-section font-semibold leading-none">
              Don't just take my word for it
            </h2>
          </div>

          <Carousel
            setApi={setReviewsApi}
            opts={{ loop: true }}
            className="flex-1 w-full h-145"
          >
            <CarouselContent>
              {reviews.map((review, i) => (
                <CarouselItem key={i}>
                  <div className="bg-white rounded-2xl px-10 py-10 flex flex-col gap-6 justify-center items-center">
                    <Quote size={28} className="text-accent-orange-23" />
                    <p className="text-center leading-relaxed whitespace-pre-line">
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

          <div className="flex flex-1 items-center gap-3 justify-center">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => reviewsApi?.scrollPrev()}
              className="cursor-pointer p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => reviewsApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === reviewsCurrent
                    ? "w-6 bg-accent-orange-23"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}

            <button
              type="button"
              aria-label="Next review"
              onClick={() => reviewsApi?.scrollNext()}
              className="cursor-pointer p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Images carousel */}
        <div className="reveal w-full flex flex-col gap-4 lg:flex-1 min-w-0 my-auto items-center justify-center lg:mt-30">
          <Carousel
            setApi={setImagesApi}
            opts={{ loop: true, duration: 55 }}
            className="w-full"
          >
            <CarouselContent>
              {placeholderImages.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="flex h-125 items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-auto w-auto max-h-full max-w-full rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
