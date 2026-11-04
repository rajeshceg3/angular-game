# angular-game

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-yj3ege)
## Run and verify

Use Node22.12+ and npm. `npm ci --ignore-scripts` installs the locked dependencies; `npm start` runs the local two-player game. `npm run build -- --configuration production` builds it. Reload resets the board. No online multiplayer or persistence is provided.

For the actual production-browser proof, follow [.cursor/skills/verify-tic-tac-toe/SKILL.md](.cursor/skills/verify-tic-tac-toe/SKILL.md). It covers every winning line for each player, draw, restart and keyboard input on mobile/desktop widths. The old Karma/lint/e2e scripts lack their configuration files and are not verified commands. Dependency audit findings remain open.
