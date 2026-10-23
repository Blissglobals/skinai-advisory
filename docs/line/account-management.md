# LINE 계정 관리 방안 (직원 운영 기준)

LINE 쪽 계정은 두 곳에서 관리합니다. 역할이 다르니 권한도 따로 줍니다.

| 곳 | 무엇을 하나 | 누가 쓰나 |
|---|---|---|
| **LINE Official Account Manager** (manager.line.biz) | 고객 채팅 응대, 환영 메시지·메뉴·자동응답 | 상담 직원 |
| **LINE Developers** (developers.line.biz) | 로그인 채널·웹훅 같은 기술 설정, 비밀키 | 대표 + 개발 담당(최소 인원) |

## 1. 소유자는 회사 계정으로

- 두 곳 모두 **회사 이메일로 만든 LINE Business ID**를 소유자(Admin)로 둡니다. 직원 개인 LINE 계정이 소유자가 되면 퇴사할 때 넘겨받기 어렵습니다.
- 이 회사 계정은 2단계 인증을 켜고, 로그인 정보는 대표만 관리합니다.
- **로그인 채널은 공식계정과 같은 Provider 아래에** 만들어야 합니다. 그래야 로그인할 때 공식계정 친구 추가를 함께 띄울 수 있습니다(Provider는 나중에 바꿀 수 없음).

## 현재 구성 (2026-10-23 생성)

| 항목 | 값 |
|---|---|
| 소유 계정 | 대표(김동원) LINE Business ID — 운영 시작 후 관리자 1명 추가 예정 |
| 공식계정 | Bliss Globals, `@166hxcxq` (서비스 지역: 대한민국, 업종: 여행·기타) |
| Provider | Bliss Globals (`2005667507`) |
| Messaging API 채널 | `2012167376` (웹훅 미설정) |
| LINE Login 채널 | `2012167412` (Developing, 웹앱, 친구추가 연결 = @166hxcxq) |
| Callback URL | `https://skin.blissglobals.cloud/api/auth/line/callback` |

예전 `@995xwpnh` / 로그인 채널 `2010938242`는 접근 가능한 계정을 찾지 못해 쓰지 않습니다. Vercel의 예전 변수(`NEXT_PUBLIC_LIFF_ID`, `LINE_CHANNEL_SECRET`, `LINE_CHANNEL_ACCESS_TOKEN`)도 그 채널 것이라 교체 대상입니다.

## 2. 직원은 각자 계정으로 초대

공유 비밀번호 하나로 여럿이 쓰지 않습니다. 직원마다 본인 LINE Business ID로 초대해서, 누가 무엇을 했는지 남고 퇴사 시 그 사람만 빼면 되게 합니다.

**Official Account Manager 권한**

| 권한 | 대상 |
|---|---|
| 관리자(Admin) | 대표(회사 계정) 1~2명 |
| 운영자(Operator) | 메뉴·자동응답까지 고치는 팀장급 |
| 운영자(전송 권한 없음 등 제한형) | 상담 직원 — 채팅 응대 위주 |

※ 제한형 운영자 역할의 정확한 이름·범위는 계정 화면에서 확인 후 확정합니다(확인 필요).

**LINE Developers 권한**

- Admin: 대표(회사 계정)
- Member: 개발 담당이 필요할 때만
- 상담 직원은 초대하지 않습니다(비밀키를 볼 일이 없음).

## 3. 비밀키(Channel secret) 다루기

- Vercel 환경변수(Secret)에만 넣습니다. 대화창·문서·메신저에 붙여넣지 않습니다.
- Developers 접근 권한이 있던 사람이 나가면 **채널 시크릿을 재발급**하고 Vercel 값을 바꾼 뒤 다시 배포합니다.

## 4. 입사·퇴사 체크리스트

- 입사: 본인 LINE Business ID 확인 → Official Account Manager에서 역할에 맞게 초대
- 퇴사: 두 곳에서 멤버 삭제 → (Developers 권한이 있었다면) 시크릿 재발급
