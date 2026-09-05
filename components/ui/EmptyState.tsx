interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-base bg-gold-50 flex items-center justify-center mb-4">
        <span className="text-2xl text-gold-300">?</span>
      </div>
      <h3 className="font-heading font-semibold text-ink-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-stone-500 max-w-sm">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
