"use client";

import Image from "next/image";

interface NeedChipProps {
  label: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

// 개선 목표 선택 타일(사진 + 이름). 선택되면 테두리와 체크 표시가 붙습니다.
export default function NeedChip({ label, image, selected, onClick }: NeedChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl text-left ring-offset-2 ring-offset-background transition active:scale-[0.97] ${
        selected ? "ring-2 ring-brand-accent" : "ring-0"
      }`}
    >
      <Image src={image} alt="" fill sizes="(max-width: 640px) 45vw, 200px" className="object-cover" />
      <span
        className={`absolute inset-0 transition-colors ${
          selected ? "bg-brand-accent/45" : "bg-gradient-to-t from-black/55 to-transparent"
        }`}
      />
      <span className="absolute bottom-3 left-3 font-display text-lg font-semibold text-white">
        {label}
      </span>
      {selected && (
        <span className="absolute top-2.5 right-2.5 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-accent">
          ✓
        </span>
      )}
    </button>
  );
}
