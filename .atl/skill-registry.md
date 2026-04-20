# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger                                                                                                                         | Skill          | Path                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------- |
| When writing Go tests, using teatest, or adding test coverage.                                                                  | go-testing     | /home/histo/.claude/skills/go-testing/SKILL.md     |
| When user asks to create a new skill, add agent instructions, or document patterns for AI.                                      | skill-creator  | /home/histo/.claude/skills/skill-creator/SKILL.md  |
| When creating a GitHub issue, reporting a bug, or requesting a feature.                                                         | issue-creation | /home/histo/.claude/skills/issue-creation/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review.                                                    | branch-pr      | /home/histo/.claude/skills/branch-pr/SKILL.md      |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day   | /home/histo/.claude/skills/judgment-day/SKILL.md   |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### go-testing

- Prefer table-driven tests for multi-case behavior and cover success + error paths.
- Test Bubbletea state transitions directly through `Model.Update()` before heavier integration tests.
- Use `teatest.NewTestModel()` for full interactive TUI flows and wait for completion explicitly.
- Use golden files in `testdata/` for stable `View()` output assertions.
- Use `t.TempDir()` for filesystem work and interface-based mocks for `os/exec` or side effects.

### skill-creator

- Create a skill only for reusable patterns, complex workflows, or project-specific conventions.
- Use `skills/{skill-name}/SKILL.md` with optional `assets/` and `references/` directories.
- Frontmatter MUST include `name`, `description` with `Trigger:`, license, author, and version.
- Put critical patterns first, keep examples minimal, and include a copy-paste Commands section.
- `references/` must point to LOCAL files, not web URLs.
- Register every new skill in `AGENTS.md`.

### issue-creation

- Always search for duplicates before creating a new issue.
- Blank issues are disabled: use the bug or feature template and fill every required field.
- New issues get `status:needs-review`; a maintainer must add `status:approved` before any PR.
- Questions belong in Discussions, not Issues.
- Use conventional issue titles like `fix(scope): ...` or `feat(scope): ...`.

### branch-pr

- Every PR MUST link exactly one approved issue and include exactly one `type:*` label.
- Branch names must follow `type/description` using lowercase `a-z0-9._-` only.
- Use conventional commits; never add AI attribution or `Co-Authored-By` trailers.
- Build the PR body from the template with linked issue, summary, changes table, and test plan.
- Run shellcheck on modified shell scripts before opening the PR.
- Expect GitHub checks to enforce issue linkage, approval, and `type:*` labeling.

### judgment-day

- Resolve project skills first, then inject matching compact rules into every judge and fix-agent prompt.
- Launch exactly two blind judges in parallel; neither judge knows about the other.
- Synthesize findings as confirmed, suspect A/B, or contradiction; the orchestrator does that work.
- Classify warnings as `real` only if a normal user can trigger them; otherwise report them as theoretical/info.
- Fix only confirmed CRITICAL or real WARNING issues, then re-judge with fresh delegates.
- After two fix iterations, escalate to the user instead of looping forever.

## Project Conventions

| File | Path | Notes                                                                                                                                        |
| ---- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| —    | —    | No project convention files found in the repository root (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, `copilot-instructions.md`). |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
