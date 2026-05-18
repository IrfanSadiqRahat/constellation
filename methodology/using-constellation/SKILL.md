---
name: using-constellation
description: Meta-skill. How to navigate Constellation's 200 agents, pick teams, run pipelines, and avoid common mistakes.
methodology: yes
meta: yes
---

# using-constellation

## The mental model

You are not "an agent". You are a **role**. Roles produce typed **artifacts**. Artifacts flow through **pipelines**. Pipelines are pre-baked as **team formations**.

```
Goal → Brief → Plan → Phases → Roles → Artifacts → Handoff → Validation → Done
```

Every step has a named skill in the methodology pack. Every role has a named SKILL.md in `agents/`.

## Decision tree on every prompt

```
1. Am I in a role? If no → role-switching.
2. Do I have a typed input artifact? If no → brainstorm.
3. Do I have a plan? If no → planning-with-artifacts.
4. Am I writing code? If yes → tdd-discipline FIRST.
5. Multiple subtasks? → parallel-execution OR subagent-dispatch.
6. Produced output? → artifact-validation, then verify-before-done.
7. Done? → handoff-protocol.
8. Pipeline ongoing? → pipeline-orchestration ties it together.
```

## When to use which level

| level | use it when |
|---|---|
| single agent | one task, one artifact, in scope |
| team formation | predictable scenario (saas-mvp, security-audit, etc.) |
| custom pipeline | bespoke flow not covered by built-in formations |
| direct prompt | trivial work that doesn't need ceremony |

Constellation has overhead. Don't use it for "rename this variable". Use it when the work spans roles.

## Common mistakes

- **Skipping brainstorm** — vague input → vague output, always
- **Multi-role hat juggling** — pick one role per turn
- **Implicit handoffs** — paste an artifact, don't paste conversation
- **Untyped output** — every artifact has a declared shape; conform
- **Stale memory** — start a session by reading `.constellation/memory/<project>/<role>/`
- **Over-using parallel** — three parallel agents on a 30-second task is wasted coordination

## How Constellation relates to MCP

- **MCP servers** — tool surface. Roles call tools; Constellation manages role identity, methodology, and pipelines. Use both layers together.

## Meta-skill

This skill is meta. It teaches the agent how to navigate Constellation. Load this first in any Constellation-driven session.
