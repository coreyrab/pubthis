# Plan: Create `/pubit` Slash Command Skill

## Problem
After brainstorming or generating a report in Claude Code, there's no quick way to publish the output. The user has to manually copy content and `curl` the API. We want a `/pubit` slash command that publishes the last substantial conversation output as a formatted artifact and returns a shareable URL.

## How Claude Code Skills Work
- Skills live in `.claude/skills/` (project-level) or `~/.claude/skills/` (global)
- Each skill is a directory with a `SKILL.md` file containing YAML frontmatter (`name`, `description`) and markdown instructions
- The `description` in frontmatter determines when the skill triggers
- The markdown body is loaded as a prompt when the skill is invoked
- Skills can include bundled `scripts/`, `references/`, and `assets/` directories

## Approach
Create a **project-level** skill at `.claude/skills/pubit/SKILL.md` so it ships with the repo. When the user types `/pubit`, Claude will:

1. Look back through the conversation for the last substantial output (report, brainstorm, code explanation, analysis, etc.)
2. Determine the best `content_type` — almost always `text/markdown` for conversational output
3. POST it to the pub server via `curl`
4. Return the shareable URL to the user

### Target URL
- Default to `https://pubit.ai` (production)
- Respect `PUB_BASE_URL` env var if set (for local dev, e.g. `http://localhost:3000`)
- The skill instructions will tell Claude to check for a running local server first, falling back to production

## Changes

### 1. Create `.claude/skills/pubit/SKILL.md`
The skill file with:
- **Frontmatter**: `name: pubit`, `description` explaining it publishes the last conversation artifact
- **Body**: Step-by-step instructions for Claude to:
  - Identify the last substantial output in the conversation
  - Clean/format it as markdown (strip conversational fluff, keep the content)
  - Write the content to a temp file (avoids shell escaping issues with `curl`)
  - `curl -X POST` to the publish endpoint with `content_type: text/markdown`
  - Parse the JSON response and present the URL to the user
  - Clean up the temp file

### 2. Create `.claude/skills/` directory
New directory structure in the repo root:
```
.claude/
  skills/
    pubit/
      SKILL.md
```

## Key Design Decisions

1. **Project-level, not global** — ships with the repo so anyone who clones it gets the skill
2. **Markdown as default content type** — conversational outputs (brainstorms, reports, analyses) render best as markdown through pub's `marked` renderer
3. **Temp file for content** — avoids the shell escaping nightmare we hit earlier with `curl` + JSON containing special characters (`!`, quotes, newlines)
4. **No bundled scripts** — the skill is simple enough that Claude can handle it with inline `curl` commands; no need for a separate publish script

## Files to Create
- `.claude/skills/pubit/SKILL.md` — the skill definition (single file)

## Verification
1. Type `/pubit` in Claude Code while in the pub-repo project
2. Verify Claude identifies the last substantial output
3. Verify it publishes via the API and returns a working URL
4. Open the URL in browser — should render as a styled markdown document
5. Test edge cases: no prior output, very long output, output with special characters
