# 서울연구원 API Skill Pack

## What This Is

이 프로젝트는 서울연구원(Seoul Institute) OpenAPI를 Claude Code, Codex, OpenCode, Gemini와 같은 AI 코딩 어시스턴트들이 직접 활용할 수 있도록 'Skill' 형태로 패키징하는 통합 브릿지 도구입니다. 각 AI 환경에 맞는 스킬 정의(마크다운, JSON 등)와 백그라운드 API 호출 래퍼(Proxy/CLI)를 제공하여, 에이전트가 서울연구원의 연구보고서, 정책 동향 등의 공공 데이터를 스스로 검색하고 컨텍스트에 활용할 수 있게 합니다.

## Core Value

여러 종류의 AI 에이전트들이 복잡한 API 인증이나 CORS 문제 없이 일관되고 간단한 인터페이스(Skill)를 통해 서울연구원의 방대한 지식 데이터에 즉시 접근할 수 있도록 돕는 것.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] [Req 1] 서울연구원 API를 콘솔에서 직접 호출하고 파싱할 수 있는 CLI/스크립트 코어 엔진 개발
- [ ] [Req 2] Gemini / OpenCode용 `SKILL.md` 포맷 규격 작성 
- [ ] [Req 3] Claude Code용 스킬/MCP(Model Context Protocol) 연동 규격 작성
- [ ] [Req 4] Codex 환경을 대비한 프롬프트 주입 형태의 스킬 문서화 작성
- [ ] [Req 5] 사용자가 쉽게 자신의 환경(.agents/skills 등)에 스킬을 설치할 수 있는 설치 스크립트 제공

### Out of Scope

- 무거운 웹 UI 개발 (본 프로젝트는 에이전트를 위한 CLI/Skill 백엔드 기반 프로젝트이므로 시각적 UI는 배제)
- AI 에이전트 자체의 구조적 수정 (에이전트에서 지원하는 공식 확장/Skill 규칙만 사용)

## Context

- 사용자는 로컬에 `app.js`, `proxy_server.py`, `style.css` 등 기존 서울연구원 RND API 호출용 웹 뷰어 프로젝트를 구성하고 있었습니다.
- 이제 이 웹뷰의 기능을 넘어서, 개발자가 사용하는 다양한 AI 툴(Gemini, Claude Code 등)이 직접 이 데이터를 꺼내쓸 수 있는 '에이전트용 스킬'로 전환/확장하고자 합니다.
- 스킬 구조는 각 AI의 제약이 다르므로 CLI 래퍼 하나를 두고 각 AI의 스킬 정의 문서가 이 CLI를 실행하도록(run_command) 유도하는 방식이 유리합니다.

## Constraints

- **Compatibility**: 각 AI의 스킬 포맷(예: Gemini의 `.agents/skills`, Claude의 MCP/도구 등)을 준수해야 함.
- **Dependency**: API key 등 보안 정보는 로컬 환경변수나 구성 파일(`.env`)로 격리되어 있어야 함.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| CLI 기반 단일 진입점 구성 | 플랫폼마다 다른 스킬 형태를 갖지만, 결국 로컬에서 동일한 스크립트를 실행하도록 만들기 위함 | — Pending |

---
*Last updated: 2026-04-09 after initialization*
