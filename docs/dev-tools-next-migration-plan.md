# dev-tools → dev-tools-next 전환 계획 (AI Agent 공유용)

## 문서 목적
이 문서는 기존 `Chenjae-kr/dev-tools` 프로젝트를 새 레포지토리(`dev-tools-next`)로 점진 전환하기 위한 배경/결정/실행계획을 **다른 AI 에이전트가 바로 이해하고 실행**할 수 있도록 정리한 문서다.

---

## 1) 현재 프로젝트 요약

- 기존 레포: `https://github.com/Chenjae-kr/dev-tools`
- 성격: 정적 웹 기반 개발 유틸 모음 (바닐라 JS 중심)
- 배포: **GitHub Pages**
- 주요 구조:
  - `index.html`
  - `tools.js` (도구 레지스트리)
  - `nav.js`, `ui-utils.js`, `image-tools-utils.js`
  - `tools/*` (카테고리별 HTML 도구)

### 주요 도구 카테고리
- SQL/DB
- Data/Format
- Image (thumbnail maker 포함)
- Text/Compare
- Utility

---

## 2) 문제 인식

기존 구조는 바닐라 JS 기반이라 초기 생산성은 좋지만, 장기적으로 아래 문제가 큼:

1. 기능 확장 시 중복 코드 증가
2. 도구 간 UI/상태 관리 일관성 유지 어려움
3. 회귀 테스트 체계 약함
4. 협업/기여(오픈소스화) 난이도 높음

---

## 3) 핵심 의사결정

### 결정 A: 기존 레포를 바로 갈아엎지 않음
- 운영 중인 Pages 안정성을 보호하기 위해 기존 레포는 유지
- 레거시 레포는 버그픽스 위주

### 결정 B: 새 레포로 분리 전환
- 신규 레포: `dev-tools-next` (가칭)
- 점진 이관(도구 단위)으로 리스크 최소화

### 결정 C: 배포는 계속 GitHub Pages 사용
- 배포 채널은 변경하지 않음
- 정적 빌드 산출물만 배포

---

## 4) 목표

1. 유지보수성 향상
2. 신규 도구 개발 속도 개선
3. 회귀 버그 감소
4. 협업 친화 구조 마련

---

## 5) 권장 기술 스택 (next)

- UI/앱: React + TypeScript
- 빌드: Vite
- 상태: Zustand
- 폼: react-hook-form
- 검증: Zod
- 테이블: TanStack Table
- 차트: ECharts 또는 Chart.js
- 테스트: Vitest + Playwright
- 코드 품질: ESLint + Prettier + Husky + lint-staged

---

## 6) 오픈소스 활용 포인트 + 리스크

### Vite
- 장점: 빠른 개발/정적 배포 최적
- 리스크: GitHub Pages `base` 경로 설정 실수 시 asset 깨짐

### React + TypeScript
- 장점: 복잡 UI/상태 유지보수 용이
- 리스크: 초기 코드량/러닝커브 증가

### Zod
- 장점: JSON 입력/설정 스키마 안정성
- 리스크: 스키마 업데이트 누락 시 마찰

### Playwright
- 장점: 실제 사용자 플로우 회귀 방지
- 리스크: 테스트 작성/유지 비용 증가

### TanStack Table
- 장점: 데이터형 도구 기능 확장 용이
- 리스크: 초반 API 학습 필요

---

## 7) 페이즈별 실행 계획

## Phase 0 — 기준선 확보 (1주)
- 기존 도구 기능 인벤토리 작성
- 핵심 도구 E2E 기준선 테스트 작성
- 전환 우선순위 결정

**완료 조건**
- 핵심 도구 smoke/e2e 통과
- parity 체크리스트 확정

---

## Phase 1 — 새 레포 초기화 (1주)
- `dev-tools-next` 생성
- Vite+TS+React+CI+Pages 배포 파이프라인 구축
- 공통 레이아웃/테마 토큰 구축

**완료 조건**
- main push 시 Pages 자동 배포
- 기본 shell(홈/네비/테마) 동작

---

## Phase 2 — 공통 로직 라이브러리화 (2주)
- 변환/파싱/이미지 유틸을 UI에서 분리
- 순수 함수화 + 단위 테스트

**완료 조건**
- 핵심 비즈니스 로직 테스트 커버 확보

---

## Phase 3 — 고복잡 도구 우선 전환 (2~4주)
권장 우선순위:
1. thumbnail-maker
2. table-chart-maker
3. data-converter

**완료 조건**
- 기능 parity 통과
- 다운로드/렌더 회귀 테스트 통과

---

## Phase 4 — 나머지 도구 점진 전환 (지속)
- 도구 단위 전환 지속
- 신규 기능은 next 레포에서만 개발
- legacy는 유지보수 모드

---

## Phase 5 — 전환 완료/정리
- next를 메인으로 승격
- legacy는 아카이브 또는 read-only 안내
- 문서화(기여 가이드, 릴리즈 정책) 완성

---

## 8) GitHub Pages 운영 전략

- 초기: legacy/next URL 병행 운영
  - legacy: `.../dev-tools`
  - next: `.../dev-tools-next`
- 안정화 후 main URL을 next로 전환
- Pages 특성상 라우팅 전략 주의:
  - MPA 또는 HashRouter 권장
  - BrowserRouter 단독 사용 시 새로고침 404 리스크

---

## 9) 리스크 관리 체크리스트

- [ ] 기능 parity 체크리스트 운영
- [ ] 배포 전 E2E 회귀 통과
- [ ] `base`/asset 경로 검증
- [ ] 레거시-넥스트 이중운영 종료 기준 정의
- [ ] 신규 개발은 next-only 원칙 준수

---

## 10) 즉시 실행 가능한 다음 액션

1. `dev-tools-next` 레포 생성
2. Vite 템플릿 + TS + ESLint/Prettier 세팅
3. GitHub Actions Pages 배포 워크플로 추가
4. Playwright로 핵심 도구 3개 기준선 테스트 작성
5. thumbnail-maker를 1차 마이그레이션 대상으로 착수

---

## 부록) 본 문서 작성 배경

- 기존 프로젝트 구조/파일 조사 완료
- `thumbnail-maker.html`가 이미 preset/decor 구조를 갖고 있어,
  차세대 전환 시 컴포넌트화에 유리하다고 판단함
- 배포 채널을 GitHub Pages로 유지한다는 조건 반영 완료
