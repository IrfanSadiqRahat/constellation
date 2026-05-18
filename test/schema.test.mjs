import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

function resolveRef(root, ref) {
  const path = ref.replace("#/", "").split("/");
  let node = root;
  for (const seg of path) node = node[seg];
  return node;
}

function validate(root, schema, value, path) {
  const errs = [];
  if (schema.$ref) return validate(root, resolveRef(root, schema.$ref), value, path);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const a = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
    const t = (a === "number" && Number.isInteger(value)) ? "integer" : a;
    if (!types.includes(t) && !types.includes(a)) {
      errs.push(`${path}: expected ${types.join("|")}, got ${a}`);
      return errs;
    }
  }
  if (typeof value === "string") {
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errs.push(`${path}: pattern fail`);
    if (schema.minLength != null && value.length < schema.minLength) errs.push(`${path}: too short`);
    if (schema.maxLength != null && value.length > schema.maxLength) errs.push(`${path}: too long`);
  }
  if (typeof value === "number" && schema.minimum != null && value < schema.minimum) errs.push(`${path}: < min`);
  if (Array.isArray(value)) {
    if (schema.minItems && value.length < schema.minItems) errs.push(`${path}: too few items`);
    if (schema.items) for (const [i, v] of value.entries()) errs.push(...validate(root, schema.items, v, `${path}[${i}]`));
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const r of schema.required ?? []) if (!(r in value)) errs.push(`${path}: missing ${r}`);
    if (schema.additionalProperties === false && schema.properties) {
      for (const k of Object.keys(value)) if (!(k in schema.properties)) errs.push(`${path}: extra ${k}`);
    }
    for (const [k, sub] of Object.entries(schema.properties ?? {})) {
      if (k in value) errs.push(...validate(root, sub, value[k], `${path}.${k}`));
    }
  }
  return errs;
}

describe("schema", () => {
  it("manifest.json passes manifest.schema.json", async () => {
    const schema = JSON.parse(await readFile("schema/manifest.schema.json", "utf8"));
    const data = JSON.parse(await readFile("manifest.json", "utf8"));
    const errs = validate(schema, schema, data, "$");
    assert.deepEqual(errs, [], errs.join("\n"));
  });
});
