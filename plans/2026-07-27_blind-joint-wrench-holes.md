# Blind-Joint Wrench-Hole Family (LCH…REP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the full MISUMI fixed-position wrench-hole alteration family (`[L|R][C|W|E][H|V|P]`, 18 codes, plus modifiers `FL`/`FR`/`X5`/`X8`) to and from JLCMC wrench-hole codes (`LK`/`RK`/`LM`/`RM` + `A###`), and fix the JLCMC→MISUMI right-end position handling those reverse mappings depend on.

**Architecture:** All logic lives in the inline `<script>` of `index.html` (single-file static site, GitHub Pages). New handlers slot into the existing `MISUMI_ALT_HANDLERS` defer mechanism and the `translateAltsJtoM` token walker. A Node test harness extracts the inline script into a `vm` sandbox so the pure translator functions are testable without restructuring the page.

**Tech Stack:** Vanilla JS in `index.html`; Node built-ins only for tests (`node:test`, `node:vm`, `node:assert`) — zero dependencies.

## Global Constraints

- Only Erik commits. Every "commit" step below means: **stop and prompt Erik to review and commit.** No `Co-Authored-By` or generated-with footers in suggested commit messages.
- New files start with two `// ABOUTME:` comment lines.
- Match surrounding code style (existing handler table style, string-concat notes, no template literals in this file's style where concat is used).
- No comments about what changed or used to be there; evergreen comments only.
- Smallest reasonable change; do not restructure `index.html` (script stays inline).
- Work on branch `wrench-holes` off `main`.

## Reference facts (verified against catalogs — cite in code comments only where a constraint is non-obvious)

Sources: MISUMI catalog p2-683/684 (Fastening Location Wrench Access Hole Alterations), p2249/2250 (How to Specify Optional Holes for Blind Joints), JLCMC Euro Standard 30 Series PDF pp. 9–10 (`references/JLCMC-30Series.pdf`).

- MISUMI code grammar: 1st letter `L`/`R` = end; 2nd `C`/`W`/`E` = wrench holes in 1/2/3 rows (`D`/`S`/`M` are the joint blind holes — cross shape explicitly not available for them); 3rd `H`/`V`/`P` = horizontal / vertical / criss-cross. These are **wrench access through-holes for blind joints**, not blind holes.
- Hole position `H` from the end face: HFS5 = 10 mm; HFS5 25-square (2525/2550) = 12.5 mm; HFS6 (incl. 50-square) = 15 mm. Row pitch `J`/`K` equals the slot pitch — rows sit across the drilled face, all at `H` from the end.
- Diameters: HFS5 Ø7.35; HFS6 Ø5 or Ø8, selected by part-number token `X5`/`X8` (e.g. `HFS6-3030-500-LCH-X5`). JLCMC (EN tier): 30-series Ø8.5, 20-series Ø6.5 — not selectable.
- `FL`/`FR` shift the left/right wrench holes 3 mm toward the end (end-cap clearance; 15 → 12 mm). They are modifiers of THIS family only — alone they are invalid (per p2-683).
- JLCMC `LK`/`LM` = wrench through-holes dimensioned from the **left** end face; `RK`/`RM` from the **right** end face (legend, JLCMC PDF p. 9). `A###` = distance to first hole, `B###`/`C###`… = increments; any position 0–6000 mm allowed; max 5 per direction.
- JLCMC drills **every slot row on the machined face** at each given position by default — so MISUMI's C/W/E row count needs no extra JLCMC tokens.
- Canonical cross-check (MISUMI's own example): `HFS6-3030-194-LCV-FL-RCV-FR` = vertical wrench holes at 12 mm from each end → JLCMC `LM-A12` + `RM-A12`.

---

### Task 1: Test harness + baseline characterization tests

**Files:**
- Create: `tests/harness.mjs`
- Create: `tests/translate.test.mjs`

**Interfaces:**
- Produces: `harness.mjs` exports `misumiToJlcmc(input)` and `jlcmcToMisumi(input)`, each returning the page's result object `{ result, notes, err?, … }`. All later tasks' tests import these.

- [ ] **Step 1: Create the WIP branch**

```bash
git checkout -b wrench-holes
```

- [ ] **Step 2: Write the harness**

```js
// ABOUTME: Extracts the converter's inline <script> from index.html and evaluates it
// ABOUTME: in a Node vm sandbox with a DOM stub, exporting the pure translator functions.
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function stubElement() {
  return {
    classList: { toggle() {}, add() {}, remove() {} }, style: {},
    innerHTML: '', value: '', placeholder: '', textContent: '', className: '',
    appendChild() {}, addEventListener() {}, querySelectorAll: () => [],
  };
}
const sandbox = {
  document: {
    getElementById: () => stubElement(),
    createElement: () => stubElement(),
    addEventListener() {},
    querySelectorAll: () => [],
  },
  window: {}, navigator: {},
};
createContext(sandbox);
runInContext(script, sandbox);

export const { misumiToJlcmc, jlcmcToMisumi } = sandbox;
```

- [ ] **Step 3: Write baseline tests (characterize existing behavior — these must pass immediately)**

```js
// ABOUTME: Unit and integration tests for MISUMI↔JLCMC part-number translation,
// ABOUTME: focused on the blind-joint wrench-hole alteration family (LCH…REP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { misumiToJlcmc, jlcmcToMisumi } from './harness.mjs';

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
```

- [ ] **Step 4: Run and confirm all pass**

Run: `node --test tests/`
Expected: PASS (all 5). If any fails, the assertion is wrong about current behavior — fix the assertion, not the page.

- [ ] **Step 5: Prompt Erik to review and commit**

Suggested message: `test: add vm-based harness and baseline translation tests`

---

### Task 2: MISUMI → JLCMC family translation

**Files:**
- Modify: `index.html` — `MISUMI_ALT_HANDLERS` (~line 527–591), `translateAltsMtoJ` (~line 710–753), new helper next to `tapNote` (~line 514)
- Test: `tests/translate.test.mjs`

**Interfaces:**
- Produces: `wrenchEndOffset(series, section)` → number (mm from end face). Used by Tasks 3, 4, 5.
- Produces: wrench defer records `{ kind: 'W', dir: 'H'|'V', side: 'L'|'R', pos: number|string, fixed?: true, letter?: string }` — positioned `AH`/`AV` tokens gain `side: 'L'`.

- [ ] **Step 1: Write failing tests**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/`
Expected: the 9 new tests FAIL — `LCP` etc. currently hit the "Unrecognised MISUMI alteration" branch; `LWP` currently errors.

- [ ] **Step 3: Implement**

3a. Add helper after `tapNote` (keep its style):

```js
// Blind-joint wrench holes sit at a fixed distance from the end face:
// 5-series 10 mm (25-square sections 12.5 mm), 6-series 15 mm (incl. 50-square).
function wrenchEndOffset(series, section) {
  if (series === '5') return (section === '2525' || section === '2550') ? 12.5 : 10;
  return 15;
}
```

3b. In `MISUMI_ALT_HANDLERS`, **delete** the `LWP` and `RWP` handlers (lines 563–566) and add, in their place, the family handler. It defers one record per direction (`P` = both):

```js
  // Blind-joint wrench holes at fixed H from the end: L/R end, C/W/E = 1/2/3 rows,
  // H/V/P = horizontal / vertical / criss-cross. JLCMC drills every slot row on the
  // machined face at a given position by default, so the row-count letter needs no
  // extra JLCMC tokens.
  { re: /^([LR])([CWE])([HVP])$/, toJ: (m, c) => {
      const H = wrenchEndOffset(c.series, c.section);
      const dirs = m[3] === 'P' ? ['H', 'V'] : [m[3]];
      return {
        defer: dirs.map(d => ({ kind: 'W', dir: d, side: m[1], pos: H, fixed: true })),
        note: m[0] + ' (blind-joint wrench holes, ' + (m[1] === 'L' ? 'left' : 'right') + ' end) → JLCMC wrench hole(s) at ' + H + ' mm from the ' + (m[1] === 'L' ? 'left' : 'right') + ' end face. JLCMC drills all slot rows on the face at that position by default (matches the ' + m[2] + ' row count). ' + (c.series === '5' ? 'Hole Ø: MISUMI 7.35 mm vs JLCMC 20-series 6.5 mm' : 'Hole Ø: MISUMI 5 (X5) or 8 (X8) mm vs JLCMC 30-series 8.5 mm') + ' — verify wrench clearance.',
      };
    } },
```

3c. In the dispatcher loop of `translateAltsMtoJ` (line 721), accept defer arrays and a note alongside a defer:

```js
        if (r.defer) {
          deferred.push(...[].concat(r.defer));
          if (r.note) notes.push({ text: r.note, err: !!r.err });
          handled = true;
          break;
        }
```

3d. Give positioned wrench tokens a side (lines 561–562): add `side: 'L'` to both defer objects.

3e. Replace the emission block (lines 731–753) with four side-aware groups. Fixed and positioned holes merge by absolute position; duplicates dedupe:

```js
  // Emit wrench-hole groups. L-side positions are absolute from the left end,
  // R-side from the right end (JLCMC dimensions R-codes from the right end face).
  const wHoles = deferred.filter(d => d.kind === 'W');
  const emitWrenchGroup = (face, holes) => {
    if (!holes.length) return;
    const positions = [...new Set(holes.map(h => parseFloat(h.pos)))].sort((a, b) => a - b);
    out.push(face);
    let prev = 0;
    const letters = ['A','B','C','D','E'];
    positions.forEach((abs, k) => {
      const incr = abs - prev;
      out.push(letters[k] + (incr % 1 === 0 ? incr : incr.toFixed(1)));
      prev = abs;
    });
  };
  emitWrenchGroup('LK', wHoles.filter(d => d.dir === 'H' && d.side === 'L'));
  emitWrenchGroup('LM', wHoles.filter(d => d.dir === 'V' && d.side === 'L'));
  emitWrenchGroup('RK', wHoles.filter(d => d.dir === 'H' && d.side === 'R'));
  emitWrenchGroup('RM', wHoles.filter(d => d.dir === 'V' && d.side === 'R'));
  if (wHoles.some(d => !d.fixed)) {
    notes.push({ text: 'Wrench-hole positions converted from MISUMI absolute (mm from left end) to JLCMC incremental (A from left, B from A, …). Face defaulted to L-side (LK / LM) — change to R-side if needed.', err: false });
  }
```

(The left-default note now only fires for positioned `AH`/`AV` tokens, whose side genuinely is a guess; family codes carry their side explicitly.)

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test tests/`
Expected: PASS, including all Task 1 baselines.

- [ ] **Step 5: Prompt Erik to review and commit**

Suggested message: `feat: translate MISUMI blind-joint wrench-hole family (LCH…REP) to JLCMC`

---

### Task 3: FL/FR end-cap shift and X5/X8 diameter selector (M→J)

**Files:**
- Modify: `index.html` — `FL`/`FR` handler (~line 589–590), new `X5`/`X8` handler, emission block from Task 2
- Test: `tests/translate.test.mjs`

**Interfaces:**
- Consumes: defer records and `emitWrenchGroup` from Task 2.
- Produces: defer record `{ kind: 'FLR', side: 'L'|'R' }`.

- [ ] **Step 1: Write failing tests**

```js
test("MISUMI's own end-cap example: LCV-FL + RCV-FR → 12 mm both ends", () => {
  assert.equal(misumiToJlcmc('HFS6-3030-194-LCV-FL-RCV-FR').result, 'TXCK-H6-3030-L194-LM-A12-RM-A12');
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/`
Expected: first test FAILS with `LM-A15-RM-A15` (no shift); `FL` currently produces its old error note but position test fails; `X5` hits "Unrecognised".

- [ ] **Step 3: Implement**

3a. Replace the `FL`/`FR` handler (lines 589–590):

```js
  // End-cap clearance: shifts the blind-joint wrench holes on that end 3 mm toward
  // the end face. Valid only alongside an LCH…REP-family code (per MISUMI p2-683).
  { re: /^F([LR])$/, toJ: m => ({ code: null, defer: { kind: 'FLR', side: m[1] } }) },
```

3b. Add the diameter-selector handler next to the family handler:

```js
  // 6-series wrench-hole diameter selector (Ø5 / Ø8). JLCMC 30-series is Ø8.5, fixed.
  { re: /^X([58])$/, toJ: (m, c) => ({ code: null,
      note: 'X' + m[1] + ' selects MISUMI wrench-hole Ø' + m[1] + ' mm — JLCMC ' + (c.series === '5' ? '20-series drills Ø6.5' : '30-series drills Ø8.5') + ' mm (not selectable). Verify wrench clearance.' }) },
```

3c. In the emission block, before computing positions, apply the shift to fixed holes and validate lone `FL`/`FR`:

```js
  const capShift = { L: 0, R: 0 };
  for (const f of deferred.filter(d => d.kind === 'FLR')) {
    if (wHoles.some(h => h.fixed && h.side === f.side)) capShift[f.side] = 3;
    else notes.push({ text: 'F' + f.side + ' modifies the blind-joint wrench-hole codes (LCH…REP family) only — no matching ' + f.side + '-end code present, token dropped.', err: true });
  }
  for (const h of wHoles) { if (h.fixed) h.pos = parseFloat(h.pos) - capShift[h.side]; }
```

(Place this after `const wHoles = …` and before `emitWrenchGroup` calls.)

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test tests/`
Expected: PASS.

- [ ] **Step 5: Prompt Erik to review and commit**

Suggested message: `feat: handle FL/FR end-cap shift and X5/X8 wrench-hole diameter tokens`

---

### Task 4: JLCMC → MISUMI — right-end positions and family recognition

**Files:**
- Modify: `index.html` — `translateAltsJtoM` wrench branch (~line 824–845), call site (~line 993), new helper next to `wrenchEndOffset`
- Test: `tests/translate.test.mjs`

**Interfaces:**
- Consumes: `wrenchEndOffset(series, section)` from Task 2.
- Produces: `wrenchRowLetter(series, section, dir)` → `'C'|'W'|'E'`. `translateAltsJtoM(alts, ctx)` now requires `ctx.length` (number, mm).

- [ ] **Step 1: Write failing tests**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/`
Expected: family/FL/RCV tests FAIL (current code emits `AH15`-style absolutes); `RK-A100` FAILS (currently `AH100` — positions were wrongly treated as left-referenced); the last test PASSES (guard).

- [ ] **Step 3: Implement**

3a. Add helper after `wrenchEndOffset`:

```js
// MISUMI row letter for blind-joint wrench holes: C/W/E = 1/2/3 slot rows on the
// drilled face. Rows = (face dimension − 2·H) / slot pitch + 1; capped at E.
function wrenchRowLetter(series, section, dir) {
  const H = wrenchEndOffset(series, section);
  const w = parseFloat(section.slice(0, 2));
  const h = section.length > 2 ? parseFloat(section.slice(2)) : w;
  const pitch = series === '5' ? ((section === '2525' || section === '2550') ? 25 : 20)
                               : (section === '5050' ? 20 : 30);
  const dim = dir === 'H' ? h : w;
  const rows = Math.max(1, Math.round((dim - 2 * H) / pitch) + 1);
  return rows >= 3 ? 'E' : rows === 2 ? 'W' : 'C';
}
```

3b. At the call site (~line 993) pass length:

```js
  const altRes = translateAltsJtoM(parsed.alts, { series: parsed.series, section, length: parsed.length });
```

3c. Replace the wrench branch (lines 826–845). Fixed-position groups collect into `fixedWrench` and are emitted after the walk so H+V pairs can merge to `P`:

```js
  const fixedWrench = {}; // key: side + rowLetter + (shifted ? 's' : '') → { H, V }
```

(declare next to `notes`/`out` at the top of `translateAltsJtoM`)

```js
    // Wrench hole: LK/RK/LM/RM followed by successive A###, B###, … increments.
    // L-codes are dimensioned from the left end face, R-codes from the right.
    if (/^(LK|RK|LM|RM)$/.test(tok)) {
      const dir = (tok[1] === 'K') ? 'H' : 'V';
      const fromRight = tok[0] === 'R';
      let j = i + 1;
      const incr = [];
      while (j < alts.length && /^[A-E]\d+(\.\d+)?$/.test(alts[j])) {
        incr.push(parseFloat(alts[j].slice(1)));
        j++;
      }
      if (!incr.length) {
        notes.push({ text: tok + ' wrench-hole code present but no position (A###) follows.', err: true });
        i = j;
        continue;
      }
      const H = wrenchEndOffset(ctx.series, ctx.section);
      if (incr.length === 1 && (incr[0] === H || incr[0] === H - 3)) {
        // Fixed blind-joint position → MISUMI family code (LCH…REP), FL/FR if shifted.
        const letter = wrenchRowLetter(ctx.series, ctx.section, dir);
        const key = (fromRight ? 'R' : 'L') + letter + (incr[0] === H - 3 ? 's' : '');
        if (!fixedWrench[key]) fixedWrench[key] = {};
        fixedWrench[key][dir] = true;
        notes.push({ text: tok + '-A' + incr[0] + ' sits at the MISUMI blind-joint wrench-hole position (' + H + ' mm' + (incr[0] === H - 3 ? ' − 3 mm end-cap shift' : '') + ') — emitting the fixed alteration code. Row letter ' + letter + ' assumes ' + ctx.section + ' slot rows; JLCMC drills all rows by default.', err: false });
      } else {
        const letters = ['A','B','C','D','E'];
        let acc = 0;
        let abs = incr.map(v => (acc += v));
        if (fromRight) abs = abs.map(p => ctx.length - p).reverse();
        abs.forEach((p, k) => out.push(letters[k] + dir + (p % 1 === 0 ? p : p.toFixed(1))));
        notes.push({ text: 'Wrench-hole positions converted from JLCMC ' + (fromRight ? 'right-end-referenced' : 'left-end') + ' incremental to MISUMI absolute (mm from left end). Face ' + tok + ' not encoded in MISUMI — orientation only.', err: false });
      }
      i = j;
      continue;
    }
```

3d. After the `while` walk, before `return`, emit fixed codes:

```js
  for (const key of Object.keys(fixedWrench)) {
    const rec = fixedWrench[key];
    const third = rec.H && rec.V ? 'P' : (rec.H ? 'H' : 'V');
    out.push(key[0] + key[1] + third);
    if (key.length > 2) out.push(key[0] === 'L' ? 'FL' : 'FR');
  }
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test tests/`
Expected: PASS, including all earlier tasks' tests.

- [ ] **Step 5: Prompt Erik to review and commit**

Suggested message: `feat: recognize blind-joint wrench holes J→M; fix right-end position reference`

---

### Task 5: Breakdown panels and on-page reference table

**Files:**
- Modify: `index.html` — `MISUMI_ALT_MEANINGS` (~line 1055–1080), explain loop (~line 1089–1129), `explainJlcmc` position details (~line 1213–1224), reference table (~line 323)
- Test: `tests/translate.test.mjs`

**Interfaces:**
- Consumes: `wrenchEndOffset` from Task 2. Harness additionally exports `explainMisumi` and `explainJlcmc` (add them to the export line in `tests/harness.mjs`).

- [ ] **Step 1: Write failing tests**

```js
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
```

(Import `explainMisumi, explainJlcmc` from the harness at the top of the test file and add them to the harness export.)

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/`
Expected: FAIL — `LCP`/`X5` rows come back `unknown`; `A100` says "from left end".

- [ ] **Step 3: Implement**

3a. In `MISUMI_ALT_MEANINGS`, delete the `LWP`/`RWP` entries (their text is wrong and the family regex below covers all 18 codes).

3b. In the `explainMisumi` token loop, before the `unknown` fallback:

```js
    if (m = tok.match(/^([LR])([CWE])([HVP])$/)) {
      const side = m[1] === 'L' ? 'left' : 'right';
      const rowsTxt = { C: '1 row', W: '2 rows', E: '3 rows' }[m[2]];
      const dirTxt = { H: 'horizontal', V: 'vertical', P: 'criss-cross (horizontal + vertical)' }[m[3]];
      rows.push({ token: tok, meaning: 'blind-joint wrench holes, ' + side + ' end, ' + rowsTxt + ', ' + dirTxt + ' — fixed at ' + wrenchEndOffset(parsed.series, parsed.section) + ' mm from the end face' });
      continue;
    }
    if (m = tok.match(/^X([58])$/)) {
      rows.push({ token: tok, meaning: 'wrench-hole diameter selector — Ø' + m[1] + ' mm (6-series)' });
      continue;
    }
```

3c. In `explainJlcmc`, the wrench-group position details (lines 1218–1220) become end-aware. The group knows its face token; compute `const end = (tok[0] === 'R') ? 'right' : 'left';` when the `LK|RK|LM|RM` branch matches, and use `' mm from ' + end + ' end'` in both the `A` and cumulative detail strings. Apply the same to the counterbore branch only if JLCMC dimensions `RC`/`RE` from the right as well — **do not touch the counterbore branch in this task** (unverified; note it in the docs task instead).

3d. In the on-page reference table (after the wrench-hole rows, ~line 324), add:

```html
      <tr><td>Blind-joint wrench holes at end — 1/2/3 rows, H/V/criss-cross</td><td><code>LCH…LEP / RCH…REP</code> (+<code>FL/FR</code>, <code>X5/X8</code>)</td><td><code>LK/LM-A15</code> left, <code>RK/RM-A15</code> right (A10 on 20-series)</td></tr>
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test tests/`
Expected: PASS.

- [ ] **Step 5: Eyeball the page**

Run: `open index.html` — convert `HFS6-3030-194-LCV-FL-RCV-FR` and `TXCK-H6-3030-L500-LK-A15-LM-A15` in the UI; confirm breakdown rows and notes render sensibly.

- [ ] **Step 6: Prompt Erik to review and commit**

Suggested message: `feat: explain blind-joint wrench-hole codes in breakdown panels and reference table`

---

### Task 6: Cross-reference documents

**Files:**
- Modify: `references/MISUMI-JLCMC_30Series_CrossReference.md` (§5 wrench-hole subsection, ~line 138–151)
- Modify: `references/MISUMI-JLCMC_20Series_CrossReference.md` (equivalent subsection)

- [ ] **Step 1: Update the 30-series doc**

In §5, retitle the subsection "Wrench (through) hole at specified position" content: keep the `AH/BH/AV/BV` table, but replace the row `| Aligned with mating tap (fixed) | LWP / RWP | Use LK / RK with explicit A### |` with a new sub-table:

```markdown
### Blind-joint wrench holes at fixed end position

MISUMI grammar (p2-683): `[L|R]` end + `[C|W|E]` rows (1/2/3) + `[H|V|P]` horizontal/vertical/criss-cross.
These are wrench access through-holes for blind joints at a fixed offset from the end face
(HFS6: 15 mm; hole Ø5/Ø8 selected by `X5`/`X8`). `FL`/`FR` shift them 3 mm toward the end
for end-cap clearance. JLCMC has no fixed-position codes — use positioned wrench holes;
JLCMC drills all slot rows on the machined face at a given position by default, so the
row-count letter needs no extra tokens. JLCMC `L`-codes dimension from the left end face,
`R`-codes from the right (30-series hole Ø8.5, not selectable).

| MISUMI | JLCMC |
|---|---|
| `LCH` / `LWH` / `LEH` | `LK-A15` |
| `LCV` / `LWV` / `LEV` | `LM-A15` |
| `LCP` / `LWP` / `LEP` | `LK-A15-LM-A15` |
| `RCH` / `RWH` / `REH` | `RK-A15` |
| `RCV` / `RWV` / `REV` | `RM-A15` |
| `RCP` / `RWP` / `REP` | `RK-A15-RM-A15` |
| any of the above + `FL`/`FR` | shift that end's position to `A12` |
```

Also correct the general wrench-hole row that reads "number = mm from left end … Default first-hole offset 30 mm" to state that `RK`/`RM` positions are measured from the right end face.

- [ ] **Step 2: Update the 20-series doc**

Same subsection, with 20-series values: offset `A10` (`A12.5` for 2525/2550), MISUMI hole Ø7.35 (no `X` selector), JLCMC 20-series hole Ø6.5. Keep the existing "see the 30-series document §5" cross-link style if present.

- [ ] **Step 3: Verify rendered markdown**

Run: `grep -n "LCP" references/*.md` — both files mention the family; tables render (pipe counts consistent).

- [ ] **Step 4: Prompt Erik to review and commit**

Suggested message: `docs: correct wrench-hole family mapping in cross-reference docs`

---

### Task 7: End-to-end browser test — SKIPPED (Erik authorized skipping e2e, 2026-07-27)

Erik's testing policy requires unit, integration, AND e2e tests unless explicitly waived. Tasks 1–5 give unit + integration coverage through the real translation pipeline. True browser e2e needs a dependency (Playwright + package.json + node_modules) in a currently dependency-free repo.

**Decision needed from Erik before executing this task:** add Playwright as the e2e layer, or explicitly authorize skipping e2e for this static page.

If approved:

**Files:**
- Create: `package.json` (devDependency `@playwright/test`)
- Create: `tests/e2e/convert.spec.mjs`

- [ ] **Step 1: Scaffold**

```bash
npm init -y && npm install -D @playwright/test && npx playwright install chromium
```

- [ ] **Step 2: Write the test**

```js
// ABOUTME: End-to-end browser test — loads index.html, types a part number,
// ABOUTME: and asserts the converted output and notes render in the page.
import { test, expect } from '@playwright/test';

test('converts LCP part number in the browser', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/index.html');
  await page.fill('#input', 'HFS6-3030-500-LCP');
  await page.press('#input', 'Enter');
  await expect(page.locator('#output')).toContainText('TXCK-H6-3030-L500-LK-A15-LM-A15');
});
```

(Adjust the trigger to the page's actual convert mechanism — button click or input event — after reading the DOM wiring around line 1337.)

- [ ] **Step 3: Run**

Run: `npx playwright test`
Expected: PASS.

- [ ] **Step 4: Prompt Erik to review and commit**

Suggested message: `test: add Playwright e2e coverage for the convert flow`

---

## Self-review notes

- Spec coverage: all 18 family codes (Task 2 M→J, Task 4 J→M), `FL`/`FR` (Tasks 3, 4), `X5`/`X8` (Tasks 3, 5), LWP/RWP mis-description removed (Tasks 2, 5), both docs (Task 6), UI explainers (Task 5).
- The J→M right-end fix (Task 4) changes existing `RK`/`RM` output (`RK-A100` on L800: `AH100` → `AH700`). This is a bug fix — the old output silently placed holes from the wrong end — but it is a behavior change to call out in review.
- `wrenchRowLetter` caps 4-row faces (30120, 2080) at `E` — MISUMI has no 4-row letter; the note tells the user to verify.
- Counterbore `RC`/`RE` may have the same right-end reference issue as `RK`/`RM`; NOT in scope here (unverified against the catalog figures). Flagged for a future check rather than fixed blind.
