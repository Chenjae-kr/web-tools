# Thumbnail Maker Parity Checklist

기준 대상: `dev-tools/tools/image/thumbnail-maker.html`
전환 대상: `web-tools/src/features/thumbnail-maker/*`

## 현재 구현 상태

- [x] Canvas / Text / Export 패널 분리
- [x] Zustand 상태 스토어 분리
- [x] 순수 렌더러(`renderer.ts`) 도입
- [x] PNG/JPEG/WEBP 다운로드
- [x] Preset 엔진(quote/blog/youtube/dev-sense)
- [x] JSON Import/Export
- [x] e2e 기본 검증 (preset 전환)

## 남은 parity 항목

- [ ] 이미지 업로드(background image)
- [ ] overlay 모드/강도 옵션 (none/dim/gradient/vignette)
- [ ] decor style 옵션 고도화
- [ ] 텍스트 stroke/padding/position fine control
- [ ] JSON 파일 업로드(파일 선택) UX

## 완료 기준

- 기존 썸네일 툴 핵심 시나리오 100% 재현
- e2e 시나리오 최소 5개 이상 통과
- 레거시 툴 대비 주요 결과물 시각 차이 허용범위 문서화
