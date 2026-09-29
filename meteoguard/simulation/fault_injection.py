"""
MeteoGuard Synthetic Fault Injection Engine
Handles raw NOAA ISD baseline observations, derived fault injection layers, and predefined simulation scenarios.
"""

import math
import random
import uuid
from datetime import datetime, timedelta

class FaultInjector:
    """Manages synthetic fault injection for NOAA ISD weather station data streams."""
    
    def __init__(self):
        self.active_simulation = True
        self.current_scenario = "ISOLATED_SENSOR_FAULT"
        self.injection_log = []

    def inject_fault(self, station, sensor_type="Temperature", fault_type="SPIKE", severity="HIGH", duration_hours=3):
        """Applies synthetic fault transformation to a station's current sensor state."""
        injection_id = f"INJ-{uuid.uuid4().hex[:8].upper()}"
        
        orig_temp = station.get("temperature", 30.0)
        orig_rh = station.get("humidity", 65.0)
        orig_pres = station.get("pressure", 1008.0)
        
        injected_record = {
            "injection_id": injection_id,
            "is_injected_fault": True,
            "fault_type": fault_type,
            "target_sensor": sensor_type,
            "severity": severity,
            "duration_hours": duration_hours,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        if sensor_type == "Temperature":
            injected_record["original_value"] = orig_temp
            if fault_type == "SPIKE":
                # Instant thermal jump
                station["temperature"] = round(orig_temp + 18.5, 1)
                injected_record["injected_value"] = station["temperature"]
                station["status"] = "Sensor Fault"
                station["classification"] = "SENSOR FAULT"
                station["reasoning"] = f"[SPIKE FAULT INJECTED] Temperature abruptly surged from {orig_temp}°C to {station['temperature']}°C (+18.5°C/hr rate-of-change violation). Surrounding stations remain normal."
            
            elif fault_type == "DRIFT":
                # Progressive calibration drift
                station["temperature"] = round(orig_temp + 8.2, 1)
                injected_record["injected_value"] = station["temperature"]
                station["status"] = "Suspicious"
                station["classification"] = "SUSPICIOUS READING"
                station["reasoning"] = f"[DRIFT FAULT INJECTED] Temperature exhibiting progressive positive bias drift (+8.2°C deviation from historical diurnal baseline)."
            
            elif fault_type == "FLATLINE":
                # Frozen constant output
                station["temperature"] = 31.2
                injected_record["injected_value"] = 31.2
                station["status"] = "Sensor Fault"
                station["classification"] = "SENSOR FAULT"
                station["reasoning"] = "[FLATLINE FAULT INJECTED] Temperature probe output frozen at constant 31.2°C across consecutive sampling intervals."
            
            elif fault_type == "DROPOUT":
                # Missing telemetry values
                station["temperature"] = None
                injected_record["injected_value"] = None
                station["status"] = "Offline"
                station["classification"] = "STATION OFFLINE"
                station["reasoning"] = "[DROPOUT FAULT INJECTED] Telemetry packet dropout detected. Temperature stream null."
            
            elif fault_type == "OFFSET":
                # Sustained calibration shift
                station["temperature"] = round(orig_temp + 6.0, 1)
                injected_record["injected_value"] = station["temperature"]
                station["status"] = "Sensor Fault"
                station["classification"] = "SENSOR FAULT"
                station["reasoning"] = f"[OFFSET FAULT INJECTED] Sustained +6.0°C zero-point offset error detected on temperature transducer."
            
            elif fault_type == "NOISE":
                # Unrealistic high frequency noise
                station["temperature"] = round(orig_temp + (random.choice([-7.5, 8.1])), 1)
                injected_record["injected_value"] = station["temperature"]
                station["status"] = "Suspicious"
                station["classification"] = "SUSPICIOUS READING"
                station["reasoning"] = "[NOISE FAULT INJECTED] Extreme high-frequency variance detected on analog signal line."

        elif sensor_type == "Humidity":
            injected_record["original_value"] = orig_rh
            if fault_type in ["SPIKE", "DRIFT", "OFFSET"]:
                station["humidity"] = 99.8
                injected_record["injected_value"] = 99.8
                station["status"] = "Suspicious"
                station["classification"] = "SUSPICIOUS READING"
                station["reasoning"] = "[HUMIDITY DRIFT INJECTED] Relative humidity sensor saturated at 99.8% stuck condition."
            elif fault_type == "DROPOUT":
                station["humidity"] = None
                injected_record["injected_value"] = None
                station["status"] = "Offline"

        elif sensor_type == "Pressure":
            injected_record["original_value"] = orig_pres
            if fault_type == "FLATLINE":
                station["pressure"] = 1000.0
                injected_record["injected_value"] = 1000.0
                station["status"] = "Sensor Fault"
                station["classification"] = "SENSOR FAULT"
                station["reasoning"] = "[PRESSURE FLATLINE INJECTED] Barometer strain gauge output frozen."

        self.injection_log.append(injected_record)
        return injected_record

    def apply_preset_scenario(self, scenario_name, stations):
        """Applies structured scenario configurations to network station objects."""
        self.current_scenario = scenario_name

        if scenario_name == "ISOLATED_SENSOR_FAULT":
            # Scenario A: AWS-042 isolated temp spike
            for st in stations:
                if st["station_id"] == "AWS-042":
                    st["status"] = "Sensor Fault"
                    st["classification"] = "SENSOR FAULT"
                    st["temperature"] = 52.1
                    st["humidity"] = 70.0
                    st["pressure"] = 1009.1
                    st["confidence"] = 94
                    st["health_score"] = 38
                    st["severity"] = "CRITICAL"
                    st["anomaly_score"] = 0.94
                    st["reconstruction_error"] = 0.87
                    st["adaptive_threshold"] = 0.42
                    st["physics_checks"] = {"rate_of_change": False, "physical_bounds": True, "temp_rh_consistency": False, "temporal_continuity": False}
                    st["recommended_action"] = "1. Inspect temperature probe hardware\n2. Check signal wiring terminal\n3. Verify calibration with reference sensor"
                    st["reasoning"] = "The anomaly appears isolated to AWS-042. Nearby stations (AWS-041, AWS-043, AWS-044, AWS-045) did not observe a similar temperature spike (34.2°C avg vs 52.1°C), increasing the likelihood that the reading is caused by a sensor probe hardware issue rather than a regional weather event."
                    
                    # Ensure neighbours are marked normal
                    st["neighbour_check"] = [
                        {"id": "AWS-041", "name": "Chennai Meenambakkam", "dist_km": 12.4, "correlation": 0.91, "status": "Normal", "temp": 34.2},
                        {"id": "AWS-043", "name": "Chennai Port", "dist_km": 5.1, "correlation": 0.87, "status": "Normal", "temp": 34.5},
                        {"id": "AWS-044", "name": "Tambaram Air Force", "dist_km": 21.8, "correlation": 0.90, "status": "Normal", "temp": 34.1},
                        {"id": "AWS-045", "name": "Sriperumbudur", "dist_km": 36.2, "correlation": 0.84, "status": "Normal", "temp": 33.9}
                    ]

        elif scenario_name == "REGIONAL_WEATHER_EVENT":
            # Scenario B: Monsoonal storm squall front across Chennai cluster (AWS-041, AWS-042, AWS-043, AWS-044, AWS-045)
            cluster_ids = ["AWS-041", "AWS-042", "AWS-043", "AWS-044", "AWS-045"]
            for st in stations:
                if st["station_id"] in cluster_ids:
                    st["status"] = "Weather Event"
                    st["classification"] = "GENUINE REGIONAL WEATHER EVENT"
                    st["temperature"] = 22.4
                    st["humidity"] = 96.0
                    st["pressure"] = 992.1
                    st["confidence"] = 92
                    st["health_score"] = 94
                    st["severity"] = "HIGH"
                    st["anomaly_score"] = 0.82
                    st["reconstruction_error"] = 0.78
                    st["adaptive_threshold"] = 0.42
                    st["physics_checks"] = {"rate_of_change": False, "physical_bounds": True, "temp_rh_consistency": True, "temporal_continuity": True}
                    st["recommended_action"] = "Monitor coastal squall front progression. Sensors operating nominally; no technician dispatch required."
                    st["reasoning"] = f"Multi-station spatial corroboration CONFIRMED. All 5 neighbouring stations in the Chennai coastal cluster detected concurrent temperature drop (-8.5°C/hr) and barometric pressure drop (-7.2 hPa) matching a severe thunderstorm squall line."
                    
                    st["neighbour_check"] = [
                        {"id": nid, "name": f"Chennai Cluster AWS ({nid})", "dist_km": round(random.uniform(5.0, 30.0), 1), "correlation": 0.93, "status": "Weather Event", "temp": 22.4}
                        for nid in cluster_ids if nid != st["station_id"]
                    ]

        return stations

# Global instance
fault_engine = FaultInjector()
