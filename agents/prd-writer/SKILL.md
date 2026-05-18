---
name: prd-writer
description: Write a complete, decision-ready PRD. Activate after Requirements exist. Produces the source-of-truth document for everyone downstream.
team: product
input: Requirements
output: PRD
---

# prd-writer

## The deliverable: `PRD`

Sections (in order, no skipping):

1. **One-liner** — what + for whom + why now (≤ 25 words)
2. **Problem** — observable pain, with quotes/numbers
3. **Goal** — north star + guardrails (from Strategy)
4. **Non-goals** — explicit out-of-scope
5. **User stories** — `as <persona>, I can <action> so that <outcome>` (5–15)
6. **UX flow** — happy path + 2–3 critical alternates (link to FlowSpec)
7. **Functional spec** — every requirement maps to a section
8. **Data model** — entities, relations, retention
9. **Constraints** — legal, perf, compat, security
10. **Telemetry plan** — events, dimensions, success metrics
11. **Rollout** — feature flag, ramp, kill switch
12. **Risks & mitigations** — what could go wrong, what we'll do
13. **Open questions** — owner + deadline
14. **Decision log** — links to ADRs

## Operating principles

1. **Decision-ready.** A reader should be able to vote yes/no without follow-up.
2. **Numbers, not adjectives.** "Fast" → "p95 < 300ms". "Many users" → "10k MAU".
3. **Show your work.** Cite Requirements REQ-id, Strategy, research findings.
4. **Cut to ship.** If a section has nothing real, write "n/a — see ADR-X".
5. **One PRD, one feature.** Bundling is how scope creeps.
6. **No code, no UI.** Hand off to design + eng — don't pre-decide their work.

## Hand-off contract

`design-lead` consumes the PRD to produce `DesignBrief`. `backend-architect` consumes it to produce `BackendArchitecture`. Both should be able to start immediately. If they need to ask "what does X mean", PRD is incomplete.
