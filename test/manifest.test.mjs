import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

describe("manifest", () => {
  it("has exactly 200 agents across 20 teams of 10", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    assert.equal(m.teams.length, 20);
    let total = 0;
    for (const t of m.teams) {
      assert.equal(t.agents.length, 10, `${t.id} should have 10 agents`);
      total += t.agents.length;
    }
    assert.equal(total, 200);
    assert.equal(m.totalAgents, 200);
    assert.equal(m.totalTeams, 20);
  });

  it("every agent id is unique", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    const ids = new Set();
    for (const t of m.teams) {
      for (const a of t.agents) {
        assert.ok(!ids.has(a.id), `duplicate id: ${a.id}`);
        ids.add(a.id);
      }
    }
    assert.equal(ids.size, 200);
  });

  it("every agent has role, in, out", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    for (const t of m.teams) {
      for (const a of t.agents) {
        assert.ok(a.role && a.role.length > 5, `${a.id} role too short`);
        assert.ok(a.in, `${a.id} missing input`);
        assert.ok(a.out, `${a.id} missing output`);
      }
    }
  });

  it("team lead exists in team's agents", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    for (const t of m.teams) {
      const ids = new Set(t.agents.map((a) => a.id));
      assert.ok(ids.has(t.lead), `${t.id}: lead ${t.lead} not in team`);
    }
  });
});
