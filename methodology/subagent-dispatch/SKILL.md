---
name: subagent-dispatch
description: Dispatch fresh subagents per task with typed artifact handoff and two-stage review.
input: Plan
output: ExecutionLog
methodology: yes
role_aware: yes
---

# subagent-dispatch

## When activated

A `Plan` exists with N tasks. Tasks are independent enough to dispatch in parallel OR sequential with strict handoff.

## Dispatch model

For each task `T` in the plan:

1. **Materials briefing** — gather only what `T` needs:
   - The task spec (`T` block from the Plan)
   - The input artifact (`T.consumes`)
   - The role's SKILL.md (`agents/<role>/SKILL.md`)
   - Relevant prior decisions (links, not bodies)
2. **Dispatch** — spawn the subagent with **only the briefing**, no extra context
3. **Output** — subagent returns the artifact (`T.produces`) shaped per schema
4. **Review stage 1: spec compliance** — does output match the declared shape?
5. **Review stage 2: quality** — does it pass acceptance criteria?
6. **Merge** — write artifact to the team workspace; mark task done

## Parallel vs sequential

- **Sequential** when phase N+1 consumes phase N's output (default for pipelines)
- **Parallel** when tasks share input but produce independent outputs (e.g. design-lead and ux-researcher both consume PRD)
- **Fan-out + merge** when N agents tackle the same problem and a coordinator picks the best (used for adversarial review)

## Two-stage review (required)

| stage | checks | run by |
|---|---|---|
| 1: spec | shape of output, presence of required fields, type of in/out matches | mechanical (schema validation) |
| 2: quality | acceptance criteria, smell-checks from role's SKILL.md, no banned patterns | another subagent (peer role) |

If either review fails, dispatch again with the failure as additional briefing. Three failures = escalate to human.

## Materials hygiene (the moat)

- **Fresh subagent** for each task. No accumulated context drift.
- **Briefing is minimal.** Less is more reliable.
- **No tool access not needed for this task.** Reduces blast radius.
- **Output schema enforced.** Free-form output is the enemy.

## Beats superpowers's `subagent-driven-development` by

- **Typed artifact contracts** — review stage 1 is mechanical, not subjective
- **Fan-out + merge pattern** — multiple agents same problem, vote-merge
- **Role's SKILL.md is materials** — briefing includes the role's playbook
- **Two-stage review by a peer role** — security-architect reviews appsec-engineer, etc.
