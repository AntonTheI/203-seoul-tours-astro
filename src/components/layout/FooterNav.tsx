import Links from "../nav/Links";

const FooterNav = () => {
  return (
    <div className="flex justify-between lg:flex-1">
      <div className="mt-6">
        <h4 className="text-accent-orange-23 text-sm mb-4">EXPLORE</h4>
        <Links className="flex flex-col gap-2" />
      </div>
      <div className="mt-6">
        <h4 className="text-accent-orange-23 text-sm mb-4">GET IN TOUCH</h4>
        <a href="mailto:contact@jitsejager.com" className="underline">
          contact@jitsejager.com
        </a>
      </div>
    </div>
  );
};

export default FooterNav;
