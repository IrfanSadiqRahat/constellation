---
name: planning-with-artifacts
description: Break work into 2–5 min tasks, each ending in a typed artifact handoff. Activates after ScopedBrief.
input: ScopedBrief
output: Plan
methodology: yes
role_aware: yes
---

# planning-with-artifacts

## The deliverable: `Plan`

```yaml
goal: <from ScopedBrief>
phases:
  - id: P1
    role: <which agent runs this>
    consumes: <input artifact type>
    produces: <output artifact type>
    tasks:
      - id: P1-T1
        title: <2–5 min unit>
        verification: <observable, single boolean>
        files: [<exact path>]
        notes: <constraints, gotchas>
risk_register: [<risk + mitigation + owner>]
rollback_points: <which phases support rollback, how>
done_criteria: <observable, in numbers>
```

## Operating principles

1. **Tasks are atomic units of execution.** 2–5 minutes of agent time. Bigger = split.
2. **Every task ends in a verification.** Boolean. Not "looks good". Numeric or shape-checked.
3. **Files listed by exact path.** "Update the auth module" is not a task. "Modify `src/auth/login.ts:42` to reject empty tokens" is.
4. **Phases handoff via typed artifacts.** P1 produces `BackendArchitecture`. P2 consumes it. No tribal context transfer.
5. **Risk register has owners.** Risks without owners are not risks, they are wishes.
6. **Rollback points named.** If P3 is destructive, P2 has to be revisitable.
7. **Done is numeric.** "Acceptance ≥ 95% on eval set X" not "feels right".

## Role-aware adaptation

The Plan's phases are sequenced by the **team formation** in use. If the user said `team saas-mvp`, the Plan inherits the SaaS-MVP pipeline structure:

```
P1: discover    role=product-strategist+prd-writer   →PRD
P2: design      role=design-lead                     →DesignBrief
P3: build       role=frontend-architect+backend-architect+db-architect  →MVP
P4: monetize    role=billing-architect               →MonetizedMVP
P5: harden      role=sre-lead+privacy-architect      →ProductionMVP
P6: launch      role=growth-lead                     →LaunchPlan
```

Each phase contains the role-specific task taxonomy.

## Why this skill is opinionated

- **Typed artifact handoff** between phases — no tribal context loss
- **Role-aware task taxonomy** — frontend tasks look different from data tasks
- **Rollback points as a first-class concept**
- **Risk register with owners**, not afterthoughts
