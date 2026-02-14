interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-4 md:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
