// 직원 상담 시간: 한국 시간 10:00~18:00.
// ponytail: 매일 같은 시간으로 봅니다(휴무일·공휴일 미반영). 휴진일이 정해지면 여기에 추가합니다.
export const STAFF_OPEN_HOUR = 10;
export const STAFF_CLOSE_HOUR = 18;

export function isStaffHours(now: Date = new Date()): boolean {
  const kstHour = (now.getUTCHours() + 9) % 24;
  return kstHour >= STAFF_OPEN_HOUR && kstHour < STAFF_CLOSE_HOUR;
}
