# Restart and reload

## Sub-features
Click Start the Game after win/draw or reload the page. All nine cells must be empty and current player X. No saved or network state exists.

## How to get to it (user POV)
Open the root page. The board is visible immediately.

## Driving it with Puppeteer
Run the helper drive command in SKILL.md. It exercises this feature at390/1365 using real visible buttons and fresh games.

## Gotchas
Same-browser local game only. Zero-based indices above map to accessible Square1 through Square9. No persistence or external player is implied.
