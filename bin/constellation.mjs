#!/usr/bin/env node
import { readFile, mkdir, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const C = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

async function loadManifest() {
  return JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
}

async function loadTeam(id) {
  const path = join(ROOT, "teams", `${id}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(await readFile(path, "utf8"));
}

function flatAgents(manifest) {
  const out = [];
  for (const t of manifest.teams) {
    for (const a of t.agents) out.push({ ...a, team: t.id });
  }
  return out;
}

function skillDest(scope, id) {
  const base = scope === "project"
    ? join(process.cwd(), ".claude", "skills")
    : join(homedir(), ".claude", "skills");
  return join(base, id);
}

function buildSkillMd(agent, team) {
  return `---
name: ${agent.id}
description: ${agent.role}
team: ${team.id}
input: ${agent.in}
output: ${agent.out}
---

# ${agent.id}

**Team:** ${team.name} · **Lead:** ${team.lead}
**Role:** ${agent.role}

## Contract

- **Input:** \`${agent.in}\`
- **Output:** \`${agent.out}\`

Acceptance: the artifact produced is complete, self-contained, and ready to be consumed by downstream agents in the team pipeline without follow-up clarification.

## Operating principles

1. State assumptions up front. Refuse to invent missing inputs — ask the previous-stage agent or the human.
2. Emit your output in the declared shape (\`${agent.out}\`). Other agents depend on it.
3. Flag risks and uncertainties in a \`risks\` section so downstream agents can decide.
4. Cite sources, prior artifacts, and decisions taken. No hidden assumptions.
5. Defer to specialists outside your remit. Hand off cleanly.

## Authoring

This is a stub generated from the constellation manifest. The human-authored version (when available) lives at \`agents/${agent.id}/SKILL.md\` in the upstream repo. Replace this file with that one for the full playbook.
`;
}

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  for (const e of await readdir(src, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const s = join(src, e.name);
    const d = join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await writeFile(d, await readFile(s));
  }
}

async function installAgent(agentId, opts = {}) {
  const manifest = await loadManifest();
  const all = flatAgents(manifest);
  const agent = all.find((a) => a.id === agentId);
  if (!agent) throw new Error(`Unknown agent: ${agentId}`);
  const team = manifest.teams.find((t) => t.id === agent.team);
  const scope = opts.scope === "project" ? "project" : "user";
  const dest = skillDest(scope, agent.id);
  await mkdir(dest, { recursive: true });

  const authoredDir = join(ROOT, "agents", agent.id);
  if (agent.authored && existsSync(authoredDir)) {
    await copyDir(authoredDir, dest);
  } else {
    await writeFile(join(dest, "SKILL.md"), buildSkillMd(agent, team));
  }
  return { id: agent.id, path: dest, authored: !!agent.authored };
}

async function cmdList(args) {
  const manifest = await loadManifest();
  if (args.includes("--teams")) {
    for (const t of manifest.teams) {
      console.log(`${C.bold(t.name.padEnd(28))} ${C.dim(t.description)}`);
    }
    console.log(`\n${C.dim(`${manifest.totalAgents} agents across ${manifest.totalTeams} teams.`)}`);
    return;
  }
  if (args.includes("--formations")) {
    for (const f of await readdir(join(ROOT, "teams"))) {
      if (!f.endsWith(".json")) continue;
      const t = JSON.parse(await readFile(join(ROOT, "teams", f), "utf8"));
      console.log(`${C.cyan(t.id.padEnd(22))} ${C.dim(t.description)}`);
    }
    return;
  }
  for (const t of manifest.teams) {
    console.log(`\n${C.bold().toString.call?.(t.name) ?? C.bold(t.name)} ${C.dim(`(${t.id})`)}`);
    for (const a of t.agents) {
      const mark = a.authored ? C.green("◆") : C.dim("·");
      console.log(`  ${mark} ${a.id.padEnd(32)} ${C.dim(a.role.slice(0, 70))}`);
    }
  }
}

async function cmdSearch(query) {
  const q = (query ?? "").toLowerCase();
  const manifest = await loadManifest();
  const all = flatAgents(manifest);
  const hits = !q
    ? all
    : all.filter((a) => a.id.includes(q) || a.role.toLowerCase().includes(q) || a.team.includes(q));
  for (const h of hits.slice(0, 40)) {
    const mark = h.authored ? C.green("◆") : C.dim("·");
    console.log(`${mark} ${h.id.padEnd(32)} ${C.dim(`[${h.team}]`)} ${h.role.slice(0, 70)}`);
  }
  console.log(`\n${C.dim(`${hits.length} match(es). ◆ keystone (authored)`)}`);
}

async function cmdInstall(name, opts) {
  const result = await installAgent(name, opts);
  console.log(`${C.green("✓")} ${result.id} → ${result.path} ${result.authored ? C.dim("(authored)") : C.dim("(stub)")}`);
}

async function cmdTeam(name, opts) {
  const team = await loadTeam(name);
  if (!team) {
    console.error(`${C.red("✗")} Unknown team formation: ${name}`);
    console.error(`Try: ${C.cyan("constellation list --formations")}`);
    process.exit(1);
  }
  console.log(`${C.bold(team.name)} — ${C.dim(team.description)}`);
  console.log(`Installing ${team.agents.length} agent(s)…\n`);
  for (const id of team.agents) {
    try {
      const r = await installAgent(id, opts);
      console.log(`  ${C.green("✓")} ${r.id} ${r.authored ? C.dim("(authored)") : ""}`);
    } catch (e) {
      console.log(`  ${C.red("✗")} ${id}: ${e.message}`);
    }
  }
  console.log(`\n${C.dim("Pipeline:")}`);
  for (const [i, step] of (team.pipeline ?? []).entries()) {
    const arrow = i === 0 ? "  " : "→ ";
    console.log(`  ${arrow}${C.cyan(step.step.padEnd(12))} ${C.dim(step.uses.join(", "))}`);
  }
}

async function cmdPipeline(name) {
  const team = await loadTeam(name);
  if (!team) { console.error(`${C.red("✗")} Unknown formation: ${name}`); process.exit(1); }
  console.log(`${C.bold(team.name)}\n`);
  for (const [i, step] of (team.pipeline ?? []).entries()) {
    console.log(`${C.cyan((i + 1) + ". " + step.step)} (${step.uses.join(", ")})`);
    if (step.consumes) console.log(`   ${C.dim("consumes:")} ${step.consumes}`);
    console.log(`   ${C.dim("produces:")} ${step.produces}\n`);
  }
}

function help() {
  console.log(`${C.cyan("constellation")} — 200 role-specific agents in 20 teams\n`);
  console.log("Usage:");
  console.log(`  ${C.cyan("constellation list")} [--teams|--formations]   list agents / teams / formations`);
  console.log(`  ${C.cyan("constellation search <q>")}                    fuzzy search agents`);
  console.log(`  ${C.cyan("constellation install <id>")} [--project]      install one agent`);
  console.log(`  ${C.cyan("constellation team <id>")} [--project]         install a full team formation`);
  console.log(`  ${C.cyan("constellation pipeline <id>")}                  show team pipeline`);
  console.log(`  ${C.cyan("constellation --help")}                         this help`);
  console.log();
  console.log("Examples:");
  console.log(`  constellation list --teams`);
  console.log(`  constellation team saas-mvp`);
  console.log(`  constellation install backend-architect --project`);
  console.log(`  constellation pipeline ai-product`);
}

const argv = process.argv.slice(2);
const cmd = argv[0];
const opts = { scope: argv.includes("--project") ? "project" : "user" };
const args = argv.filter((a) => !a.startsWith("--"));

(async () => {
  try {
    if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") return help();
    if (cmd === "--version" || cmd === "-V") {
      const pkg = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
      console.log(pkg.version);
      return;
    }
    if (cmd === "list" || cmd === "ls") return cmdList(argv);
    if (cmd === "search" || cmd === "s") return cmdSearch(args[1]);
    if (cmd === "install" || cmd === "i" || cmd === "add") return cmdInstall(args[1], opts);
    if (cmd === "team" || cmd === "t") return cmdTeam(args[1], opts);
    if (cmd === "pipeline" || cmd === "p") return cmdPipeline(args[1]);
    console.error(`${C.red("✗")} Unknown command: ${cmd}`);
    help();
    process.exit(1);
  } catch (e) {
    console.error(`${C.red("✗")} ${e.message}`);
    process.exit(1);
  }
})();
