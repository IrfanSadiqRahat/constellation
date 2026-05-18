<div align="center">

# 🌌 Constellation

### 200 role-specific AI agents · 20 teams · 10 pre-baked team formations
### The virtual engineering org for Claude Code, Cursor, Codex CLI, and any agentic IDE

[![CI](https://github.com/IrfanSadiqRahat/constellation/actions/workflows/ci.yml/badge.svg)](https://github.com/IrfanSadiqRahat/constellation/actions)
[![npm](https://img.shields.io/npm/v/constellation-agents)](https://www.npmjs.com/package/constellation-agents)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

---

## what this is

Constellation gives your coding agent **WHO to be** — 200 sharply-defined role identities organized into 20 teams, each with declared input → output artifact contracts.

It's **complementary** to methodology frameworks like [`obra/superpowers`](https://github.com/obra/superpowers) (which teaches your agent **HOW to work**). Layer them: Constellation roles, Superpowers process.

## why it's different

| | Constellation | superpowers | wshobson/agents |
|---|---|---|---|
| scope | 20 teams, full lifecycle (PM → design → eng → sec → ops → legal → finance) | dev-only methodology | dev agents |
| count | 200 agents in 20 teams of 10 | 14 skills | 185 agents |
| **artifact contracts** | ✅ every agent declares `in` / `out` | ❌ | ❌ |
| **team formations** | ✅ 10 pre-baked (saas-mvp, security-audit, ai-product, …) | ❌ | partial |
| **pipelines** | ✅ multi-stage agent flows | ❌ | ❌ |
| methodology | none — bring your own (superpowers etc.) | yes (the value-add) | partial |
| install scope | user OR project | plugin | plugin |

The killer feature is **typed artifact pipelines**. Each agent declares what it consumes and what it produces. Teams compose into pipelines. The Strategist outputs `Strategy` → consumed by the Requirements-analyst → outputs `Requirements` → consumed by the PRD-writer → outputs `PRD` → consumed by Design-lead → … Like microservices, but for thinking.

## install

```bash
# one-off
npx constellation-agents list --teams

# global
npm install -g constellation-agents
constellation list --teams
```

## quickstart

```bash
# 1. browse the org
constellation list --teams

# 2. pick a pre-baked team formation
constellation list --formations

# 3. install a whole team into your project
constellation team saas-mvp --project

# 4. or summon one expert
constellation install backend-architect

# 5. preview the pipeline
constellation pipeline ai-product
```

Skills land in `~/.claude/skills/<id>/SKILL.md` (user) or `./.claude/skills/<id>/SKILL.md` (project). Claude Code auto-loads them; Cursor / Codex CLI / Gemini CLI honor the same convention.

## the 20 teams

| team | lead | agents (10 each) |
|---|---|---|
| **Product** | `product-strategist` | strategy, requirements, JTBD, personas, roadmap, PRD, sizing, pricing, GTM, retention |
| **Design** | `design-lead` | lead, UX research, IA, interaction, visual, motion, design-system, a11y, copy, prototype |
| **Frontend** | `frontend-architect` | architect, React, Vue, Svelte, CSS, animation, state, perf, platform, micro-FE |
| **Backend** | `backend-architect` | architect, API, microservices, event-driven, GraphQL, websockets, queues, idempotency, multi-tenant, rate-limit |
| **Data Engineering** | `data-architect` | architect, schema, query opt, ETL, streaming, lakehouse, quality, lineage, dbt, time-series |
| **Mobile** | `mobile-architect` | architect, iOS, Android, RN, Flutter, perf, offline, release, push, ASO |
| **AI / ML** | `ai-engineer` | AI eng, RAG, evals, fine-tuning, prompt, orchestrator, vector search, multimodal, router, hallucination |
| **DevOps / SRE** | `sre-lead` | SRE, Terraform, K8s, CI/CD, observability, IC, chaos, capacity, runbook, DR |
| **Cloud** | `cloud-architect` | architect, AWS, GCP, Azure, Cloudflare, edge, serverless, multi-cloud, finops, migration |
| **Security** | `security-architect` | architect, threat-model, appsec, pentester, devsecops, sigma, SOC, compliance, secrets, supply-chain |
| **Quality** | `qa-lead` | lead, strategist, e2e, contract, load, mutation, a11y audit, visual regression, repro, flake |
| **Documentation** | `docs-architect` | architect, tutorial, API docs, runbook, changelog, ADR, release notes, onboarding, FAQ, video script |
| **Databases** | `db-architect` | architect, Postgres, MySQL, Mongo, Redis, Elasticsearch, ClickHouse, SQLite, DynamoDB, migrations |
| **Growth** | `growth-lead` | lead, SEO, content, landing, growth eng, funnel, A/B, email, social, lifecycle |
| **Sales / Support** | `customer-lead` | customer, sales eng, support, triage, chatbot, retention, churn, AM, partner, evangelist |
| **Legal / Compliance** | `privacy-architect` | privacy, GDPR, HIPAA, SOC 2, PCI, ToS, license, contracts, IP, AI Act |
| **Finance** | `finance-lead` | FP&A, modeler, runway, unit econ, fundraising, cap table, billing, subscription, rev rec, treasury |
| **Research** | `research-lead` | lead, market, competitive, user, ethnographer, survey, lit-review, patent, trend, citation |
| **Operations** | `ops-lead` | ops, hiring, onboarding, perf review, leveling, facilitator, decision-doc, retro, PM, KB |
| **Specialists** | `specialist-lead` | lead, blockchain, embedded, game, robotics, AR/VR, bioinf, quant, geo, media |

**200 named identities. 37 authored keystones. The other 163 ship as stubs with role briefs and artifact contracts — install creates a SKILL.md you can edit, point at upstream, or PR a full playbook for.**

## the 10 team formations

```bash
constellation team saas-mvp                # ship paid product zero → first revenue
constellation team security-audit          # full-stack security assessment
constellation team ai-product              # ship LLM feature with evals + guardrails
constellation team incident-response       # activate during a live incident
constellation team mobile-launch           # ship app to both stores
constellation team data-platform           # stand up analytics + ML-ready platform
constellation team fundraise               # prep venture round end-to-end
constellation team growth-engine           # measurable, compounding growth machine
constellation team compliance-sprint       # SOC 2 / GDPR / HIPAA readiness
constellation team open-source-release     # internal lib → widely-adopted OSS
```

Each formation declares its **pipeline** — which agents run in which order, what artifacts flow between them:

```bash
$ constellation pipeline saas-mvp
SaaS MVP team

1. discover     (product-strategist, prd-writer)
   produces: PRD

2. design       (design-lead)
   consumes: PRD
   produces: DesignBrief

3. build        (frontend-architect, backend-architect, db-architect)
   consumes: DesignBrief
   produces: MVP

4. monetize     (billing-architect)
   consumes: MVP
   produces: MonetizedMVP

5. harden       (sre-lead, privacy-architect)
   consumes: MonetizedMVP
   produces: ProductionMVP

6. launch       (growth-lead)
   consumes: ProductionMVP
   produces: LaunchPlan
```

## artifact contract

Every agent's `SKILL.md` declares:

```yaml
---
name: backend-architect
description: <one sentence>
team: backend
input: PRD                    # what upstream agent produced
output: BackendArchitecture   # what this agent produces
---
```

This makes agents **composable**. The PRD-writer doesn't need to know who reads its output. The Backend-architect doesn't need to know who wrote its input. Like microservices for thinking.

## using with superpowers

Stack them. Superpowers gives your agent the discipline (TDD, brainstorming, planning, debugging). Constellation gives it the role (Backend-architect, PRD-writer, IC).

```bash
# install superpowers methodology
npx skills add obra/superpowers

# install a Constellation team for THIS project
npx constellation-agents team saas-mvp --project

# your agent now has methodology + 10 specialist identities
```

## honest scope

- **37 keystone SKILL.md files are fully authored** by me. They are the most-used roles (one per team lead + critical specialists).
- **163 are manifest-only stubs.** When you `install`, you get a `SKILL.md` with the role brief, artifact contract, and operating frame — usable today, PR-able into a full playbook.
- Pull requests welcome to flesh out the 163. Each is < 1 hr of work.

## comparison vs known prior art

|  | Constellation | superpowers | wshobson/agents | VoltAgent awesome | toolkit (rohitg00) |
|---|---|---|---|---|---|
| stars (today) | 0 (new) | ~196k | ~3-5k | ~2k | <1k |
| agents | 200 | 14 skills | 185 | 100+ | 135 |
| teams (named groups) | 20 | n/a | 25 cats | n/a | n/a |
| **typed artifacts in/out** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **team formations** | ✅ 10 | ❌ | ✅ (orchestrators) | ❌ | ❌ |
| **pipelines** | ✅ | ❌ | partial | ❌ | ❌ |
| full lifecycle (PM/design/legal/finance) | ✅ | ❌ | partial | partial | partial |
| CLI installer | ✅ | yes (`/plugin`) | yes (plugins) | manual | varied |

We are **brand new**. Superpowers is **proven**. They solve different problems. Use both.

## contributing

Flesh out a stub:

```bash
cp agents/postgres-specialist/SKILL.md agents/<your-agent>/SKILL.md
# edit, PR
```

Add a team formation:

```bash
cp teams/saas-mvp.json teams/<your-formation>.json
# edit, PR
```

Tests must pass: `npm test` (manifest integrity, schema validation, team agent existence).

## license

MIT © 2026 Irfan Sadiq Rahat and Constellation contributors
