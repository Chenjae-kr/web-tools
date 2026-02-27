# Table Chart Maker 오픈소스 적용 검토

## 결론
- 차트 엔진: **ECharts** 채택 (적용 완료)
- 데이터 파서: **Papa Parse** 채택 (적용 완료)
- 스키마 검증: **Zod** 채택 (JSON source 검증 적용)

## 적용 상태 (현재)
- [x] bar/line/pie 렌더
- [x] table/json 입력 파싱
- [x] legend on/off + legend 위치
- [x] value label on/off
- [x] 배경색/폰트 스케일/캔버스 크기
- [x] text watermark (off/text)
- [x] PNG/JPG/WEBP 다운로드

## 왜 ECharts인가
- bar/line/pie를 동일 옵션 체계로 처리 가능
- legend/tooltip/label 기본 제공
- 이미지 export 친화적 API(getDataURL)

### 리스크
- 번들 크기 증가(현재 빌드 경고 확인)
- 대응: route 단위 dynamic import(code split) 예정

## 왜 Papa Parse인가
- CSV/TSV 파싱 안정성 높음
- 수동 split 대비 quoted value 케이스 대응 유리

### 리스크
- markdown table 파싱은 별도 처리 필요
- 대응: 단계적으로 md parser 추가

## 다음 단계
1. watermark image 지원
2. markdown table 파싱 고도화
3. dynamic import로 번들 분할
4. e2e 시나리오 확장(다운로드/파싱오류/legend 반영)
