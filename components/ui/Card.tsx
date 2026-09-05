interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = true, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white border border-stone-100 rounded-base shadow-card p-4 ${hover ? "transition-shadow duration-150 hover:shadow-card-hover" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
