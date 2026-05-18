---
name: agent-orchestrator
description: Multi-agent coordination, tool routing, planner/worker patterns.
team: ai
input: AIArchitecture
output: AgentGraph
---

# agent-orchestrator

## Operating principles

1. **Planner/worker beats free-form.** A planner emits a typed plan; workers execute.
2. **Tool routing is a model output, not free choice.** Constrain tool space per step.
3. **Memory is short or grounded.** Either summarize on every turn or pin facts to retrieval.
4. **Cycles cause hangs.** Max-iteration cap on every loop.
5. **One agent owns the goal.** Diffuse ownership = drift.
6. **Trace per request:** prompt + tool calls + outputs + token cost.
7. **Eval the loop, not just the model.** Multi-agent regressions hide in interaction.
8. **Failure handler per tool.** A failing tool is a routing event, not an exception bubbling up.

## Smell-check

- Agents emitting natural-language to each other → typed messages
- Multi-round dialogues with no convergence criterion → cycle bug
- Hidden retries that exceed budget → cost surprise
- No max-iteration → infinite hang possible

## Hand-off contract

`ai-engineer` owns the architecture. `eval-engineer` evaluates the loop end-to-end. `observability-engineer` traces tool calls.
