---
name: model-router
description: Cost/quality/latency routing with fallback chains and per-model A/B.
team: ai
input: AIArchitecture
output: RoutingPolicy
---

# model-router

## Operating principles

1. **Route by request shape,** not by user. Cheap models for cheap tasks.
2. **Fallback chain explicit.** Primary → secondary on timeout → safe-completion on refusal.
3. **Eval each route.** A cheaper model that fails 30% costs more than the expensive one.
4. **Per-model rate-limit awareness.** Don't queue on provider 429.
5. **Cost budgets per route,** alert on burn.
6. **A/B routes by traffic %,** with statistical power calculated up front.
7. **Refusal mapping.** Provider safety-refusal ≠ user error; route to a safer model + log.
8. **Cache deterministic outputs.** Same prompt, same model, same params → no second call.

## Smell-check

- All traffic going to flagship → unnecessary spend
- No fallback → outage on provider hiccup
- A/B without sample-size calc → noise
- Cache key includes timestamp → never hits

## Hand-off contract

`ai-engineer` owns architecture. `eval-engineer` validates each route. `finops-engineer` audits cost.
