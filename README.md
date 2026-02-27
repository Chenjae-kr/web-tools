# web-tools (dev-tools-next)

`dev-tools` 레거시 프로젝트를 장기적으로 점진 전환하기 위한 새 레포입니다.

- 기존 배포 방식은 그대로 **GitHub Pages** 사용
- 신규 아키텍처: **Vite + React + TypeScript**
- 전환 방식: 도구 단위 점진 마이그레이션 (big bang 금지)

## 문서

- 마이그레이션 상세 계획: `docs/dev-tools-next-migration-plan.md`

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 테스트

```bash
npm run test:e2e
```

> 첫 실행 시 Playwright 브라우저 설치가 필요합니다.
> `npx playwright install --with-deps chromium`

## 배포

- GitHub Actions에서 Pages로 자동 배포
- `vite.config.ts`의 `base`는 저장소명(`/web-tools/`) 기준으로 설정됨

## 초기 페이즈

1. Phase 0: 기준선 테스트/기능 인벤토리
2. Phase 1: 부트스트랩 + Pages 배포 자동화
3. Phase 2: 공통 로직 분리
4. Phase 3: 고복잡 도구 우선 전환
