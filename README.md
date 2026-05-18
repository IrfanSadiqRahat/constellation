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

Constellation is the only multi-agent system that ships **all three layers**:

- **200 role identities** (WHO to be) — sharp, single-responsibility roles across the full product lifecycle
- **14 methodology skills** (HOW to work) — brainstorm, TDD, planning, debugging, dispatch, validation, role-switching, memory, parallel execution, adversarial review, and more
- **15 pre-baked team formations** (WHAT to ship) — runnable multi-stage pipelines with typed artifact contracts

It's not "complementary to superpowers". It's **superpowers + roles + pipelines** in one tool.

---

## why pick constellation over superpowers

| | constellation | superpowers |
|---|---|---|
| methodology skills | **14** (matching count, role-aware versions) | 14 |
| role identities | **200** in 20 teams | 0 (single agent) |
| team formations | **15 with pipelines** | 0 |
| typed artifact contracts (in/out per agent) | **yes** | no |
| pipeline orchestration as a skill | **yes** | no |
| memory across sessions | **yes** | no |
| adversarial review (3 lenses in parallel) | **yes** | partial |
| role-switching as a skill | **yes** | no |
| artifact-validation (schema gate) | **yes** | no |
| parallel-execution (4 named patterns) | **yes** | partial |
| handoff-protocol (typed packets) | **yes** | no (conversational handoff) |
| full lifecycle scope (PM → design → eng → sec → legal → finance) | **yes** | no (dev only) |
| authored keystone playbooks | **67 of 200** | 14 |
| install method | npm, npx, Claude Code plugin | Claude Code plugin |
| schema enforcement on contributions | **yes** (JSON Schema + CI) | partial |

**Constellation matches superpowers's 14 methodology skills,** then adds 200 roles, 15 formations, and 6 net-new methodology skills (memory-protocol, role-switching, handoff-protocol, artifact-validation, pipeline-orchestration, adversarial-review).

What we don't have (yet): superpowers's adoption (~196k stars), maturity (year of refinement), and Jesse Vincent's reputation. The code is on the table. Adoption is the next year of work.

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

## the 14 methodology skills (vs superpowers 14)

| constellation skill | superpowers equivalent | upgrade |
|---|---|---|
| `brainstorm` | `brainstorming` | role-aware question bank, typed output |
| `tdd-discipline` | `test-driven-development` | role-aware test shapes (Postgres ≠ React ≠ prompts) |
| `planning-with-artifacts` | `writing-plans` | typed artifact handoff, rollback points |
| `systematic-debug` | `systematic-debugging` | five phases not four, role-aware toolkit |
| `subagent-dispatch` | `subagent-driven-development` | typed contracts, peer-role review |
| `verify-before-done` | `verification-before-completion` | three checks (schema + acceptance + downstream-ready) |
| `parallel-execution` | `dispatching-parallel-agents` | four named patterns + merge strategies |
| `adversarial-review` | `requesting-code-review` + `receiving-code-review` | three lenses in parallel, coordinator synthesizes |
| `handoff-protocol` | — (constellation novel) | typed handoff packets between roles |
| `role-switching` | — (constellation novel) | meta-skill that makes 200 roles usable |
| `artifact-validation` | — (constellation novel) | mechanical schema check + invariants |
| `pipeline-orchestration` | — (constellation novel) | run team formations end-to-end |
| `memory-protocol` | — (constellation novel) | persistent role-scoped memory across sessions |
| `using-constellation` | `using-superpowers` | meta-skill for navigation |

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

## comparison with prior art

| | constellation | superpowers | wshobson/agents | VoltAgent awesome |
|---|---|---|---|---|
| github stars | 0 (new) | ~196k | ~3-5k | ~2k |
| methodology skills | **14** | 14 | partial | partial |
| named role agents | **200** | 0 | 185 | 100+ |
| team formations | **15** with pipelines | 0 | 16 orchestrators | 0 |
| typed artifact contracts | **yes** | no | no | no |
| pipeline runner | **yes** | no | partial | no |
| memory across sessions | **yes** | no | no | no |
| schema-enforced contribution | **yes** | partial | partial | no |
| full lifecycle (PM → legal → finance) | **yes** | no | partial | partial |
| install method | npm / npx / plugin | plugin | plugin | manual |

Constellation is the **only** tool that ships methodology + roles + pipelines together. Other tools pick one layer.

---

## honest scope

What is true today:
- 14 methodology skills authored (matches superpowers's count)
- 67 of 200 keystone agents fully authored (~1/3)
- 15 team formations with declared pipelines
- 8 tests pass (manifest integrity, schema validation, formation references)
- CI green on Node 18/20/22 × Linux/macOS/Windows
- Zero npm dependencies in the CLI
- Real working installer (`team`, `install`, `methodology install`, `run`)

What is not true yet:
- Adoption — 0 stars, 0 users
- Battle-tested in production
- Author reputation
- 200/200 authored playbooks (133 ship as installable stubs with role brief)

If you want the proven, single-install methodology with thousands of users: **superpowers**.
If you want the broader, multi-agent, full-lifecycle, typed-pipeline system that includes a methodology pack: **constellation**.
Both MIT, both local-first, both Claude-Code-compatible. Try both. Decide for yourself.

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
