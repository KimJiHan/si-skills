# Seoul Institute API Skill Pack - User Manual

환영합니다! 본 매뉴얼은 **서울연구원 API 스킬 팩 (`si-skills`)**을 당신의 시스템과 AI 환경에 완벽하게 세팅하고 활용하는 전 과정을 쉽고 체계적으로 안내합니다.

## 1. 사전 준비 (Prerequisites)
- **운영체제**: macOS, Linux (`bash` 쉘 지원)
- **Python**: Python 3 이상 필수 (추가 의존성/패키지 불필요)
- **AI Agent**: Gemini(Antigravity), Claude Code, OpenCode 혹은 GitHub Copilot 환경

## 2. 간편 설치 가이드 (1-Click Install)

터미널을 열고, 프로젝트를 클론받은 뒤 아래 명령어만 순서대로 복사해서 실행하세요.

```bash
# 1. 깃허브에서 저장소 클론 (당신의 저장소 주소에 맞게)
git clone https://github.com/KimJiHan/si-skills.git
cd si-skills

# 2. 실행 권한 부여 및 설치 스크립트 가동
chmod +x install.sh
./install.sh
```

**What happens?**
- `install.sh`가 당신의 `~/.agents/skills/seoul-institute` 폴더를 자동으로 생성합니다.
- `SKILL.md`와 `CODEX.md`를 셋팅하여 에이전트들이 스스로 인식하도록 심볼릭 링크를 연결합니다.

## 3. 인증 정보 세팅 (.env)

설치가 완료되면 루트 디렉토리에 `.env` 파일이 생성되거나 필요하다는 안내가 나옵니다.
이 프로젝트는 **서울연구원 OpenAPI 시스템**과 통신하므로 발급받은 API 키가 필요합니다.

1. [서울연구원 포털](https://www.si.re.kr/)에서 OpenAPI 키 발급을 신청합니다.
2. 에디터로 본 프로젝트 내 `.env` 파일을 엽니다.
3. 다음과 같이 작성하고 저장합니다:
   ```env
   SI_API_KEY=당신의_발급된_API키
   ```

## 4. AI 어시스턴트별 사용 방법

### 🪙 Gemini / OpenCode 에이전트
현재 보고 계신 터미널 창(또는 워크스페이스)에서 곧바로 AI 어시스턴트에게 이렇게 요청해 보세요.
> "서울연구원 정책 동향 찾아줘"
> "@seoul-institute 연구보고서 목록 확인해 줘" 

에이전트는 백그라운드에서 `SKILL.md`에 정의된 규격에 따라 스스로 터미널 명령어를 조합하여 데이터를 긁어와 마크다운으로 깔끔히 답변을 생성합니다.

### 🧠 Claude Code 환경
워크스페이스 프로젝트 최상단에 있는 `CLAUDE.md`로 인해 이미 학습이 완료된 상태입니다.
> "서울연구원의 세계정책동향 최신 데이터 3건을 요약 시스템 프롬프트 없이 자연스럽게 읽어봐."

### 📝 Github Copilot / Codex / Cursor
코드를 작성하는 도중, 서울연구원 데이터를 끌어와야 할 때 별도의 복잡한 코딩을 할 필요가 없습니다. 
> "주석: Python 코드로 서울연구원 데이터 조회하는 함수 만들어줘."

이를 통해 에이전트는 복잡한 정규식이나 XML 파서를 만드는 대신, 프로젝트에 내장된 `api_client.py` 래퍼를 안전하게 서브프로세스로 부르는 견고한 코드를 추천합니다.

## 5. 수동 CLI 사용 방법 (For Developers)
굳이 AI를 거치지 않고 개발자가 직접 터미널에서 데이터를 받아 JSON으로 테스트하고 싶다면 아래와 같이 활용할 수 있습니다.

```bash
# 기본(세계정책동향) 최신 10건 조회
python3 api_client.py

# 연구보고서로 타입을 변경하여 조회 (현재 SI_API 규격에 맞는 타입을 지정)
python3 api_client.py --type report
```
