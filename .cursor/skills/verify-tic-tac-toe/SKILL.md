---
name: verify-tic-tac-toe
description: Drive this Angular local two-player Tic-Tac-Toe through real browser moves, wins, draw and restart after game or build changes.
---
# Angular Tic-Tac-Toe verification

## Launch
From the repo root use Node 22.12+ and npm: `npm ci --ignore-scripts`, then `npm ci --ignore-scripts --prefix .cursor/skills/verify-tic-tac-toe`. Chrome must be installed; set CHROME_PATH if not /usr/bin/google-chrome. The helper builds the real production application into its own temporary directory and serves that output on a private ephemeral loopback port. No account, database, API key or external game service exists. Normal development uses `npm start`; verification never attaches to that shared server.

## Doctor
`node .cursor/skills/verify-tic-tac-toe/helpers/verify.mjs doctor /tmp/tic-tac-toe-proof` checks the expected app source and installed Angular version. This is a source/dependency check, not a successful build or browser claim. Drive requires a fresh production build and nine real rendered square buttons before any move. After a failed drive, run doctor and start a new drive; do not reuse a surprising browser state.

## Drive
`node .cursor/skills/verify-tic-tac-toe/helpers/verify.mjs drive /tmp/tic-tac-toe-proof` runs 390 and 1365 viewport widths. Real button clicks play all eight winning lines for X and O, the nine-move draw, occupied-square and post-win no-ops, and restart. Native keyboard Space/Enter checks preserve the focused occupied cell. It also checks labels, minimum cell size, overflow, reload reset, browser errors and unexpected external requests. There are no internal setters, synthetic game state injection or mock game rules.

## Evidence
The named output directory holds doctor.json, drive.json, build.log, and mobile/desktop win/draw PNGs. Inspect actual screenshots before calling the visual result ready. JSON captures all moves' expected outcome groups and layout checks. Baseline failure: Angular15 runtime with14 compiler was uninstallable; once aligned, fixed600px grid overflowed390 and blank buttons measured16x6. Stable index tracking fixes Angular's identity-based cell recycling, which moved keyboard focus to a different blank square after a move. Existing winner/draw rules remain intact.

## Cleanup
The helper closes only its own browser/server and removes only its own temporary build, including after failure. Evidence is outside that temporary tree and survives cleanup. Do not kill shared processes by name. Each drive owns an isolated instance and reset state.

## Limits and maintenance
This is a local two-person, same-browser game. Reload forgets the game. No multiplayer, persistence, hosting or device/screen-reader certification is claimed. Legacy Karma/lint/e2e scripts have missing configuration and are not this proof. Dependency audit findings remain unresolved, not a clean security gate. Use /maintain-verification-skill after feature changes; product regressions belong in separate product work, never hidden by weaker assertions.
