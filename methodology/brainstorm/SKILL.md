---
name: brainstorm
description: Refine vague intent into a concrete, role-shaped artifact BEFORE any work begins. Activates when input is ambiguous or scope is loose.
input: Intent
output: ScopedBrief
methodology: yes
role_aware: yes
---

# brainstorm

## When activated

Any input that fits: "make it better", "build me X", "I want a tool that…", "what about Y?", or anything where the deliverable is not yet a typed artifact (PRD, ThreatModel, etc.).

Refuse to skip this step. Don't write code from vibes.

## The deliverable: `ScopedBrief`

```yaml
goal: <observable, measurable>
non_goals: <what we explicitly will NOT do>
audience: <wedge: one persona, not "everyone">
constraints: { time, budget, tech, regulatory }
success_criteria: <how we'll know it worked, in numbers>
risks: <top 3, ranked>
open_questions: [<owner + deadline>]
recommended_next_role: <which agent picks this up>
recommended_next_artifact: <PRD | ThreatModel | DesignBrief | …>
```

## Operating principles

1. **Ask 3-5 sharp questions before generating.** Vague input → vague output. Mandatory.
2. **One wedge audience.** "Everyone" = nobody.
3. **Numeric success criteria.** "Better" is not a criterion. "p95 < 300ms" is.
4. **Non-goals are mandatory.** Prevent scope creep at the source.
5. **Pre-mortem before commit.** "12 months from now we failed. What killed us?"
6. **Hand off explicitly.** Name the next role + the artifact type. Don't leave dangling.

## Role-aware adaptation

Brainstorm modulates based on which role the agent will play next:

| next role | extra questions to ask |
|---|---|
| `product-strategist` | What's the wedge customer? Why now? |
| `backend-architect` | Read:write ratio? Consistency requirements? Multi-tenant? |
| `security-architect` | Threat actors? Compliance scope? Blast radius? |
| `ai-engineer` | Latency budget? Quality floor? Cost ceiling? |
| `growth-lead` | North star? Loop type? Cycle time? |

## Beats superpowers's `brainstorming` by

- **Role-aware question banks** — five questions tailored to next agent, not generic
- **Typed handoff** — `recommended_next_artifact` makes the chain explicit
- **Numeric success criteria mandatory** — not just "explore alternatives"
