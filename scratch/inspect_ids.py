import re

with open("web/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all id="..." elements
id_elements = re.findall(r'<([a-zA-Z0-9]+)\s+[^>]*id=["\']([^"\']+)["\'][^>]*>(.*?)</\1>', html, re.DOTALL)
print(f"Total elements with id: {len(id_elements)}")
for tag, id_name, content in id_elements:
    c = content.strip().encode("ascii", "replace").decode("ascii")
    if len(c) < 50:
        print(f"#{id_name} ({tag}): '{c}'")
