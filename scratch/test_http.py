import urllib.request
import json

res = urllib.request.urlopen('http://localhost:8000/')
assert res.status == 200, f'Status {res.status}'
print('[PASS] http://localhost:8000/ returned 200 OK')

res_data = urllib.request.urlopen('http://localhost:8000/data/sensors.json')
assert res_data.status == 200, f'Status {res_data.status}'
data = json.loads(res_data.read().decode('utf-8'))
assert len(data['stations']) == 12, '12 stations not found in /data/sensors.json'
print(f"[PASS] /data/sensors.json returned 200 OK with {len(data['stations'])} stations")

# Check asset files
for asset in ['css/styles.css', 'js/data_layer.js', 'js/map.js', 'js/charts.js', 'js/app.js']:
    r = urllib.request.urlopen(f'http://localhost:8000/{asset}')
    assert r.status == 200, f'Asset {asset} failed with {r.status}'
    print(f'[PASS] {asset} returned 200 OK ({len(r.read())} bytes)')

print('ALL HTTP ENDPOINTS AND ASSETS VERIFIED SUCCESSFULLY!')
