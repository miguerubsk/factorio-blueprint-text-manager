# Factorio Blueprint Text Manager

Web tool to manage and translate texts within Factorio blueprint strings.

[![Deploy to GitHub Pages](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/ghpages.yml/badge.svg?branch=master)](https://github.com/miguerubsk/factorio-blueprint-text-manager/actions/workflows/ghpages.yml)

## Features

- **Decompress & Compress**: Support standard Factorio blueprint strings (starting with `0`).
- **Tree View**: Edit labels, descriptions, and entity names in a structured layout.
- **Batch Editing**: Extract all translatable text into `Key = Value` format for easy mass translation.
- **JSON Export**: Download clean blueprint JSON for debugging or external tools.
- **Multi-language Support**: Interface available in English and Spanish (more to be added, contributions welcome).
- **Factorio Aesthetic**: Styled to match the game's UI.

## How to Use

1. **Paste**: Input your blueprint string into the first text area.
2. **Scan**: Click **Scan Full Book** to parse.
3. **Edit**:
   - **Option A**: Copy extracted text from the Batch section, translate, and paste back. Click **Apply Batch Changes**.
   - **Option B**: Edit fields directly in the structured tree.
4. **Generate**: Click **Generate & Copy** to get your new modified blueprint string.

## Technical Details

- Pure Vanilla JS, HTML, CSS.
- Uses `DecompressionStream` and `CompressionStream` (native browser APIs) for `deflate` operations.
- No backend required (Client-side only).

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
