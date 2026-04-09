#!/usr/bin/env bash

# Seoul Institute API Skill - Installation Script
echo "================================================"
echo " Seoul Institute API Skill Installer "
echo "================================================"
echo ""

# 1. Determine directories
PROJECT_DIR="$(pwd)"
API_CLIENT_PATH="$PROJECT_DIR/api_client.py"
SKILLS_DIR="$HOME/.agents/skills/seoul-institute"

echo "Project Directory: $PROJECT_DIR"
echo "Target Install Directory: $SKILLS_DIR"
echo ""

# 2. Check essential files
if [ ! -f "$API_CLIENT_PATH" ]; then
    echo "[!] Error: api_client.py not found in current directory."
    echo "Please run this script from the root of the si-skill repository."
    exit 1
fi

# 3. Setup .env
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo "[*] .env file not found. Creating from .env.example..."
    if [ -f "$PROJECT_DIR/.env.example" ]; then
        cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
        echo "[!] Action Required: Open '$PROJECT_DIR/.env' and set your SI_API_KEY."
    else
        echo "[!] Warning: .env.example also missing. Please manually create .env and add SI_API_KEY."
    fi
else
    echo "[*] .env file already exists. Skipping."
fi

# 4. Process SKILL.md for Gemini & OpenCode
echo "[*] Creating Agent folders at $SKILLS_DIR..."
mkdir -p "$SKILLS_DIR"

echo "[*] Configuring SKILL.md with absolute paths..."
# Read the template and replace the placeholder path with the actual absolute path
sed "s|/path/to/si-skill|${PROJECT_DIR}|g" "$PROJECT_DIR/skills/seoul-institute/SKILL.md" > "$SKILLS_DIR/SKILL.md"

# 5. Link CODEX.md
echo "[*] Linking CODEX.md..."
ln -sf "$PROJECT_DIR/skills/seoul-institute/CODEX.md" "$SKILLS_DIR/CODEX.md"

echo ""
echo "================================================"
echo " Installation Complete!"
echo "================================================"
echo "Your AI Agents are now equipped with the Seoul Institute skill."
echo "If you are using Claude Code, the CLAUDE.md file in this directory automatically covers it."
echo "Copilot/Codex users can refer to $SKILLS_DIR/CODEX.md."
echo ""
echo "Don't forget to update your API_KEY in the .env file if you haven't already!"
