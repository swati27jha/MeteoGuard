import json

with open('web/data/sensors.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Print neighbor_check for MG-006
s = next(x for x in d['stations'] if x['station_id'] == 'MG-006')
print('MG-006 neighbor_check:')
for nc in s['neighbor_check']:
    print(' ', nc)
print()

# Check all neighbor_check entries have required fields
required = ['id', 'location', 'dist_km', 'correlation', 'status', 'temp']
issues = []
for st in d['stations']:
    for nc in st.get('neighbor_check', []):
        missing = [k for k in required if k not in nc]
        if missing:
            issues.append(f"{st['station_id']} nc {nc.get('id','?')} missing: {missing}")

if issues:
    for i in issues:
        print('[WARN]', i)
else:
    print('[OK] All neighbor_check entries have required fields')
