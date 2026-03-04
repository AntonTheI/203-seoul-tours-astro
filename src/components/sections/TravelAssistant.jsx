const services = [
  {
    name: "Questions & preparation",
    description: "Ask anything — before you arrive, while planning",
    icon: "/assets/images/msg.svg",
  },
  {
    name: "Planning & advice",
    description: "Itineraries, priorities, what to do — and what to skip",
    icon: "/assets/images/map.svg",
  },
  {
    name: "Reservations & bookings",
    description: "Restaurants, tickets, and hard-to-book experiences",
    icon: "/assets/images/ticket.svg",
  },
  {
    name: "Transport & logistics",
    description: "Trains, buses — getting around Korea",
    icon: "/assets/images/train.svg",
  },
];

const TravelAssistant = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-5 md:px-12 lg:px-32 py-14 lg:py-28">
        <h4 className="accent-label lg:text-center">KOREA TRAVEL ASSISTANT</h4>

        <div className="flex flex-col gap-10 lg:items-center">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-section font-semibold leading-none">
              Planning a trip to Korea and need help?
            </h2>
            <p className="">
              Korea can feel like a lot to figure out — I can help you plan,
              decide, and take care of the practical details.
            </p>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-3  w-full flex-1">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-medium-chromatic-teal rounded-4xl p-4 lg:px-2 lg:p-5 flex lg:flex-col  gap-4 items-center lg:flex-1"
              >
                <div className="rounded-full bg-[rgb(255,255,255,0.20)] w-14 h-14 flex p-2 justify-center items-center shrink-0">
                  <img src={service.icon} alt={service.name} className="w-9" />
                </div>
                <div className="flex flex-col lg:justify-center lg:items-center ">
                  <div className="text-natural-light mb-2 text-[15px] lg:text-base">
                    {service.name}
                  </div>
                  <div className="text-xs text-light-atmospheric-teal lg:text-center lg:text-[13px]">
                    {service.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 mt-6 md:flex-row lg:flex-row">
          <button className="flex-1 text-dark-chromatic-teal font-semibold rounded-full border border-medium-chromatic-teal p-3.5  lg:p-4 ">
            Learn more
          </button>
          <button className="flex-1 text-dark-chromatic-teal font-semibold rounded-full bg-accent-orange-23 p-3.5  lg:p-4 ">
            Walk me through your plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelAssistant;
