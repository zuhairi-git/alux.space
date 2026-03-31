# Copilot Agent Instructions

## Encoding

Always read and write source files as **UTF-8**. Never re-interpret UTF-8 bytes through a secondary charset such as Windows-1252 (Latin-1). Doing so produces mojibake — visible as sequences like `Ã¢â‚¬â€` instead of `—` or `Ã¢â‚¬Â¦` instead of `…`.

- When generating or editing strings that contain special characters (em dash `—`, ellipsis `…`, curly quotes, etc.), embed the literal Unicode character directly rather than an escape sequence or an ASCII approximation.
- When running scripts that manipulate file content, explicitly specify UTF-8 as the encoding (e.g. `[System.IO.File]::ReadAllText(path, [Text.Encoding]::UTF8)` in PowerShell, `open(path, encoding='utf-8')` in Python).
- Never apply a charset round-trip (`encode('windows-1252').decode('utf-8')` or similar) to fix encoding — it will corrupt already-correct UTF-8 text.

## Design System & Colors

This project maintains a single source of truth for all colors and design tokens:

| File | Purpose |
|------|---------|
| `src/design-system/tokens.css` | All CSS custom properties (`--color-*`, `--primary-*`, semantic tokens) |
| `src/design-system/tokens.ts` | Raw hex palette for JS/TS contexts (Framer Motion, canvas) |
| `tailwind.config.js` | Tailwind extension — maps CSS vars to `ds-*` utility classes |
| `src/app/design/page.tsx` | Visual documentation of all tokens |

### Rules

- **Always use design tokens.** Reference `var(--token-name)` in CSS/styles, `ds-*` Tailwind utilities in JSX, or `palette.*` from `tokens.ts` in JS — never hardcode hex/rgb values.
- **Adding a new color** requires updating all four files above in the same change: `tokens.css` (CSS vars), `tokens.ts` (hex palette), `tailwind.config.js` (`ds-*` entry), and `design/page.tsx` (palette display group).
- **Semantic tokens first.** Prefer `--primary`, `--background`, `--card-border`, etc. over raw `--color-violet-600`. Only reach for raw palette tokens when a specific shade is genuinely required and no semantic token covers it.
- **Theme consistency.** The three themes (`.theme-light`, `.theme-dark`, `.theme-colorful`) all resolve through the same semantic token names. Never add a hardcoded color that only works in one theme.
- **Violet is the primary family.** All primary-role colors derive from the `--color-violet-*` scale. Do not introduce a new blue/indigo/purple split for primary roles.
