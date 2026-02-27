# Phase 0 - 핵심 툴 기준선 테스트 시나리오

## 1) Thumbnail Maker

### 시나리오 A: 기본 프리셋 렌더
- Given: 페이지 최초 진입
- When: 기본 preset(quote) 유지
- Then: canvas가 비어있지 않고 텍스트가 렌더된다

### 시나리오 B: 프리셋 변경
- Given: 페이지 로드 완료
- When: preset을 `blog`로 전환
- Then: ratio/텍스트/배경 설정이 함께 변경된다

### 시나리오 C: 다운로드 동작
- Given: 렌더 완료
- When: PNG 다운로드 클릭
- Then: 파일명이 규칙에 맞고 blob/url 생성이 정상 수행된다

## 2) Table Chart Maker

### 시나리오 A: 샘플 데이터 렌더
- Given: 샘플 데이터 입력
- When: 차트 생성 클릭
- Then: 차트 영역에 시리즈가 렌더된다

### 시나리오 B: 설정 변경 반영
- Given: 차트 생성 완료
- When: 축/색상/범례 옵션 변경
- Then: 차트 결과가 즉시 반영된다

### 시나리오 C: 이미지 출력
- Given: 차트 렌더 완료
- When: 이미지 저장 실행
- Then: 결과 파일이 정상 생성된다

## 3) Data Converter

### 시나리오 A: JSON -> CSV
- Given: JSON 입력
- When: CSV 변환 실행
- Then: CSV 출력에 헤더/행이 예상대로 생성된다

### 시나리오 B: CSV -> JSON
- Given: CSV 입력
- When: JSON 변환 실행
- Then: JSON 구조가 파싱 규칙대로 생성된다

### 시나리오 C: 에러 처리
- Given: 잘못된 포맷 입력
- When: 변환 실행
- Then: 앱이 죽지 않고 오류 메시지를 표시한다

---

## 공통 체크
- 모바일(좁은 뷰포트)에서 기본 조작 가능
- 다크/라이트 테마에서 텍스트 가독성 유지
- 콘솔 에러 없이 주요 액션 완료
