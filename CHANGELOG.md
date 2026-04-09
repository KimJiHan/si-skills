# Release Notes: Seoul Institute API Skill Pack v1.0.0

**Release Date:** 2026-04-09
**Status:** Stable / Initial Release

첫 번째 정식 버전(v1.0.0)이 릴리즈되었습니다! 이번 릴리즈는 AI 어시스턴트(Claude, Gemini, Copilot, Codex 등) 환경에 서울연구원(Seoul Institute)의 방대한 연구/동향 데이터를 즉각적으로 주입할 수 있는 "의존성 없는(Dependency-Free)" 스킬 팩의 완성을 의미합니다.

---

## 🚀 Key Features

### 1. 단일 CLI 엔진 (`api_client.py`) 구축
- **표준 라이브러리 구동**: `requests`나 `python-dotenv` 같은 서드파티 패키지 설치 없이, `urllib`과 내장 `json` / `xml` 모듈만으로 모든 API 통신을 완벽히 소화합니다.
- **XML to Clean JSON 변환**: 에이전트의 컨텍스트를 파괴하는 복잡한 XML을 정제하여 가독성 높은 JSON 리스트로 자동 변환합니다. HTML 태그 디코딩(`html.unescape`)도 기본 탑재되었습니다.

### 2. 다중 AI 플랫폼 네이티브 연동
- **Gemini & OpenCode**: `.agents/skills` 경로에서 즉시 작동하는 `SKILL.md` 구조(YAML Frontmatter 포함) 지원.
- **Claude Code**: 워크스페이스 맥락을 직접 주입하는 `CLAUDE.md`로 무거운 별도 MCP 없이도 명령어 실행 강제화.
- **Codex & Copilot**: 에이전트가 코딩 시 임의의 웹 스크래퍼를 만들지 않도록 방어하는 가이드라인 `CODEX.md` 제공.

### 3. 1-Click 배포 스크립트 (`install.sh`)
- 개발자가 Repo 클론 직후 단 한 줄로 글로벌(`~/.agents/skills/seoul-institute`) 환경에 스킬들을 동기화할 수 있는 안전한 설치 스크립트.
- 절대 경로 리졸버(Absolute Path Resolver) 방식을 통해 개발 소스와 실행 스킬 간 심볼릭 링크/텍스트 매핑 완비.

---

## 🛠 Getting Started

가장 빠른 설치 방법은 터미널을 열어 아래를 실행하는 것입니다:
```bash
git clone <repository_url> si-skill
cd si-skill
chmod +x install.sh
./install.sh
```
> 설치 후 `.env` 파일에 발급받으신 `SI_API_KEY`를 넣는 것을 잊지 마세요!

---

## 🔮 What's Next? (Coming in v1.1.0)
- 검색 쿼리(Keyword) 파라미터 연동 고도화
- 페이지네이션 및 리미트 파라미터 적용
- 에러 코드 시멘틱 분석 및 사용자 피드백 메세지 강화

감사합니다. 이 스킬 팩으로 여러분의 AI에 더욱 똑똑하고 공신력 있는 서울도시 트렌드를 불어넣으시길 바랍니다!
