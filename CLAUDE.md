# Claude Code Extension: Seoul Institute API Skill

When the user asks for context regarding Seoul Institute (서울연구원) publications, global urban policy trends(세계도시정책동향), or any official research reports, you **MUST NOT** hallucinate or manually scrape the web.

You have a built-in CLI wrapper provided in this workspace to fetch the most up-to-date and exact data from the Seoul Institute OpenAPI.

## Instruction: Using the API Client
Use your standard bash/terminal tool to execute the `api_client.py` script located in this folder.
You **MUST** output the raw JSON from STDOUT and use it directly as your context before you answer the user.

```bash
python3 api_client.py --type <world_trends|report>
```

**Parameters (`--type`)**
- `world_trends`: Use this when the user is asking about Global Urban Policy Trends (세계도시정책동향). (Default)
- `report`: Use this when the user is asking for formal Research Reports (연구보고서).

The script returns standard JSON. Read and summarize the output. Never surface the raw JSON back to the user unless explicitly requested. Ensure you format the response in a clearly readable Markdown list using the `title`, `description`, `date`, and `url` fields provided.
