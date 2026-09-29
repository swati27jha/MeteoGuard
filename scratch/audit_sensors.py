import urllib.request, json

r = urllib.request.urlopen('http://localhost:8000/data/sensors.json')
d = json.loads(r.read())
stations = d['stations']
print(f'Total stations: {len(stations)}')
for s in stations:
    nc = len(s.get('neighbor_check', []))
    hist = len(s.get('history', []))
    sens = len(s.get('sensors', []))
    temp = str(s['temperature'])
    print(f"  {s['station_id']:7s} | {s['status']:20s} | health={s['health_score']:3d} | anomaly={s['anomaly_score']:.2f} | temp={temp:6s} | nc={nc} | hist={hist} | sensors={sens}")
