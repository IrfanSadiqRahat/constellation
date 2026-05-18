---
name: handoff-protocol
description: Pass typed artifacts between roles with explicit contracts. The connective tissue of multi-agent pipelines.
input: Artifact
output: HandoffPacket
methodology: yes
novel: yes
---

# handoff-protocol

## When activated

A role has produced an artifact and the next role needs to pick it up. Don't paste the whole conversation. Don't summarize verbally. Use the protocol.

## The deliverable: `HandoffPacket`

```yaml
artifact_id: <unique>
artifact_type: <PRD | DesignBrief | BackendArchitecture | ...>
produced_by: <role>
produced_at: <iso ts>
upstream_chain: [<artifact_id>, ...]      # what this depends on
content: <link to artifact file>
schema_version: <semver>
status: ready | provisional | blocked
open_decisions: [<decision needed before downstream can start>]
constraints_carried_forward: [<from upstream>]
test_coverage: <link to tests/evals if applicable>
review_state: { spec_pass: bool, quality_pass: bool, by: <role> }
next_role: <consumer agent id>
next_step: <what the consumer should do first>
```

## Operating principles

1. **Artifacts have IDs**, not just types. Same type can flow many times.
2. **Upstream chain is captured.** Traceability for "why was this decision made?"
3. **Open decisions surfaced explicitly.** Don't bury them in prose.
4. **Constraints carry forward.** If PRD said "must be GDPR-compliant", the BackendArchitecture handoff includes that.
5. **Status is honest.** `provisional` lets downstream start without committing.
6. **next_step is explicit.** Don't make the consumer guess.

## Why this exists

Multi-agent systems fail when handoffs are conversational. Constellation's typed contracts only work if the handoff packet itself is typed. This skill enforces it.

## Novel to Constellation

Superpowers has no equivalent. Their model is single-agent with subagent dispatch where parent agent maintains context. Constellation's model is multi-role pipeline where context is in the artifacts, not in any single agent.

## Storage

Handoff packets live in `.constellation/handoffs/<timestamp>-<artifact_id>.yaml`. The team workspace is a chain of these. Auditable, replayable, forkable.
