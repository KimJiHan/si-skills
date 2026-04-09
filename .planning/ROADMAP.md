# Phase 1: Core CLI Engine Development

**Goal**: 구축하려는 모든 AI Skill의 기반이 될 단일 진입점(CLI) 개발
**Requirements**: CORE-01, CORE-02, CORE-03

1. **API 연결 모듈 개발 (`api_client.py`)**:
   - 기존 `proxy_server.py`의 구조를 참고하여, FastAPI 의존성을 제거하고 순수 데이터 Fetcher로 개편.
   - 환경 변수(`.env`) 관리를 통한 API_KEY 처리.
2. **CLI 래퍼 구축 (`cli.py`)**:
   - `argparse` 등 라이브러리를 사용해 카테고리(단행본, 연구보고서 등) 및 검색어를 인자로 받는 기능 구현.
   - 에이전트들이 읽기 편한 순수 JSON 또는 Markdown 포맷으로 결과를 출력.
3. **에러 핸들링 및 예외 처리**:
   - API 만료, 타임아웃, 결과 없음 등의 응답을 Agent가 스스로 파악할 수 있는 메시지로 규격화.

---
# Phase 2: Gemini & OpenCode Skill Creation

**Goal**: Gemini 및 OpenCode 등 `SKILL.md` 규격을 사용하는 에이전트를 위한 스킬 패키징
**Requirements**: GEMI-01, GEMI-02

1. **`SKILL.md` 포맷 생성**:
   - 스킬 이름, 설명, 프롬프트 주입 정보(언제 이 스킬을 사용할 것인가) 작성.
   - 에이전트가 서울연구원 데이터를 찾기 위해 앞서 만든 `cli.py`를 `run_command` 도구를 통해 어떻게 호출해야 하는지 상세 기재.
2. **Skill 템플릿화**:
   - 추후 사용자가 `.agents/skills/seoul-institute` 폴더에 그대로 복사해서 쓸 수 있도록 디렉토리 구조화.

---
# Phase 3: Claude Code & Codex Integration

**Goal**: MCP(Model Context Protocol) 또는 독자 규격을 사용하는 글로벌 에이전트 연동
**Requirements**: CLAU-01, CDEX-01

1. **Claude Code 연동 (MCP 준수)**:
   - Claude가 도구(Tool)로 바로 호출할 수 있도록 `cli.py`를 감싸는 간단한 MCP STDIO 서버 작성 혹은 간단한 셸 커맨드 매핑 파일 작성.
2. **Codex/기타 환경용 System Prompt 제공**:
   - 코드 생성 환경에서 자연어 컨텍스트로 이 CLI 도구를 활용할 수 있는 가이드라인(Guidelines) 텍스트 파일 생성.

---
# Phase 4: Distribution & Documentation

**Goal**: 배포 및 설치 편의성 향상
**Requirements**: DIST-01, DIST-02

1. **설치 스크립트 작성 (`install.sh`)**:
   - 실행 시 유저의 `.agents/skills` 경로 및 기타 환경에 관련된 스킬 파일을 자동 세팅하고, Python 패키지 의존성을 설치하는 스크립트.
2. **`README.md` 작성**:
   - 각 스킬별(Gemini, Claude, Codex) 설치 방법과 사용 예시 명세 제공.
   - API Key 발급 방법 링크 제공.
