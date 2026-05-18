---
name: tdd-discipline
description: Role-aware TDD. NO production code without a failing test first. Tests live alongside the role's typed artifact.
input: Requirements | ApiContract | EvalSuite
output: TestArtifact
methodology: yes
role_aware: yes
---

# tdd-discipline

## Iron law (non-negotiable)

**NO production code without a failing test that asserts the desired behaviour, observed RED, then implemented to GREEN.**

This is not "tests recommended". It is a refusal. If the agent writes code without writing a failing test first, the agent has violated the contract and should be told to stop.

## Cycle

1. **RED** — write a test. Run it. Confirm it fails for the right reason (`message contains "Expected … but got …"`).
2. **GREEN** — write the simplest code that makes the test pass. No flourishes.
3. **REFACTOR** — clean up with the test still passing. If the test breaks during refactor, the test was coupled too tight.

Forbidden: writing the test after the code "to capture intent". That is regression-testing, not TDD.

## Role-aware adaptation

The shape of "test" depends on what the role produces:

| role | "test" shape |
|---|---|
| `react-specialist` | RTL / Vitest unit + integration |
| `api-designer` | contract test (Pact / OpenAPI schema validation) |
| `backend-architect` | architectural fitness function (Dependabot rules, ArchUnit, etc.) |
| `prompt-engineer` | eval row in EvalSuite (passes/fails on judge metric) |
| `data-architect` | data quality assertion (Great Expectations, dbt test) |
| `security-architect` | abuse-case test (input that should be blocked) |
| `prd-writer` | acceptance criterion in REQ schema — verifiable as boolean |
| `incident-commander` | postmortem action-item has a verification step |
| `migration-planner` | dual-write reconciliation count = 0 |

The role's `output` artifact has a corresponding test family. No exceptions.

## Coverage smell-check

- 100% line coverage with low mutation kill rate = fake coverage
- Tests that mock everything = tests of mocks
- Tests that re-implement the production code = tests of nothing
- Snapshot tests as the primary mechanism = test of opinion drift

## Why this skill is opinionated

- **Role-aware test shape** — different artifacts need different tests
- **Iron law enforced per role**, not per language
- **Mutation testing** as the coverage truth-meter
- **Eval rows count as tests** for AI-product roles
