// 직원 상담 시간(한국 시간): 평일 10:00~18:00, 주말 10:00~16:00. 휴진일 없음.
// ponytail: 공휴일은 평일과 같게 봅니다. 공휴일 시간이 따로 정해지면 여기에 추가합니다.

export function isStaffHours(now: Date = new Date()): boolean {
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const day = kst.getUTCDay(); // 0=일, 6=토
  const hour = kst.getUTCHours();
  const close = day === 0 || day === 6 ? 16 : 18;
  return hour >= 10 && hour < close;
}
