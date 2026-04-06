---
name: Generate Code
description: "Generate production-ready code from a goal, using workspace context and existing project patterns."
argument-hint: "Describe what to build, constraints, and target files"
agent: agent
---

Generate code for the user request below.

User request:
${input:Describe what to build, constraints, and target files}

Instructions: 0. Default mode: implement directly by editing files, not suggestions-only mode.

1. Use existing project conventions, naming, and architecture patterns.
2. Prefer modifying existing files when that is cleaner than creating new ones.
3. If creating files, place them in the most appropriate project folders.
4. Keep changes minimal and task-focused; avoid unrelated refactors.
5. Include brief comments only when logic is non-obvious.
6. Validate for obvious type/lint/runtime issues before finalizing.

Output format:

- Summary of what was implemented
- Files changed with concise purpose per file
- Any follow-up actions or assumptions

If the request is ambiguous, ask only the minimum clarifying questions needed to proceed.
