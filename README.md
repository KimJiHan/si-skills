# The Seoul Institute API Skill Pack (서울연구원 스킬)

[![State](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Type](https://img.shields.io/badge/Type-AI_Skill-blue.svg)]()

이 프로젝트는 기존의 서울연구원 OpenAPI를 AI 코딩 어시스턴트(Claude Code, Gemini, Copilot, Codex, OpenCode)가 어떠한 추가적인 HTTP 서버 구동이나 복잡성 없이 직접 터미널에서 구동하고 데이터를 추출할 수 있도록 돕는 **의존성 없는(Dependency-Free)** 스킬 팩입니다.

---

## 🔥 Features
- **Zero Dependencies**: `python-dotenv`나 `requests`를 설치하느라 가상환경(`venv`)과 씨름할 필요 없이 오로지 파이썬 표준 라이브러리 만으로 실행되는 핵심 엔진(`api_client.py`)
- **Native Support for Gemini & OpenCode**: 시스템 표준 `SKILL.md` 포맷 배포
- **Native Support for Claude Code**: 워크스페이스에 머물기만 하면 즉시 학습하는 글로벌 `CLAUDE.md` 프롬프트 제공
- **Copilot/Codex Fallback**: 코드 자동 완성 AI가 쓸데없는 XML 파싱 스크립트 작성에 토큰을 낭비하지 않도록, 이 래퍼를 `subprocess`로 부르는 안전한 형태의 코딩을 강제

## 🚀 1-Click Install
저장소를 클론한 후(터미널 진입 후) 곧바로 인스톨 스크립트를 실행하면 AI의 글로벌 폴더(`~/.agents/skills`)에 알아서 설치 및 바인딩됩니다.

```bash
chmod +x install.sh
./install.sh
```

설치 직후 반드시 루트 디렉토리의 `.env` 파일 안에 본인의 오픈API 키를 등록해야 합니다. (기본적으로 개발용 테스트 키가 세팅되어 있습니다)

```
SI_API_KEY=당신의_발급된_API키
```

## 🛠 Usage
### 1. Claude Code
별도의 설치 커맨드도 사실 필요하지 않습니다. 터미널의 이 프로젝트 경로 안에서 `claude` 커맨드를 실행하면 준비 끝입니다.
> "서울연구원의 세계정책동향 최신 데이터 3개만 요약해 줄래?"

Claude는 즉각 `api_client.py`를 파악하고 검색해올 것입니다.

### 2. Gemini / OpenCode
설치 스크립트(`install.sh`)를 실행하면 `~/.agents/skills/seoul-institute/SKILL.md` 가 활성화됩니다.
> "@seoul-institute 연구보고서 목록 확인해 줘" 

Gemini가 경로를 인식하고 STDOUT에서 JSON을 가져와 매끄러운 한글 마크다운으로 치환해줍니다.

## ⚙️ Manual CLI Usage (For Humans)
AI가 아닌 직접 수동으로 결과를 받아보고 싶다면 다음 명령어를 사용하세요.

```bash
# 기본(world_trends) 조회
python3 api_client.py

# 연구보고서 조회
python3 api_client.py --type report
```
