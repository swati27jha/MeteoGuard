// Pre-bundled static dataset fallback for offline / file:// protocol access
window.METEOGUARD_DEFAULT_DATASET = {
  "metadata": {
    "source": "NOAA ISD \u2014 Prototype Data Source",
    "disclaimer": "NOAA ISD is used as a proxy dataset for this prototype. Official IMD integration would be required for operational deployment.",
    "last_sync": "21:45:00",
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
    "total_stations": 12,
    "total_sensors": 12,
    "healthy": 3,
    "under_observation": 4,
    "suspicious": 4,
    "anomalies_faults": 5,
    "sensor_faults": 3,
    "weather_events": 1,
    "data_dropouts": 1,
    "offline": 1,
    "network_health": 65.8,
    "active_alerts": 9
  },
  "alerts": [
    {
      "alert_id": "ALT-MG-008",
      "severity": "CRITICAL",
      "station_id": "MG-008",
      "station_name": "Jaipur Sanganer AWS",
      "location": "Jaipur",
      "problem": "Sudden Spike detected",
      "sensor": "Temperature Probe",
      "issue": "SENSOR FAULT",
      "current_value": "54.3\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "96%",
      "neighbor_agreement": "3/3 neighbours normal (0% agreement; mean temp 32.8\u00b0C)",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Verify sensor calibration. Check wiring harness, ground loop, and PT100 probe continuity.",
      "reasoning": "Sudden spike detected. Rate of change (+21.2\u00b0C/hr) violates physical maximum (5.0\u00b0C/hr). Autoencoder reconstruction error 0.092 MSE exceeds adaptive threshold 0.052. Surrounding stations report normal 32.8\u00b0C.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-011",
      "severity": "CRITICAL",
      "station_id": "MG-011",
      "station_name": "Hyderabad Begumpet AWS",
      "location": "Hyderabad",
      "problem": "Isolated Sensor Fault detected",
      "sensor": "Temperature Probe",
      "issue": "SENSOR FAULT",
      "current_value": "49.6\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "94%",
      "neighbor_agreement": "0/4 neighbouring stations show similar behaviour (0% agreement) \u2192 Likely sensor fault",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Cross-check and inspect station. Dispatch technician to replace thermistor element.",
      "reasoning": "Isolated sensor anomaly. Isolated hardware fault: MG-011 registered severe thermal surge to 49.6\u00b0C (+17.2\u00b0C above regional baseline). Spatial corroboration across 4 surrounding stations within 150km radius showed 0% correlation (p < 0.001). Surrounding stations average 31.4\u00b0C.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-006",
      "severity": "HIGH",
      "station_id": "MG-006",
      "station_name": "Bengaluru Central AWS",
      "location": "Bengaluru",
      "problem": "Flatline detected",
      "sensor": "Temperature Probe",
      "issue": "SENSOR FAULT",
      "current_value": "31.2\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "95%",
      "neighbor_agreement": "4/4 neighbours normal (0% agreement with flatline)",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Inspect sensor hardware. Power cycle ADC and inspect RTD bridge circuit.",
      "reasoning": "Flatline pattern detected. Isolated hardware flatline fault: 0.00 standard deviation over 18 hours. Surrounding regional stations show normal diurnal temperature oscillations. Spatial agreement is 0/4 (0%).",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-009",
      "severity": "HIGH",
      "station_id": "MG-009",
      "station_name": "Srinagar Airfield AWS",
      "location": "Srinagar",
      "problem": "Data Dropout detected",
      "sensor": "Telemetry Modem",
      "issue": "STATION OFFLINE",
      "current_value": "OFFLINE",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "100%",
      "neighbor_agreement": "Adjacent stations online and nominal",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Check connectivity/power. Test solar panel charging circuit, battery voltage, and SIM cellular modem.",
      "reasoning": "Data dropout detected. Telemetry ping timeout. Zero byte packets received over cellular gateway since 18:45:00.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-010",
      "severity": "HIGH",
      "station_id": "MG-010",
      "station_name": "Bhubaneswar Coastal AWS",
      "location": "Bhubaneswar",
      "problem": "Regional Weather Event detected",
      "sensor": "Telemetry Modem",
      "issue": "GENUINE REGIONAL WEATHER EVENT",
      "current_value": "21.8\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "94%",
      "neighbor_agreement": "3/4 neighbouring stations show similar behaviour (75% agreement) \u2192 Likely genuine weather event",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Monitor weather event; do not immediately dispatch technician. Environmental disturbance corroborated across network.",
      "reasoning": "Regional weather anomaly. Multi-station spatial corroboration confirmed: 3 out of 4 neighbouring regional AWS nodes concurrently observed sudden temperature drop (-8.2\u00b0C/hr), pressure drop (-7.6 hPa), and gale wind surge. Automated false-alarm suppression engaged.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-003",
      "severity": "MEDIUM",
      "station_id": "MG-003",
      "station_name": "Jaisalmer Desert AWS",
      "location": "Jaisalmer",
      "problem": "Temperature Anomaly detected",
      "sensor": "Temperature Probe",
      "issue": "SUSPICIOUS READING",
      "current_value": "46.8\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "82%",
      "neighbor_agreement": "1/3 neighbours show elevated heat index (33% agreement)",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Cross-check and inspect station. Monitor rate-of-change over next 2 synoptic hours.",
      "reasoning": "Thermal reading 46.8\u00b0C exceeds 72h moving baseline by 6.2\u00b0C. Partial neighbour agreement indicates possible local heat pocket or solar radiation shield degradation.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-004",
      "severity": "MEDIUM",
      "station_id": "MG-004",
      "station_name": "Kolkata Alipore AWS",
      "location": "Kolkata",
      "problem": "Humidity Anomaly detected",
      "sensor": "Humidity Transducer",
      "issue": "SUSPICIOUS READING",
      "current_value": "29.5\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "84%",
      "neighbor_agreement": "0/3 neighbours observe saturation (0% agreement; mean RH: 72%)",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Inspect hygrometer protective mesh and ventilate sensor housing.",
      "reasoning": "Hygrometer reading 98.5% RH with zero precipitation detected by tipping bucket rain gauge. Thermodynamic psychrometric test failed.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-005",
      "severity": "MEDIUM",
      "station_id": "MG-005",
      "station_name": "Shimla Mall Road AWS",
      "location": "Shimla",
      "problem": "Pressure Anomaly detected",
      "sensor": "Barometer",
      "issue": "SUSPICIOUS READING",
      "current_value": "16.2\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "79%",
      "neighbor_agreement": "1/3 neighbours observe mild pressure dip (33% agreement)",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Keep under close observation. Verify against high-altitude reference barometer.",
      "reasoning": "Barometric rate of change (-4.8 hPa/hr) exceeds physics limit of 3.0 hPa/hr. Secondary high-altitude mountain pressure wave under observation.",
      "dispatched": false
    },
    {
      "alert_id": "ALT-MG-007",
      "severity": "MEDIUM",
      "station_id": "MG-007",
      "station_name": "Pune Shivajinagar AWS",
      "location": "Pune",
      "problem": "Gradual Drift detected",
      "sensor": "Temperature Probe",
      "issue": "SUSPICIOUS READING",
      "current_value": "32.4\u00b0C",
      "previous_expected_value": "Nominal Baseline",
      "confidence": "81%",
      "neighbor_agreement": "0/3 neighbours exhibit thermal drift",
      "timestamp": "2026-09-28 21:45:00",
      "time": "21:45:00",
      "recommended_action": "Schedule calibration. Clean sensor radiation shield and perform two-point reference calibration.",
      "reasoning": "Gradual drift detected. Continuous positive residual drift away from spatial manifold. Neighbour correlation dropping from r=0.92 to r=0.68 over 72 hours.",
      "dispatched": false
    }
  ],
  "stations": [
    {
      "station_id": "MG-001",
      "station_name": "New Delhi Safdarjung AWS",
      "location": "New Delhi",
      "latitude": 28.585,
      "longitude": 77.206,
      "temperature": 28.4,
      "humidity": 54.0,
      "pressure": 1012.3,
      "wind_speed": 3.2,
      "health_score": 96,
      "anomaly_score": 0.08,
      "status": "HEALTHY",
      "fault_type": "None",
      "fault_description": "Sensor operating nominally. All channels conform to diurnal baseline and physical bounds.",
      "neighbor_stations": [
        "MG-005",
        "MG-008",
        "MG-003"
      ],
      "neighbor_agreement": "3/3 neighbours normal (100% concordance)",
      "interpretation": "Nominal regional operation",
      "reconstruction_error": 0.024,
      "adaptive_threshold": 0.052,
      "recommended_action": "Nominal operation. No maintenance required; next scheduled cycle in 60 days.",
      "confidence": 98,
      "severity": "LOW",
      "classification": "NORMAL READING",
      "reasoning": "All 5 onboard sensors operating strictly within physical bounds, diurnal manifolds, and spatial neighbour correlation (r = 0.94).",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-001",
          "status": "Normal",
          "value": "28.4\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.024,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-001",
          "status": "Normal",
          "value": "54.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-001",
          "status": "Normal",
          "value": "1012.3 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-001",
          "status": "Normal",
          "value": "3.2 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-001",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-005",
          "name": "Shimla Mall Road AWS",
          "location": "Shimla",
          "dist_km": 279.7,
          "correlation": 0.94,
          "status": "OBSERVATION",
          "temp": 16.2,
          "humidity": 62.0,
          "pressure": 765.1
        },
        {
          "id": "MG-008",
          "name": "Jaipur Sanganer AWS",
          "location": "Jaipur",
          "dist_km": 236.1,
          "correlation": 0.94,
          "status": "SENSOR FAULT",
          "temp": 54.3,
          "humidity": 42.0,
          "pressure": 1003.5
        },
        {
          "id": "MG-003",
          "name": "Jaisalmer Desert AWS",
          "location": "Jaisalmer",
          "dist_km": 626.3,
          "correlation": 0.94,
          "status": "ANOMALY",
          "temp": 46.8,
          "humidity": 18.0,
          "pressure": 998.4
        }
      ],
      "temperature_history": [
        27.6,
        26.8,
        26.1,
        25.6,
        25.3,
        25.2,
        25.3,
        25.6,
        26.1,
        26.8,
        27.6,
        28.4,
        29.2,
        30.0,
        30.7,
        31.2,
        31.5,
        31.6,
        31.5,
        31.2,
        30.7,
        30.0,
        29.2,
        28.4
      ],
      "humidity_history": [
        55.2,
        56.4,
        57.4,
        58.2,
        58.6,
        58.8,
        58.6,
        58.2,
        57.4,
        56.4,
        55.2,
        54.0,
        52.8,
        51.6,
        50.6,
        49.8,
        49.4,
        49.2,
        49.4,
        49.8,
        50.6,
        51.6,
        52.8,
        54.0
      ],
      "pressure_history": [
        1012.5,
        1012.8,
        1013.0,
        1013.1,
        1013.2,
        1013.3,
        1013.2,
        1013.1,
        1013.0,
        1012.8,
        1012.5,
        1012.3,
        1012.1,
        1011.8,
        1011.6,
        1011.5,
        1011.4,
        1011.3,
        1011.4,
        1011.5,
        1011.6,
        1011.8,
        1012.1,
        1012.3
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 27.6,
          "humidity": 55.2,
          "pressure": 1012.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 26.8,
          "humidity": 56.4,
          "pressure": 1012.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 26.1,
          "humidity": 57.4,
          "pressure": 1013.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 25.6,
          "humidity": 58.2,
          "pressure": 1013.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 25.3,
          "humidity": 58.6,
          "pressure": 1013.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 25.2,
          "humidity": 58.8,
          "pressure": 1013.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 25.3,
          "humidity": 58.6,
          "pressure": 1013.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 25.6,
          "humidity": 58.2,
          "pressure": 1013.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 26.1,
          "humidity": 57.4,
          "pressure": 1013.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 26.8,
          "humidity": 56.4,
          "pressure": 1012.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 27.6,
          "humidity": 55.2,
          "pressure": 1012.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 29.2,
          "humidity": 52.8,
          "pressure": 1012.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 30.0,
          "humidity": 51.6,
          "pressure": 1011.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 30.7,
          "humidity": 50.6,
          "pressure": 1011.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 31.2,
          "humidity": 49.8,
          "pressure": 1011.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 31.5,
          "humidity": 49.4,
          "pressure": 1011.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 31.6,
          "humidity": 49.2,
          "pressure": 1011.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 31.5,
          "humidity": 49.4,
          "pressure": 1011.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 31.2,
          "humidity": 49.8,
          "pressure": 1011.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 30.7,
          "humidity": 50.6,
          "pressure": 1011.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 30.0,
          "humidity": 51.6,
          "pressure": 1011.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 29.2,
          "humidity": 52.8,
          "pressure": 1012.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3,
          "is_anomaly": false
        }
      ]
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
      "neighbor_stations": [
        "MG-007",
        "MG-011",
        "MG-006"
      ],
      "neighbor_agreement": "3/3 neighbours normal (100% concordance)",
      "interpretation": "Nominal coastal operation",
      "reconstruction_error": 0.031,
      "adaptive_threshold": 0.052,
      "recommended_action": "Nominal operation. System healthy.",
      "confidence": 97,
      "severity": "LOW",
      "classification": "NORMAL READING",
      "reasoning": "Coastal marine boundary layer telemetry adheres to physical limits and high spatial neighbour correlation (r = 0.92).",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-002",
          "status": "Normal",
          "value": "30.1\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.031,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-002",
          "status": "Normal",
          "value": "78.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-002",
          "status": "Normal",
          "value": "1011.5 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-002",
          "status": "Normal",
          "value": "4.5 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-002",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-007",
          "name": "Pune Shivajinagar AWS",
          "location": "Pune",
          "dist_km": 102.7,
          "correlation": 0.94,
          "status": "OBSERVATION",
          "temp": 32.4,
          "humidity": 58.0,
          "pressure": 952.1
        },
        {
          "id": "MG-011",
          "name": "Hyderabad Begumpet AWS",
          "location": "Hyderabad",
          "dist_km": 561.4,
          "correlation": 0.94,
          "status": "SENSOR FAULT",
          "temp": 49.6,
          "humidity": 22.0,
          "pressure": 955.0
        },
        {
          "id": "MG-006",
          "name": "Bengaluru Central AWS",
          "location": "Bengaluru",
          "dist_km": 800.1,
          "correlation": 0.94,
          "status": "SENSOR FAULT",
          "temp": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8
        }
      ],
      "temperature_history": [
        29.3,
        28.5,
        27.8,
        27.3,
        27.0,
        26.9,
        27.0,
        27.3,
        27.8,
        28.5,
        29.3,
        30.1,
        30.9,
        31.7,
        32.4,
        32.9,
        33.2,
        33.3,
        33.2,
        32.9,
        32.4,
        31.7,
        30.9,
        30.1
      ],
      "humidity_history": [
        79.2,
        80.4,
        81.4,
        82.2,
        82.6,
        82.8,
        82.6,
        82.2,
        81.4,
        80.4,
        79.2,
        78.0,
        76.8,
        75.6,
        74.6,
        73.8,
        73.4,
        73.2,
        73.4,
        73.8,
        74.6,
        75.6,
        76.8,
        78.0
      ],
      "pressure_history": [
        1011.7,
        1012.0,
        1012.2,
        1012.3,
        1012.4,
        1012.5,
        1012.4,
        1012.3,
        1012.2,
        1012.0,
        1011.7,
        1011.5,
        1011.3,
        1011.0,
        1010.8,
        1010.7,
        1010.6,
        1010.5,
        1010.6,
        1010.7,
        1010.8,
        1011.0,
        1011.3,
        1011.5
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 29.3,
          "humidity": 79.2,
          "pressure": 1011.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 28.5,
          "humidity": 80.4,
          "pressure": 1012.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 27.8,
          "humidity": 81.4,
          "pressure": 1012.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 27.3,
          "humidity": 82.2,
          "pressure": 1012.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 27.0,
          "humidity": 82.6,
          "pressure": 1012.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 26.9,
          "humidity": 82.8,
          "pressure": 1012.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 27.0,
          "humidity": 82.6,
          "pressure": 1012.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 27.3,
          "humidity": 82.2,
          "pressure": 1012.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 27.8,
          "humidity": 81.4,
          "pressure": 1012.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 28.5,
          "humidity": 80.4,
          "pressure": 1012.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 29.3,
          "humidity": 79.2,
          "pressure": 1011.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 30.1,
          "humidity": 78.0,
          "pressure": 1011.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 30.9,
          "humidity": 76.8,
          "pressure": 1011.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 31.7,
          "humidity": 75.6,
          "pressure": 1011.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 32.4,
          "humidity": 74.6,
          "pressure": 1010.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 32.9,
          "humidity": 73.8,
          "pressure": 1010.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 33.2,
          "humidity": 73.4,
          "pressure": 1010.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 33.3,
          "humidity": 73.2,
          "pressure": 1010.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 33.2,
          "humidity": 73.4,
          "pressure": 1010.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 32.9,
          "humidity": 73.8,
          "pressure": 1010.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 32.4,
          "humidity": 74.6,
          "pressure": 1010.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 31.7,
          "humidity": 75.6,
          "pressure": 1011.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 30.9,
          "humidity": 76.8,
          "pressure": 1011.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 30.1,
          "humidity": 78.0,
          "pressure": 1011.5,
          "is_anomaly": false
        }
      ]
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
      "fault_description": "Abnormal thermal elevation (+6.2\u00b0C above seasonal expectation). Approaching thermodynamic boundary.",
      "neighbor_stations": [
        "MG-001",
        "MG-008",
        "MG-007"
      ],
      "neighbor_agreement": "1/3 neighbours show elevated heat index (33% agreement)",
      "interpretation": "Suspicious localized heat anomaly",
      "reconstruction_error": 0.068,
      "adaptive_threshold": 0.052,
      "recommended_action": "Cross-check and inspect station. Monitor rate-of-change over next 2 synoptic hours.",
      "confidence": 82,
      "severity": "MEDIUM",
      "classification": "SUSPICIOUS READING",
      "reasoning": "Thermal reading 46.8\u00b0C exceeds 72h moving baseline by 6.2\u00b0C. Partial neighbour agreement indicates possible local heat pocket or solar radiation shield degradation.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-003",
          "status": "Warning",
          "value": "46.8\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.068,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-003",
          "status": "Normal",
          "value": "18.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-003",
          "status": "Normal",
          "value": "998.4 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-003",
          "status": "Normal",
          "value": "5.8 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-003",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-001",
          "name": "New Delhi Safdarjung AWS",
          "location": "New Delhi",
          "dist_km": 626.3,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3
        },
        {
          "id": "MG-008",
          "name": "Jaipur Sanganer AWS",
          "location": "Jaipur",
          "dist_km": 466.0,
          "correlation": 0.65,
          "status": "SENSOR FAULT",
          "temp": 54.3,
          "humidity": 42.0,
          "pressure": 1003.5
        },
        {
          "id": "MG-007",
          "name": "Pune Shivajinagar AWS",
          "location": "Pune",
          "dist_km": 970.0,
          "correlation": 0.65,
          "status": "OBSERVATION",
          "temp": 32.4,
          "humidity": 58.0,
          "pressure": 952.1
        }
      ],
      "temperature_history": [
        40.9,
        40.0,
        39.1,
        38.6,
        38.3,
        38.3,
        38.6,
        39.3,
        40.2,
        41.4,
        42.7,
        44.2,
        45.6,
        46.9,
        48.1,
        49.0,
        49.7,
        50.0,
        50.1,
        49.8,
        49.2,
        48.4,
        47.4,
        46.3
      ],
      "humidity_history": [
        22.8,
        23.6,
        24.3,
        24.8,
        25.1,
        25.2,
        25.1,
        24.8,
        24.3,
        23.6,
        22.8,
        22.0,
        21.2,
        20.4,
        19.7,
        19.2,
        18.9,
        18.8,
        18.9,
        19.2,
        19.7,
        20.4,
        21.2,
        22.0
      ],
      "pressure_history": [
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4,
        998.4
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 40.9,
          "humidity": 22.8,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 40.0,
          "humidity": 23.6,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 39.1,
          "humidity": 24.3,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 38.6,
          "humidity": 24.8,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 38.3,
          "humidity": 25.1,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 38.3,
          "humidity": 25.2,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 38.6,
          "humidity": 25.1,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 39.3,
          "humidity": 24.8,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 40.2,
          "humidity": 24.3,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 41.4,
          "humidity": 23.6,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 42.7,
          "humidity": 22.8,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 44.2,
          "humidity": 22.0,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 45.6,
          "humidity": 21.2,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 46.9,
          "humidity": 20.4,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 48.1,
          "humidity": 19.7,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 49.0,
          "humidity": 19.2,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 49.7,
          "humidity": 18.9,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 50.0,
          "humidity": 18.8,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 50.1,
          "humidity": 18.9,
          "pressure": 998.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 49.8,
          "humidity": 19.2,
          "pressure": 998.4,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 49.2,
          "humidity": 19.7,
          "pressure": 998.4,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 48.4,
          "humidity": 20.4,
          "pressure": 998.4,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 47.4,
          "humidity": 21.2,
          "pressure": 998.4,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 46.3,
          "humidity": 22.0,
          "pressure": 998.4,
          "is_anomaly": true
        }
      ]
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
      "neighbor_stations": [
        "MG-010",
        "MG-012",
        "MG-001"
      ],
      "neighbor_agreement": "0/3 neighbours observe saturation (0% agreement; mean RH: 72%)",
      "interpretation": "Likely isolated humidity sensor fault",
      "reconstruction_error": 0.072,
      "adaptive_threshold": 0.052,
      "recommended_action": "Inspect hygrometer protective mesh and ventilate sensor housing.",
      "confidence": 84,
      "severity": "MEDIUM",
      "classification": "SUSPICIOUS READING",
      "reasoning": "Hygrometer reading 98.5% RH with zero precipitation detected by tipping bucket rain gauge. Thermodynamic psychrometric test failed.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": false,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-004",
          "status": "Normal",
          "value": "29.5\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.072,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-004",
          "status": "Fault",
          "value": "98.5%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.07,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-004",
          "status": "Normal",
          "value": "1005.2 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-004",
          "status": "Normal",
          "value": "2.1 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-004",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-010",
          "name": "Bhubaneswar Coastal AWS",
          "location": "Bhubaneswar",
          "dist_km": 343.6,
          "correlation": 0.65,
          "status": "WEATHER EVENT",
          "temp": 21.8,
          "humidity": 94.0,
          "pressure": 994.2
        },
        {
          "id": "MG-012",
          "name": "Chennai Meenambakkam AWS",
          "location": "Chennai",
          "dist_km": 1311.9,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 32.8,
          "humidity": 69.0,
          "pressure": 1010.2
        },
        {
          "id": "MG-001",
          "name": "New Delhi Safdarjung AWS",
          "location": "New Delhi",
          "dist_km": 1251.8,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3
        }
      ],
      "temperature_history": [
        28.7,
        27.9,
        27.2,
        26.7,
        26.4,
        26.3,
        26.4,
        26.7,
        27.2,
        27.9,
        28.7,
        29.5,
        30.3,
        31.1,
        31.8,
        32.3,
        32.6,
        32.7,
        32.6,
        32.3,
        31.8,
        31.1,
        30.3,
        29.5
      ],
      "humidity_history": [
        33.0,
        35.8,
        38.6,
        41.4,
        44.2,
        47.0,
        49.8,
        52.6,
        55.4,
        58.2,
        61.0,
        63.8,
        66.6,
        69.4,
        72.2,
        98.5,
        98.5,
        98.5,
        98.5,
        98.5,
        98.5,
        98.5,
        98.5,
        98.5
      ],
      "pressure_history": [
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2,
        1005.2
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 28.7,
          "humidity": 33.0,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 27.9,
          "humidity": 35.8,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 27.2,
          "humidity": 38.6,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 26.7,
          "humidity": 41.4,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 26.4,
          "humidity": 44.2,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 26.3,
          "humidity": 47.0,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 26.4,
          "humidity": 49.8,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 26.7,
          "humidity": 52.6,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 27.2,
          "humidity": 55.4,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 27.9,
          "humidity": 58.2,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 28.7,
          "humidity": 61.0,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 29.5,
          "humidity": 63.8,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 30.3,
          "humidity": 66.6,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 31.1,
          "humidity": 69.4,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 31.8,
          "humidity": 72.2,
          "pressure": 1005.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 32.3,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 32.6,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 32.7,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 32.6,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 32.3,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 31.8,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 31.1,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 30.3,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 29.5,
          "humidity": 98.5,
          "pressure": 1005.2,
          "is_anomaly": true
        }
      ]
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
      "neighbor_stations": [
        "MG-001",
        "MG-008",
        "MG-009"
      ],
      "neighbor_agreement": "1/3 neighbours observe mild pressure dip (33% agreement)",
      "interpretation": "Mountain pressure depression under observation",
      "reconstruction_error": 0.064,
      "adaptive_threshold": 0.052,
      "recommended_action": "Keep under close observation. Verify against high-altitude reference barometer.",
      "confidence": 79,
      "severity": "MEDIUM",
      "classification": "SUSPICIOUS READING",
      "reasoning": "Barometric rate of change (-4.8 hPa/hr) exceeds physics limit of 3.0 hPa/hr. Secondary high-altitude mountain pressure wave under observation.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": false,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-005",
          "status": "Normal",
          "value": "16.2\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.064,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-005",
          "status": "Warning",
          "value": "62.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-005",
          "status": "Warning",
          "value": "765.1 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.06,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-005",
          "status": "Normal",
          "value": "6.4 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-005",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-001",
          "name": "New Delhi Safdarjung AWS",
          "location": "New Delhi",
          "dist_km": 279.7,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3
        },
        {
          "id": "MG-008",
          "name": "Jaipur Sanganer AWS",
          "location": "Jaipur",
          "dist_km": 492.4,
          "correlation": 0.65,
          "status": "SENSOR FAULT",
          "temp": 54.3,
          "humidity": 42.0,
          "pressure": 1003.5
        },
        {
          "id": "MG-009",
          "name": "Srinagar Airfield AWS",
          "location": "Srinagar",
          "dist_km": 400.4,
          "correlation": 0.65,
          "status": "DATA DROPOUT",
          "temp": null,
          "humidity": null,
          "pressure": null
        }
      ],
      "temperature_history": [
        15.4,
        14.6,
        13.9,
        13.4,
        13.1,
        13.0,
        13.1,
        13.4,
        13.9,
        14.6,
        15.4,
        16.2,
        17.0,
        17.8,
        18.5,
        19.0,
        19.3,
        19.4,
        19.3,
        19.0,
        18.5,
        17.8,
        17.0,
        16.2
      ],
      "humidity_history": [
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0,
        62.0
      ],
      "pressure_history": [
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        765.1,
        764.5,
        763.9,
        763.3,
        762.7,
        762.1,
        761.5,
        760.9,
        760.3
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 15.4,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 14.6,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 13.9,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 13.4,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 13.1,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 13.0,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 13.1,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 13.4,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 13.9,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 14.6,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 15.4,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 16.2,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 17.0,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 17.8,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 18.5,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 19.0,
          "humidity": 62.0,
          "pressure": 765.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 19.3,
          "humidity": 62.0,
          "pressure": 764.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 19.4,
          "humidity": 62.0,
          "pressure": 763.9,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 19.3,
          "humidity": 62.0,
          "pressure": 763.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 19.0,
          "humidity": 62.0,
          "pressure": 762.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 18.5,
          "humidity": 62.0,
          "pressure": 762.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 17.8,
          "humidity": 62.0,
          "pressure": 761.5,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 17.0,
          "humidity": 62.0,
          "pressure": 760.9,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 16.2,
          "humidity": 62.0,
          "pressure": 760.3,
          "is_anomaly": true
        }
      ]
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
      "fault_description": "Flatline pattern detected. Temperature output frozen at invariant 31.2\u00b0C across 18 consecutive readings.",
      "neighbor_stations": [
        "MG-002",
        "MG-007",
        "MG-011",
        "MG-012"
      ],
      "neighbor_agreement": "4/4 neighbours normal (0% agreement with flatline)",
      "interpretation": "Likely isolated sensor fault",
      "reconstruction_error": 0.087,
      "adaptive_threshold": 0.052,
      "recommended_action": "Inspect sensor hardware. Power cycle ADC and inspect RTD bridge circuit.",
      "confidence": 95,
      "severity": "HIGH",
      "classification": "SENSOR FAULT",
      "reasoning": "Flatline pattern detected. Isolated hardware flatline fault: 0.00 standard deviation over 18 hours. Surrounding regional stations show normal diurnal temperature oscillations. Spatial agreement is 0/4 (0%).",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "Just now",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": false
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-006",
          "status": "Fault",
          "value": "31.2\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.087,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-006",
          "status": "Normal",
          "value": "68.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-006",
          "status": "Normal",
          "value": "1007.8 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-006",
          "status": "Normal",
          "value": "4.2 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-006",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-002",
          "name": "Mumbai Colaba AWS",
          "location": "Mumbai",
          "dist_km": 800.1,
          "correlation": 0.12,
          "status": "HEALTHY",
          "temp": 30.1,
          "humidity": 78.0,
          "pressure": 1011.5
        },
        {
          "id": "MG-007",
          "name": "Pune Shivajinagar AWS",
          "location": "Pune",
          "dist_km": 714.9,
          "correlation": 0.12,
          "status": "OBSERVATION",
          "temp": 32.4,
          "humidity": 58.0,
          "pressure": 952.1
        },
        {
          "id": "MG-011",
          "name": "Hyderabad Begumpet AWS",
          "location": "Hyderabad",
          "dist_km": 503.8,
          "correlation": 0.12,
          "status": "SENSOR FAULT",
          "temp": 49.6,
          "humidity": 22.0,
          "pressure": 955.0
        },
        {
          "id": "MG-012",
          "name": "Chennai Meenambakkam AWS",
          "location": "Chennai",
          "dist_km": 244.8,
          "correlation": 0.12,
          "status": "HEALTHY",
          "temp": 32.8,
          "humidity": 69.0,
          "pressure": 1010.2
        }
      ],
      "temperature_history": [
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2,
        31.2
      ],
      "humidity_history": [
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0,
        68.5,
        69.0,
        68.0
      ],
      "pressure_history": [
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8,
        1007.8
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 31.2,
          "humidity": 68.5,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 31.2,
          "humidity": 69.0,
          "pressure": 1007.8,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8,
          "is_anomaly": true
        }
      ]
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
      "fault_description": "Gradual sensor drift detected. Systematic positive calibration bias accumulating at +0.16\u00b0C every 6 hours.",
      "neighbor_stations": [
        "MG-002",
        "MG-006",
        "MG-011"
      ],
      "neighbor_agreement": "0/3 neighbours exhibit thermal drift",
      "interpretation": "Likely sensor drift / recalibration needed",
      "reconstruction_error": 0.059,
      "adaptive_threshold": 0.052,
      "recommended_action": "Schedule calibration. Clean sensor radiation shield and perform two-point reference calibration.",
      "confidence": 81,
      "severity": "MEDIUM",
      "classification": "SUSPICIOUS READING",
      "reasoning": "Gradual drift detected. Continuous positive residual drift away from spatial manifold. Neighbour correlation dropping from r=0.92 to r=0.68 over 72 hours.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-007",
          "status": "Warning",
          "value": "32.4\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.059,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-007",
          "status": "Warning",
          "value": "58.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-007",
          "status": "Normal",
          "value": "952.1 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-007",
          "status": "Normal",
          "value": "3.1 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-007",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-002",
          "name": "Mumbai Colaba AWS",
          "location": "Mumbai",
          "dist_km": 102.7,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 30.1,
          "humidity": 78.0,
          "pressure": 1011.5
        },
        {
          "id": "MG-006",
          "name": "Bengaluru Central AWS",
          "location": "Bengaluru",
          "dist_km": 714.9,
          "correlation": 0.65,
          "status": "SENSOR FAULT",
          "temp": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8
        },
        {
          "id": "MG-011",
          "name": "Hyderabad Begumpet AWS",
          "location": "Hyderabad",
          "dist_km": 459.6,
          "correlation": 0.65,
          "status": "SENSOR FAULT",
          "temp": 49.6,
          "humidity": 22.0,
          "pressure": 955.0
        }
      ],
      "temperature_history": [
        28.1,
        27.6,
        27.3,
        27.0,
        26.9,
        27.0,
        27.2,
        27.7,
        28.2,
        28.9,
        29.7,
        30.5,
        31.3,
        32.1,
        32.8,
        33.4,
        33.8,
        34.0,
        34.1,
        34.0,
        33.8,
        33.4,
        32.9,
        32.4
      ],
      "humidity_history": [
        59.2,
        60.4,
        61.4,
        62.2,
        62.6,
        62.8,
        62.6,
        62.2,
        61.4,
        60.4,
        59.2,
        58.0,
        56.8,
        55.6,
        54.6,
        53.8,
        53.4,
        53.2,
        53.4,
        53.8,
        54.6,
        55.6,
        56.8,
        58.0
      ],
      "pressure_history": [
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1,
        952.1
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 28.1,
          "humidity": 59.2,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 27.6,
          "humidity": 60.4,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 27.3,
          "humidity": 61.4,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 27.0,
          "humidity": 62.2,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 26.9,
          "humidity": 62.6,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 27.0,
          "humidity": 62.8,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 27.2,
          "humidity": 62.6,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 27.7,
          "humidity": 62.2,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 28.2,
          "humidity": 61.4,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 28.9,
          "humidity": 60.4,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 29.7,
          "humidity": 59.2,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 30.5,
          "humidity": 58.0,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 31.3,
          "humidity": 56.8,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 32.1,
          "humidity": 55.6,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 32.8,
          "humidity": 54.6,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 33.4,
          "humidity": 53.8,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 33.8,
          "humidity": 53.4,
          "pressure": 952.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 34.0,
          "humidity": 53.2,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 34.1,
          "humidity": 53.4,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 34.0,
          "humidity": 53.8,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 33.8,
          "humidity": 54.6,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 33.4,
          "humidity": 55.6,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 32.9,
          "humidity": 56.8,
          "pressure": 952.1,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 32.4,
          "humidity": 58.0,
          "pressure": 952.1,
          "is_anomaly": true
        }
      ]
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
      "fault_description": "Sudden spike detected. Single-cycle temperature impulse jump from 33.1\u00b0C to 54.3\u00b0C (+21.2\u00b0C/hr).",
      "neighbor_stations": [
        "MG-001",
        "MG-003",
        "MG-005"
      ],
      "neighbor_agreement": "3/3 neighbours normal (0% agreement; mean temp 32.8\u00b0C)",
      "interpretation": "Likely sensor hardware spike fault",
      "reconstruction_error": 0.092,
      "adaptive_threshold": 0.052,
      "recommended_action": "Verify sensor calibration. Check wiring harness, ground loop, and PT100 probe continuity.",
      "confidence": 96,
      "severity": "CRITICAL",
      "classification": "SENSOR FAULT",
      "reasoning": "Sudden spike detected. Rate of change (+21.2\u00b0C/hr) violates physical maximum (5.0\u00b0C/hr). Autoencoder reconstruction error 0.092 MSE exceeds adaptive threshold 0.052. Surrounding stations report normal 32.8\u00b0C.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "Just now",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": false,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": false
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-008",
          "status": "Fault",
          "value": "54.3\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.092,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-008",
          "status": "Normal",
          "value": "42.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-008",
          "status": "Normal",
          "value": "1003.5 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-008",
          "status": "Normal",
          "value": "4.0 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-008",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-001",
          "name": "New Delhi Safdarjung AWS",
          "location": "New Delhi",
          "dist_km": 236.1,
          "correlation": 0.12,
          "status": "HEALTHY",
          "temp": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3
        },
        {
          "id": "MG-003",
          "name": "Jaisalmer Desert AWS",
          "location": "Jaisalmer",
          "dist_km": 466.0,
          "correlation": 0.12,
          "status": "ANOMALY",
          "temp": 46.8,
          "humidity": 18.0,
          "pressure": 998.4
        },
        {
          "id": "MG-005",
          "name": "Shimla Mall Road AWS",
          "location": "Shimla",
          "dist_km": 492.4,
          "correlation": 0.12,
          "status": "OBSERVATION",
          "temp": 16.2,
          "humidity": 62.0,
          "pressure": 765.1
        }
      ],
      "temperature_history": [
        31.7,
        30.9,
        30.2,
        29.7,
        29.4,
        29.3,
        29.4,
        29.7,
        30.2,
        30.9,
        31.7,
        32.5,
        33.3,
        34.1,
        34.8,
        35.3,
        35.6,
        35.7,
        35.6,
        35.3,
        34.8,
        34.1,
        33.3,
        54.3
      ],
      "humidity_history": [
        43.0,
        43.9,
        44.7,
        45.3,
        45.7,
        45.8,
        45.7,
        45.3,
        44.7,
        43.9,
        43.0,
        42.0,
        41.0,
        40.1,
        39.3,
        38.7,
        38.3,
        38.2,
        38.3,
        38.7,
        39.3,
        40.1,
        41.0,
        42.0
      ],
      "pressure_history": [
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5,
        1003.5
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 31.7,
          "humidity": 43.0,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 30.9,
          "humidity": 43.9,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 30.2,
          "humidity": 44.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 29.7,
          "humidity": 45.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 29.4,
          "humidity": 45.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 29.3,
          "humidity": 45.8,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 29.4,
          "humidity": 45.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 29.7,
          "humidity": 45.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 30.2,
          "humidity": 44.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 30.9,
          "humidity": 43.9,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 31.7,
          "humidity": 43.0,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 32.5,
          "humidity": 42.0,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 33.3,
          "humidity": 41.0,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 34.1,
          "humidity": 40.1,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 34.8,
          "humidity": 39.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 35.3,
          "humidity": 38.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 35.6,
          "humidity": 38.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 35.7,
          "humidity": 38.2,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 35.6,
          "humidity": 38.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 35.3,
          "humidity": 38.7,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 34.8,
          "humidity": 39.3,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 34.1,
          "humidity": 40.1,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 33.3,
          "humidity": 41.0,
          "pressure": 1003.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 54.3,
          "humidity": 42.0,
          "pressure": 1003.5,
          "is_anomaly": true
        }
      ]
    },
    {
      "station_id": "MG-009",
      "station_name": "Srinagar Airfield AWS",
      "location": "Srinagar",
      "latitude": 34.0837,
      "longitude": 74.7973,
      "temperature": null,
      "humidity": null,
      "pressure": null,
      "wind_speed": null,
      "health_score": 25,
      "anomaly_score": 0.95,
      "status": "DATA DROPOUT",
      "fault_type": "Data Dropout",
      "fault_description": "Data dropout detected. Complete loss of sensor telemetry stream for 180 consecutive minutes.",
      "neighbor_stations": [
        "MG-001",
        "MG-005"
      ],
      "neighbor_agreement": "Adjacent stations online and nominal",
      "interpretation": "Telemetry dropout / communication or power failure",
      "reconstruction_error": 0.12,
      "adaptive_threshold": 0.052,
      "recommended_action": "Check connectivity/power. Test solar panel charging circuit, battery voltage, and SIM cellular modem.",
      "confidence": 100,
      "severity": "HIGH",
      "classification": "STATION OFFLINE",
      "reasoning": "Data dropout detected. Telemetry ping timeout. Zero byte packets received over cellular gateway since 18:45:00.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": false,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-009",
          "status": "Offline",
          "value": "--",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.12,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-009",
          "status": "Offline",
          "value": "--",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-009",
          "status": "Offline",
          "value": "--",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-009",
          "status": "Offline",
          "value": "--",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-009",
          "status": "Offline",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-001",
          "name": "New Delhi Safdarjung AWS",
          "location": "New Delhi",
          "dist_km": 651.8,
          "correlation": 0.65,
          "status": "HEALTHY",
          "temp": 28.4,
          "humidity": 54.0,
          "pressure": 1012.3
        },
        {
          "id": "MG-005",
          "name": "Shimla Mall Road AWS",
          "location": "Shimla",
          "dist_km": 400.4,
          "correlation": 0.65,
          "status": "OBSERVATION",
          "temp": 16.2,
          "humidity": 62.0,
          "pressure": 765.1
        }
      ],
      "temperature_history": [
        16.8,
        15.3,
        14.0,
        13.0,
        12.3,
        12.1,
        12.3,
        13.0,
        14.0,
        15.3,
        16.8,
        18.5,
        20.2,
        21.7,
        23.0,
        24.0,
        24.7,
        24.9,
        24.7,
        24.0,
        null,
        null,
        null,
        null
      ],
      "humidity_history": [
        54.1,
        53.2,
        52.5,
        52.0,
        51.6,
        51.5,
        51.6,
        52.0,
        52.5,
        53.2,
        54.1,
        55.0,
        55.9,
        56.8,
        57.5,
        58.0,
        58.4,
        58.5,
        58.4,
        58.0,
        null,
        null,
        null,
        null
      ],
      "pressure_history": [
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        840.0,
        null,
        null,
        null,
        null
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 16.8,
          "humidity": 54.1,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 15.3,
          "humidity": 53.2,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 14.0,
          "humidity": 52.5,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 13.0,
          "humidity": 52.0,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 12.3,
          "humidity": 51.6,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 12.1,
          "humidity": 51.5,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 12.3,
          "humidity": 51.6,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 13.0,
          "humidity": 52.0,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 14.0,
          "humidity": 52.5,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 15.3,
          "humidity": 53.2,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 16.8,
          "humidity": 54.1,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 18.5,
          "humidity": 55.0,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 20.2,
          "humidity": 55.9,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 21.7,
          "humidity": 56.8,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 23.0,
          "humidity": 57.5,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 24.0,
          "humidity": 58.0,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 24.7,
          "humidity": 58.4,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 24.9,
          "humidity": 58.5,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 24.7,
          "humidity": 58.4,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 24.0,
          "humidity": 58.0,
          "pressure": 840.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": null,
          "humidity": null,
          "pressure": null,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": null,
          "humidity": null,
          "pressure": null,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": null,
          "humidity": null,
          "pressure": null,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": null,
          "humidity": null,
          "pressure": null,
          "is_anomaly": true
        }
      ]
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
      "neighbor_stations": [
        "MG-004",
        "MG-011",
        "MG-012"
      ],
      "neighbor_agreement": "3/4 neighbouring stations show similar behaviour (75% agreement) \u2192 Likely genuine weather event",
      "interpretation": "Likely genuine weather event",
      "reconstruction_error": 0.076,
      "adaptive_threshold": 0.052,
      "recommended_action": "Monitor weather event; do not immediately dispatch technician. Environmental disturbance corroborated across network.",
      "confidence": 94,
      "severity": "HIGH",
      "classification": "GENUINE REGIONAL WEATHER EVENT",
      "reasoning": "Regional weather anomaly. Multi-station spatial corroboration confirmed: 3 out of 4 neighbouring regional AWS nodes concurrently observed sudden temperature drop (-8.2\u00b0C/hr), pressure drop (-7.6 hPa), and gale wind surge. Automated false-alarm suppression engaged.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "Just now",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-010",
          "status": "Normal",
          "value": "21.8\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.076,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-010",
          "status": "Normal",
          "value": "94.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-010",
          "status": "Normal",
          "value": "994.2 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-010",
          "status": "Normal",
          "value": "16.5 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-010",
          "status": "Normal",
          "value": "18.4 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-004",
          "name": "Kolkata Alipore AWS",
          "location": "Kolkata",
          "dist_km": 343.6,
          "correlation": 0.91,
          "status": "ANOMALY",
          "temp": 29.5,
          "humidity": 98.5,
          "pressure": 1005.2
        },
        {
          "id": "MG-011",
          "name": "Hyderabad Begumpet AWS",
          "location": "Hyderabad",
          "dist_km": 766.6,
          "correlation": 0.65,
          "status": "SENSOR FAULT",
          "temp": 49.6,
          "humidity": 22.0,
          "pressure": 955.0
        },
        {
          "id": "MG-012",
          "name": "Chennai Meenambakkam AWS",
          "location": "Chennai",
          "dist_km": 972.3,
          "correlation": 0.91,
          "status": "HEALTHY",
          "temp": 32.8,
          "humidity": 69.0,
          "pressure": 1010.2
        }
      ],
      "temperature_history": [
        30.7,
        29.9,
        29.2,
        28.7,
        28.4,
        28.3,
        28.4,
        28.7,
        29.2,
        29.9,
        30.7,
        31.5,
        32.3,
        33.1,
        33.8,
        34.3,
        34.6,
        34.7,
        34.6,
        34.3,
        33.8,
        21.8,
        22.0,
        22.2
      ],
      "humidity_history": [
        69.7,
        71.2,
        72.5,
        73.5,
        74.2,
        74.4,
        74.2,
        73.5,
        72.5,
        71.2,
        69.7,
        68.0,
        66.3,
        64.8,
        63.5,
        62.5,
        61.8,
        61.6,
        61.8,
        62.5,
        63.5,
        94.0,
        93.0,
        92.0
      ],
      "pressure_history": [
        1015.8,
        1015.2,
        1014.6,
        1014.0,
        1013.4,
        1012.8,
        1012.2,
        1011.6,
        1011.0,
        1010.4,
        1009.8,
        1009.2,
        1008.6,
        1008.0,
        1007.4,
        1006.8,
        1006.2,
        1005.6,
        1005.0,
        1004.4,
        1003.8,
        994.2,
        994.6,
        995.0
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 30.7,
          "humidity": 69.7,
          "pressure": 1015.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 29.9,
          "humidity": 71.2,
          "pressure": 1015.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 29.2,
          "humidity": 72.5,
          "pressure": 1014.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 28.7,
          "humidity": 73.5,
          "pressure": 1014.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 28.4,
          "humidity": 74.2,
          "pressure": 1013.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 28.3,
          "humidity": 74.4,
          "pressure": 1012.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 28.4,
          "humidity": 74.2,
          "pressure": 1012.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 28.7,
          "humidity": 73.5,
          "pressure": 1011.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 29.2,
          "humidity": 72.5,
          "pressure": 1011.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 29.9,
          "humidity": 71.2,
          "pressure": 1010.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 30.7,
          "humidity": 69.7,
          "pressure": 1009.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 31.5,
          "humidity": 68.0,
          "pressure": 1009.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 32.3,
          "humidity": 66.3,
          "pressure": 1008.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 33.1,
          "humidity": 64.8,
          "pressure": 1008.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 33.8,
          "humidity": 63.5,
          "pressure": 1007.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 34.3,
          "humidity": 62.5,
          "pressure": 1006.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 34.6,
          "humidity": 61.8,
          "pressure": 1006.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 34.7,
          "humidity": 61.6,
          "pressure": 1005.6,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 34.6,
          "humidity": 61.8,
          "pressure": 1005.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 34.3,
          "humidity": 62.5,
          "pressure": 1004.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 33.8,
          "humidity": 63.5,
          "pressure": 1003.8,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 21.8,
          "humidity": 94.0,
          "pressure": 994.2,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 22.0,
          "humidity": 93.0,
          "pressure": 994.6,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 22.2,
          "humidity": 92.0,
          "pressure": 995.0,
          "is_anomaly": true
        }
      ]
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
      "fault_description": "Isolated sensor anomaly detected. Temperature channel reading 49.6\u00b0C while surrounding Deccan plateau remains 31.4\u00b0C.",
      "neighbor_stations": [
        "MG-002",
        "MG-006",
        "MG-007",
        "MG-010"
      ],
      "neighbor_agreement": "0/4 neighbouring stations show similar behaviour (0% agreement) \u2192 Likely sensor fault",
      "interpretation": "Likely sensor fault",
      "reconstruction_error": 0.089,
      "adaptive_threshold": 0.052,
      "recommended_action": "Cross-check and inspect station. Dispatch technician to replace thermistor element.",
      "confidence": 94,
      "severity": "CRITICAL",
      "classification": "SENSOR FAULT",
      "reasoning": "Isolated sensor anomaly. Isolated hardware fault: MG-011 registered severe thermal surge to 49.6\u00b0C (+17.2\u00b0C above regional baseline). Spatial corroboration across 4 surrounding stations within 150km radius showed 0% correlation (p < 0.001). Surrounding stations average 31.4\u00b0C.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "Just now",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-011",
          "status": "Fault",
          "value": "49.6\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.089,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-011",
          "status": "Normal",
          "value": "22.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-011",
          "status": "Normal",
          "value": "955.0 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-011",
          "status": "Normal",
          "value": "2.8 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-011",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-002",
          "name": "Mumbai Colaba AWS",
          "location": "Mumbai",
          "dist_km": 561.4,
          "correlation": 0.12,
          "status": "HEALTHY",
          "temp": 30.1,
          "humidity": 78.0,
          "pressure": 1011.5
        },
        {
          "id": "MG-006",
          "name": "Bengaluru Central AWS",
          "location": "Bengaluru",
          "dist_km": 503.8,
          "correlation": 0.12,
          "status": "SENSOR FAULT",
          "temp": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8
        },
        {
          "id": "MG-007",
          "name": "Pune Shivajinagar AWS",
          "location": "Pune",
          "dist_km": 459.6,
          "correlation": 0.12,
          "status": "OBSERVATION",
          "temp": 32.4,
          "humidity": 58.0,
          "pressure": 952.1
        },
        {
          "id": "MG-010",
          "name": "Bhubaneswar Coastal AWS",
          "location": "Bhubaneswar",
          "dist_km": 766.6,
          "correlation": 0.12,
          "status": "WEATHER EVENT",
          "temp": 21.8,
          "humidity": 94.0,
          "pressure": 994.2
        }
      ],
      "temperature_history": [
        30.4,
        29.6,
        28.9,
        28.4,
        28.1,
        28.0,
        28.1,
        28.4,
        28.9,
        29.6,
        30.4,
        31.2,
        32.0,
        32.8,
        33.5,
        34.0,
        34.3,
        34.4,
        34.3,
        34.0,
        33.5,
        48.0,
        48.8,
        49.6
      ],
      "humidity_history": [
        22.8,
        23.6,
        24.3,
        24.8,
        25.1,
        25.2,
        25.1,
        24.8,
        24.3,
        23.6,
        22.8,
        22.0,
        21.2,
        20.4,
        20.0,
        20.0,
        20.0,
        20.0,
        20.0,
        20.0,
        20.0,
        20.4,
        21.2,
        22.0
      ],
      "pressure_history": [
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0,
        955.0
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 30.4,
          "humidity": 22.8,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 29.6,
          "humidity": 23.6,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 28.9,
          "humidity": 24.3,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 28.4,
          "humidity": 24.8,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 28.1,
          "humidity": 25.1,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 28.0,
          "humidity": 25.2,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 28.1,
          "humidity": 25.1,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 28.4,
          "humidity": 24.8,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 28.9,
          "humidity": 24.3,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 29.6,
          "humidity": 23.6,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 30.4,
          "humidity": 22.8,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 31.2,
          "humidity": 22.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 32.0,
          "humidity": 21.2,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 32.8,
          "humidity": 20.4,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 33.5,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 34.0,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 34.3,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 34.4,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 34.3,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 34.0,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 33.5,
          "humidity": 20.0,
          "pressure": 955.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 48.0,
          "humidity": 20.4,
          "pressure": 955.0,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 48.8,
          "humidity": 21.2,
          "pressure": 955.0,
          "is_anomaly": true
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 49.6,
          "humidity": 22.0,
          "pressure": 955.0,
          "is_anomaly": true
        }
      ]
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
      "neighbor_stations": [
        "MG-006",
        "MG-010",
        "MG-011"
      ],
      "neighbor_agreement": "3/3 neighbours concordance normal",
      "interpretation": "Nominal coastal operation",
      "reconstruction_error": 0.028,
      "adaptive_threshold": 0.052,
      "recommended_action": "Nominal operation. Next scheduled maintenance in 45 days.",
      "confidence": 98,
      "severity": "LOW",
      "classification": "NORMAL READING",
      "reasoning": "All 5 channels nominal. Autoencoder error 0.028 MSE well within adaptive threshold 0.052. Spatial correlation with neighbours r = 0.93.",
      "timestamp": "2026-09-28 21:45:00",
      "last_updated": "2 mins ago",
      "dispatched": false,
      "physics_checks": {
        "rate_of_change": true,
        "physical_bounds": true,
        "temp_rh_consistency": true,
        "temporal_continuity": true
      },
      "sensors": [
        {
          "type": "Temperature",
          "name": "Temperature Probe (PT100 RTD)",
          "serial": "SN-TMP-MG-012",
          "status": "Normal",
          "value": "32.8\u00b0C",
          "expected": "20.0\u00b0C - 42.0\u00b0C",
          "error_mse": 0.028,
          "last_calibrated": "2025-11-15"
        },
        {
          "type": "Humidity",
          "name": "Relative Humidity Transducer",
          "serial": "SN-HUM-MG-012",
          "status": "Normal",
          "value": "69.0%",
          "expected": "30.0% - 95.0%",
          "error_mse": 0.02,
          "last_calibrated": "2025-10-20"
        },
        {
          "type": "Pressure",
          "name": "Barometric Pressure Sensor",
          "serial": "SN-PRS-MG-012",
          "status": "Normal",
          "value": "1010.2 hPa",
          "expected": "750.0 - 1030.0 hPa",
          "error_mse": 0.015,
          "last_calibrated": "2025-12-01"
        },
        {
          "type": "Wind",
          "name": "Ultrasonic Anemometer",
          "serial": "SN-WND-MG-012",
          "status": "Normal",
          "value": "4.8 m/s",
          "expected": "< 25.0 m/s",
          "error_mse": 0.021,
          "last_calibrated": "2025-09-12"
        },
        {
          "type": "Rain",
          "name": "Tipping Bucket Rain Gauge",
          "serial": "SN-RN-MG-012",
          "status": "Normal",
          "value": "0.0 mm/hr",
          "expected": "Nominal",
          "error_mse": 0.008,
          "last_calibrated": "2025-08-05"
        }
      ],
      "neighbor_check": [
        {
          "id": "MG-006",
          "name": "Bengaluru Central AWS",
          "location": "Bengaluru",
          "dist_km": 244.8,
          "correlation": 0.94,
          "status": "SENSOR FAULT",
          "temp": 31.2,
          "humidity": 68.0,
          "pressure": 1007.8
        },
        {
          "id": "MG-010",
          "name": "Bhubaneswar Coastal AWS",
          "location": "Bhubaneswar",
          "dist_km": 972.3,
          "correlation": 0.94,
          "status": "WEATHER EVENT",
          "temp": 21.8,
          "humidity": 94.0,
          "pressure": 994.2
        },
        {
          "id": "MG-011",
          "name": "Hyderabad Begumpet AWS",
          "location": "Hyderabad",
          "dist_km": 520.0,
          "correlation": 0.94,
          "status": "SENSOR FAULT",
          "temp": 49.6,
          "humidity": 22.0,
          "pressure": 955.0
        }
      ],
      "temperature_history": [
        32.0,
        31.2,
        30.5,
        30.0,
        29.7,
        29.6,
        29.7,
        30.0,
        30.5,
        31.2,
        32.0,
        32.8,
        33.6,
        34.4,
        35.1,
        35.6,
        35.9,
        36.0,
        35.9,
        35.6,
        35.1,
        34.4,
        33.6,
        32.8
      ],
      "humidity_history": [
        70.2,
        71.4,
        72.4,
        73.2,
        73.6,
        73.8,
        73.6,
        73.2,
        72.4,
        71.4,
        70.2,
        69.0,
        67.8,
        66.6,
        65.6,
        64.8,
        64.4,
        64.2,
        64.4,
        64.8,
        65.6,
        66.6,
        67.8,
        69.0
      ],
      "pressure_history": [
        1010.4,
        1010.7,
        1010.9,
        1011.0,
        1011.1,
        1011.2,
        1011.1,
        1011.0,
        1010.9,
        1010.7,
        1010.4,
        1010.2,
        1010.0,
        1009.7,
        1009.5,
        1009.4,
        1009.3,
        1009.2,
        1009.3,
        1009.4,
        1009.5,
        1009.7,
        1010.0,
        1010.2
      ],
      "history": [
        {
          "timestamp": "2026-09-27 22:45:00",
          "time_label": "22:45",
          "temperature": 32.0,
          "humidity": 70.2,
          "pressure": 1010.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-27 23:45:00",
          "time_label": "23:45",
          "temperature": 31.2,
          "humidity": 71.4,
          "pressure": 1010.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 00:45:00",
          "time_label": "00:45",
          "temperature": 30.5,
          "humidity": 72.4,
          "pressure": 1010.9,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 01:45:00",
          "time_label": "01:45",
          "temperature": 30.0,
          "humidity": 73.2,
          "pressure": 1011.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 02:45:00",
          "time_label": "02:45",
          "temperature": 29.7,
          "humidity": 73.6,
          "pressure": 1011.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 03:45:00",
          "time_label": "03:45",
          "temperature": 29.6,
          "humidity": 73.8,
          "pressure": 1011.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 04:45:00",
          "time_label": "04:45",
          "temperature": 29.7,
          "humidity": 73.6,
          "pressure": 1011.1,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 05:45:00",
          "time_label": "05:45",
          "temperature": 30.0,
          "humidity": 73.2,
          "pressure": 1011.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 06:45:00",
          "time_label": "06:45",
          "temperature": 30.5,
          "humidity": 72.4,
          "pressure": 1010.9,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 07:45:00",
          "time_label": "07:45",
          "temperature": 31.2,
          "humidity": 71.4,
          "pressure": 1010.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 08:45:00",
          "time_label": "08:45",
          "temperature": 32.0,
          "humidity": 70.2,
          "pressure": 1010.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 09:45:00",
          "time_label": "09:45",
          "temperature": 32.8,
          "humidity": 69.0,
          "pressure": 1010.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 10:45:00",
          "time_label": "10:45",
          "temperature": 33.6,
          "humidity": 67.8,
          "pressure": 1010.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 11:45:00",
          "time_label": "11:45",
          "temperature": 34.4,
          "humidity": 66.6,
          "pressure": 1009.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 12:45:00",
          "time_label": "12:45",
          "temperature": 35.1,
          "humidity": 65.6,
          "pressure": 1009.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 13:45:00",
          "time_label": "13:45",
          "temperature": 35.6,
          "humidity": 64.8,
          "pressure": 1009.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 14:45:00",
          "time_label": "14:45",
          "temperature": 35.9,
          "humidity": 64.4,
          "pressure": 1009.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 15:45:00",
          "time_label": "15:45",
          "temperature": 36.0,
          "humidity": 64.2,
          "pressure": 1009.2,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 16:45:00",
          "time_label": "16:45",
          "temperature": 35.9,
          "humidity": 64.4,
          "pressure": 1009.3,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 17:45:00",
          "time_label": "17:45",
          "temperature": 35.6,
          "humidity": 64.8,
          "pressure": 1009.4,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 18:45:00",
          "time_label": "18:45",
          "temperature": 35.1,
          "humidity": 65.6,
          "pressure": 1009.5,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 19:45:00",
          "time_label": "19:45",
          "temperature": 34.4,
          "humidity": 66.6,
          "pressure": 1009.7,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 20:45:00",
          "time_label": "20:45",
          "temperature": 33.6,
          "humidity": 67.8,
          "pressure": 1010.0,
          "is_anomaly": false
        },
        {
          "timestamp": "2026-09-28 21:45:00",
          "time_label": "21:45",
          "temperature": 32.8,
          "humidity": 69.0,
          "pressure": 1010.2,
          "is_anomaly": false
        }
      ]
    }
  ]
};
