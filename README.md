# MeteoGuard — Automatic Weather Station (AWS) Sensor Anomaly Detection & Predictive Maintenance Control-Room System

![MeteoGuard Logo](https://img.shields.io/badge/MeteoGuard-Control%20Room-FFC700?style=for-the-badge)
![Data Source](https://img.shields.io/badge/Data%20Source-NOAA%20ISD%20Proxy-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/System-ONLINE-10B981?style=for-the-badge)

MeteoGuard is an automated control-room dashboard and decision engine engineered specifically for weather-data operators and technicians. It monitors Automatic Weather Station (AWS) networks, detects sensor anomalies using a 2-stage architecture (Edge Autoencoders + Spatial Corroboration), distinguishes between genuine regional weather events and isolated hardware sensor faults, scores station health, and suggests actionable technician dispatches.

---

## 🛰️ 1. Core End-to-End Data Pipeline

The system processes telemetry stream through a rigorous 9-stage pipeline:

```
RAW AWS SENSOR DATA
        ↓
 DATA VALIDATION
        ↓
PHYSICS / QUALITY CHECKS (Rate-of-Change, Thermodynamic consistency)
        ↓
 AI ANOMALY DETECTION (Per-station Autoencoder 72→16→72)
        ↓
SUSPICIOUS READING GATE
        ↓
NEIGHBOUR-STATION SPATIAL CORROBORATION (K-Nearest Neighbours within 150km)
        ↓
FINAL CLASSIFICATION (Normal | Suspicious | Weather Event | Sensor Fault | Offline)
        ↓
STATION HEALTH SCORING (0 – 100 Multi-factor diagnostic score)
        ↓
TECHNICIAN / MAINTENANCE ACTION
```

### Classification States:
1. 🟢 **Normal Reading**: Sensor telemetry adheres to physics bounds, temporal continuity, and neighbour correlation.
2. 🟡 **Suspicious Reading**: Exceeds rate-of-change or autoencoder reconstruction error thresholds; awaiting spatial corroboration.
3. 🔵 **Genuine Regional Weather Event**: Multi-station spatial corroboration confirms widespread environmental disturbance across neighbouring stations.
4. 🔴 **Sensor Fault**: Isolated hardware failure. High reconstruction error while surrounding stations report normal parameters.
5. ⚫ **Station Offline**: Telemetry sync timeout or power module failure.

---

## 📁 2. Repository Structure

```
SIHPS2/
├── config.yaml                     # System physics thresholds, AI hyper-parameters & spatial config
├── README.md                       # Comprehensive system architecture & operating instructions
├── meteoguard/
│   ├── __init__.py
│   ├── dashboard/
│   │   ├── __init__.py
│   │   └── demo_data.py            # Generator for NOAA ISD prototype network (675 AWS nodes)
│   └── api/
│       ├── __init__.py
│       └── app.py                  # FastAPI control room REST endpoints
└── web/
    ├── index.html                  # Semantic, responsive single-page control room dashboard
    ├── demo_data.json              # Pre-generated static fallback payload
    ├── css/
    │   └── styles.css              # Control room dark aesthetic & Black/Yellow theme
    └── js/
        ├── data_layer.js           # REST API client & reactive data store
        ├── map.js                  # Interactive vector canvas map renderer
        ├── charts.js               # Sensor time-series canvas chart renderer
        └── app.js                  # Master application UI controller & view router
```

---

## ⚡ 3. Quick Start & Execution

### Option A: Direct Web Frontend (Standalone HTTP / Static Server)
Open `web/index.html` in any standard web browser, or serve using Python's built-in HTTP server:

```bash
# Serve web directory statically
python -m http.server 8000 --directory web
```
Then navigate to `http://localhost:8000`.

### Option B: Full FastAPI REST Backend + Dashboard Server
If `fastapi` and `uvicorn` are installed in your Python environment:

```bash
# Start FastAPI backend server
uvicorn meteoguard.api.app:app --reload --port 8000
```
API Documentation will be available at `http://localhost:8000/docs` and the web dashboard will serve live from `http://localhost:8000`.

---

## 📊 4. REST API Endpoint Specification

| Endpoint | Method | Description |
|---|---|---|
| `/api/status` | GET | System metadata, data source disclaimers, sync timestamp |
| `/api/kpis` | GET | Real-time counts (Active, Healthy, Suspicious, Faults, Weather Events, Offline) |
| `/api/stations` | GET | Roster of 675 AWS stations; supports `?status=` and `?search=` filters |
| `/api/stations/{id}` | GET | Detailed telemetry, 72h window, physics checks, spatial neighbours |
| `/api/alerts` | GET | Priority critical/high alerts queue |
| `/api/anomalies` | GET | Table of flagged sensor anomalies and weather events |
| `/api/health` | GET | Health summary & degraded station list |
| `/api/analytics` | GET | Performance latency, reading volume, fault distribution metrics |
| `/api/dispatch/{id}` | POST | Assign technician for site inspection (live state mutation) |
| `/api/resolve/{id}` | POST | Mark station anomaly as resolved (resets station to nominal state) |

---

## 🧠 5. Explainability & Spatial Corroboration Logic

### "Why Was This Flagged?" Engine
When an anomaly occurs (e.g. **AWS-042** temperature jumping from 43.8°C to 52.1°C), MeteoGuard presents an explainable breakdown:
- **Rate of Change Check**: Flagged if rate > 5.0°C/hr.
- **Autoencoder Reconstruction Error**: Flagged if MSE > 0.42.
- **Spatial Corroboration**: Evaluates 4 nearest stations (e.g. AWS-041, AWS-043, AWS-044, AWS-045). If neighbours remain normal (0% agreement), final classification is locked as **SENSOR FAULT**.

---

## ⚠️ 6. Prototype Disclaimers & Transparency

- **Data Source Disclaimer**: This prototype utilizes **NOAA Integrated Surface Database (ISD)** data as a prototype proxy dataset. It does **NOT** represent an official live Indian Meteorological Department (IMD) feed.
- **IMD Production Deployment**: Operational deployment requires integrating official IMD REST endpoints or MQTT message brokers.
- **Simulated Metrics**: Analytics performance latency and predictive maintenance health scores are generated for prototype demonstration purposes.
