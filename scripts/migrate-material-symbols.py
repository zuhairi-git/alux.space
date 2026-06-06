import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src"

# Matches <span ...className=...material-symbols......> ... </span>
# Captures: (1) attrs before className, (2) className quote style + value, (3) attrs after className, (4) children
SPAN_RE = re.compile(
    r'<span((?:\s+[a-zA-Z-]+(?:=(?:"[^"]*"|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}))?)*?)'
    r'\s+className=(?:"(?P<dq>[^"]*material-symbols[^"]*)"|\{`(?P<tpl>[^`]*material-symbols[^`]*)`\})'
    r'((?:\s+[a-zA-Z-]+(?:=(?:"[^"]*"|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}))?)*?)'
    r'\s*>(?P<children>(?:[^<]|<(?!/?span\b))*?)</span>',
    re.DOTALL,
)

ARIA_HIDDEN_RE = re.compile(r'\s+aria-hidden=(?:"[^"]*"|\{[^}]*\})')


def strip_material_symbols_token(class_value: str) -> str:
    tokens = class_value.split()
    tokens = [t for t in tokens if t != 'material-symbols']
    return ' '.join(tokens)


def build_classname_attr(dq, tpl):
    if dq is not None:
        cleaned = strip_material_symbols_token(dq)
        if not cleaned:
            return ''
        return f' className="{cleaned}"'
    else:
        cleaned = re.sub(r'(?<![\w-])material-symbols\s*', '', tpl)
        cleaned = cleaned.strip()
        if not cleaned:
            return ''
        return f' className={{`{cleaned}`}}'


def replace_match(m: re.Match) -> str:
    pre_attrs = m.group(1) or ''
    post_attrs = m.group(3) or ''
    children = m.group('children')
    classname_attr = build_classname_attr(m.group('dq'), m.group('tpl'))

    attrs = pre_attrs + post_attrs
    attrs = ARIA_HIDDEN_RE.sub('', attrs)

    return f'<MaterialSymbol{classname_attr}{attrs}>{children}</MaterialSymbol>'


def ensure_import(src: str) -> str:
    if re.search(r"from ['\"]@/components/ui/MaterialSymbol['\"]", src):
        return src
    # Insert after the last import line
    import_lines = list(re.finditer(r'^import .*$', src, re.MULTILINE))
    if not import_lines:
        return src
    last = import_lines[-1]
    insert_at = last.end()
    return (
        src[:insert_at]
        + "\nimport MaterialSymbol from '@/components/ui/MaterialSymbol';"
        + src[insert_at:]
    )


def process_file(path: Path) -> int:
    src = path.read_text(encoding='utf-8')
    new_src, n = SPAN_RE.subn(replace_match, src)
    if n == 0:
        return 0
    new_src = ensure_import(new_src)
    path.write_text(new_src, encoding='utf-8')
    return n


def main():
    total = 0
    files_changed = 0
    for path in ROOT.rglob('*.tsx'):
        if path.name == 'MaterialSymbol.tsx':
            continue
        n = process_file(path)
        if n:
            total += n
            files_changed += 1
            print(f'{n:3d}  {path.relative_to(ROOT.parent)}')
    print(f'\nTotal replacements: {total} across {files_changed} files')


if __name__ == '__main__':
    main()
