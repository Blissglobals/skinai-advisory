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
    <div className="flex flex-col gap-2 rounded-3xl bg-brand-secondary p-5">
      <span className="w-fit rounded bg-foreground/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-foreground/60">
        AD
      </span>
      <p className="font-display text-lg font-semibold text-foreground">{title}</p>
      <p className="text-sm text-foreground/65">{body}</p>
      <a
        href={LINE_ADD_FRIEND_URL}
        className="mt-2 flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand-primary px-4 text-sm font-semibold text-brand-primary-fg active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}
