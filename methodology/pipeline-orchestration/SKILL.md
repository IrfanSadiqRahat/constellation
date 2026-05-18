---
name: pipeline-orchestration
description: Run a team formation's multi-stage pipeline end-to-end with role switching, handoffs, validation, and rollback.
input: TeamFormation + Goal
output: PipelineExecution
methodology: yes
novel: yes
---

# pipeline-orchestration

## When activated

The user says "run the saas-mvp pipeline for X" or invokes `constellation run <formation> "<goal>"`. The agent becomes the orchestrator.

## Pipeline execution loop

For each phase `P` in the formation:

```
1. Identify phase consumers (P.uses)
2. Materialize input artifact from prior phases' outputs
3. role-switching: become the role(s) in P.uses
4. brainstorm: refine the inputs into a ScopedBrief for THIS phase
5. planning-with-artifacts: produce a Plan for THIS phase
6. tdd-discipline: write tests for the phase output
7. subagent-dispatch: execute the plan
8. parallel-execution: if phase is fan-out, run agents concurrently
9. artifact-validation: mechanical check on output
10. verify-before-done: acceptance + downstream readiness
11. handoff-protocol: produce HandoffPacket for next phase
12. checkpoint: emit progress event; await human if gate set
13. Next phase
```

## Failure handling

| failure | response |
|---|---|
| validation fail | revise (dispatch back to role) |
| acceptance fail × 3 | escalate to human |
| downstream-readiness fail | reopen prior phase |
| catastrophic (no roles fit, schema missing) | abort + write `AbortReport` |

## Checkpointing

Every phase boundary writes a checkpoint to `.constellation/checkpoints/<run-id>/`:
- Input artifacts
- Output artifacts
- Validation results
- Decisions taken

Pipeline runs are resumable, replayable, and forkable.

## Why not just "tell the agent to do it"

Unstructured prompts produce drift. The orchestrator wraps every phase in the same envelope: role-switch → plan → dispatch → validate → handoff. The user sees a clean progression; the agent stays disciplined.

## Why this matters

Formalizing multi-phase pipelines with typed artifacts as the bus is what makes a 200-agent system actually executable end-to-end.
