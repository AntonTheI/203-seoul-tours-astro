const SocialMediaGrid = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col max-w-7xl mx-auto px-5 py-section-lg md:px-22 lg:px-32 gap-4 ">
        <div>
          <h4 className="accent-label">#SOCIAL MEDIA</h4>
          <h2 className="text-section font-semibold">Recent posts</h2>
          <div className="flex gap-1.5">
            <img src="/assets/instagram.svg" alt="instagram icon" />
            <p>Follow</p>
            <p className="text-accent-orange-23">@jitsejager</p>
          </div>
        </div>

        <div className=" grid grid-cols-2 gap-0.5 auto-rows-[192px]  lg:grid-cols-4 lg:h-125 ">
          <img
            src="../assets/roof.jpg"
            alt="art"
            className="object-cover h-full w-full lg:col-span-1 "
          />
          <img
            src="../assets/door.jpg"
            alt="door"
            className="object-cover h-full w-full lg:col-span-1 "
          />
          <img
            src="../assets/mail.jpg"
            alt="mail"
            className="object-cover h-full w-full col-span-2 lg:col-span-2 lg:row-span-2"
          />
          <img
            src="../assets/unc.jpg"
            alt="unc"
            className="object-cover h-full w-full lg:col-span-1 "
          />
          <img
            src="../assets/sewingDistrict.jpg"
            alt="art"
            className="object-cover h-full w-full lg:col-span-1 "
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGrid;
