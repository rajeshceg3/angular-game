# Play and ignore occupied cells

## Sub-features
Click a numbered square or focus its native button and press Space. X starts, then O. Re-activate an occupied square: its mark and the current player must stay unchanged. Cell identity stays tied to its board index so keyboard focus cannot jump to a different blank cell.

## How to get to it (user POV)
Open the root page. The board is visible immediately.

## Driving it with Puppeteer
Run the helper drive command in SKILL.md. It exercises this feature at390/1365 using real visible buttons and fresh games.

## Gotchas
Same-browser local game only. Zero-based indices above map to accessible Square1 through Square9. No persistence or external player is implied.
