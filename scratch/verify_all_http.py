import urllib.request

BASE = 'http://localhost:8000'

assets = [
    '/',
    '/index.html',
    '/data/sensors.json',
    '/css/styles.css',
    '/js/embedded_data.js',
    '/js/data_layer.js',
    '/js/map.js',
    '/js/charts.js',
    '/js/app.js'
]

passed = 0
for a in assets:
    try:
        r = urllib.request.urlopen(BASE + a)
        sz = len(r.read())
        print(f"[{r.status}] {a:25s} ({sz:,} bytes)")
        if r.status == 200:
            passed += 1
    except Exception as e:
        print(f"[ERR] {a:25s}: {e}")

print(f"\n{passed}/{len(assets)} assets verified successfully!")
