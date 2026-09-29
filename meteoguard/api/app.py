"""
MeteoGuard FastAPI Control-Room REST API Server
Provides endpoints for stations, anomalies, alerts, health diagnostics, analytics,
and simulation fault-injection controls.
"""

try:
    from fastapi import FastAPI, HTTPException, Query, Body
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False

import os
import math
from datetime import datetime, timedelta
from meteoguard.dashboard.demo_data import generate_full_demo_payload
from meteoguard.simulation.fault_injection import fault_engine

if HAS_FASTAPI:
    app = FastAPI(
        title="MeteoGuard AWS Control Room API",
        description="REST API for AWS Sensor Anomaly Detection & Predictive Maintenance System (NOAA ISD Prototype Proxy)",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # In-memory session payload store
    demo_store = generate_full_demo_payload()

    def reload_payload():
        global demo_store
        demo_store = generate_full_demo_payload()
        return demo_store

    @app.get("/api/status")
    def get_status():
        return demo_store["metadata"]

    @app.get("/api/kpis")
    def get_kpis():
        return demo_store["kpis"]

    @app.get("/api/summary")
    def get_summary():
        k = demo_store["kpis"]
        return {
            "total_stations": k["total_stations"],
            "active_stations": k["total_stations"] - k["offline"],
            "healthy": k["healthy"],
            "suspicious": k["suspicious"],
            "sensor_faults": k["sensor_faults"],
            "weather_events": k["weather_events"],
            "offline": k["offline"]
        }

    @app.get("/api/dashboard")
    def get_dashboard():
        return demo_store

    @app.get("/api/stations")
    def get_stations(status: str = None, search: str = None):
        stations = demo_store["stations"]
        if status and status.lower() != "all":
            stations = [s for s in stations if s["status"].lower().replace(' ', '-') == status.lower().replace(' ', '-')]
        if search:
            query = search.lower()
            stations = [s for s in stations if query in s["station_id"].lower() or query in s["station_name"].lower()]
        return {"total": len(stations), "data": stations, "stations": stations}

    @app.get("/api/stations/{station_id}")
    def get_station_detail(station_id: str):
        for s in demo_store["stations"]:
            if s["station_id"].upper() == station_id.upper():
                return s
        raise HTTPException(status_code=404, detail=f"Station {station_id} not found")

    @app.get("/api/stations/{station_id}/history")
    def get_station_history(station_id: str, hours: int = 72):
        for s in demo_store["stations"]:
            if s["station_id"].upper() == station_id.upper():
                base_temp = s["temperature"] or 30.0
                history = []
                now = datetime.now()
                for h in range(hours, 0, -1):
                    t = now - timedelta(hours=h)
                    diurnal = math.sin((t.hour - 9) * math.pi / 12) * 3.5
                    val = round(base_temp + diurnal, 1)
                    history.append({
                        "timestamp": t.strftime("%Y-%m-%d %H:%M:%S"),
                        "temperature": val,
                        "humidity": round(min(100.0, max(20.0, (s["humidity"] or 65) - diurnal * 1.2)), 1),
                        "pressure": s["pressure"] or 1008.0
                    })
                return {"station_id": station_id, "hours": hours, "history": history}
        raise HTTPException(status_code=404, detail="Station not found")

    @app.get("/api/alerts")
    def get_alerts():
        return {"total": len(demo_store["alerts"]), "data": demo_store["alerts"]}

    @app.get("/api/anomalies")
    def get_anomalies():
        anomalies = [s for s in demo_store["stations"] if s["status"] != "Normal"]
        return {"total": len(anomalies), "data": anomalies}

    @app.get("/api/sensors")
    def get_sensors(place: str = None, sensor_type: str = None, status: str = None, search: str = None):
        # Known place mappings
        CITY_STATIONS = {
            "chennai": ["AWS-041", "AWS-042", "AWS-043", "AWS-044", "AWS-045"],
            "delhi": ["AWS-001", "AWS-008"],
            "mumbai": ["AWS-015", "AWS-022"],
            "bengaluru": ["AWS-030", "AWS-035"],
            "kolkata": ["AWS-088"],
            "shimla": ["AWS-102"],
            "leh": ["AWS-120"],
            "jaisalmer": ["AWS-155"],
            "hyderabad": ["AWS-180"],
            "ahmedabad": ["AWS-210"],
            "guwahati": ["AWS-240"],
            "pune": ["AWS-290"],
            "nagpur": ["AWS-310"]
        }

        all_sensors = []
        for st in demo_store["stations"]:
            place_match = True
            if place and place.lower() != "all":
                pl = place.lower()
                matched_ids = CITY_STATIONS.get(pl, [])
                place_match = (pl in st["station_name"].lower() or 
                               pl in st["station_id"].lower() or 
                               st["station_id"] in matched_ids or 
                               pl in st.get("region", "").lower())
            if not place_match:
                continue

            for sens in st.get("sensors", []):
                type_match = not sensor_type or sensor_type.lower() == "all" or sensor_type.lower() in sens["name"].lower() or sensor_type.lower() in sens["type"].lower()
                status_match = not status or status.lower() == "all" or status.lower() == sens["status"].lower()
                search_match = not search or search.lower() in sens["name"].lower() or search.lower() in sens["serial"].lower() or search.lower() in st["station_id"].lower() or search.lower() in st["station_name"].lower()

                if type_match and status_match and search_match:
                    all_sensors.append({
                        "station_id": st["station_id"],
                        "station_name": st["station_name"],
                        "latitude": st["latitude"],
                        "longitude": st["longitude"],
                        "station_status": st["status"],
                        "sensor_name": sens["name"],
                        "sensor_type": sens["type"],
                        "serial": sens["serial"],
                        "reading": sens["value"],
                        "expected": sens["expected"],
                        "status": sens["status"],
                        "error_mse": sens["error_mse"],
                        "last_calibrated": sens["last_calibrated"],
                        "reasoning": st["reasoning"]
                    })
        return {"total": len(all_sensors), "data": all_sensors}

    @app.get("/api/sensors/by-place")
    def get_sensors_by_place():
        places = {}
        for st in demo_store["stations"]:
            # Extract city / region name from station_name
            name = st["station_name"].split(" Station")[0]
            if name not in places:
                places[name] = {
                    "place_name": name,
                    "station_count": 0,
                    "sensor_count": 0,
                    "fault_count": 0,
                    "stations": []
                }
            places[name]["station_count"] += 1
            places[name]["sensor_count"] += len(st.get("sensors", []))
            if st["status"] == "Sensor Fault":
                places[name]["fault_count"] += 1
            places[name]["stations"].append(st["station_id"])
        return {"total_places": len(places), "places": list(places.values())}

    @app.get("/api/health")
    def get_health_summary():
        stations = demo_store["stations"]
        critical_count = sum(1 for s in stations if s["health_score"] < 40)
        warning_count = sum(1 for s in stations if 40 <= s["health_score"] < 75)
        good_count = sum(1 for s in stations if s["health_score"] >= 75)
        return {
            "summary": {
                "critical_maintenance": critical_count,
                "degrading_health": warning_count,
                "optimal_health": good_count
            },
            "low_health_stations": [s for s in stations if s["health_score"] < 50]
        }

    @app.get("/api/analytics")
    def get_analytics():
        stations = demo_store["stations"]
        return {
            "total_readings_processed": 1458920,
            "anomaly_rate_percent": round((sum(1 for s in stations if s["status"] != "Normal") / len(stations)) * 100, 2),
            "avg_detection_latency_ms": 14.2,
            "fault_distribution": {
                "Sensor Fault": sum(1 for s in stations if s["status"] == "Sensor Fault"),
                "Regional Weather Event": sum(1 for s in stations if s["status"] == "Weather Event"),
                "Suspicious Reading": sum(1 for s in stations if s["status"] == "Suspicious"),
                "Offline": sum(1 for s in stations if s["status"] == "Offline")
            }
        }

    @app.post("/api/simulation/scenario/{scenario_name}")
    def set_simulation_scenario(scenario_name: str):
        if scenario_name not in ["ISOLATED_SENSOR_FAULT", "REGIONAL_WEATHER_EVENT"]:
            raise HTTPException(status_code=400, detail="Invalid scenario name")
        fault_engine.current_scenario = scenario_name
        reload_payload()
        return {"success": True, "active_scenario": scenario_name, "message": f"Applied scenario {scenario_name}"}

    @app.post("/api/simulation/fault")
    def inject_custom_fault(station_id: str = Body(...), sensor_type: str = Body("Temperature"), fault_type: str = Body("SPIKE")):
        for s in demo_store["stations"]:
            if s["station_id"].upper() == station_id.upper():
                rec = fault_engine.inject_fault(s, sensor_type=sensor_type, fault_type=fault_type)
                reload_payload()
                return {"success": True, "injection": rec, "station": s}
        raise HTTPException(status_code=404, detail="Station not found")

    @app.post("/api/simulation/reset")
    def reset_simulation():
        fault_engine.current_scenario = "ISOLATED_SENSOR_FAULT"
        fault_engine.injection_log.clear()
        reload_payload()
        return {"success": True, "message": "Simulation reset to baseline state"}

    @app.post("/api/dispatch/{station_id}")
    def dispatch_technician(station_id: str):
        for s in demo_store["stations"]:
            if s["station_id"].upper() == station_id.upper():
                s["dispatched"] = True
                s["recommended_action"] = f"[DISPATCHED] Field engineer assigned to inspect {s['station_name']} ({station_id})."
                return {"success": True, "message": f"Technician dispatched for {station_id}", "station": s}
        raise HTTPException(status_code=404, detail="Station not found")

    @app.post("/api/resolve/{station_id}")
    def resolve_station_issue(station_id: str):
        for s in demo_store["stations"]:
            if s["station_id"].upper() == station_id.upper():
                s["status"] = "Normal"
                s["classification"] = "NORMAL READING"
                s["severity"] = "LOW"
                s["health_score"] = 98
                s["anomaly_score"] = 0.12
                s["reconstruction_error"] = 0.11
                s["recommended_action"] = "Resolved by maintenance technician. Sensor verified nominal."
                return {"success": True, "message": f"Issue resolved for {station_id}", "station": s}
        raise HTTPException(status_code=404, detail="Station not found")

    if os.path.exists("data"):
        app.mount("/data", StaticFiles(directory="data"), name="data")
    if os.path.exists("web"):
        app.mount("/", StaticFiles(directory="web", html=True), name="static")

else:
    print("FastAPI is not installed in the Python environment.")
