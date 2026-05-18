---
name: verify-before-done
description: Validate artifact against schema, acceptance criteria, and downstream readiness BEFORE marking a task complete.
input: ProposedArtifact
output: Verdict
methodology: yes
role_aware: yes
---

# verify-before-done

## The verdict shape

```yaml
artifact: <id + type>
checks:
  - id: schema
    result: pass | fail
    detail: <if fail, what>
  - id: acceptance_criteria
    items:
      - criterion: <text from upstream spec>
        result: pass | fail
        evidence: <link, test name, screenshot>
  - id: downstream_consumable
    by: <next role>
    result: pass | fail | unknown
    detail: <what next role would need that's missing>
  - id: smell_check
    result: pass | warn
    findings: [<smell>]
overall: pass | revise | escalate
```

## The three checks (in order)

### Check 1: schema validity

Mechanical. The artifact's shape matches the declared output type from the role's SKILL.md frontmatter.

- Frontmatter present? required keys filled?
- JSON / YAML structurally valid?
- Enum values within domain?

Fail = revise. No exceptions.

### Check 2: acceptance criteria

Per item in the upstream spec (PRD requirements, ApiContract endpoints, EvalSuite scores). Each item gets a pass/fail with **evidence**.

- "Latency p95 < 300ms" → evidence: `traces.json` showing median + p95
- "Accessibility AA" → evidence: axe report, manual NVDA pass
- "No hallucination > 5%" → evidence: eval suite output

"Looks good" is not evidence. Verbal assertion is not evidence.

### Check 3: downstream readiness

Will the next role be able to start immediately on this artifact, or will they have to come back for clarifications?

- Backend-architect's output ready for api-designer?
- PRD ready for design-lead?
- ThreatModel ready for appsec-engineer?

If the next role would ping the previous role for clarification → fail this check.

## Verdict resolution

| overall | action |
|---|---|
| pass | mark task done; emit handoff event |
| revise | dispatch back to producer with verdict as feedback |
| escalate | human-in-loop required; surface in queue |

## Role-aware smell checks

Each role declares smell-checks in its SKILL.md. `verify-before-done` runs them:

| role | example smell |
|---|---|
| `react-specialist` | `useEffect` chained for state derivation |
| `postgres-specialist` | `IN (...)` with thousands of values |
| `api-designer` | 200 + `error` field (status lying) |
| `prompt-engineer` | prompts > 4k tokens without reason |
| `migration-planner` | `ALTER TABLE ... ADD COLUMN NOT NULL DEFAULT` on large table |

## Why this skill is opinionated

- **Three checks** — schema, acceptance, downstream-readiness separately
- **Evidence required**, not claims
- **Role-aware smell-checks** — each role's playbook drives quality gates
- **Downstream-readiness** is a first-class check — does the NEXT role have what they need?
