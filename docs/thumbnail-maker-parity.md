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
- [x] JSON 파일 업로드 Import UX
- [x] 이미지 업로드(background image)
- [x] overlay 모드/강도 옵션 (none/dim/gradient/vignette)
- [x] decor style 옵션 기본 이관 (minimal/frame/corner)
- [x] 텍스트 stroke/padding/position fine control (기본)
- [x] e2e 기본 검증 (home/route/preset)

## 남은 parity 항목

- [ ] 레거시 decor 스타일 1:1 매칭 고도화
- [ ] 텍스트 main/sub scale 개별 비율 옵션
- [ ] JSON 스키마 검증(zod) 및 에러 메시지 개선
- [ ] e2e 시나리오 5개 이상 확장 (업로드/오버레이/다운로드 포함)

## 완료 기준

- 기존 썸네일 툴 핵심 시나리오 100% 재현
- e2e 시나리오 최소 5개 이상 통과
- 레거시 툴 대비 주요 결과물 시각 차이 허용범위 문서화
