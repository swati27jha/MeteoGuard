import json
import os
import sys

def test_sensors_dataset():
    print("Testing MeteoGuard 12-Sensor Prototype Dataset...")
    
    assert os.path.exists("data/sensors.json"), "data/sensors.json does not exist!"
    assert os.path.exists("web/data/sensors.json"), "web/data/sensors.json does not exist!"

    with open("data/sensors.json", "r", encoding="utf-8") as f:
        payload = json.load(f)

    stations = payload.get("stations", [])
    assert len(stations) == 12, f"Expected exactly 12 stations, got {len(stations)}"
    print(f"[PASS] Exactly 12 sensors found: {[s['station_id'] for s in stations]}")

    required_fields = [
        "station_id", "station_name", "location", "latitude", "longitude", "timestamp",
        "temperature", "humidity", "pressure", "wind_speed",
        "health_score", "anomaly_score", "status", "fault_type", "fault_description",
        "neighbor_stations", "neighbor_agreement", "last_updated"
    ]

    expected_scenarios = {
        "MG-001": ("HEALTHY", "None"),
        "MG-002": ("HEALTHY", "None"),
        "MG-003": ("ANOMALY", "Temperature Anomaly"),
        "MG-004": ("ANOMALY", "Humidity Anomaly"),
        "MG-005": ("OBSERVATION", "Pressure Anomaly"),
        "MG-006": ("SENSOR FAULT", "Flatline"),
        "MG-007": ("OBSERVATION", "Gradual Drift"),
        "MG-008": ("SENSOR FAULT", "Sudden Spike"),
        "MG-009": ("DATA DROPOUT", "Data Dropout"),
        "MG-010": ("WEATHER EVENT", "Regional Weather Event"),
        "MG-011": ("SENSOR FAULT", "Isolated Sensor Fault"),
        "MG-012": ("HEALTHY", "None")
    }

    for s in stations:
        sid = s["station_id"]
        assert sid in expected_scenarios, f"Unexpected station ID {sid}"
        
        # Verify required fields exist
        for field in required_fields:
            assert field in s, f"Station {sid} missing required field: {field}"

        # Verify scenario condition
        exp_status, exp_fault = expected_scenarios[sid]
        assert s["status"] == exp_status, f"Station {sid} status mismatch: expected {exp_status}, got {s['status']}"
        assert exp_fault in s["fault_type"], f"Station {sid} fault_type mismatch: expected {exp_fault}, got {s['fault_type']}"

        # Verify non-zero values (except legitimate null for dropout MG-009)
        if sid != "MG-009":
            assert s["temperature"] is not None and s["temperature"] > 0, f"{sid} invalid temp: {s['temperature']}"
            assert s["humidity"] is not None and s["humidity"] > 0, f"{sid} invalid humidity: {s['humidity']}"
            assert s["pressure"] is not None and s["pressure"] > 0, f"{sid} invalid pressure: {s['pressure']}"
            assert s["wind_speed"] is not None and s["wind_speed"] > 0, f"{sid} invalid wind: {s['wind_speed']}"
        else:
            assert s["temperature"] is None and s["humidity"] is None, "MG-009 should have null telemetry for dropout"

        # Verify health score 0-100
        assert 0 <= s["health_score"] <= 100, f"{sid} invalid health_score {s['health_score']}"
        # Verify anomaly score 0-1
        assert 0.0 <= s["anomaly_score"] <= 1.0, f"{sid} invalid anomaly_score {s['anomaly_score']}"

        # Verify history array
        assert len(s.get("history", [])) >= 12, f"{sid} history should have >= 12 points, got {len(s.get('history', []))}"
        
        # Verify 5 onboard sensors
        assert len(s.get("sensors", [])) == 5, f"{sid} sensors should have 5 channels"

        # Verify autoencoder representations
        assert "reconstruction_error" in s, f"{sid} missing reconstruction_error"
        assert "adaptive_threshold" in s, f"{sid} missing adaptive_threshold"

    print("[PASS] All 12 station scenarios validated according to requirements.")

    # Verify weather event vs sensor fault distinction
    mg10 = next(s for s in stations if s["station_id"] == "MG-010")
    mg11 = next(s for s in stations if s["station_id"] == "MG-011")
    assert "Likely genuine weather event" in mg10["neighbor_agreement"] or "Likely genuine weather event" in mg10["interpretation"]
    assert "Likely sensor fault" in mg11["neighbor_agreement"] or "Likely sensor fault" in mg11["interpretation"]
    print("[PASS] Weather Event vs Isolated Sensor Fault distinction verified.")

    # Verify KPIs
    kpis = payload.get("kpis", {})
    assert kpis["total_sensors"] == 12, f"Total sensors KPI should be 12, got {kpis['total_sensors']}"
    assert kpis["healthy"] == 3, f"Healthy KPI should be 3, got {kpis['healthy']}"
    assert kpis["under_observation"] == 4 or kpis["under_observation"] == 2, f"Observation KPI: {kpis['under_observation']}"
    assert kpis["sensor_faults"] == 3, f"Faults KPI should be 3, got {kpis['sensor_faults']}"
    assert kpis["weather_events"] == 1, f"Weather events KPI should be 1, got {kpis['weather_events']}"
    assert kpis["network_health"] > 0, f"Network health should be positive, got {kpis['network_health']}"
    print(f"[PASS] Reconciled KPIs validated: {kpis}")

    print("All dataset tests PASSED successfully!")

if __name__ == "__main__":
    test_sensors_dataset()
