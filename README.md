# Factorio Blueprint Text Manager

A web tool to find, edit, and translate every piece of human-readable text hidden inside a Factorio blueprint string — labels, descriptions, parameters, alert messages, logistic group names, train stop names — without touching the rest of the blueprint data.

[![Deploy to GitHub Pages](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/ghpages.yml/badge.svg?branch=master)](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/ghpages.yml) [![CodeQL](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/github-code-scanning/codeql)

## Features

- **Decompress & compress** standard Factorio blueprint strings (and blueprint books, including books nested inside books).
- **Structured tree view**: edit every blueprint/book label, description, parameter name, speaker alert message, logistic group name, and train stop name directly, with changes synced live.
- **Batch editing**: extract all translatable text into `Key = Value` lines for quick mass translation in an external tool, then paste the result back in one click.
- **Find & replace**: a floating panel with literal or regex search/replace, a live match-count preview, and reusable saved replacements (kept in your browser, no account needed) — built for both quick literal fixes and power-user patterns.
- **Icon catalog**: click any of 600+ game icons (items, fluids, virtual signals, entities, recipes) to insert its rich-text tag (e.g. `[item=iron-plate]`) at the cursor. Icons are rendered from a local sprite sheet shipped with the app — nothing is fetched from the wiki or any external source.
- **Built-in help panel** and a first-visit hint pointing at the icon button, so the insert-a-tag workflow doesn't need external docs to discover.
- **JSON export**: download the fully parsed blueprint as clean JSON for debugging or external tooling.
- **Multi-language interface**: English and Spanish included (contributions for more languages welcome).
- **Accessible by default**: keyboard-operable dialogs (`Escape` to close, focus returned to the triggering button), `aria-label`s on icon-only buttons, visible focus outlines.
- **Factorio-styled UI**, client-side only — no backend, no build step, no tracking beyond an optional visit counter badge.

## How to use

1. **Paste** your blueprint string (starts with `0`) into the first box and click **Scan Full Book**.
2. **Edit** the texts either way:
   - **Batch mode**: copy the `Key = Value` list, translate/edit it (even in an external tool), paste it back, and click **Apply Batch Changes**.
   - **Structured tree**: edit any field inline; it stays in sync with the batch box automatically.
   - **Find & replace**: open the 🔍 panel to search across every text field at once, optionally with regex.
3. **Insert icons**: place your cursor in any text field, open the ⚙️ icon catalog, and click an icon to insert its tag at the cursor.
4. **Generate**: click **Generate & Copy** to get your new blueprint string, ready to paste back into Factorio.

Click the **?** button in the top bar at any time for an in-app walkthrough of this flow.

## Technical details

- Pure vanilla JS (ES modules), HTML, and CSS — no framework, no `package.json`, no build step.
- Uses the native `DecompressionStream`/`CompressionStream` browser APIs for the blueprint string's `deflate` payload.
- Detects text fields that don't always use the property names you'd expect from Factorio's documentation (e.g. a train stop's name is `entity.station`, not `station_name`; a logistic group's name is `section.group` under `entity.request_filters`, not `entity.logistic_sections.sections[].name`) — found and fixed by decoding real-world blueprints rather than guessing from the wiki.
- All icons are served from two local sprite sheets (`assets/sprites/`) addressed via `data/icon-map.json`; no per-icon HTTP request and no dependency on any external image host at runtime.

### Regenerating the icon catalog

The icon catalog (`data/*.json`, `data/icon-map.json`, `assets/sprites/`, `assets/groups/`) is generated, not hand-written. The generator scripts live in `tools/` (Python + Pillow, no Node involved) and are documented by their own docstrings:

1. `tools/extract_game_catalog.py` — parses Factorio's own `.lua` prototype files for every item, fluid, virtual signal, entity, and recipe that has an insertable rich-text tag, and crops each icon's base sprite from the game's graphics.
2. `tools/generate_sprite_sheet.py` — packs those icons into sprite sheets (reusing a pre-built sheet where possible).
3. `tools/build_categories.py` — groups everything into the game's own categories (logistics, production, combat, fluids, signals, enemies, environment, space, etc.), using Factorio's official locale files for the English/Spanish display names.
4. `tools/validate_catalog.py` — sanity-checks the generated `data/*.json` against `data/icon-map.json` before you ship it.

Running this pipeline requires a local copy of the Factorio game files (not included in this repo); it only needs to be re-run when targeting a new Factorio version.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
