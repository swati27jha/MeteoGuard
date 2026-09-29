import re

with open("web/index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for i, line in enumerate(lines, 1):
    # Check for empty spans, divs, or dashes / question marks / zeros
    if re.search(r'>\s*(--|—|\?|--:--:--)\s*<', line):
        clean = line.strip().encode("ascii", "replace").decode("ascii")
        if not any(skip in clean for skip in ['<!--', '<path', '<polyline', '<polygon', '<line', '<rect', '<circle', 'script']):
            print(f"L{i:4d}: {clean}")
