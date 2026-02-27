# PHASE 0 CHECKLIST

목표: `dev-tools` 기존 기능의 기준선을 고정해, `web-tools` 전환 시 회귀를 빠르게 탐지한다.

## 0. 범위 확정
- [ ] 기존 `dev-tools`의 도구 목록 인벤토리 작성
- [ ] 1차 전환 우선순위 도구 3개 선정
  - [ ] thumbnail-maker
  - [ ] table-chart-maker
  - [ ] data-converter
- [ ] 각 도구의 핵심 사용자 플로우 정의

## 1. 기능 기준선(Parity) 정의
- [ ] 도구별 입력/출력 항목 정의
- [ ] 성공 기준(acceptance criteria) 명시
- [ ] 포맷/다운로드 결과물 기준 정의 (PNG/JPG/JSON 등)

## 2. 회귀 테스트 기반 구축
- [ ] Playwright 기본 설정 도입
- [ ] smoke test 1세트 작성 (페이지 로드, 핵심 버튼 동작)
- [ ] 도구별 e2e 시나리오 초안 작성
- [ ] CI에서 테스트 자동 실행 연결

## 3. 문서화
- [ ] `docs/phase0/tool-inventory.md`
- [ ] `docs/phase0/parity-checklist.md`
- [ ] `docs/phase0/test-plan.md`

## 4. 완료 조건 (Definition of Done)
- [ ] 핵심 3개 도구 기준선 문서 완료
- [ ] smoke/e2e 기본 파이프라인 통과
- [ ] 전환 작업 시작 전 baseline snapshot 확보

---

## 참고 운영 원칙
- 신규 기능은 가급적 `web-tools`에서만 진행
- 레거시(`dev-tools`)는 버그픽스 중심
- 전환은 도구 단위로, big bang 금지
