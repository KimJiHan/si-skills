---
name: the-seoul-institute
description: Search and fetch research reports, policy trends, and publications from the The Seoul Institute (서울연구원). Use this skill whenever the user asks for data, reports, or trends related to Seoul's urban policies or Seoul Institute publications.
---

# The Seoul Institute API Skill

This skill allows you to search and extract data from the Seoul Institute (서울연구원) OpenAPI. The provided data includes urban policy trends, research reports, and other publications.

## When to use this skill
Trigger this skill when the user asks questions or makes requests like:
- "서울연구원 자료 찾아줘"
- "서울연구원 최신 정책동향 검색해줘"
- "서울연구원에서 발간된 단행본 찾아줘"
- "Fetch world trends from Seoul Institute"

## How to use this skill
You must use your generic terminal/command execution tool (like `run_command` or similar) to call the `api_client.py` script provided by this skill package.

### Command Execution
To fetch data, execute the following command in the terminal where the skill is installed:

```bash
python3 /path/to/si-skill/api_client.py --type <data_type>
```
*(Note: Replace `/path/to/si-skill` with the actual absolute path to the `api_client.py` script based on your workspace context)*

### Supported `--type` Parameters
- `world_trends` (Default): 세계도시정책동향 (Global Urban Policy Trends)
- `report`: 연구보고서 (Research Reports)
- *If the user does not specify a category, default to `world_trends`.*

### Output Format
The python script returns a JSON object containing:
- `success` (boolean)
- `total` (integer): Total number of results available
- `count` (integer): Number of results returned in this batch
- `results` (array): Array of items, each containing `title`, `author` (the creator or researcher names), `description` (HTML-stripped summary), `images` (array of image URLs found in the content), `date`, `url`, and `type`.

### Handling Outputs
Do not try to read or parse the XML yourself. The `api_client.py` script has already sanitized the XML into a highly readable JSON format, removing problematic CDATA and complex tags. Directly read the STDOUT of your `run_command` and present the findings to the user in a neatly summarized Markdown format.
