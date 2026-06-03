# MISUMI 6-Series ↔ JLCMC 30-Series Cross-Reference

30 mm base aluminum extrusion. MISUMI **HFS6** family ↔ JLCMC **TXCK** Euro Standard 30 Series.

Both systems share the same nominal geometry (30 mm base, 8 mm slot family, 16.5 mm top slot opening, A6063-T5 alloy) and the same L/R + H/V orientation convention, so most translations are mechanical. The gaps are concentrated in specialty variants (milled, bent, heli-coil, finishes other than clear/black) and a handful of joint-specific hole alterations.

---

## 1. Part-number anatomy

### MISUMI

```
HFS  B   6   - 3030 - 500 - LTP - RTP - SC
 │   │   │     │      │     │     │     │
 │   │   │     │      │     │     │     └─ cutting / extra alts
 │   │   │     │      │     └─────┴─────── end-face & hole alts
 │   │   │     │      └─ length in mm (1 mm inc, ±0.5)
 │   │   │     └─ section (W × H, mm)
 │   │   └─ series (6 = 30 base, 8 mm slot)
 │   └─ surface / variant letter (blank=clear, B=black, Y=yellow, L=light…)
 └─ family prefix (HFS / GFS / EFS / NFS / CAF…)
```

Prefix **K** (`KHFS6-…`) = fixed stock-cut length.

### JLCMC

```
TXCK - H6 - J3030 - L500 - LA - RU
  │     │     │       │     │    │
  │     │     │       │     │    └─ extra alterations
  │     │     │       │     └─ first alteration
  │     │     │       └─ length, mm with "L" prefix (0.5 mm inc, ±0.3 ≤1000 / ±0.5 >1000)
  │     │     └─ spec code (J prefix = Lightweight tier; bare # = Standard; Heavy Duty separate)
  │     └─ surface (H6 = natural sandblast, H7 = black sandblast)
  └─ fixed category code (T=major, XC=category, K=series)
```

---

## 2. Tier / finish mapping

| MISUMI prefix | JLCMC equivalent | Notes |
|---|---|---|
| `HFS6` (standard, clear anodize) | `TXCK-H6-####` (Standard tier) | Direct match. |
| `HFSB6` (black anodize) | `TXCK-H7-####` | Direct match. |
| `HFSL6` / `NFSL6` (lightweight) | `TXCK-H6-J####` (Lightweight tier) | Thinner web; very close geometry. |
| `HFSLB6` (lightweight, black) | `TXCK-H7-J####` | Not shown in extracted JLCMC pages but follows the H6/H7 convention. |
| `GFS6` (high-rigidity, **6061-T6**) | — | No JLCMC equivalent. JLCMC is 6063-T5 throughout. |
| `HFSG6` (heavy, 6060 only) | `TXCK-H6-####` Heavy Duty tier | JLCMC uses a separate Heavy Duty tier (not listed in detail on extracted pages). |
| `CAF6` (clear coat), `EFS6`, `NEFS6`, `NFS6` (economy/no-finish variants) | — | No JLCMC equivalent. Use H6 as the closest finish. |
| `HFSY6` (baked-on yellow) | — | JLCMC offers only natural (H6) and black (H7). |
| `HFSP6` / `GFSP6` (parallel-milled, linear-guide ready) | — | No JLCMC equivalent — no milled-flat profile in the 30-series catalog. |
| `HFSMG6` (formed/bent) | — | JLCMC has no bending service. |
| `HFSR6-####` (curved corner) | `TXCK-H6-####R` / `RS` / `J####R` / `J####RS` | JLCMC R = R25, RS = R30. Check radius. |

---

## 3. Cross-section / shape mapping (30 base)

| MISUMI section | JLCMC spec | Match quality | Notes |
|---|---|---|---|
| `HFS6-3030` | `TXCK-H6-3030` / `J3030` | Exact | Basic 30×30. |
| `HFSB6-3030` | `TXCK-H7-3030` | Exact | |
| `HFSL6-3030` | `TXCK-H6-J3030` | Exact | Lightweight tier. |
| `HFSF6-3030` (3-slot, 1-flat) | `TXCK-H6-3030A` / `J3030A` | Exact | A-suffix = one flat side. |
| `HFST6-3030` (2-slot opposite-corner, 2 flats) | `TXCK-H6-3030T` / `J3030T` | Exact | T-suffix. |
| `HFSH6-3030` (2 slots on opposite sides) | `TXCK-H6-3030H` / `J3030H` | Exact | H-suffix. |
| `HFSC6-3030` (1-slot, 3-flat) | `TXCK-H6-3030C` / `J3030C` | Exact | C-suffix. |
| `HFSR6-3030` (R25 quarter-round corner) | `TXCK-H6-3030R` / `J3030R` (R25) | Exact | JLCMC `RS` = R30 has no MISUMI equivalent. |
| (no MISUMI direct) | `TXCK-H6-3030B` / `J3030B` | — | "B"-suffix shows Ø6.8 large hole on one face — JLCMC-specific. |
| (no MISUMI direct) | `TXCK-H6-J3030G` | — | Lightweight with reinforced internal ribs — JLCMC-specific. |
| `HFS30A6-30` (30° angle) | — | None | JLCMC catalog has no 30°. |
| `HFS45A6-30` (45° angle) | `TXCK-H6-3045M` | Partial | Profile shape differs — JLCMC is a 30×45 trapezoid with 1 slot; MISUMI is a 30° triangle wedge. Functionally similar for chamfered corners but not interchangeable. |
| `HFS60A6-30` (60° angle) | — | None | |
| `HFS6-3060` | `TXCK-H6-3060` / `J3060` | Exact | 30×60 with 2 slots per long face. |
| `HFSF6-3060`, `HFST6-3060`, `HFSH6-3060` | `TXCK-H6-3060A` / `3060B` / `J3060A` / `J3060B` | Close | JLCMC `A`/`B` suffixes indicate alternate flat-side / hole configurations — verify in drawing. |
| `HFS6-3090` | `TXCK-H6-3090` / `J3090` | Exact | |
| `HFS6-30120` | `TXCK-H6-30120` | Exact | |
| `HFS6-30300` | — | None | JLCMC tops out at 30150 for the wide-flat series. |
| (no MISUMI direct) | `TXCK-H6-30150` | — | JLCMC-specific. |
| `HFS6-5050` | `TXCK-H6-5050S` | Approximate | JLCMC "S" appears to have a center cross-rib — verify drawing. |
| `HFS6-6060` | `TXCK-H6-6060` / `J6060` | Exact | |
| `HFSG6-6060` (heavy) | `TXCK-H6-6060` Heavy Duty | Approximate | |
| `HFS6-6090` | — | None | Not in extracted JLCMC pages. |
| `HFS6-60120` | — | None | |
| `HFS6-100100` | — | None | |
| `HFS6-606030` (L-shape) | — | None | |
| (no MISUMI direct) | `TXCK-H6-J6060S` | — | JLCMC structured 6060. |
| (no MISUMI direct) | `TXCK-H6-6630` / `6630R` / `J6630R` / `J6630RA` | — | 60×60 with one (R) or two (RA) rounded quarters. Closest MISUMI is to build with `HFSR6-3030` plus a `HFS6-3030`. |

---

## 4. Length

| Item | MISUMI | JLCMC |
|---|---|---|
| Notation | bare number (`-500`) | `L`-prefixed (`-L500`) |
| Increment | 1 mm | 0.5 mm |
| Standard tolerance | L ± 0.5 mm | L ± 0.3 mm (L ≤ 1000), L ± 0.5 mm (L > 1000) |
| Tighter cut | add `SC` (L ± 0.2, L ≤ 1500 only) | already standard up to 1000 |
| Stock length | 6000–6020 mm (full bar) | 6000–6020 mm (full bar); 5800–5850 mm usable |

**Translation:** strip/add the `L` prefix and round to 0.5 mm increments. JLCMC's standard tolerance already beats MISUMI's; if the MISUMI part had `SC` and L > 1500, that's not directly orderable on either side without quoting.

---

## 5. Alteration / processing code map

### End-face tapping

| Function | MISUMI | JLCMC | Notes |
|---|---|---|---|
| Tap left end | `LTP` | `LA` | MISUMI default = **M8 × 24 deep**, JLCMC default = **M8 × 20 deep** — depths differ by 4 mm. |
| Tap right end | `RTP` | `RA` | |
| Tap both ends | `TPW` | `DA` | |
| Heli-coil insert (reduces to M5) | `LHP` / `RHP` / `HPW` | — | No JLCMC equivalent — specify by drawing note. |
| 4-side corner end tapping | `LSP` / `RSP` / `SPW` | — | No JLCMC equivalent. |

### 45° cutting

MISUMI uses face-orientation suffix; JLCMC uses compass-direction letters. Same outcome.

| Orientation of cut face | MISUMI (left/right) | JLCMC (left/right) |
|---|---|---|
| Face down | `LAT45` / `RAT45` | `LD` / `RD` |
| Face up | `LCT45` / `RCT45` | `LU` / `RU` |
| Face forward (toward viewer) | `LDT45` / `RDT45` | `LF` / `RF` |
| Face back | `LBT45` / `RBT45` | `LB` / `RB` |

### Cut precision

| Function | MISUMI | JLCMC |
|---|---|---|
| Higher-precision cut | `SC` (L ± 0.2, L ≤ 1500) | (built-in for L ≤ 1000) |

### Wrench (through) hole at specified position

MISUMI: `AH###` / `BH###` / `AV###` / `BV###` — "A/B" = first/second row (horizontal/vertical letter), number = mm from left end.
JLCMC: `LK` / `RK` / `LM` / `RM` followed by **`A###`** (`B###`, `C###`…) to give position from left end. Default first-hole offset 30 mm; subsequent positions in alphabetical order, max 5 in one direction.

| Direction | MISUMI | JLCMC |
|---|---|---|
| Horizontal, left side | `AH###` | `LK-A###` |
| Horizontal, right side | `BH###` | `RK-A###` |
| Vertical, left side | `AV###` | `LM-A###` |
| Vertical, right side | `BV###` | `RM-A###` |
| Aligned with mating tap (fixed) | `LWP` / `RWP` | Use `LK` / `RK` with explicit `A###`. |
| End-cap clearance shift | `FL` / `FR` | — (specify by note) |

### Counterbores at specified position

| Direction | MISUMI | JLCMC |
|---|---|---|
| Horizontal, left | `XA### Z#` | `LC-Z#-A###` |
| Horizontal, right | `XB### Z#` | `RC-Z#-A###` |
| Vertical, left | `XC### Z#` | `LE-Z#-A###` |
| Vertical, right | `XD### Z#` | `RE-Z#-A###` |
| Bore size codes | `Z6` (Ø6.5/Ø11), `Z8` (Ø9/Ø14) | `Z5` (Ø5.5/Ø9.5), `Z6` (Ø6.5/Ø11), `Z8` (Ø9/Ø14), `Z12` (Ø13/Ø20 for 10.2 slot) |

JLCMC's `Z5` (M5 cap) is **finer than MISUMI's smallest 6-series counterbore**. MISUMI's two sizes are a subset of JLCMC's four.

### Connector blind holes vs. joint-specific holes

The two catalogs treat blind-hole alterations differently:

- **MISUMI** defines holes that pair with specific joint hardware: `LDH/RDH` for a Single Joint D-hole, `LSH/RSH` for a Pre-Assy-Insertion Double Joint, `LMH/RMH` for a Post-Assy Center Joint, and `JLP` for the Parallel Joint L-hole. Each code implies a specific diameter/depth and position.
- **JLCMC** defines holes as generic blind holes for connector mounting, labeled by side and orientation: `LH`/`RH` (single horizontal), `LDH`/`RDH` (double horizontal), `LG`/`RG` (single vertical), `LDG`/`RDG` (double vertical). Position is left to the default; quantity is single or double.

Map by **intent**, not by letter:

| MISUMI intent | JLCMC closest | Action |
|---|---|---|
| `LDH` Single-Joint D-hole, left horizontal | `LH` | Verify hole Ø and depth against the joint hardware you'll use. |
| `LSH` Pre-Assy Double-Joint S-hole, left horizontal | `LDH` | Double horizontal blind. |
| `LMH` Post-Assy/Center-Joint M-hole, left horizontal | `LH` or `LDH` | Depends on joint count. |
| `JLP` Parallel-Joint L-hole | — | No equivalent — must drill separately or quote. |
| Vertical equivalents (`LDV`, `LSV`, `LMV` …) | `LG` / `LDG` (vertical blind) | Same mapping by intent. |

### Chamfer / labeling

| Function | MISUMI | JLCMC |
|---|---|---|
| C-chamfer both extrusion ends | `CW` | — (default thread chamfer only; specify by note) |
| Serial-number label | `ZZZ####` | — |
| Unit number | `U###` | — |

---

## 6. Hardware compatibility

Slot family is the same (MISUMI nominal 8 mm, JLCMC 8.2/8.3 mm; top opening 16.5 mm on both). M6-class T-nuts cross-fit:

- MISUMI `HNTP6` / `HNTT6` / `HNTA6` / `HNTU6` → fit JLCMC 30-series slots.
- JLCMC built-in connector hardware (`ELDA-S1-M6-L20` for the 30-series wrench-hole + locking-bolt block) → fits MISUMI HFS6 slots, but the wrench-hole position must be drilled to match (`LK`/`RK` on JLCMC, `AH`/`BH` on MISUMI).

Standard end-tap thread depths:

| Thread | MISUMI HFS6 default | JLCMC default |
|---|---|---|
| M6 | 9 mm (when paired with D/S/M-hole) | 15 mm |
| M8 | 24 mm | 20 mm |
| M10 | — | 24 mm |
| M12 | — | 28 mm |
| M14 | — | 36 mm |

**The 4 mm M8 depth difference matters** when a Blind Joint's bolt length was sized to MISUMI's 24 mm thread engagement — JLCMC's stock 20 mm may be too shallow. Either request the deeper tap as a custom note on the JLCMC order or shorten the bolt.

---

## 7. Gaps summary

### MISUMI features with no JLCMC equivalent (lost when translating MISUMI → JLCMC)

1. **Materials:** `GFS6` 6061-T6 high-rigidity alloy.
2. **Finishes:** `HFSY6` yellow baked-on, `CAF6` clear coating, `EFS6`/`NEFS6`/`NFS6` economy variants.
3. **Profiles:** `HFSP6`/`GFSP6` parallel-milled (linear-guide ready); `HFS30A6`/`HFS60A6` angled wedges; `HFSMG6` factory-bent curved frames; `HFS6-30300`, `HFS6-6090`, `HFS6-60120`, `HFS6-100100`, `HFS6-606030` L-shape.
4. **End processes:** `LHP`/`RHP`/`HPW` heli-coil tap inserts; `LSP`/`RSP`/`SPW` 4-side corner end tapping; `CW` C-chamfering; `ZZZ`/`U` labeling.
5. **Joints:** `JLP` parallel-joint L-hole.

### JLCMC features with no direct MISUMI equivalent (lost when translating JLCMC → MISUMI)

1. **Profiles:** `3030B` (face-bore variant), `J3030G` lightweight + ribs, `3045M` 30×45 trapezoid (MISUMI's `HFS45A6-30` is a different shape), `5050S` cross-ribbed 50×50, `J6060S` structured 60×60, `6630` / `6630R` / `J6630R` / `J6630RA` (60×60 with rounded quarter[s]), `J3030RS` (R30 vs. MISUMI's R25), `30150`.
2. **Counterbore sizes:** `Z5` (M5 cap) and `Z12` (10.2 slot heavy) are not in MISUMI's 6-series counterbore options.
3. **Cut tolerance:** JLCMC's default L ± 0.3 (≤ 1000 mm) is tighter than MISUMI's L ± 0.5 standard, without an alteration code.

---

## 8. Translation algorithm

### MISUMI → JLCMC

1. **Parse prefix:** `HFS` → H6, `HFSB` → H7, `HFSL` → H6 + J-tier, `HFSLB` → H7 + J-tier. Anything else → flag (no direct map).
2. **Confirm series = 6.** If not, this table doesn't apply.
3. **Look up section:** `3030`, `3060`, etc.; apply shape-letter suffix (`F`→A, `T`→T, `H`→H, `C`→C, `R`→R).
4. **Length:** prepend `L`. Round to 0.5 mm.
5. **Alterations:** translate each code per §5. Unmappable codes → flag for manual handling.
6. **Result:** `TXCK-{H6|H7}-{spec}-L{mm}-{alts…}`.

### JLCMC → MISUMI

1. **Parse surface:** `H6` → standard or `L`-light variant; `H7` → add `B`.
2. **Strip `J` prefix in spec** → use `HFSL` / `HFSLB`; bare spec → `HFS` / `HFSB`.
3. **Section number:** drop letter suffix and add MISUMI shape-letter prefix (`A`→`F`, `T`→`T`, `H`→`H`, `C`→`C`, `R`→`R`).
4. **Length:** drop `L`.
5. **Alterations:** translate per §5. Unmappable codes → quote.
6. **Result:** `{family}{6}-{section}-{mm}[-{alts…}]`.

### Worked examples

| MISUMI input | JLCMC output |
|---|---|
| `HFS6-3030-1000` | `TXCK-H6-3030-L1000` |
| `HFSB6-3030-1000-LTP-RTP` | `TXCK-H7-3030-L1000-DA` (depth 20 vs MISUMI's 24 — see §6) |
| `HFSL6-3060-500-LTP` | `TXCK-H6-J3060-L500-LA` |
| `HFSF6-3030-800-RAT45` | `TXCK-H6-3030A-L800-RD` |
| `HFS6-3030-1200-AH100-XA100-Z6` | `TXCK-H6-3030-L1200-LK-A100-LC-Z6-A100` |
| `GFS6-3030-500` | **No direct map** — JLCMC has no 6061-T6 equivalent. Closest: `TXCK-H6-3030-L500`, but material differs. |
| `HFSP6-3030-600` | **No direct map** — no milled profile in JLCMC 30. |

| JLCMC input | MISUMI output |
|---|---|
| `TXCK-H6-3030-L1000` | `HFS6-3030-1000` |
| `TXCK-H7-J3030-L1000-DA` | `HFSLB6-3030-1000-TPW` (tap depth 24 vs JLCMC 20 — see §6) |
| `TXCK-H6-3030T-L800-LU` | `HFST6-3030-800-LCT45` |
| `TXCK-H6-3045M-L500` | Closest: `HFS45A6-30-500` — **different profile shape**, verify. |
| `TXCK-H6-6630R-L500` | **No direct map** — build from `HFSR6-3030` + `HFS6-3030`, or quote. |
| `TXCK-H6-J3030G-L1000` | **No direct map** — JLCMC-specific lightweight + rib geometry. |

---

## 9. Items to verify before committing to a swap

- **JLCMC slot width** is stated as 8.2/8.3 mm vs MISUMI 8 mm nominal. M6 T-nuts work in both, but a tight-fit hammer nut from one brand may rattle slightly in the other.
- **JLCMC end-tap depth (20 mm) vs MISUMI (24 mm)** for M8 — confirm Blind Joint bolt lengths.
- **JLCMC `J####RS` radius** is R30 vs MISUMI `HFSR6-3030` R25 — visual + clearance difference.
- **Anodize color/finish** uniformity between H6 and MISUMI clear is visually close but not identical batch-to-batch.
- **`J3030G`, `3030B`, `5050S`, `J6060S`, `6630`/`R`/`RA`** — JLCMC-only profiles; if a design uses one, a swap to MISUMI requires a structural review.
