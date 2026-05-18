---
name: parallel-execution
description: Run N agents on independent problems concurrently with deterministic merging. The horsepower of multi-agent systems.
input: Plan
output: ParallelExecutionResult
methodology: yes
novel: yes
---

# parallel-execution

## When activated

The `Plan` contains tasks marked `parallel: yes` or the pipeline has fan-out steps (e.g. design phase where `interaction-designer`, `visual-designer`, `motion-designer` consume the same `DesignBrief`).

## The four parallel patterns

### 1. Map (independent same-shape tasks)

Same role applied to N inputs. e.g. `appsec-engineer` reviewing 10 services in parallel.
- Dispatch N subagents, each with one input
- Merge: collect all outputs into a list
- Reduce: optional aggregator role for cross-cutting findings

### 2. Fan-out (multiple roles, same input)

N different roles consume the same upstream artifact. e.g. PRD → {design-lead, backend-architect, security-architect, growth-lead}.
- Dispatch N subagents, each with the upstream artifact
- Merge: collect outputs into a `MultiArtifactBundle`
- Next phase consumes the bundle

### 3. Adversarial (multiple agents, same problem)

Two or more roles produce competing artifacts. e.g. three `code-reviewer` instances reviewing the same PR.
- Dispatch N subagents with the SAME input + role
- Merge: a coordinator role votes / synthesises
- Used for high-stakes decisions (security-architect + appsec-engineer + pentester all opining on auth flow)

### 4. Race (first acceptable wins)

N agents try, first to pass `verify-before-done` is taken; others cancelled.
- Used when speed matters and approach is uncertain
- Cancellation is the expensive part — only race when wasted work is cheap

## Deterministic merging

Merge strategy declared in the Plan, not improvised:

```yaml
parallel:
  pattern: map | fan_out | adversarial | race
  merge:
    strategy: collect | aggregate | vote | first_pass
    coordinator: <role id, if needed>
    tie_break: <rule>
```

## Forbidden

- Parallel without explicit merge strategy — non-determinism
- Parallel for sequential dependencies — race conditions in your pipeline
- More than 8 parallel agents per dispatch — coordination cost dominates

## Novel to Constellation

Superpowers's `dispatching-parallel-agents` exists but is unstructured. Constellation's `parallel-execution` adds four named patterns, each with a declared merge strategy, making outcomes reproducible.
