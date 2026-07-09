import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-navy-600 mb-4">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-900 leading-tight",
          "font-sans"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-navy-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
