import json
import os
import math
from datetime import datetime, timedelta

def generate_sensors_data():
    now = datetime(2026, 9, 28, 21, 45, 0)
    
    # 12 specific stations
    stations_def = [
        {
            "station_id": "MG-001",
            "station_name": "New Delhi Safdarjung AWS",
            "location": "New Delhi",
            "latitude": 28.5850,
            "longitude": 77.2060,
            "temperature": 28.4,
            "humidity": 54.0,
            "pressure": 1012.3,
            "wind_speed": 3.2,
            "health_score": 96,
            "anomaly_score": 0.08,
            "status": "HEALTHY",
            "fault_type": "None",
            "fault_description": "Sensor operating nominally. All channels conform to diurnal baseline and physical bounds.",
            "neighbor_stations": ["MG-005", "MG-008", "MG-003"],
            "neighbor_agreement": "3/3 neighbours normal (100% concordance)",
            "interpretation": "Nominal regional operation",
            "reconstruction_error": 0.024,
            "adaptive_threshold": 0.052,
            "recommended_action": "Nominal operation. No maintenance required; next scheduled cycle in 60 days.",
            "confidence": 98,
            "severity": "LOW",
            "classification": "NORMAL READING",
            "reasoning": "All 5 onboard sensors operating strictly within physical bounds, diurnal manifolds, and spatial neighbour correlation (r = 0.94)."
        },
        {
            "station_id": "MG-002",
            "station_name": "Mumbai Colaba AWS",
            "location": "Mumbai",
            "latitude": 18.9067,
            "longitude": 72.8147,
            "temperature": 30.1,
            "humidity": 78.0,
            "pressure": 1011.5,
            "wind_speed": 4.5,
            "health_score": 94,
            "anomaly_score": 0.11,
            "status": "HEALTHY",
            "fault_type": "None",
            "fault_description": "Nominal coastal marine boundary conditions. High temporal and spatial stability.",
            "neighbor_stations": ["MG-007", "MG-011", "MG-006"],
            "neighbor_agreement": "3/3 neighbours normal (100% concordance)",
            "interpretation": "Nominal coastal operation",
            "reconstruction_error": 0.031,
            "adaptive_threshold": 0.052,
            "recommended_action": "Nominal operation. System healthy.",
            "confidence": 97,
            "severity": "LOW",
            "classification": "NORMAL READING",
            "reasoning": "Coastal marine boundary layer telemetry adheres to physical limits and high spatial neighbour correlation (r = 0.92)."
        },
        {
            "station_id": "MG-003",
            "station_name": "Jaisalmer Desert AWS",
            "location": "Jaisalmer",
            "latitude": 26.9157,
            "longitude": 70.9083,
            "temperature": 46.8,
            "humidity": 18.0,
            "pressure": 998.4,
            "wind_speed": 5.8,
            "health_score": 74,
            "anomaly_score": 0.68,
            "status": "ANOMALY",
            "fault_type": "Temperature Anomaly",
            "fault_description": "Abnormal thermal elevation (+6.2°C above seasonal expectation). Approaching thermodynamic boundary.",
            "neighbor_stations": ["MG-001", "MG-008", "MG-007"],
            "neighbor_agreement": "1/3 neighbours show elevated heat index (33% agreement)",
            "interpretation": "Suspicious localized heat anomaly",
            "reconstruction_error": 0.068,
            "adaptive_threshold": 0.052,
            "recommended_action": "Cross-check and inspect station. Monitor rate-of-change over next 2 synoptic hours.",
            "confidence": 82,
            "severity": "MEDIUM",
            "classification": "SUSPICIOUS READING",
            "reasoning": "Thermal reading 46.8°C exceeds 72h moving baseline by 6.2°C. Partial neighbour agreement indicates possible local heat pocket or solar radiation shield degradation."
        },
        {
            "station_id": "MG-004",
            "station_name": "Kolkata Alipore AWS",
            "location": "Kolkata",
            "latitude": 22.5326,
            "longitude": 88.3244,
            "temperature": 29.5,
            "humidity": 98.5,
            "pressure": 1005.2,
            "wind_speed": 2.1,
            "health_score": 71,
            "anomaly_score": 0.72,
            "status": "ANOMALY",
            "fault_type": "Humidity Anomaly",
            "fault_description": "Relative humidity sensor saturated at 98.5% without precipitation. Possible hygrometer condensation trap.",
            "neighbor_stations": ["MG-010", "MG-012", "MG-001"],
            "neighbor_agreement": "0/3 neighbours observe saturation (0% agreement; mean RH: 72%)",
            "interpretation": "Likely isolated humidity sensor fault",
            "reconstruction_error": 0.072,
            "adaptive_threshold": 0.052,
            "recommended_action": "Inspect hygrometer protective mesh and ventilate sensor housing.",
            "confidence": 84,
            "severity": "MEDIUM",
            "classification": "SUSPICIOUS READING",
            "reasoning": "Hygrometer reading 98.5% RH with zero precipitation detected by tipping bucket rain gauge. Thermodynamic psychrometric test failed."
        },
        {
            "station_id": "MG-005",
            "station_name": "Shimla Mall Road AWS",
            "location": "Shimla",
            "latitude": 31.1048,
            "longitude": 77.1734,
            "temperature": 16.2,
            "humidity": 62.0,
            "pressure": 765.1,
            "wind_speed": 6.4,
            "health_score": 68,
            "anomaly_score": 0.65,
            "status": "OBSERVATION",
            "fault_type": "Pressure Anomaly",
            "fault_description": "Rapid barometric pressure depression (-4.8 hPa/hr) exceeding typical diurnal mountain wave fluctuations.",
            "neighbor_stations": ["MG-001", "MG-008", "MG-009"],
            "neighbor_agreement": "1/3 neighbours observe mild pressure dip (33% agreement)",
            "interpretation": "Mountain pressure depression under observation",
            "reconstruction_error": 0.064,
            "adaptive_threshold": 0.052,
            "recommended_action": "Keep under close observation. Verify against high-altitude reference barometer.",
            "confidence": 79,
            "severity": "MEDIUM",
            "classification": "SUSPICIOUS READING",
            "reasoning": "Barometric rate of change (-4.8 hPa/hr) exceeds physics limit of 3.0 hPa/hr. Secondary high-altitude mountain pressure wave under observation."
        },
        {
            "station_id": "MG-006",
            "station_name": "Bengaluru Central AWS",
            "location": "Bengaluru",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "temperature": 31.2,
            "humidity": 68.0,
            "pressure": 1007.8,
            "wind_speed": 4.2,
            "health_score": 42,
            "anomaly_score": 0.91,
            "status": "SENSOR FAULT",
            "fault_type": "Flatline",
            "fault_description": "Flatline pattern detected. Temperature output frozen at invariant 31.2°C across 18 consecutive readings.",
            "neighbor_stations": ["MG-002", "MG-007", "MG-011", "MG-012"],
            "neighbor_agreement": "4/4 neighbours normal (0% agreement with flatline)",
            "interpretation": "Likely isolated sensor fault",
            "reconstruction_error": 0.087,
            "adaptive_threshold": 0.052,
            "recommended_action": "Inspect sensor hardware. Power cycle ADC and inspect RTD bridge circuit.",
            "confidence": 95,
            "severity": "HIGH",
            "classification": "SENSOR FAULT",
            "reasoning": "Flatline pattern detected. Isolated hardware flatline fault: 0.00 standard deviation over 18 hours. Surrounding regional stations show normal diurnal temperature oscillations. Spatial agreement is 0/4 (0%)."
        },
        {
            "station_id": "MG-007",
            "station_name": "Pune Shivajinagar AWS",
            "location": "Pune",
            "latitude": 18.5362,
            "longitude": 73.8052,
            "temperature": 32.4,
            "humidity": 58.0,
            "pressure": 952.1,
            "wind_speed": 3.1,
            "health_score": 58,
            "anomaly_score": 0.62,
            "status": "OBSERVATION",
            "fault_type": "Gradual Drift",
            "fault_description": "Gradual sensor drift detected. Systematic positive calibration bias accumulating at +0.16°C every 6 hours.",
            "neighbor_stations": ["MG-002", "MG-006", "MG-011"],
            "neighbor_agreement": "0/3 neighbours exhibit thermal drift",
            "interpretation": "Likely sensor drift / recalibration needed",
            "reconstruction_error": 0.059,
            "adaptive_threshold": 0.052,
            "recommended_action": "Schedule calibration. Clean sensor radiation shield and perform two-point reference calibration.",
            "confidence": 81,
            "severity": "MEDIUM",
            "classification": "SUSPICIOUS READING",
            "reasoning": "Gradual drift detected. Continuous positive residual drift away from spatial manifold. Neighbour correlation dropping from r=0.92 to r=0.68 over 72 hours."
        },
        {
            "station_id": "MG-008",
            "station_name": "Jaipur Sanganer AWS",
            "location": "Jaipur",
            "latitude": 26.8242,
            "longitude": 75.8122,
            "temperature": 54.3,
            "humidity": 42.0,
            "pressure": 1003.5,
            "wind_speed": 4.0,
            "health_score": 36,
            "anomaly_score": 0.88,
            "status": "SENSOR FAULT",
            "fault_type": "Sudden Spike",
            "fault_description": "Sudden spike detected. Single-cycle temperature impulse jump from 33.1°C to 54.3°C (+21.2°C/hr).",
            "neighbor_stations": ["MG-001", "MG-003", "MG-005"],
            "neighbor_agreement": "3/3 neighbours normal (0% agreement; mean temp 32.8°C)",
            "interpretation": "Likely sensor hardware spike fault",
            "reconstruction_error": 0.092,
            "adaptive_threshold": 0.052,
            "recommended_action": "Verify sensor calibration. Check wiring harness, ground loop, and PT100 probe continuity.",
            "confidence": 96,
            "severity": "CRITICAL",
            "classification": "SENSOR FAULT",
            "reasoning": "Sudden spike detected. Rate of change (+21.2°C/hr) violates physical maximum (5.0°C/hr). Autoencoder reconstruction error 0.092 MSE exceeds adaptive threshold 0.052. Surrounding stations report normal 32.8°C."
        },
        {
            "station_id": "MG-009",
            "station_name": "Srinagar Airfield AWS",
            "location": "Srinagar",
            "latitude": 34.0837,
            "longitude": 74.7973,
            "temperature": None,
            "humidity": None,
            "pressure": None,
            "wind_speed": None,
            "health_score": 25,
            "anomaly_score": 0.95,
            "status": "DATA DROPOUT",
            "fault_type": "Data Dropout",
            "fault_description": "Data dropout detected. Complete loss of sensor telemetry stream for 180 consecutive minutes.",
            "neighbor_stations": ["MG-001", "MG-005"],
            "neighbor_agreement": "Adjacent stations online and nominal",
            "interpretation": "Telemetry dropout / communication or power failure",
            "reconstruction_error": 0.120,
            "adaptive_threshold": 0.052,
            "recommended_action": "Check connectivity/power. Test solar panel charging circuit, battery voltage, and SIM cellular modem.",
            "confidence": 100,
            "severity": "HIGH",
            "classification": "STATION OFFLINE",
            "reasoning": "Data dropout detected. Telemetry ping timeout. Zero byte packets received over cellular gateway since 18:45:00."
        },
        {
            "station_id": "MG-010",
            "station_name": "Bhubaneswar Coastal AWS",
            "location": "Bhubaneswar",
            "latitude": 20.2961,
            "longitude": 85.8245,
            "temperature": 21.8,
            "humidity": 94.0,
            "pressure": 994.2,
            "wind_speed": 16.5,
            "health_score": 91,
            "anomaly_score": 0.78,
            "status": "WEATHER EVENT",
            "fault_type": "Regional Weather Event",
            "fault_description": "Regional weather anomaly detected: coastal severe thunderstorm squall front with rapid barometric drop and high wind gust.",
            "neighbor_stations": ["MG-004", "MG-011", "MG-012"],
            "neighbor_agreement": "3/4 neighbouring stations show similar behaviour (75% agreement) → Likely genuine weather event",
            "interpretation": "Likely genuine weather event",
            "reconstruction_error": 0.076,
            "adaptive_threshold": 0.052,
            "recommended_action": "Monitor weather event; do not immediately dispatch technician. Environmental disturbance corroborated across network.",
            "confidence": 94,
            "severity": "HIGH",
            "classification": "GENUINE REGIONAL WEATHER EVENT",
            "reasoning": "Regional weather anomaly. Multi-station spatial corroboration confirmed: 3 out of 4 neighbouring regional AWS nodes concurrently observed sudden temperature drop (-8.2°C/hr), pressure drop (-7.6 hPa), and gale wind surge. Automated false-alarm suppression engaged."
        },
        {
            "station_id": "MG-011",
            "station_name": "Hyderabad Begumpet AWS",
            "location": "Hyderabad",
            "latitude": 17.4478,
            "longitude": 78.4728,
            "temperature": 49.6,
            "humidity": 22.0,
            "pressure": 955.0,
            "wind_speed": 2.8,
            "health_score": 39,
            "anomaly_score": 0.89,
            "status": "SENSOR FAULT",
            "fault_type": "Isolated Sensor Fault",
            "fault_description": "Isolated sensor anomaly detected. Temperature channel reading 49.6°C while surrounding Deccan plateau remains 31.4°C.",
            "neighbor_stations": ["MG-002", "MG-006", "MG-007", "MG-010"],
            "neighbor_agreement": "0/4 neighbouring stations show similar behaviour (0% agreement) → Likely sensor fault",
            "interpretation": "Likely sensor fault",
            "reconstruction_error": 0.089,
            "adaptive_threshold": 0.052,
            "recommended_action": "Cross-check and inspect station. Dispatch technician to replace thermistor element.",
            "confidence": 94,
            "severity": "CRITICAL",
            "classification": "SENSOR FAULT",
            "reasoning": "Isolated sensor anomaly. Isolated hardware fault: MG-011 registered severe thermal surge to 49.6°C (+17.2°C above regional baseline). Spatial corroboration across 4 surrounding stations within 150km radius showed 0% correlation (p < 0.001). Surrounding stations average 31.4°C."
        },
        {
            "station_id": "MG-012",
            "station_name": "Chennai Meenambakkam AWS",
            "location": "Chennai",
            "latitude": 12.9941,
            "longitude": 80.1709,
            "temperature": 32.8,
            "humidity": 69.0,
            "pressure": 1010.2,
            "wind_speed": 4.8,
            "health_score": 95,
            "anomaly_score": 0.09,
            "status": "HEALTHY",
            "fault_type": "None",
            "fault_description": "Sensor operating nominally. Marine sea breeze boundary stable. High autoencoder reconstruction fidelity.",
            "neighbor_stations": ["MG-006", "MG-010", "MG-011"],
            "neighbor_agreement": "3/3 neighbours concordance normal",
            "interpretation": "Nominal coastal operation",
            "reconstruction_error": 0.028,
            "adaptive_threshold": 0.052,
            "recommended_action": "Nominal operation. Next scheduled maintenance in 45 days.",
            "confidence": 98,
            "severity": "LOW",
            "classification": "NORMAL READING",
            "reasoning": "All 5 channels nominal. Autoencoder error 0.028 MSE well within adaptive threshold 0.052. Spatial correlation with neighbours r = 0.93."
        }
    ]

    # Build lookup by ID
    station_map = {s["station_id"]: s for s in stations_def}

    processed_stations = []
    for s in stations_def:
        sid = s["station_id"]
        base_temp = s["temperature"] if s["temperature"] is not None else 28.0
        base_hum = s["humidity"] if s["humidity"] is not None else 65.0
        base_pres = s["pressure"] if s["pressure"] is not None else 1008.0

        # Generate 24 historical points
        history = []
        temp_hist = []
        hum_hist = []
        pres_hist = []

        for h in range(23, -1, -1):
            t = now - timedelta(hours=h)
            hour_of_day = t.hour
            diurnal = math.sin((hour_of_day - 9) * math.pi / 12) * 3.2
            
            is_anomaly_point = False
            
            if sid == "MG-006": # Flatline
                t_val = 31.2
                h_val = round(base_hum + (hour_of_day % 3) * 0.5, 1)
                p_val = round(base_pres, 1)
                if h <= 18:
                    is_anomaly_point = True
            elif sid == "MG-007": # Gradual drift
                drift = round((24 - h) * 0.16, 2)
                t_val = round(base_temp - 3.8 + drift + diurnal * 0.8, 1)
                h_val = round(max(20.0, min(100.0, base_hum - diurnal * 1.5)), 1)
                p_val = round(base_pres, 1)
                if h <= 6:
                    is_anomaly_point = True
            elif sid == "MG-008": # Sudden spike
                if h == 0:
                    t_val = 54.3
                    is_anomaly_point = True
                else:
                    t_val = round(32.5 + diurnal, 1)
                h_val = round(max(20.0, min(100.0, 42.0 - diurnal * 1.2)), 1)
                p_val = round(base_pres, 1)
            elif sid == "MG-009": # Data dropout
                if h <= 3:
                    t_val = None
                    h_val = None
                    p_val = None
                    is_anomaly_point = True
                else:
                    t_val = round(18.5 + diurnal * 2.0, 1)
                    h_val = round(55.0 + diurnal * 1.1, 1)
                    p_val = 840.0
            elif sid == "MG-010": # Regional weather event (storm front drop)
                if h <= 2:
                    t_val = round(21.8 + (2 - h) * 0.2, 1)
                    h_val = round(94.0 - (2 - h) * 1.0, 1)
                    p_val = round(994.2 + (2 - h) * 0.4, 1)
                    is_anomaly_point = True
                else:
                    t_val = round(31.5 + diurnal, 1)
                    h_val = round(max(20.0, min(100.0, 68.0 - diurnal * 2.0)), 1)
                    p_val = round(1008.0 - (10 - h) * 0.6, 1)
            elif sid == "MG-011": # Isolated spike
                if h <= 2:
                    t_val = round(49.6 - h * 0.8, 1)
                    is_anomaly_point = True
                else:
                    t_val = round(31.2 + diurnal, 1)
                h_val = round(max(20.0, min(100.0, base_hum - diurnal)), 1)
                p_val = round(base_pres, 1)
            elif sid == "MG-003": # High temp anomaly
                t_val = round(42.0 + diurnal * 1.5 + (24 - h) * 0.18, 1)
                h_val = round(max(10.0, 22.0 - diurnal), 1)
                p_val = round(base_pres, 1)
                if h <= 4:
                    is_anomaly_point = True
            elif sid == "MG-004": # Humidity anomaly
                t_val = round(base_temp + diurnal, 1)
                h_val = 98.5 if h <= 8 else round(75.0 + (8 - h) * 2.8, 1)
                p_val = round(base_pres, 1)
                if h <= 8:
                    is_anomaly_point = True
            elif sid == "MG-005": # Pressure drop
                t_val = round(base_temp + diurnal, 1)
                h_val = round(base_hum, 1)
                p_val = round(base_pres - (4.8 if h == 0 else max(0, 4.8 - h * 0.6)), 1)
                if h <= 2:
                    is_anomaly_point = True
            else: # Healthy normal
                t_val = round(base_temp + diurnal, 1)
                h_val = round(max(20.0, min(100.0, base_hum - diurnal * 1.5)), 1)
                p_val = round(base_pres - diurnal * 0.3, 1)

            entry = {
                "timestamp": t.strftime("%Y-%m-%d %H:%M:%S"),
                "time_label": t.strftime("%H:%M"),
                "temperature": t_val,
                "humidity": h_val,
                "pressure": p_val,
                "is_anomaly": is_anomaly_point
            }
            history.append(entry)
            temp_hist.append(t_val)
            hum_hist.append(h_val)
            pres_hist.append(p_val)

        # Build onboard 5-channel sensors list
        sensor_status = "Normal"
        if s["status"] == "SENSOR FAULT":
            sensor_status = "Fault"
        elif s["status"] in ["ANOMALY", "OBSERVATION"]:
            sensor_status = "Warning"
        elif s["status"] == "DATA DROPOUT":
            sensor_status = "Offline"

        sensors_list = [
            {
                "type": "Temperature",
                "name": "Temperature Probe (PT100 RTD)",
                "serial": f"SN-TMP-{sid}",
                "status": "Fault" if s["fault_type"] in ["Flatline", "Sudden Spike", "Isolated Sensor Fault"] else ("Warning" if s["fault_type"] in ["Temperature Anomaly", "Gradual Drift"] else ("Offline" if sid == "MG-009" else "Normal")),
                "value": f"{s['temperature']}°C" if s['temperature'] is not None else "--",
                "expected": "20.0°C - 42.0°C",
                "error_mse": s["reconstruction_error"],
                "last_calibrated": "2025-11-15"
            },
            {
                "type": "Humidity",
                "name": "Relative Humidity Transducer",
                "serial": f"SN-HUM-{sid}",
                "status": "Fault" if s["fault_type"] == "Humidity Anomaly" else ("Warning" if s["status"] == "OBSERVATION" else ("Offline" if sid == "MG-009" else "Normal")),
                "value": f"{s['humidity']}%" if s['humidity'] is not None else "--",
                "expected": "30.0% - 95.0%",
                "error_mse": round(0.02 + (0.05 if s["fault_type"] == "Humidity Anomaly" else 0.0), 3),
                "last_calibrated": "2025-10-20"
            },
            {
                "type": "Pressure",
                "name": "Barometric Pressure Sensor",
                "serial": f"SN-PRS-{sid}",
                "status": "Warning" if s["fault_type"] == "Pressure Anomaly" else ("Offline" if sid == "MG-009" else "Normal"),
                "value": f"{s['pressure']} hPa" if s['pressure'] is not None else "--",
                "expected": "750.0 - 1030.0 hPa",
                "error_mse": round(0.015 + (0.045 if s["fault_type"] == "Pressure Anomaly" else 0.0), 3),
                "last_calibrated": "2025-12-01"
            },
            {
                "type": "Wind",
                "name": "Ultrasonic Anemometer",
                "serial": f"SN-WND-{sid}",
                "status": "Offline" if sid == "MG-009" else "Normal",
                "value": f"{s['wind_speed']} m/s" if s['wind_speed'] is not None else "--",
                "expected": "< 25.0 m/s",
                "error_mse": 0.021,
                "last_calibrated": "2025-09-12"
            },
            {
                "type": "Rain",
                "name": "Tipping Bucket Rain Gauge",
                "serial": f"SN-RN-{sid}",
                "status": "Offline" if sid == "MG-009" else "Normal",
                "value": "18.4 mm/hr" if s["status"] == "WEATHER EVENT" else "0.0 mm/hr",
                "expected": "Nominal",
                "error_mse": 0.008,
                "last_calibrated": "2025-08-05"
            }
        ]

        # Neighbor check details
        neighbor_check = []
        for n_id in s["neighbor_stations"]:
            if n_id in station_map:
                nst = station_map[n_id]
                # calculate distance approx
                dlat = abs(s["latitude"] - nst["latitude"]) * 111.0
                dlon = abs(s["longitude"] - nst["longitude"]) * 95.0
                dist_km = round(math.sqrt(dlat*dlat + dlon*dlon), 1)
                
                # correlation
                if s["status"] == "WEATHER EVENT" and nst["status"] in ["WEATHER EVENT", "ANOMALY", "HEALTHY"]:
                    corr = 0.91
                elif s["status"] == "SENSOR FAULT":
                    corr = 0.12
                elif s["status"] == "HEALTHY":
                    corr = 0.94
                else:
                    corr = 0.65

                neighbor_check.append({
                    "id": n_id,
                    "name": nst["station_name"],
                    "location": nst["location"],
                    "dist_km": dist_km,
                    "correlation": corr,
                    "status": nst["status"],
                    "temp": nst["temperature"],
                    "humidity": nst["humidity"],
                    "pressure": nst["pressure"]
                })

        # Physics checks object
        is_roc_pass = s["fault_type"] not in ["Sudden Spike", "Pressure Anomaly"]
        is_bounds_pass = s["temperature"] is not None and (-10.0 <= s["temperature"] <= 55.0)
        is_temp_rh_pass = s["fault_type"] != "Humidity Anomaly"

        physics_checks = {
            "rate_of_change": is_roc_pass,
            "physical_bounds": is_bounds_pass,
            "temp_rh_consistency": is_temp_rh_pass,
            "temporal_continuity": s["fault_type"] not in ["Sudden Spike", "Flatline"]
        }

        station_obj = {
            **s,
            "timestamp": now.strftime("%Y-%m-%d %H:%M:%S"),
            "last_updated": "Just now" if s["status"] in ["SENSOR FAULT", "WEATHER EVENT"] else "2 mins ago",
            "dispatched": False,
            "physics_checks": physics_checks,
            "sensors": sensors_list,
            "neighbor_check": neighbor_check,
            "temperature_history": temp_hist,
            "humidity_history": hum_hist,
            "pressure_history": pres_hist,
            "history": history
        }
        processed_stations.append(station_obj)

    # Calculate overall KPIs
    total = len(processed_stations)
    healthy = sum(1 for s in processed_stations if s["status"] == "HEALTHY")
    observation = sum(1 for s in processed_stations if s["status"] in ["OBSERVATION", "ANOMALY"])
    faults = sum(1 for s in processed_stations if s["status"] == "SENSOR FAULT")
    weather = sum(1 for s in processed_stations if s["status"] == "WEATHER EVENT")
    dropout = sum(1 for s in processed_stations if s["status"] == "DATA DROPOUT")
    network_health = round(sum(s["health_score"] for s in processed_stations) / total, 1)
    
    # Active alerts: all non-healthy stations
    non_healthy = [s for s in processed_stations if s["status"] != "HEALTHY"]
    # Sort critical first, then high, then medium
    sev_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    non_healthy.sort(key=lambda x: sev_order.get(x["severity"], 4))
    
    alerts = []
    for s in non_healthy:
        alerts.append({
            "alert_id": f"ALT-{s['station_id']}",
            "severity": s["severity"],
            "station_id": s["station_id"],
            "station_name": s["station_name"],
            "location": s["location"],
            "problem": f"{s['fault_type']} detected" if s["fault_type"] != "None" else "Abnormal reading detected",
            "sensor": "Temperature Probe" if "temp" in s["fault_type"].lower() or s["fault_type"] in ["Flatline", "Sudden Spike", "Gradual Drift", "Isolated Sensor Fault"] else ("Humidity Transducer" if "humidity" in s["fault_type"].lower() else ("Barometer" if "pressure" in s["fault_type"].lower() else "Telemetry Modem")),
            "issue": s["classification"],
            "current_value": f"{s['temperature']}°C" if s['temperature'] is not None else "OFFLINE",
            "previous_expected_value": "Nominal Baseline",
            "confidence": f"{s['confidence']}%",
            "neighbor_agreement": s["neighbor_agreement"],
            "timestamp": s["timestamp"],
            "time": s["timestamp"].split(" ")[1],
            "recommended_action": s["recommended_action"],
            "reasoning": s["reasoning"],
            "dispatched": False
        })

    payload = {
        "metadata": {
            "source": "NOAA ISD — Prototype Data Source",
            "disclaimer": "NOAA ISD is used as a proxy dataset for this prototype. Official IMD integration would be required for operational deployment.",
            "last_sync": now.strftime("%H:%M:%S"),
            "system_status": "ONLINE",
            "active_scenario": "12_SENSOR_CONTROL_ROOM",
            "model_specification": {
                "architecture": "Per-station Autoencoder (72 -> 16 -> 72)",
                "type": "Demo Model Output",
                "default_adaptive_threshold": 0.052,
                "reconstruction_error_metric": "MSE"
            }
        },
        "kpis": {
            "total_stations": total,
            "total_sensors": total,
            "healthy": healthy,
            "under_observation": observation,
            "suspicious": observation,
            "anomalies_faults": faults + sum(1 for s in processed_stations if s["status"] == "ANOMALY"),
            "sensor_faults": faults,
            "weather_events": weather,
            "data_dropouts": dropout,
            "offline": dropout,
            "network_health": network_health,
            "active_alerts": len(alerts)
        },
        "alerts": alerts,
        "stations": processed_stations
    }
    
    return payload

if __name__ == "__main__":
    payload = generate_sensors_data()
    
    # Save to data/sensors.json
    os.makedirs("data", exist_ok=True)
    with open("data/sensors.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print("Wrote data/sensors.json")

    # Also save to web/data/sensors.json so serving `web` directly has /data/sensors.json
    os.makedirs("web/data", exist_ok=True)
    with open("web/data/sensors.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print("Wrote web/data/sensors.json")

    # Also update web/demo_data.json
    with open("web/demo_data.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print("Wrote web/demo_data.json")
