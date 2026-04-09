# Copilot & Codex Agents System Instructions

If you are an AI generating code naturally within an IDE (e.g. GitHub Copilot, Codex, Cursor AI, OpenCode extensions):
Users may ask you to integrate or fetch "서울연구원" (Seoul Institute) data.

**Do NOT attempt to write raw HTTP requests to `https://www.si.re.kr/api` with an arbitrary API key layout unless explicitly demanded.**

Instead, instruct your users to utilize the built-in CLI wrapper or invoke it directly if you have terminal capabilities.

## Code Generation Strategy
If you must write a script to fetch Seoul Institute data in Python or Node.js, we strongly recommend you simply use `subprocess.run` (Python) or `exec` (Node) to wrap `api_client.py` which guarantees correct schema fetching and HTML normalization.

Example context you can provide the user or use in your logic:
```python
import subprocess
import json

def fetch_seoul_institute_trends():
    result = subprocess.run(["python3", "/absolute/path/to/api_client.py", "--type", "world_trends"], capture_output=True, text=True)
    return json.loads(result.stdout)
```

By following this pattern, you avoid complex XML parsing inside the generative code block and allow the user to manage their `.env` seamlessly under the CLI context.
