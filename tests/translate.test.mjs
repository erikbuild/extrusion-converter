// ABOUTME: Unit and integration tests for MISUMI↔JLCMC part-number translation,
// ABOUTME: focused on the blind-joint wrench-hole alteration family (LCH…REP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { misumiToJlcmc, jlcmcToMisumi, explainMisumi, explainJlcmc } from './harness.mjs';

test('baseline: plain 30-series profile', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-1000').result, 'TXCK-H6-3030-L1000');
});

test('baseline: end tap both ends', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-1000-TPW').result, 'TXCK-H6-3030-L1000-DA');
});

test('baseline: positioned wrench hole M→J', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-1000-AH100').result, 'TXCK-H6-3030-L1000-LK-A100');
});

test('baseline: positioned wrench hole J→M', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L800-LM-A50-B300').result, 'HFS6-3030-800-AV50-BV350');
});

test('baseline: plain 20-series profile', () => {
  assert.equal(jlcmcToMisumi('TXCJ-H6-2020-L400').result, 'HFS5-2020-400');
});

test('LCP → left criss-cross wrench holes at 15 mm', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-500-LCP').result, 'TXCK-H6-3030-L500-LK-A15-LM-A15');
});

test('RCP → right criss-cross wrench holes, right-end referenced', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-500-RCP').result, 'TXCK-H6-3030-L500-RK-A15-RM-A15');
});

test('LCH on 20-series → 10 mm offset', () => {
  assert.equal(misumiToJlcmc('HFS5-2020-400-LCH').result, 'TXCJ-H6-2020-L400-LK-A10');
});

test('LCV on 25-square → 12.5 mm offset', () => {
  assert.equal(misumiToJlcmc('HFS5-2525-400-LCV').result, 'TXCJ-H6-2525-L400-LM-A12.5');
});

test('LWH (2 rows) collapses to one JLCMC position — all rows drilled by default', () => {
  assert.equal(misumiToJlcmc('HFS6-3060-800-LWH').result, 'TXCK-H6-3060-L800-LK-A15');
});

test('LWP now translates instead of erroring', () => {
  const r = misumiToJlcmc('HFS6-3060-800-LWP');
  assert.equal(r.result, 'TXCK-H6-3060-L800-LK-A15-LM-A15');
  assert.ok(!r.notes.some(n => n.err));
});

test('family code merges with positioned wrench hole in one LK group', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-1000-LCH-AH100').result, 'TXCK-H6-3030-L1000-LK-A15-B85');
});

test('duplicate positions dedupe (LCH+LCP)', () => {
  assert.equal(misumiToJlcmc('HFS6-3030-500-LCH-LCP').result, 'TXCK-H6-3030-L500-LK-A15-LM-A15');
});

test('family translation emits diameter note', () => {
  const r = misumiToJlcmc('HFS6-3030-500-LCP');
  assert.ok(r.notes.some(n => n.text.includes('8.5')));
});

test("MISUMI's own end-cap example: LCV-FL + RCV-FR → 12 mm both ends", () => {
  assert.equal(misumiToJlcmc('HFS6-3030-194-LCV-FL-RCV-FR').result, 'TXCK-H6-3030-L194-LM-A12-RM-A12');
});

test('applied FL emits an explanatory shift note', () => {
  const r = misumiToJlcmc('HFS6-3030-194-LCV-FL');
  assert.ok(r.notes.some(n => !n.err && n.text.includes('3 mm')));
});

test('FL without a family code is an error note, no output token', () => {
  const r = misumiToJlcmc('HFS6-3030-500-FL');
  assert.equal(r.result, 'TXCK-H6-3030-L500');
  assert.ok(r.notes.some(n => n.err && n.text.includes('FL')));
});

test('X5 emits diameter note and no output token', () => {
  const r = misumiToJlcmc('HFS6-3030-500-LCH-X5');
  assert.equal(r.result, 'TXCK-H6-3030-L500-LK-A15');
  assert.ok(r.notes.some(n => n.text.includes('Ø5')));
});

test('J→M: LK-A15 at the fixed offset → LCH', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L500-LK-A15').result, 'HFS6-3030-500-LCH');
});

test('J→M: LK-A15 + LM-A15 merge to LCP', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L500-LK-A15-LM-A15').result, 'HFS6-3030-500-LCP');
});

test('J→M: row letter follows profile — 3060 horizontal is 2 rows', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3060-L800-LK-A15').result, 'HFS6-3060-800-LWH');
});

test('J→M: 12 mm = 15 − 3 → family code + FL', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L194-LM-A12').result, 'HFS6-3030-194-LCV-FL');
});

test('J→M: 20-series right vertical at 10 mm → RCV', () => {
  assert.equal(jlcmcToMisumi('TXCJ-H6-2020-L400-RM-A10').result, 'HFS5-2020-400-RCV');
});

test('J→M: arbitrary right-end position converts against length', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L800-RK-A100').result, 'HFS6-3030-800-AH700');
});

test('J→M: left-end arbitrary positions unchanged', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L800-LM-A50-B300').result, 'HFS6-3030-800-AV50-BV350');
});

test("counterbore M→J: MISUMI's catalog example — X (vertical) → LE, left-referenced", () => {
  assert.equal(misumiToJlcmc('HFS6-3030-500-Z6-XA200-XB256').result, 'TXCK-H6-3030-L500-LE-Z6-A200-B56');
});

test('counterbore M→J: Y (horizontal) → LC', () => {
  assert.equal(misumiToJlcmc('HFS6-3060-295-Z8-YA15-YB45').result, 'TXCK-H6-3060-L295-LC-Z8-A15-B30');
});

test('counterbore M→J: fictional Z/W face letters are rejected', () => {
  const r = misumiToJlcmc('HFS6-3030-500-Z6-ZA100');
  assert.ok(r.notes.some(n => n.err && n.text.includes('Unrecognised')));
});

test('counterbore J→M: LE (vertical) round-trips to X letters', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L500-LE-Z6-A200-B56').result, 'HFS6-3030-500-Z6-XA200-XB256');
});

test('counterbore J→M: LC (horizontal) emits Y letters', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L500-LC-Z6-A100').result, 'HFS6-3030-500-Z6-YA100');
});

test('counterbore J→M: RC positions convert from the right end', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L800-RC-Z6-A100').result, 'HFS6-3030-800-Z6-YA700');
});

test('counterbore J→M: RE multi-position converts and re-sorts', () => {
  assert.equal(jlcmcToMisumi('TXCK-H6-3030-L800-RE-Z6-A100-B200').result, 'HFS6-3030-800-Z6-XA500-XB700');
});

test('explainJlcmc reads RE counterbore positions from the right end', () => {
  const rows = explainJlcmc('TXCK-H6-3030-L800-RE-Z6-A100');
  const row = rows.find(r => r.token === 'A100');
  assert.ok(row && /right end/.test(row.meaning));
});

test('explainMisumi describes LCP', () => {
  const rows = explainMisumi('HFS6-3030-500-LCP');
  const row = rows.find(r => r.token === 'LCP');
  assert.ok(row && /criss-cross/.test(row.meaning) && /15 mm/.test(row.meaning));
});

test('explainMisumi describes X5', () => {
  const rows = explainMisumi('HFS6-3030-500-LCH-X5');
  const row = rows.find(r => r.token === 'X5');
  assert.ok(row && !row.unknown);
});

test('explainJlcmc reads RK positions from the right end', () => {
  const rows = explainJlcmc('TXCK-H6-3030-L800-RK-A100');
  const row = rows.find(r => r.token === 'A100');
  assert.ok(row && /right end/.test(row.meaning));
});
