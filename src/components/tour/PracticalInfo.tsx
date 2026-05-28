import { Separator } from "../ui/separator";

// const tourInfo = [
//   { label: "Duration", value: "2 hours" },
//   { label: "Walking level", value: "Relaxed pace · Flat streets" },
//   { label: "Meeting point", value: "Jegi-dong metro station" },
//   { label: "Start time", value: "9:00-15:00" },
//   { label: "Best timing", value: "Morning visits tend to be most fun" },
// ];

interface TourInfo {
  duration?: string;
  walkingLevel?: string;
  meetingPoint?: string;
  startTime?: string;
  bestTiming?: string;
}

const PracticalInfo = ({
  className,
  info,
}: {
  className?: string;
  info: TourInfo | undefined;
}) => {
  if (!info) return null;

  const tourInfo = [
    { label: "Duration", value: info.duration },
    { label: "Walking level", value: info.walkingLevel },
    { label: "Meeting point", value: info.meetingPoint },
    { label: "Start time", value: info.startTime },
    { label: "Best timing", value: info.bestTiming },
  ];

  return (
    <div className={className}>
      <h4 className="accent-label mb-4">PRACTICAL INFORMATION</h4>
      <div>
        {tourInfo.map((info, index) => (
          <div key={info.label} className="text-sm">
            <div className="flex justify-between">
              <span className="text-dark-chromatic-teal/70 pr-2">
                {info.label}
              </span>
              <span>{info.value}</span>
            </div>
            {index < tourInfo.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticalInfo;
