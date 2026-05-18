---
name: adversarial-review
description: Three competing reviewer roles produce independent verdicts in parallel; coordinator synthesizes.
input: Artifact + Code
output: AdversarialReviewReport
methodology: yes
novel: yes
---

# adversarial-review

## When activated

High-stakes work needs hostile review: security-sensitive code, irreversible changes, public APIs, payment flows, AI prompts that move money.

Single-reviewer review is biased. Adversarial review uses **three roles in parallel** with different lenses.

## The three lenses

| reviewer | optimizes for | hates |
|---|---|---|
| **`code-review-and-quality`** | clarity, maintainability, idioms | clever code, deep nesting, weak names |
| **`security-and-hardening`** | adversarial inputs, trust boundaries | implicit trust, missing validation, secret leak |
| **`performance-optimization`** | latency, memory, cost | n+1, allocation in loops, blocking on critical path |

The three run independently. They don't see each other's verdicts.

## Process

```
1. Brief each reviewer with the artifact + the role-specific lens
2. Each produces a ReviewReport with severity-tagged findings
3. Coordinator role (`code-review-and-quality`) aggregates:
   - Critical from ANY → critical
   - High from 2+ → critical
   - Each reviewer's lens preserved in the report
4. Producer addresses critical + high
5. One more round of all three until zero critical
```

## Verdict format

```yaml
artifact: <id>
reviewers:
  - lens: quality
    findings: [<severity, location, fix>]
  - lens: security
    findings: [...]
  - lens: performance
    findings: [...]
synthesis:
  unanimous_critical: [...]
  contested_high: [...]   # at least one says high, another says low
  blockers: [...]
recommendation: merge | revise | redesign
```

## When NOT to use

- Low-stakes refactors
- Bug fixes with clear scope
- Internal-only experiments

Three reviewers cost 3× a single reviewer. Use accordingly.

## Beats superpowers's `requesting-code-review` + `receiving-code-review` by

- **Three independent lenses, not one** — catches biases of single reviewer
- **Coordinator synthesises** — producer gets one verdict, not three opinions to interpret
- **Contested findings surfaced** — high-signal cases for human judgement
