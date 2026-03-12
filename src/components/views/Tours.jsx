import PracticalInfo from "../tour/PracticalInfo";
import { TourBookingForm } from "../forms/TourBookingForm";

const Tours = ({ tour }) => {
  const { title, content, acf } = tour;

  return (
    <div className="bg-natural-light">
      {/* Hero */}
      <div className="relative h-116 overflow-hidden">
        <img
          className="object-cover w-full h-full object-[50%_70%]"
          src={acf.hero_image || "/assets/images/marketWideShot.jpg"}
          alt={title.rendered}
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl lg:text-7xl text-white">
          {title.rendered}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row md:px-22 lg:px-32 gap-5 my-12">
        {/* Mobile practical info */}
        <PracticalInfo
          className="md:rounded-2xl lg:hidden bg-white p-5"
          info={acf}
        />

        {/* Main content */}
        <div className="flex flex-col flex-2 gap-8 bg-white md:rounded-3xl px-5">
          <div
            className="pt-5 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.rendered }}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="lg:self-start flex-1 sticky top-17">
          <PracticalInfo
            className="md:rounded-2xl hidden lg:block bg-white mb-8 px-5 py-10"
            info={acf}
          />
          <TourBookingForm className="flex flex-col gap-10 md:rounded-2xl bg-white px-5 py-10" />
        </div>
      </div>

      {/* Personal note */}
      {acf.personal_note && (
        <div className="bg-medium-chromatic-teal">
          <div className="max-w-7xl mx-auto px-5 md:px-22 lg:px-32 py-12 md:py-22 lg:py-32">
            <div className="border-l-2 border-accent-orange-23 px-10 lg:mx-10">
              <h2 className="text-section font-semibold text-accent-orange-23">
                A personal note
              </h2>
              <p className="text-natural-light">{acf.personal_note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
