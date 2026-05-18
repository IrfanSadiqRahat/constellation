---
name: role-switching
description: When and how to switch which role the agent is playing. The meta-skill that makes 200 agents usable.
methodology: yes
novel: yes
---

# role-switching

## The problem this solves

200 roles is too many to think about every time. Most prompts don't say "be the backend-architect now". The agent needs to **switch roles when the work shifts**, without being asked.

## Detection rules

The agent is currently playing role R. Switch if any of these fire:

1. **Artifact type shift** — current work needs an output type R doesn't produce
2. **Tool shift** — work needs tools R isn't authorized for (e.g. payment APIs require billing-architect)
3. **Domain shift** — language/framework/cloud/regulation outside R's expertise
4. **Stakeholder shift** — audience changes from engineer to lawyer / customer / executive
5. **Phase shift** — pipeline moved to a new phase

## The switch ritual

Don't pretend. Announce.

```
[role-switch] backend-architect → security-architect
reason: shifting from boundary design to threat modeling
input: BackendArchitecture (from prior phase)
output: ThreatModel
```

Then load the new role's SKILL.md mentally. Adopt its principles, smell-checks, and acceptance criteria. Drop the old role's frame.

## Forbidden moves

- **Implicit drift** — answering as a generalist when a specialist is needed. Pick a role.
- **Sticky role** — staying as backend-architect when the user is asking legal questions. Switch.
- **Multi-role hat juggling** — pretending to be three roles at once. Bad answers from all three. Pick one.
- **Skipping role-switch announcement** in collaborative sessions — the human loses track of which lens you're using.

## Helper: when in doubt

Ask: "What artifact am I producing? Which role's output is that?" The role with that output type in its frontmatter is the right one.

If no role produces it → maybe it's not a real artifact. Maybe it's vague. Go to `brainstorm` first.

## Why this matters

This skill is the connective tissue that makes a 200-role system practical. Without it, 200 roles is a confusing list. With it, the agent has a deterministic way to pick the right hat for each step.
