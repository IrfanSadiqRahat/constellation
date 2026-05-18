<div align="center">

# 🌌 Constellation

### 200 role-specific AI agents · 20 teams · 14 methodology skills · 15 team formations
### The virtual engineering org for Claude Code, Cursor, Codex CLI, and any agentic IDE

[![CI](https://github.com/IrfanSadiqRahat/constellation/actions/workflows/ci.yml/badge.svg)](https://github.com/IrfanSadiqRahat/constellation/actions)
[![npm](https://img.shields.io/npm/v/constellation-agents)](https://www.npmjs.com/package/constellation-agents)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

---

## what this is

Constellation is a multi-agent system that ships **all three layers** in one tool:

- **200 role identities** (WHO to be) — sharp, single-responsibility roles across the full product lifecycle
- **14 methodology skills** (HOW to work) — brainstorm, TDD, planning, debugging, dispatch, validation, role-switching, memory, parallel execution, adversarial review, and more
- **15 pre-baked team formations** (WHAT to ship) — runnable multi-stage pipelines with typed artifact contracts

---

## install

```bash
# install the full methodology pack into Claude Code
npx constellation-agents methodology install

# install a whole team formation into the current project
npx constellation-agents team saas-mvp --project

# or globally
npm install -g constellation-agents
```

Skills land in `~/.claude/skills/` (user) or `./.claude/skills/` (project). Claude Code auto-loads them; Cursor / Codex CLI / Gemini CLI honor the same convention.

---

## the 14 methodology skills

| skill | what it does |
|---|---|
| `brainstorm` | Refine vague intent into a concrete typed brief before any work begins. Role-aware question banks. |
| `tdd-discipline` | Role-aware TDD. No production code without a failing test first. Test shape differs by role. |
| `planning-with-artifacts` | Break work into 2–5 min tasks with typed artifact handoffs and rollback points. |
| `systematic-debug` | Five-phase root cause process with role-aware diagnostics. |
| `subagent-dispatch` | Fresh subagent per task with typed-contract briefing and two-stage review. |
| `verify-before-done` | Three checks: schema valid, acceptance criteria met, downstream readiness. |
| `parallel-execution` | Four named patterns (map, fan-out, adversarial, race) with declared merge strategies. |
| `adversarial-review` | Three reviewer lenses (quality, security, performance) in parallel; coordinator synthesizes. |
| `handoff-protocol` | Pass typed artifacts between roles via structured packets. |
| `role-switching` | When and how to swap which role the agent is playing. |
| `artifact-validation` | Mechanical schema + invariant checks on every produced artifact. |
| `pipeline-orchestration` | Drive a team formation end-to-end with role switching, validation, and rollback. |
| `memory-protocol` | Persistent role-scoped notes across sessions. |
| `using-constellation` | Meta-skill for navigating the system. |

All 14 methodology skills live under [`methodology/`](methodology/). Install with `constellation methodology install`.

---

## the 20 teams (200 agents, 67 keystones authored)

Product · Design · Frontend · Backend · Data · Mobile · AI/ML · DevOps/SRE · Cloud · Security · Quality · Documentation · Databases · Growth · Sales/Support · Legal/Compliance · Finance · Research · Operations · Specialists

**67 keystones fully authored. 133 manifest-only stubs** ship with role brief and artifact contract — install creates a SKILL.md you can edit or PR.

Run `constellation list` to see all 200.

---

## the 15 team formations

```bash
constellation team saas-mvp                # zero → first revenue
constellation team security-audit          # full-stack security assessment
constellation team ai-product              # ship LLM feature with evals
constellation team incident-response       # activate during a live incident
constellation team mobile-launch           # ship app to both stores
constellation team data-platform           # analytics + ML platform
constellation team fundraise               # prep venture round
constellation team growth-engine           # compounding growth
constellation team compliance-sprint       # SOC 2 / GDPR / HIPAA
constellation team open-source-release     # internal lib → adopted OSS
constellation team enterprise-rollout      # SMB → first enterprise
constellation team platform-migration      # cloud/framework migration
constellation team design-system-build     # design system from scratch
constellation team hiring-loop             # senior IC hiring loop
constellation team rag-quality             # RAG: prototype → production
```

Each formation declares a **pipeline** with typed artifacts:

```bash
$ constellation pipeline saas-mvp
1. discover     (product-strategist, prd-writer)        → PRD
2. design       (design-lead)               consumes PRD  → DesignBrief
3. build        (frontend-architect, backend-architect, db-architect)
                                            consumes DesignBrief  → MVP
4. monetize     (billing-architect)         consumes MVP  → MonetizedMVP
5. harden       (sre-lead, privacy-architect) consumes MonetizedMVP → ProductionMVP
6. launch       (growth-lead)               consumes ProductionMVP → LaunchPlan
```

## run a pipeline end-to-end

```bash
constellation run saas-mvp --goal "ship a paid AI note-taking app"
```

Outputs a complete orchestration prompt — paste into Claude Code / Cursor / Codex CLI. The agent reads the methodology pack, switches roles per phase, dispatches subagents, validates artifacts, hands off via typed packets.

---

## CLI

```
constellation list [--teams|--formations]   list agents / teams / formations
constellation search <q>                    fuzzy search across all 200 agents
constellation install <id> [--project]      install one agent
constellation team <id> [--project]         install a full team formation
constellation pipeline <id>                  show team pipeline
constellation run <id> [--goal "..."]       emit runnable orchestration prompt
constellation methodology [install]         list/install methodology pack
```

---

## artifact contract (the moat)

Every agent's `SKILL.md` declares:

```yaml
---
name: backend-architect
description: ...
team: backend
input: PRD                    # what upstream agent produced
output: BackendArchitecture   # what this agent produces
---
```

This makes agents **composable**. The PRD-writer doesn't know who reads its output. The Backend-architect doesn't know who wrote its input. Like microservices for thinking.

JSON Schemas at [`schema/`](schema/) enforce manifest + team formation shape. CI validates on every push.

---

## install paths

```bash
# npm
npm install -g constellation-agents

# npx (no install)
npx constellation-agents <command>

# Claude Code plugin (after publish)
/plugin marketplace add IrfanSadiqRahat/constellation
/plugin install constellation
```

A Homebrew formula stub lives at `Formula/constellation.rb`.

---

## what ships today

- 14 methodology skills authored
- 67 of 200 keystone agents fully authored (~1/3)
- 15 team formations with declared pipelines
- 8 tests pass (manifest integrity, schema validation, formation references)
- CI green on Node 18/20/22 × Linux/macOS/Windows
- Zero npm dependencies in the CLI
- Real working installer (`team`, `install`, `methodology install`, `run`)
- 133 manifest-only stubs ship with role brief and artifact contract — installable today, PR-able to full playbooks

---

## contributing

```bash
# flesh out a stub agent
cp agents/postgres-specialist/SKILL.md agents/<your-agent>/SKILL.md
# edit, PR

# add a team formation
cp teams/saas-mvp.json teams/<your-formation>.json
# edit, PR (CI validates against schema)
```

Tests must pass: `npm test`.

---

## license

MIT © 2026 Irfan Sadiq Rahat and Constellation contributors
