import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  withLine?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  withLine = true,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          light ? "text-white" : "text-neutral-900"
        )}
      >
        {title}
      </h2>
      {withLine && (
        <div
          className={cn(
            "w-20 h-1 bg-secondary-500 rounded-full",
            centered && "mx-auto"
          )}
        />
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/80" : "text-neutral-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
