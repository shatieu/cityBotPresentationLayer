type BadgeVariant = "default" | "green" | "amber" | "gray" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-green-100 text-green-900",
  green: "bg-green-300 text-green-900",
  amber: "bg-amber-100 text-amber-700",
  gray: "bg-gray-100 text-gray-700",
  error: "bg-amber-100 text-error",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
