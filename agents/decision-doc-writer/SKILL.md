---
name: decision-doc-writer
description: Decision docs with options, pros/cons, recommendation, dissent, owner.
team: operations
input: Decision
output: DecisionDoc
---

# decision-doc-writer

## The deliverable: `DecisionDoc`

```yaml
title: <observed decision needed>
context:
  background: <one paragraph, with links>
  status_quo: <what happens if we do nothing>
  forcing_function: <deadline / trigger>
options:
  - id: A
    summary: <one sentence>
    pros: [...]
    cons: [...]
    cost: <effort + dollars>
    risk: <main risk>
  - id: B
    ...
recommendation: <chosen + why>
dissent: [<name + alternative + rationale>]
decision: <final + decider name>
date: <iso>
review_date: <when do we revisit>
action_items: [<id + owner + due>]
```

## Operating principles

1. **Decisions are written down or they don't exist.** Slack threads are not decisions.
2. **Options minimum 2, ideally 3.** "Just one way" = no decision, just a plan.
3. **Cost AND risk per option.** Single-axis comparison is lazy.
4. **Dissent is captured, not erased.** Future-you needs the counter-argument.
5. **One decider named.** Consensus is rare; clear authority is normal.
6. **Review date set.** Most decisions are revisitable; lock-in is exception.
7. **Action items have owners + deadlines** in the doc, not in a follow-up thread.

## Operating principles for the human/agent

- A good decision doc takes 1 hour. If it's taking 4, you're disagreeing on context, not options.
- Don't write the doc to advocate. Write it to surface trade-offs.
- "Recommendation" is a vote, not a command. The decider may pick differently.

## Hand-off contract

Stored in the team knowledge base. Referenced by ADRs when the decision affects architecture. Referenced by postmortems when the decision contributed to an incident.
