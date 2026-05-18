---
name: systematic-debug
description: Five-phase root cause process with role-aware diagnostics. Bisect, minimize, hypothesize, verify, document.
input: BugReport
output: RootCauseReport
methodology: yes
role_aware: yes
---

# systematic-debug

## Five phases (in order, no skipping)

### 1. Reproduce — observable

A bug not reproducible is a hypothesis, not a bug.
- Minimal repro (delta-debugging if needed)
- Environment captured (versions, env vars, data state)
- Steps recorded so a peer can re-run

### 2. Isolate — narrow blast radius

- Git bisect for regressions
- Binary search on input space (works for data bugs)
- Disable subsystems until repro disappears

### 3. Hypothesize — single hypothesis at a time

- State the hypothesis as a falsifiable claim
- Predict an observation that would confirm or refute
- Run one experiment

### 4. Verify root cause — not symptom

A root cause is one whose removal makes the bug impossible, not just absent. If the same input could produce the same bug via a different path, you found a symptom.

### 5. Document — RootCauseReport

```yaml
title: <bug>
severity: 1 | 2 | 3
repro: <minimal steps>
investigation_log: [<hypothesis, experiment, result, ts>]
root_cause: <statement>
mechanism: <how the cause leads to the bug>
fix: <change>
prevention:
  - test added: <link>
  - lint rule: <link>
  - design change: <link>
adjacent_risks: <where else this class of bug could live>
```

## Role-aware diagnostics

| role | diagnostic toolkit |
|---|---|
| `react-specialist` | React DevTools, `<Profiler>`, source maps, useDebugValue |
| `frontend-perf-engineer` | RUM, traces, performance.mark, INP attribution |
| `backend-architect` | distributed tracing, exemplars, db EXPLAIN, profilers |
| `postgres-specialist` | `pg_stat_statements`, `EXPLAIN (ANALYZE, BUFFERS)`, `auto_explain` |
| `data-architect` | lineage trace, sample-then-diff, freshness check |
| `ai-engineer` | trace per request, eval bucket diff, prompt-version pin |
| `incident-commander` | timeline, comms log, dashboards as evidence |
| `security-architect` | tamper-evident logs, IOC search, traffic capture |

## Forbidden moves

- "It probably works now, retry" — confirmation bias, often hides flakiness
- Multiple changes per experiment — can't attribute cause
- "Works on my machine" closure — not closure
- Fixing the symptom and moving on without root-cause analysis

## Why this skill is opinionated

- **Five phases** — explicit "isolate via bisect" phase
- **Role-aware toolkit per role** — Postgres bugs ≠ React bugs ≠ AI hallucinations
- **Mechanism field**, not just root cause
- **Adjacent risks** surfaced
- **Prevention is tracked** as required output
