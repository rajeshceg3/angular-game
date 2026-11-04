# Win and draw

## Sub-features
For X top-row win click0,3,1,4,2. For a draw click0,1,2,3,5,4,6,8,7. The helper checks all8lines for both players via real alternating clicks, then verifies further moves cannot change a won board.

## How to get to it (user POV)
Open the root page. The board is visible immediately.

## Driving it with Puppeteer
Run the helper drive command in SKILL.md. It exercises this feature at390/1365 using real visible buttons and fresh games.

## Gotchas
Same-browser local game only. Zero-based indices above map to accessible Square1 through Square9. No persistence or external player is implied.
