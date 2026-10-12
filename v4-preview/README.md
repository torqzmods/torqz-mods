# Torqz Mods V4 — Night Circuit prototype

**Staging only. Not deployed to the public GitHub Pages site.**

## Purpose
A clickable, responsive concept implementation of the approved Night Circuit
creative direction. It is intentionally isolated at `v4-preview/` on the
`v4-night-circuit` branch and does not modify the existing V3 pages.

## Open locally
From the repository root:
```
python -m http.server 8765
```
Visit `http://127.0.0.1:8765/v4-preview/`.

## Included
- Cinematic, asymmetrical six-chapter homepage.
- Chapter rail, regular navigation and mobile menu.
- Decorative original car SVG explicitly labeled **concept art, not gameplay**.
- Keyboard-accessible real feature selector sourced from `js/mods.js`.
- Genuine milestones and updates sourced from existing modules.
- Existing V3 theme-selection key `torqz-theme-v3` preserved.
- Reduced-motion support, focus styles, semantic links and accessible descriptions.
- Real routes link to working V3 pages until the coordinated redesign is complete.

## What is not claimed
This is a first-gate visual prototype, not a finished site or a published mod.
Authentic Torqz Garage gameplay imagery and completed mod UI do not yet exist
in the project data. No fabricated screenshots or fake features are included.

## Next gates
1. Rendered desktop/mobile review and visual corrections (360, 390, 768, 1024, 1440, 1920).
2. Approval of homepage atmosphere, car crop, typography, rail and interactions.
3. Build all V4 routes on the branch using the shared design system.
4. Port and exercise global search, FAQ, reporting, installation and project status.
5. Full Playwright and accessibility/regression checks on every page.
6. Explicit authorization before merging into main or deploying.

**Production logo safety:** do not change the V3 `.header-logo-mark` behavior.
The staging prototype renders the same logo file as a CSS background without
reveal, filter, opacity transition or scroll/hover requirements.
