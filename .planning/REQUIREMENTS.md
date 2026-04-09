# Requirements: 서울연구원 API Skill Pack

**Defined:** 2026-04-09
**Core Value:** 여러 종류의 AI 에이전트들이 복잡한 API 인증이나 CORS 문제 없이 일관되고 간단한 인터페이스(Skill)를 통해 서울연구원의 방대한 지식 데이터에 즉시 접근할 수 있도록 돕는 것.

## v1 Requirements

### Core CLI Engine
- [x] **CORE-01**: 서울연구원 API 엔드포인트(연구보고서, 단행본 등)와 통신하는 독립적인 Python CLI 스크립트를 구축한다.
- [x] **CORE-02**: CLI 인자로 검색어, 데이터 타입, 페이징 등을 전달받아 JSON 포맷으로 표준화된 응답을 반환한다.
- [x] **CORE-03**: 인증키(API Key)를 `.env` 파일 등 보호된 구성에서 읽어와 API 요청 헤더/파라미터에 주입한다.

### Gemini & OpenCode Skills
- [x] **GEMI-01**: `gsd` 및 OpenCode 호환 `SKILL.md` 문서를 작성한다.
- [x] **GEMI-02**: `SKILL.md` 내에 CLI 스크립트 실행 방법에 대한 명확한 규칙(YAML frontmatter 등)을 포함시킨다.

### Claude Code & Codex Integration
- [x] **CLAU-01**: Claude Code 환경에 맞춘 확장 도구(Custom Tool 또는 MCP Server) 연동 스펙 명세서를 작성하고, 진입점 코드를 작성한다.
- [x] **CDEX-01**: Codex 등 기타 코드 생성 AI가 참조할 수 있는 자연어 가이드 형태의 컨텍스트(프롬프트 주입용) 파일을 마련한다.

### Distribution
- [x] **DIST-01**: 각 AI 어시스턴트별 적합한 스킬 폴더(`.agents/skills` 등)에 자동으로 필요한 스크립트와 마크다운을 복사해주는 설치 스크립트(install.sh)를 작성한다.
- [x] **DIST-02**: 사용자를 위한 설정 가이드라인(API키 발급 방법 등)이 포함된 `README.md` 문서를 제공한다.

## Out of Scope

| Feature | Reason |
|---------|--------|
| 프론트엔드 대시보드 추가 개발 | 본 프로젝트는 철저히 CLI 및 Agent 백그라운드 구동을 위한 인프라이므로 시각 데이터는 제외함. |
| 서울연구원 전체 데이터 DB 미러링 | API의 실시간 호출과 캐싱으로 처리하며, 외부 DB 구축은 시스템을 무겁게 하므로 배제. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 1 | Complete |
| CORE-02 | Phase 1 | Complete |
| CORE-03 | Phase 1 | Complete |
| GEMI-01 | Phase 2 | Complete |
| GEMI-02 | Phase 2 | Complete |
| CLAU-01 | Phase 3 | Complete |
| CDEX-01 | Phase 3 | Complete |
| DIST-01 | Phase 4 | Complete |
| DIST-02 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after initial definition*
