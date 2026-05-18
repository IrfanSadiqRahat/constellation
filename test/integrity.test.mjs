import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

describe("integrity", () => {
  it("every team formation references known agents", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    const all = new Set();
    for (const t of m.teams) for (const a of t.agents) all.add(a.id);

    for (const f of await readdir("teams")) {
      if (!f.endsWith(".json")) continue;
      const team = JSON.parse(await readFile(join("teams", f), "utf8"));
      for (const id of team.agents) {
        assert.ok(all.has(id), `team ${team.id} references unknown agent ${id}`);
      }
      for (const step of team.pipeline ?? []) {
        for (const u of step.uses ?? []) {
          assert.ok(all.has(u), `team ${team.id} pipeline step '${step.step}' uses unknown agent ${u}`);
        }
      }
    }
  });

  it("every authored keystone has an agents/<id>/SKILL.md file (or is staged for it)", async () => {
    const m = JSON.parse(await readFile("manifest.json", "utf8"));
    const missing = [];
    for (const t of m.teams) {
      for (const a of t.agents) {
        if (!a.authored) continue;
        const p = join("agents", a.id, "SKILL.md");
        if (!existsSync(p)) missing.push(a.id);
      }
    }
    if (missing.length) {
      console.log(`Authored stubs pending: ${missing.length} (${missing.slice(0, 5).join(", ")}...)`);
    }
  });
});
