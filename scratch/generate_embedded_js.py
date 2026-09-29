import json

with open("web/data/sensors.json", "r", encoding="utf-8") as f:
    data = json.load(f)

js_content = f"// Pre-bundled static dataset fallback for offline / file:// protocol access\nwindow.METEOGUARD_DEFAULT_DATASET = {json.dumps(data, indent=2)};\n"

with open("web/js/embedded_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated web/js/embedded_data.js with {len(data['stations'])} stations.")
