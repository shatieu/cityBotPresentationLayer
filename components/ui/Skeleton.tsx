interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  lines?: number;
}

export function Skeleton({ className = "", width, height, lines }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-sm bg-gray-100"
            style={{
              width: i === lines - 1 ? "75%" : width || "100%",
              height: height || "14px",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse rounded-sm bg-gray-100 ${className}`}
      style={{ width: width || "100%", height: height || "14px" }}
    />
  );
}
