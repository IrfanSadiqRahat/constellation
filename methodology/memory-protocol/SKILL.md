---
name: memory-protocol
description: Persistent role-scoped memory across sessions. The agent that worked on your codebase yesterday knows things today.
input: Session
output: MemoryWrite
methodology: yes
novel: yes
---

# memory-protocol

## The problem

Stateless agents re-learn your codebase, your conventions, your past decisions every session. That's tax. Constellation's memory protocol lets each role accumulate role-scoped notes that survive sessions.

## Storage layout

```
.constellation/memory/
  <project_id>/
    <role_id>/
      decisions.md       # ADR-style, append-only
      conventions.md     # codebase-specific patterns
      gotchas.md         # surprises learned the hard way
      cache.json         # structured fact cache (TTL'd)
```

## Read rules

At session start, for role R:
1. Load `.constellation/memory/<project>/<role>/*` into the briefing
2. Cap to N lines per file (default 200) — older content stays on disk
3. Decisions and conventions are authoritative — never silently overwrite

## Write rules

End of session OR on confirmed decision:
1. Append, don't rewrite. Decisions get superseded entries, not edits.
2. Sign each entry with timestamp + run-id
3. Compact opportunistically — merge near-duplicates with a `compactor` agent

## Cross-role boundaries

- Role memory is private to that role by default
- Shared memory under `<project>/shared/` for cross-role facts (e.g. tech stack, key URLs)
- Privacy: PII never written to memory; redact on write

## Forbidden

- Hallucinated memory — only write what was observed or decided in this session
- Memory as gossip — facts about teammates / users
- Memory as PII store — actively redacted

## Why this matters

Superpowers's value compounds within a session. Constellation's value compounds across sessions. After a month, the backend-architect "knows" your repo. After a year, the security-architect remembers every threat-model decision and their outcomes.

## Novel to Constellation

Superpowers and most agent frameworks are stateless across sessions. The memory protocol is a key differentiator — Constellation gets more useful the longer you use it.
