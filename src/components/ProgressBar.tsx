interface ProgressBarProps {
  currentStep: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, labels }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex gap-1.5">
        {labels.map((label, i) => (
          <div key={label} className="h-1 flex-1 overflow-hidden rounded-full bg-brand-border">
            <div
              className="h-full rounded-full bg-brand-accent transition-[width] duration-700 ease-out"
              style={{ width: i < currentStep ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-foreground/45">
        {labels.map((label, i) => (
          <span
            key={label}
            className={i + 1 === currentStep ? "font-semibold text-brand-accent" : ""}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
