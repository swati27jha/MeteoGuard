import urllib.request

BASE = 'http://localhost:8000'

assets = [
    '/',
    '/data/sensors.json',
    '/css/styles.css',
    '/js/data_layer.js',
    '/js/map.js',
    '/js/charts.js',
    '/js/app.js',
]

all_pass = True
for a in assets:
    try:
        r = urllib.request.urlopen(BASE + a)
        size = len(r.read())
        print(f'[{r.status}] {a:30s} ({size:,} bytes)')
    except Exception as e:
        print(f'[ERR] {a}: {e}')
        all_pass = False

print()
print('[PASS] All assets serving OK' if all_pass else '[FAIL] Some assets are missing!')
