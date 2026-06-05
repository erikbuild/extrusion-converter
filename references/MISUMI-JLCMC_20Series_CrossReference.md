# MISUMI 5-Series ↔ JLCMC 20-Series Cross-Reference

20 mm base aluminum extrusion, 6 mm slot. MISUMI **HFS5** family ↔ JLCMC **TXCJ** Euro Standard 20 Series.

Same nominal geometry: 20 mm base module, 6 mm T-slot opening, A6063-T5 (JLCMC) / A6N01SS-T5 or 6005A-T5 (MISUMI HFS) / 6063-T5 (MISUMI NFS economy). Slot-bottom and T-slot dimensions match (6 wide × 12 deep × 2 throat). The alteration code system is the same as the 30-series with smaller standard tap/counterbore sizes; the same orientation conventions apply.

> Heads up — this document is a hand-built reference and was assembled without seeing every JLCMC 20-series drawing. Trust the broad mapping; verify the specific suffix-letter shapes against the JLCMC website before placing any orders.

---

## 1. Part-number anatomy

### MISUMI

```
HFS  B   5   - 2020 - 500 - LTP - RTP - SC
 │   │   │     │      │     │     │     │
 │   │   │     │      │     │     │     └─ extra alterations / cutting
 │   │   │     │      │     └─────┴─────── end-face & hole alts
 │   │   │     │      └─ length in mm (0.5 mm inc, ±0.5)
 │   │   │     └─ section (W × H, mm)
 │   │   └─ series (5 = 20 mm base, 6 mm slot)
 │   └─ variant letter (blank=clear, B=black, Y=yellow, none for NFS economy)
 └─ family prefix (HFS / NFS / CAF / HFSY)
```

Prefix **K** (`KHFS5-…`) = fixed stock-cut length (1000 mm or 4000 mm effective). No `L`-suffix (lightweight) tier exists in the 5-series.

### JLCMC

```
TXCJ - H6 - 2020 - L500 - LA - RU
  │     │     │      │     │    │
  │     │     │      │     │    └─ extra alterations
  │     │     │      │     └─ first alteration
  │     │     │      └─ length, mm with "L" prefix (0.1 mm inc, ±0.3 ≤1000 / ±0.5 >1000)
  │     │     └─ spec code (bare # = Standard; "S" suffix = cross-braced 40-wide; no J / Lightweight tier)
  │     └─ surface (H6 natural / H7 black / W1 white / B2 wood color)
  └─ fixed category code (T = major, XC = category, J = 20-series — distinct from K for 30-series)
```

**Important:** JLCMC's 20-series category code is `TXCJ`. The 30-series uses `TXCK`. Make sure not to mix.

---

## 2. Tier / finish mapping

| MISUMI prefix | JLCMC equivalent | Notes |
|---|---|---|
| `HFS5` (clear anodize) | `TXCJ-H6-####` (Native sandblasted oxidation) | Direct match in appearance and function. |
| `HFSB5` (black anodize) | `TXCJ-H7-####` (Black sandblasted oxidized) | Direct match. |
| `CAF5` (clear coating over anodize) | — | No JLCMC equivalent. Closest is H6 (loses the clear-coat luster). |
| `HFSY5` (baked-on yellow paint) | — | JLCMC does not offer yellow. W1 (white) or B2 (wood) are JLCMC-only paint options. |
| `NFS5` (6063-T5 economy clear) | `TXCJ-H6-####` | JLCMC uses 6063-T5 by default — JLCMC's H6 is functionally close to MISUMI NFS5. |
| `NFSB5` (6063 economy black) | `TXCJ-H7-####` | |
| `NFSF5` / `NFST5` (economy shape variants) | `TXCJ-H6-####{A or T}` | Map by shape suffix; see §3. |
| — | `TXCJ-W1-####` (White painted) | JLCMC-only — no MISUMI equivalent. |
| — | `TXCJ-B2-####` (Wood color, painted + transfer-printed) | JLCMC-only — no MISUMI equivalent. |

**Material notes:** MISUMI HFS5 uses **A6N01SS-T5 or 6005A-T5** (stronger / better extrusion alloy). MISUMI NFS5 uses **6063-T5**. JLCMC uses **A6063-T5** throughout. Cross-sectional moments of inertia are listed as identical between HFS and NFS in MISUMI's catalog, but tensile strength is reduced in the 6063 variant.

---

## 3. Cross-section / shape mapping (20 base)

| MISUMI section | JLCMC spec | Match quality | Notes |
|---|---|---|---|
| `HFS5-2020` | `TXCJ-H6-2020` | Exact | Basic 20 × 20, 1 slot per face. |
| `HFSB5-2020` | `TXCJ-H7-2020` | Exact | |
| `HFSF5-2020` (3-slot + 1-flat) | `TXCJ-H6-2020A` | Likely match | "A" suffix is the 30-series convention; assumed consistent in 20-series. **Verify drawing.** |
| `HFST5-2020` (2-slot + 2-flat T) | — | Gap | JLCMC's 20-series SPEC list does not include a `2020T`. Use `2020H` (opposite-side slots) or another variant — **verify which shape you actually need.** |
| `HFSH5-2020` (2 opposite slots) | `TXCJ-H6-2020H` | Likely match | |
| `HFSC5-2020` (1-slot + 3-flat) | `TXCJ-H6-2020C` | Likely match | |
| `HFSR5-2020` (R10 quarter-round corner) | `TXCJ-H6-2020R` | Likely match | Radius dimension differs vendor-to-vendor — verify. |
| — | `TXCJ-H6-2020B` | — | JLCMC-only — likely a face-bore variant (analogous to JLCMC 3030B). |
| — | `TXCJ-H6-2020D` | — | JLCMC-only variant; possibly D-hole/D-shape. |
| — | `TXCJ-H6-2020E` | — | JLCMC-only variant. |
| `HFS5-2040` | `TXCJ-H6-2040` | Exact | 20 × 40, two slots per long face. |
| `HFSF5-2040` | `TXCJ-H6-2040A` | Likely match | |
| `HFST5-2040` | — | Gap | No `2040T` in JLCMC SPEC list. |
| `HFSH5-2040` | `TXCJ-H6-2040H` | Likely match | |
| `HFSC5-2040` | `TXCJ-H6-2040C` | Likely match | |
| `HFS5-2060` | `TXCJ-H6-2060` | Exact | 20 × 60. |
| `HFS5-2080` | `TXCJ-H6-2080` | Exact | 20 × 80. |
| `HFS5-2525` | `TXCJ-H6-2525` | Exact | 25 × 25 (slot still 6 mm). |
| `HFS5-2550` | `TXCJ-H6-2550` | Exact | 25 × 50. |
| `HFS5-4040` | — | Gap | JLCMC 20-series catalog does not list a plain `4040`. Closest in JLCMC's universe is the 40-series with 8 mm slot (different fastener family). Functional substitution requires re-evaluating bolts/nuts. |
| `HFS5-4060` | `TXCJ-H6-4060S` | Approximate | JLCMC `4060S` has internal cross-bracing — wall geometry differs from MISUMI's straight `4060`. |
| `HFS5-4080` | `TXCJ-H6-4080S` | Approximate | Same caveat as 4060S. |
| `HFS5-404020` (L-shape) | — | Gap | No JLCMC L-shape in 20-series. |
| `HFS30A5-20`, `HFS45A5-20`, `HFS60A5-20` (angled wedges) | — | Gap | JLCMC 20-series catalog has no 30°/45°/60° wedge profiles. |
| `HFSR5-404020` (curved L) | — | Gap | |
| — | `TXCJ-H6-4420` / `4420R` | — | JLCMC-only — appears to be a 44 × 20 (or similar) specialized profile. No MISUMI HFS5 equivalent. |

**Variant letters seen in JLCMC 20-series:** A, B, C, D, E, H, R, S. A/C/H/R map cleanly to MISUMI F/C/H/R intentions. B/D/E/S are JLCMC-specific and need drawing review to map by intent.

---

## 4. Length

| Item | MISUMI 5-series | JLCMC 20-series |
|---|---|---|
| Notation | bare number (`-500`) | `L`-prefixed (`-L500`) |
| Increment | 0.5 mm | 0.1 mm |
| Standard tolerance | L ± 0.5 mm | L ± 0.3 mm (L ≤ 1000), L ± 0.5 mm (L > 1000) |
| Tighter cut | `SC` alteration → L ± 0.2 mm, L ≤ 1500 only | already standard up to 1000 |
| Range | 50–4000 mm (5800/6000 mm by special order at some sites) | 50–6000 mm |
| Stock fixed length | `KHFS5` → 1000 mm or 4000 mm effective | n/a (configurable only) |

**Translation:** strip/add the `L` prefix. MISUMI rounds to 0.5 mm; JLCMC accepts down to 0.1 mm. The JLCMC standard tolerance is tighter than MISUMI's.

---

## 5. Alteration / processing code map

The alteration code system is shared across all JLCMC profile series (20, 30, 40, …), and likewise the MISUMI codes are nearly identical between 5-series and 6-series; the only differences are the default tap-hole size/depth and the available counterbore Z sizes.

### End-face tapping

| Function | MISUMI 5-series | JLCMC 20-series | Notes |
|---|---|---|---|
| Tap left end | `LTP` | `LA` | **5-series default M5 × 15 deep** (MISUMI) vs **M5 × 12 deep** (JLCMC). For 2525 / 2550 sections MISUMI uses M8 × 24. |
| Tap right end | `RTP` | `RA` | |
| Tap both ends | `TPW` | `DA` | |
| Heli-coil insert tap | `LHP` / `RHP` / `HPW` (M3 × 6 reduced for 20-mm side) | — | No JLCMC equivalent. |
| Corner end tap | `LSP` / `RSP` / `SPW` | — | No JLCMC equivalent. |

**Number of taps per end** (MISUMI 5-series):
- 2020 = 1 tap, 2040 = 2, 2060 = 3, 2080 = 4, 2525 = 1 (M8), 2550 = 2 (M8), 4040 = 4, 4060 = 6, 4080 = 8, 404020 = 2.

### 45° cutting

| Cut face orientation | MISUMI L / R | JLCMC L / R |
|---|---|---|
| Face down | `LAT45` / `RAT45` | `LD` / `RD` |
| Face up | `LCT45` / `RCT45` | `LU` / `RU` |
| Face forward | `LDT45` / `RDT45` | `LF` / `RF` |
| Face back | `LBT45` / `RBT45` | `LB` / `RB` |

### Cut precision

| Function | MISUMI | JLCMC |
|---|---|---|
| Higher-precision cut | `SC` (L ± 0.2 mm, L ≤ 1500) | built-in for L ≤ 1000 |

### Wrench (through) hole at specified position

MISUMI: `AH###` / `BH###` / `CH###` / `DH###` / `EH###` (5 horizontal positions) and `AV###` / `BV###` … (5 vertical). **Positions are absolute mm from the left end.**

JLCMC: `LK` / `RK` / `LM` / `RM` followed by `A###`, `B###`, `C###`, … **Positions are incremental** — `A` is mm from the left end, `B` is mm from `A`, `C` is mm from `B`, and so on.

Wrench hole size (parameter `d`) for 20-series:
- JLCMC 20-series d = 5 mm (general) / 6.5 mm (EN/International variants).
- MISUMI 5-series wrench-hole sizes: D5 (Ø 5), D6 (Ø 6.5), D8 (Ø 8) configurable.

Converting positions: MISUMI absolute → JLCMC cumulative, and vice versa.

### Counterbores at specified position

JLCMC: `LC` / `RC` / `LE` / `RE` + size `Z#` + incremental positions `A###` / `B###` / `C###` / …
MISUMI: face letter `X` / `Y` / `Z` / `W` + position letter `A`–`E` + absolute mm, plus separate `Z#` size token.

Counterbore Z sizes that apply to 6 mm slot (5/20-series scale):

| Code | Drilled hole | Counterbore (head) |
|---|---|---|
| `Z5` | Ø 5.5 | Ø 9.5 (for M5 cap) |
| `Z6` | Ø 6.5 | Ø 11 (for M6 cap) |
| `Z4` (MISUMI) | Ø 4.5 | Ø 8 (M4 cap, 5-series-specific) |

JLCMC's full counterbore range is `Z5 / Z6 / Z8 / Z12`. For the 20-series (6 mm slot), `Z5` is the natural fit and `Z6` works for M6 in select profiles; `Z8` and `Z12` only fit larger sections like 2525 / 2550 / 4060S / 4080S.

### Joint-specific blind holes

Same as 30-series: MISUMI `LDH` / `LSH` / `LMH` / `JLP` are tied to specific joint hardware; JLCMC `LH` / `RH` / `LDH` / `RDH` / `LG` / `RG` / `LDG` / `RDG` are generic single/double horizontal/vertical blind holes. Map by intent, not letter. See the 30-series document §5 for details.

### Other

| Function | MISUMI | JLCMC |
|---|---|---|
| C-chamfer both extrusion ends | `CW` | — (specify by note) |
| Serial-number label | `ZZZ####` | — |
| Unit number | `U###` | — |

---

## 6. Hardware compatibility

Slot family identical (both 6 mm slot, 12 mm cavity depth, 2 mm throat). MISUMI `HNT5` / `HNTT5` / `HNTU5` / `HNTP5` / `HNTA5` T-nut families (M3 / M4 / M5) cross-fit JLCMC 20-series slots. JLCMC built-in connector hardware (`ELDA-S1-M4-L16` per the 20-series-equivalent specification) fits MISUMI HFS5 slots, but the wrench-hole position must be drilled to match the JLCMC `LK` / `RK` convention.

End-tap thread depths:

| Thread | MISUMI HFS5 default | JLCMC default |
|---|---|---|
| M3 | 6 mm | 8 mm (JLCMC is **deeper**) |
| M4 | 10 mm (heli-coil) | 10 mm |
| M5 | 15 mm | 12 mm (JLCMC is shallower) |
| M6 | — | 15 mm |
| M8 | 24 mm (2525 / 2550 sections only) | 20 mm |

**The M5 depth difference (15 vs 12 mm) is the one to watch** for 20-series Blind Joints. The M3 difference (6 vs 8 mm) goes the other way: JLCMC is *deeper*, which is harmless.

---

## 7. Gaps summary

### MISUMI features with no JLCMC 20-series equivalent

1. **Finishes:** `HFSY5` baked-on yellow paint; `CAF5` clear coating.
2. **Profiles:** `HFS5-4040`, `HFS5-404020` (L-shape), `HFS30A5-20`, `HFS45A5-20`, `HFS60A5-20` (angle wedges), `HFSR5-404020` (curved L).
3. **Shape variants:** `HFST5-2020`, `HFST5-2040`, `HFST5-4040` (T-shape with 2 slots + 2 flats) — JLCMC's 20-series catalog SPEC list does not include a `T` suffix.
4. **End processes:** `LHP` / `RHP` / `HPW` heli-coil tap inserts; `LSP` / `RSP` / `SPW` 4-side corner end taps; `CW` C-chamfering; `ZZZ` / `U` labeling.
5. **Joint-specific:** `JLP` parallel-joint L-hole.
6. **Stock-length variants:** `KHFS5-…-1000` and `KHFS5-…-4000` fixed stock products (JLCMC always cuts to order).

### JLCMC features with no direct MISUMI HFS5 equivalent

1. **Finishes:** `W1` white painted; `B2` wood color (painted + transfer-printed).
2. **Profiles:** `4420` and `4420R` (specialized 44-mm-wide profiles, MISUMI has no analogue); `4060S` and `4080S` cross-braced variants (MISUMI's 4060 / 4080 are simpler webs).
3. **Shape variants:** `2020B`, `2020D`, `2020E` — JLCMC-specific 20×20 variants whose geometry doesn't match any MISUMI shape suffix.
4. **Lengths:** JLCMC's 0.1 mm length increment is finer than MISUMI's 0.5 mm.
5. **Length range:** JLCMC ships configurable from 50 to 6000 mm; MISUMI's standard configurable upper limit is 4000 mm (longer is special order).

---

## 8. Translation algorithm

### MISUMI → JLCMC

1. **Parse prefix:** `HFS` → H6, `HFSB` → H7, `NFS` → H6, `NFSB` → H7, `HFSY` → no match (closest H6 + drawing note), `CAF` → no match (closest H6).
2. **Confirm series = 5.** If not, this table doesn't apply.
3. **Look up section:** `2020`, `2040`, etc. Apply the JLCMC suffix letter for shape (`F` → `A`, `T` → no equivalent, `H` → `H`, `C` → `C`, `R` → `R`).
4. **Length:** prepend `L`. JLCMC accepts 0.1 mm; MISUMI's 0.5 mm value transfers directly.
5. **Alterations:** translate each code per §5. Convert hole positions from MISUMI absolute mm to JLCMC incremental mm.
6. **Result:** `TXCJ-{H6 | H7}-{spec}-L{mm}-{alts…}`.

### JLCMC → MISUMI

1. **Parse surface:** `H6` → `HFS` (clear) or `NFS`; `H7` → `HFSB` or `NFSB`; `W1` / `B2` → no MISUMI equivalent.
2. **Section:** drop letter suffix and add MISUMI shape-letter prefix (`A` → `F`, `T` → `T` if seen, `H` → `H`, `C` → `C`, `R` → `R`).
3. **Length:** drop `L`. Round to 0.5 mm.
4. **Alterations:** translate per §5. Convert JLCMC incremental positions back to MISUMI absolute (cumulative sum).
5. **Result:** `{family}{5}-{section}-{mm}[-{alts…}]`.

### Worked examples

| MISUMI input | JLCMC output |
|---|---|
| `HFS5-2020-500` | `TXCJ-H6-2020-L500` |
| `HFSB5-2020-500-LTP-RTP` | `TXCJ-H7-2020-L500-DA` (M5 depth 15 → 12 — verify bolt engagement) |
| `HFS5-2040-800-AH100-BH200` | `TXCJ-H6-2040-L800-LK-A100-B100` (A = 100 abs; B = +100 from A → 200 abs) |
| `HFS5-2020-1000-Z5-XA100-XB200` | `TXCJ-H6-2020-L1000-RC-Z5-A100-B100` (face X → RC; positions converted to incremental) |
| `HFSY5-2020-500` | **No direct map** — JLCMC has no yellow. Specify `TXCJ-W1-2020-L500` only if white substitution is acceptable. |
| `HFST5-2020-500` | **No direct map** — JLCMC 20-series has no T-shape variant. |
| `HFS5-4040-500` | **No direct map** — JLCMC 20-series has no plain `4040`. Re-evaluate fastener family or use JLCMC's 40-series (8 mm slot). |

| JLCMC input | MISUMI output |
|---|---|
| `TXCJ-H6-2020-L500` | `HFS5-2020-500` |
| `TXCJ-H7-2040-L1000-DA` | `HFSB5-2040-1000-TPW` (M5 depth 12 → 15) |
| `TXCJ-H6-2020H-L500-LU` | `HFSH5-2020-500-LCT45` |
| `TXCJ-H6-4060S-L1000` | Closest: `HFS5-4060-1000` — **internal cross-bracing differs**, verify. |
| `TXCJ-W1-2020-L500` | **No MISUMI equivalent** — no white finish offered. |
| `TXCJ-H6-4420-L500` | **No MISUMI equivalent** — specialized JLCMC-only section. |

---

## 9. Items to verify before committing to a swap

- **JLCMC suffix shape geometry.** The 30-series mapping (`A` = 3-slot + 1-flat, `T` = 2-slot + 2-flat, etc.) is *assumed* to carry into the 20-series. The 20-series SPEC list omits the `T` suffix entirely, suggesting it may not exist — check JLCMC's actual drawing pages for `2020A`, `2020B`, `2020C`, `2020D`, `2020E`, `2020H`, `2020R` to confirm which intent matches which MISUMI shape.
- **MISUMI HFS5 vs NFS5 material.** HFS5 uses A6N01SS-T5 / 6005A-T5 (stronger); NFS5 uses 6063-T5 (matches JLCMC). If you're swapping from MISUMI HFS5 to JLCMC for cost reasons, you're going from the stronger alloy to the standard — same stiffness, lower tensile strength.
- **`4060S` / `4080S` internal cross-bracing.** Not a direct visual or load-path substitute for MISUMI's `4060` / `4080`.
- **M5 tap depth** for end-face fasteners (15 mm MISUMI vs 12 mm JLCMC) — confirm Blind Joint bolt lengths.
- **Wrench-hole / counterbore positions** must be converted between MISUMI absolute mm and JLCMC incremental mm. The translator handles this; if you're transcribing by hand, watch for it.
