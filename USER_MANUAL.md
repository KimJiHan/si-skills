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

굳이 AI를 거치지 않고 개발자가 직접 터미널에서 데이터를 받아 JSON으로 테스트하거나 활용하고 싶다면 `api_client.py`를 직접 실행할 수 있습니다.

### ⚙️ Command Line Arguments (인수별 기능)

`api_client.py` 스크립트는 `--type` 인수를 지원하여, 어떤 종류의 데이터를 가져올지 제어할 수 있습니다.

| 인수명 | 기본값 | 설명 | 예시 명령어 |
| :--- | :--- | :--- | :--- |
| `--type` | `world_trends` | 조회할 데이터의 주제 및 식별자를 지정합니다. | `python3 api_client.py --type <타입명>` |

**지원되는 주요 `<타입명>` 종류:**
*   `world_trends` (기본값): **세계도시정책동향**. 이 인수를 넘기면 전 세계 주요 도시의 새로운 정책 도입 및 동향 리포트를 추출합니다.
*   `report`: **연구보고서**. 서울연구원에서 가장 대표적으로 발행하는 공식 연구/학술 보고서 목록을 추출합니다.
*   `policy`: 그 외 정책 관련 기타 자료 (API 지원 시)

### 🗂 추출 및 반환되는 데이터 (Output Fields)

명령어를 실행하면 깔끔한 표준 JSON 형식으로 리스트가 콘솔 스탠다드 아웃풋(STDOUT)으로 반환됩니다. 한 결과(`row`) 당 다음의 정보가 정제되어 포함됩니다:
*   `title`: 게시물, 트렌드, 또는 보고서의 제목
*   `author`: 작성자, 연구진 (`creator` XML 노드에서 추출)
*   `description`: HTML 태그가 깔끔하게 제거된 본문 내용 또는 요약 텍스트
*   `images`: 본문 내 포함되어 있던 이미지 절대 경로 URL 목록 (`<img>` 태그 파싱)
*   `date`: 작성 및 발행 일자 (YYYY-MM-DD 등)
*   `url`: 원문을 확인할 수 있는 서울연구원의 고유 웹 URL 주소
*   `type`: API가 내부적으로 응답한 실제 아이템 타입 정보

### 💡 터미널 활용방법 예시

```bash
# 기본(세계도시정책동향) 최신 데이터 조회 (STDOUT 출력)
python3 api_client.py

# 연구보고서로 타입을 변경하여 명시적으로 조회
python3 api_client.py --type report

# json 데이터 결과물을 로컬 파일로 저장하여 가공하기
python3 api_client.py --type world_trends > result.json
```
