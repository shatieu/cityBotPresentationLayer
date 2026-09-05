import { formatDateWithTime } from "@/lib/utils/format-date";

interface TimeIndicatorProps {
  datetime: string;
  className?: string;
}

export function TimeIndicator({ datetime, className = "" }: TimeIndicatorProps) {
  return (
    <time
      dateTime={datetime}
      className={`text-xs text-stone-700 font-body ${className}`}
    >
      {formatDateWithTime(datetime)}
    </time>
  );
}
