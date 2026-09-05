interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="relative group inline-flex items-center">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-base bg-ink-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-100 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
