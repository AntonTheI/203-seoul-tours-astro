import { Clock, Footprints, MapPin, AlarmClock, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

  const tourInfo: { label: string; value?: string; icon: LucideIcon }[] = [
    { label: "Duration", value: info.duration, icon: Clock },
    { label: "Walking level", value: info.walkingLevel, icon: Footprints },
    { label: "Meeting point", value: info.meetingPoint, icon: MapPin },
    { label: "Start time", value: info.startTime, icon: AlarmClock },
    { label: "Best timing", value: info.bestTiming, icon: Lightbulb },
  ];

  return (
    <div className={`${className}`}>
      <div className="flex flex-col md:flex-row md:items-stretch">
        {tourInfo.map((item, index) => (
          <>
            <div
              key={item.label}
              className="flex flex-row items-center gap-3 py-3 md:py-0 md:flex-col md:flex-1 md:w-0 md:gap-1 md:items-start text-sm min-w-0"
            >
              <item.icon size={20} className="text-accent-orange-23 shrink-0 md:mb-1" />
              <div className="flex flex-col min-w-0">
                <span className="text-dark-chromatic-teal/70">{item.label}</span>
                <span>{item.value}</span>
              </div>
            </div>

            {index < tourInfo.length - 1 && (
              <div className="border-t md:border-t-0 md:border-l border-zinc-200 md:mx-4" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default PracticalInfo;
