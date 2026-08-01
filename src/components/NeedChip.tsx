"use client";

interface NeedChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function NeedChip({ label, selected, onClick }: NeedChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors active:scale-[0.97] ${
        selected
          ? "border-brand-accent bg-brand-accent text-brand-accent-fg"
          : "border-brand-border text-foreground hover:border-brand-primary"
      }`}
    >
      {label}
    </button>
  );
}
