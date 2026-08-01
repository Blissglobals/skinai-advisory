interface ProgressBarProps {
  currentStep: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, labels }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex gap-1.5">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`h-1 flex-1 rounded-full ${
              i < currentStep ? "bg-brand-primary" : "bg-brand-border"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-foreground/60">
        {labels.map((label, i) => (
          <span
            key={label}
            className={i + 1 === currentStep ? "font-medium text-brand-primary" : ""}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
