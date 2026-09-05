type BadgeVariant = "default" | "gold" | "wine" | "stone" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gold-100 text-gold-700",
  gold: "bg-gold-300 text-ink-900",
  wine: "bg-wine-100 text-wine-700",
  stone: "bg-stone-100 text-stone-700",
  error: "bg-terracotta-100 text-error",
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
