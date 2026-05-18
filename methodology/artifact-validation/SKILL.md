---
name: artifact-validation
description: Mechanical schema + invariant checking of artifacts. The unit test for typed handoffs.
input: Artifact
output: ValidationReport
methodology: yes
novel: yes
---

# artifact-validation

## When activated

An artifact has been produced and is about to be handed off. Before `handoff-protocol` ships it, `artifact-validation` proves it conforms.

## Checks performed

```yaml
artifact_id: <id>
artifact_type: <type>
checks:
  - id: schema_present
    passed: bool
  - id: schema_valid
    passed: bool
    errors: [<jsonpath + reason>]
  - id: required_fields_filled
    passed: bool
    missing: [<field>]
  - id: enum_constraints
    passed: bool
    violations: [<field>]
  - id: invariants
    items:
      - rule: <e.g. "every requirement has acceptance criteria">
        passed: bool
        offenders: [<id>]
  - id: link_integrity
    passed: bool
    broken_links: [<url>]
  - id: artifact_freshness
    passed: bool
    age: <duration>
overall: pass | fail
```

## Invariant library (extensible)

| artifact type | invariants |
|---|---|
| PRD | every must-have requirement has acceptance criteria; KPI set; non-goals declared |
| BackendArchitecture | every service has owner; persistence chosen; SLOs declared |
| ThreatModel | every component has STRIDE coverage; mitigations have owners |
| ApiContract | every operation has 4xx/5xx response; error envelope declared; auth scheme |
| EvalSuite | metrics have targets; datasets are versioned; gates declared |
| DataArchitecture | every dataset has owner; PII tagged; retention set |
| MigrationPlan | expand/contract phases present; rollback declared; rate limit set |
| PostmortemDoc | timeline present; action items have owners + dates; blameless |

## Implementation

`artifact-validation` is mechanical — runs as a tool. Each artifact type has a validator under `tools/validators/<type>.mjs`. Adding a type means adding a validator and the artifact catalog gets richer.

## Novel to Constellation

Superpowers has informal "verification-before-completion" — Constellation's `artifact-validation` is a real automated gate, like a type-checker for thinking outputs. This is the difference between "we agree it looks done" and "the schema checker says it's done".
