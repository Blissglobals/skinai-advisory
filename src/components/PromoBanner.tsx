import { LINE_ADD_FRIEND_URL } from "@/lib/line/constants";

interface PromoBannerProps {
  title: string;
  body: string;
  cta: string;
}

// 스캔 진행 화면(Step2, Step4)에 노출되는 제휴 병원 홍보 배너. 실시간 카메라
// 촬영이 일어나는 Step1/Step3에는 고정 버튼 레이아웃과 겹치지 않도록 넣지 않습니다.
export default function PromoBanner({ title, body, cta }: PromoBannerProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-brand-border bg-brand-surface p-4">
      <span className="w-fit rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-medium text-brand-accent-fg">
        AD
      </span>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-foreground/70">{body}</p>
      <a
        href={LINE_ADD_FRIEND_URL}
        className="mt-1 flex min-h-11 w-full items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}
