# Data Converter 오픈소스 적용 검토

## 적용 조합
- **Papa Parse**: CSV 파싱/직렬화
- **Zod**: JSON 입력 스키마 검증
- **SheetJS(xlsx)**: Excel 업로드 파싱 (lazy import)

## 현재 구현
- [x] JSON → CSV
- [x] CSV → JSON
- [x] JSON 스키마 검증 (배열/객체)
- [x] 파일 업로드(.json/.csv/.txt/.xlsx/.xls)
- [x] Excel 업로드 시 첫 시트 JSON 변환

## 리스크
- xlsx 의존성 취약점 경고 1건(npm audit 기준)
- 매우 큰 파일 처리 시 메모리 사용량 증가 가능

## 다음 단계
1. JSON→Excel 내보내기
2. delimiter 옵션(,;\t) 선택 UI
3. 에러 메시지 상세화(행 번호/필드)
