/**
 * MeteoGuard Data Layer Module
 * Single Source of Truth: loads /data/sensors.json via fetch()
 * Manages reactive state, dashboard statistics calculation, and scenario simulations.
 */

class MeteoGuardDataStore {
  constructor() {
    this.state = {
      metadata: {
        source: "NOAA ISD — Prototype Data Source",
        disclaimer: "NOAA ISD is used as a proxy dataset for this prototype. Official IMD integration would be required for operational deployment.",
        last_sync: "--:--:--",
        system_status: "ONLINE",
        active_scenario: "12_SENSOR_CONTROL_ROOM",
        model_specification: {
          architecture: "Per-station Autoencoder (72 -> 16 -> 72)",
          type: "Demo Model Output",
          default_adaptive_threshold: 0.052,
          reconstruction_error_metric: "MSE"
        }
      },
      kpis: {
        total_stations: 12,
        total_sensors: 12,
        healthy: 3,
        under_observation: 4,
        suspicious: 2,
        anomalies: 2,
        anomalies_faults: 5,
        sensor_faults: 3,
        weather_events: 1,
        data_dropouts: 1,
        offline: 1,
        network_health: 65.8,
        active_alerts: 9
      },
      alerts: [],
      stations: [],
      selectedStationId: "MG-006",
      selectedAnomalyId: "MG-006",
      loadError: null,
      isLiveApi: false,
      listeners: []
    };
  }

  async initialize() {
    return await this.loadSensorData();
  }

  setApiEndpoint(url) {
    window.METEOGUARD_API_URL = url;
    return this.loadSensorData();
  }

  _normalizePayload(data) {
    if (!data) return null;
    if (data.stations && Array.isArray(data.stations)) {
      return data;
    }
    if (data.data && Array.isArray(data.data)) {
      return { stations: data.data, metadata: data.metadata || {}, alerts: data.alerts || [] };
    }
    if (Array.isArray(data)) {
      return { stations: data, metadata: {}, alerts: [] };
    }
    return null;
  }

  /**
   * Loads sensor dataset with multi-tier failover:
   * 1. Live REST API endpoints (/api/dashboard, /api/stations)
   * 2. Static dataset files (/data/sensors.json, demo_data.json)
   * 3. Pre-bundled offline embedded dataset (window.METEOGUARD_DEFAULT_DATASET)
   */
  async loadSensorData() {
    let loaded = false;
    let payload = null;

    // Tier 1: Attempt Live REST API connection if reachable
    const apiBase = window.METEOGUARD_API_URL || '';
    const liveEndpoints = [
      `${apiBase}/api/dashboard`,
      `${apiBase}/api/stations`
    ];

    for (const url of liveEndpoints) {
      try {
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) continue;
        const data = await res.json();
        const extracted = this._normalizePayload(data);
        if (extracted && extracted.stations && extracted.stations.length > 0) {
          payload = extracted;
          loaded = true;
          this.state.isLiveApi = true;
          this.state.metadata.source = "MeteoGuard Live REST API";
          console.info(`MeteoGuard: Connected to Live REST API at "${url}" (${payload.stations.length} stations)`);
          break;
        }
      } catch (err) {
        // Fall through to static datasets
      }
    }

    // Tier 2: Static JSON file candidates
    if (!loaded) {
      const staticCandidates = [
        '/data/sensors.json',
        'data/sensors.json',
        'web/data/sensors.json',
        './data/sensors.json',
        'demo_data.json'
      ];

      for (const path of staticCandidates) {
        try {
          const res = await fetch(path);
          if (!res.ok) continue;
          const data = await res.json();
          const extracted = this._normalizePayload(data);
          if (extracted && extracted.stations && extracted.stations.length > 0) {
            payload = extracted;
            loaded = true;
            this.state.isLiveApi = false;
            console.info(`MeteoGuard: Loaded ${payload.stations.length} sensors from "${path}"`);
            break;
          }
        } catch (err) {
          // Try next candidate
        }
      }
    }

    // Tier 3: Guaranteed offline embedded fallback (for file:// protocol or offline mode)
    if (!loaded && window.METEOGUARD_DEFAULT_DATASET) {
      try {
        payload = JSON.parse(JSON.stringify(window.METEOGUARD_DEFAULT_DATASET));
        loaded = true;
        this.state.isLiveApi = false;
        console.info("MeteoGuard: Loaded offline embedded dataset fallback (12 stations)");
      } catch (err) {
        console.error("MeteoGuard: Error parsing embedded dataset:", err);
      }
    }

    if (!loaded || !payload) {
      const errorMsg = "Sensor data unavailable\n\nUnable to load demo sensor dataset. Check data/sensors.json.";
      this.state.loadError = errorMsg;
      console.error(errorMsg);
      this.notifyError(errorMsg);
      return false;
    }

    // Assign data to state
    if (payload.metadata) this.state.metadata = { ...this.state.metadata, ...payload.metadata };
    this.state.stations = payload.stations;
    this.state.loadError = null;

    // Calculate dynamic dashboard stats
    this.calculateDashboardStats();

    // Hide error banner if previously visible
    const errorBanner = document.getElementById('dataErrorContainer');
    if (errorBanner) errorBanner.style.display = 'none';

    this.notifyListeners();
    return true;
  }

  /**
   * Recalculates all KPI metrics dynamically from the active sensor dataset.
   * Never relies on hardcoded numbers.
   */
  calculateDashboardStats() {
    const stations = this.state.stations;
    const total = stations.length;
    
    // Status normalizations
    const isHealthy = s => s.status === 'HEALTHY' || s.status === 'Normal';
    const isObservation = s => s.status === 'OBSERVATION' || s.status === 'Suspicious';
    const isAnomaly = s => s.status === 'ANOMALY';
    const isFault = s => s.status === 'SENSOR FAULT' || s.status === 'Sensor Fault';
    const isWeather = s => s.status === 'WEATHER EVENT' || s.status === 'Weather Event';
    const isDropout = s => s.status === 'DATA DROPOUT' || s.status === 'Offline';

    const healthyCount = stations.filter(isHealthy).length;
    const observationCount = stations.filter(isObservation).length;
    const anomalyCount = stations.filter(isAnomaly).length;
    const faultCount = stations.filter(isFault).length;
    const weatherCount = stations.filter(isWeather).length;
    const dropoutCount = stations.filter(isDropout).length;

    // Network Health derived from the 12 sensor health scores
    const totalHealthScore = stations.reduce((sum, s) => sum + (typeof s.health_score === 'number' ? s.health_score : 0), 0);
    const networkHealth = total > 0 ? (totalHealthScore / total).toFixed(1) : 0;

    // Reconstruct priority alerts from non-healthy stations
    const nonHealthy = stations.filter(s => !isHealthy(s));
    const sevOrder = { "CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3 };
    nonHealthy.sort((a, b) => (sevOrder[a.severity] ?? 4) - (sevOrder[b.severity] ?? 4));

    const alertsList = nonHealthy.map(s => {
      let problem = `${s.fault_type || 'Anomaly'} detected`;
      if (s.fault_type === 'Flatline') problem = "Flatline pattern detected.";
      else if (s.fault_type === 'Gradual Drift') problem = "Gradual drift detected.";
      else if (s.fault_type === 'Sudden Spike') problem = "Sudden spike detected.";
      else if (s.fault_type === 'Data Dropout') problem = "Data dropout detected.";
      else if (s.fault_type === 'Regional Weather Event') problem = "Regional weather anomaly.";
      else if (s.fault_type === 'Isolated Sensor Fault') problem = "Isolated sensor anomaly.";

      let sensorChannel = "Temperature Probe";
      if (s.fault_type === 'Humidity Anomaly') sensorChannel = "Relative Humidity Transducer";
      else if (s.fault_type === 'Pressure Anomaly') sensorChannel = "Barometric Pressure Sensor";
      else if (s.fault_type === 'Data Dropout') sensorChannel = "Telemetry Gateway";

      return {
        alert_id: `ALT-${s.station_id}`,
        severity: s.severity || "HIGH",
        station_id: s.station_id,
        station_name: s.station_name,
        location: s.location,
        problem: problem,
        sensor: sensorChannel,
        issue: s.classification || s.fault_type,
        current_value: s.temperature !== null && s.temperature !== undefined ? `${s.temperature}°C` : "OFFLINE",
        previous_expected_value: "Nominal Range",
        confidence: s.confidence ? `${s.confidence}%` : "92%",
        neighbor_agreement: s.neighbor_agreement || "4/4 normal",
        timestamp: s.timestamp || "Just now",
        time: s.timestamp ? s.timestamp.split(' ')[1] : "Just now",
        recommended_action: s.recommended_action || "Inspect sensor hardware.",
        reasoning: s.reasoning || s.fault_description,
        dispatched: s.dispatched || false
      };
    });

    this.state.alerts = alertsList;

    this.state.kpis = {
      total_stations: total,
      total_sensors: total,
      healthy: healthyCount,
      under_observation: observationCount + anomalyCount,
      suspicious: observationCount,
      anomalies: anomalyCount,
      anomalies_faults: faultCount + anomalyCount,
      sensor_faults: faultCount,
      weather_events: weatherCount,
      data_dropouts: dropoutCount,
      offline: dropoutCount,
      network_health: networkHealth,
      active_alerts: alertsList.length
    };
  }

  notifyError(msg) {
    const errorBanner = document.getElementById('dataErrorContainer');
    if (errorBanner) {
      errorBanner.style.display = 'flex';
      errorBanner.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div>
          <strong>Sensor data unavailable</strong><br/>
          <span>Unable to load demo sensor dataset. Check data/sensors.json.</span>
        </div>`;
    }
  }

  getStationById(id) {
    if (!id) return null;
    const cleanId = id.toUpperCase().trim();
    return this.state.stations.find(s => s.station_id.toUpperCase().trim() === cleanId);
  }

  getPlaces() {
    const set = new Set();
    this.state.stations.forEach(s => {
      if (s.location) set.add(s.location);
    });
    return Array.from(set).sort();
  }

  getSensors(placeFilter = "ALL", typeFilter = "ALL", statusFilter = "ALL", searchQuery = "") {
    const results = [];
    const q = searchQuery.toLowerCase().trim();
    const pl = placeFilter.toLowerCase().trim();

    this.state.stations.forEach(st => {
      const placeMatch = (placeFilter === "ALL" || 
                          (st.location && st.location.toLowerCase().includes(pl)) ||
                          st.station_name.toLowerCase().includes(pl) ||
                          st.station_id.toLowerCase().includes(pl));
      if (!placeMatch) return;

      const sensors = st.sensors || [
        { name: "Temperature Probe (PT100 RTD)", type: "Temperature", serial: `SN-TMP-${st.station_id}`, status: st.status === 'SENSOR FAULT' ? 'Fault' : 'Normal', value: st.temperature !== null ? `${st.temperature}°C` : '--', expected: "20.0°C - 42.0°C", error_mse: st.reconstruction_error || 0.03, last_calibrated: "2025-11-15" },
        { name: "Relative Humidity Transducer", type: "Humidity", serial: `SN-HUM-${st.station_id}`, status: st.fault_type === 'Humidity Anomaly' ? 'Fault' : 'Normal', value: st.humidity !== null ? `${st.humidity}%` : '--', expected: "30.0% - 95.0%", error_mse: 0.02, last_calibrated: "2025-10-20" },
        { name: "Barometric Pressure Sensor", type: "Pressure", serial: `SN-PRS-${st.station_id}`, status: st.fault_type === 'Pressure Anomaly' ? 'Warning' : 'Normal', value: st.pressure !== null ? `${st.pressure} hPa` : '--', expected: "750.0 - 1030.0 hPa", error_mse: 0.02, last_calibrated: "2025-12-01" },
        { name: "Ultrasonic Anemometer", type: "Wind", serial: `SN-WND-${st.station_id}`, status: st.status === 'DATA DROPOUT' ? 'Offline' : 'Normal', value: `${st.wind_speed || 3.5} m/s`, expected: "< 25.0 m/s", error_mse: 0.02, last_calibrated: "2025-09-12" },
        { name: "Tipping Bucket Rain Gauge", type: "Rain", serial: `SN-RN-${st.station_id}`, status: st.status === 'DATA DROPOUT' ? 'Offline' : 'Normal', value: st.status === 'WEATHER EVENT' ? "18.4 mm/hr" : "0.0 mm/hr", expected: "Nominal", error_mse: 0.01, last_calibrated: "2025-08-05" }
      ];

      sensors.forEach(sens => {
        const typeMatch = (typeFilter === "ALL" || sens.type.toLowerCase() === typeFilter.toLowerCase() || sens.name.toLowerCase().includes(typeFilter.toLowerCase()));
        const statusMatch = (statusFilter === "ALL" || sens.status.toLowerCase() === statusFilter.toLowerCase());
        const searchMatch = (!q || sens.name.toLowerCase().includes(q) || sens.serial.toLowerCase().includes(q) || st.station_id.toLowerCase().includes(q) || st.station_name.toLowerCase().includes(q));

        if (typeMatch && statusMatch && searchMatch) {
          results.push({
            ...sens,
            station_id: st.station_id,
            station_name: st.station_name,
            place_name: st.location,
            station_status: st.status,
            reasoning: st.reasoning
          });
        }
      });
    });

    return results;
  }

  async applyScenario(scenarioName) {
    this.state.metadata.active_scenario = scenarioName;

    if (scenarioName === "ISOLATED_SENSOR_FAULT") {
      // Focus on MG-011 (Isolated sensor fault)
      const st = this.getStationById("MG-011");
      if (st) {
        st.status = "SENSOR FAULT";
        st.classification = "SENSOR FAULT";
        st.temperature = 49.6;
        st.anomaly_score = 0.89;
        st.reconstruction_error = 0.089;
        st.health_score = 39;
        st.severity = "CRITICAL";
        st.fault_type = "Isolated Sensor Fault";
        st.fault_description = "Isolated sensor anomaly detected. Reading +17.2°C above surrounding stations.";
        st.neighbor_agreement = "0/4 neighbouring stations show similar behaviour (0% agreement) → Likely sensor fault";
        st.reasoning = "Isolated hardware fault: MG-011 registered severe thermal surge to 49.6°C (+17.2°C above regional baseline). Spatial corroboration across 4 surrounding stations within 150km radius showed 0% correlation (p < 0.001). Surrounding stations average 31.4°C.";
        st.recommended_action = "Cross-check and inspect station. Dispatch technician to replace thermistor element.";
        this.state.selectedAnomalyId = "MG-011";
      }
    } else if (scenarioName === "REGIONAL_WEATHER_EVENT") {
      // Focus on MG-010 (Regional weather event)
      const st = this.getStationById("MG-010");
      if (st) {
        st.status = "WEATHER EVENT";
        st.classification = "GENUINE REGIONAL WEATHER EVENT";
        st.temperature = 21.8;
        st.humidity = 94.0;
        st.pressure = 994.2;
        st.anomaly_score = 0.78;
        st.health_score = 91;
        st.severity = "HIGH";
        st.fault_type = "Regional Weather Event";
        st.fault_description = "Regional weather anomaly detected: coastal severe thunderstorm squall front.";
        st.neighbor_agreement = "3/4 neighbouring stations show similar behaviour (75% agreement) → Likely genuine weather event";
        st.reasoning = "Regional weather anomaly. Multi-station spatial corroboration confirmed: 3 out of 4 neighbouring regional AWS nodes concurrently observed sudden temperature drop (-8.2°C/hr), pressure drop (-7.6 hPa), and gale wind surge. Automated false-alarm suppression engaged.";
        st.recommended_action = "Monitor weather event; do not immediately dispatch technician. Environmental disturbance corroborated across network.";
        this.state.selectedAnomalyId = "MG-010";
      }
    }

    this.calculateDashboardStats();
    this.notifyListeners();
  }

  async injectCustomFault(stationId, sensorType, faultType) {
    const st = this.getStationById(stationId);
    if (!st) return;

    if (faultType === "SPIKE") {
      st.temperature = 53.4;
      st.status = "SENSOR FAULT";
      st.classification = "SENSOR FAULT";
      st.fault_type = "Sudden Spike";
      st.health_score = 35;
      st.anomaly_score = 0.89;
      st.reconstruction_error = 0.091;
      st.recommended_action = "Verify sensor calibration. Check wiring harness and probe continuity.";
      st.reasoning = `[SYNTHETIC SPIKE] Temperature surged instantaneously to 53.4°C on ${stationId}. Rate of change exceeded limit.`;
    } else if (faultType === "DRIFT") {
      st.temperature = (st.temperature || 30.0) + 7.5;
      st.status = "OBSERVATION";
      st.classification = "SUSPICIOUS READING";
      st.fault_type = "Gradual Drift";
      st.health_score = 62;
      st.anomaly_score = 0.65;
      st.reconstruction_error = 0.061;
      st.recommended_action = "Schedule calibration. Two-point reference calibration required.";
      st.reasoning = `[SYNTHETIC DRIFT] Progressive positive calibration bias detected on ${stationId}.`;
    } else if (faultType === "FLATLINE") {
      st.temperature = 31.2;
      st.status = "SENSOR FAULT";
      st.classification = "SENSOR FAULT";
      st.fault_type = "Flatline";
      st.health_score = 42;
      st.anomaly_score = 0.91;
      st.reconstruction_error = 0.087;
      st.recommended_action = "Inspect sensor hardware. Power cycle ADC and inspect RTD bridge circuit.";
      st.reasoning = `[SYNTHETIC FLATLINE] Sensor telemetry output frozen at 31.2°C on ${stationId}.`;
    } else if (faultType === "DROPOUT") {
      st.temperature = null;
      st.humidity = null;
      st.pressure = null;
      st.wind_speed = null;
      st.status = "DATA DROPOUT";
      st.classification = "STATION OFFLINE";
      st.fault_type = "Data Dropout";
      st.health_score = 25;
      st.anomaly_score = 0.95;
      st.reconstruction_error = 0.120;
      st.recommended_action = "Check connectivity/power. Verify modem signal, battery, and antenna.";
      st.reasoning = `[SYNTHETIC DROPOUT] Complete loss of telemetry stream on ${stationId}.`;
    }

    this.calculateDashboardStats();
    this.notifyListeners();
  }

  async resetSimulation() {
    await this.loadSensorData();
    this.state.selectedAnomalyId = "MG-006";
    this.calculateDashboardStats();
    this.notifyListeners();
  }

  dispatchTechnician(stationId) {
    const station = this.getStationById(stationId);
    if (station) {
      station.dispatched = true;
      station.recommended_action = `[TECHNICIAN DISPATCHED] Field engineer assigned to inspect station ${stationId} (${station.location}). Priority dispatch logged.`;
      this.calculateDashboardStats();
      this.notifyListeners();
    }
  }

  resolveStation(stationId) {
    const station = this.getStationById(stationId);
    if (station) {
      const originalFaultType = station.fault_type; // Save before overwriting
      station.status = "HEALTHY";
      station.classification = "NORMAL READING";
      station.fault_type = "None";
      station.fault_description = "Sensor verified and recalibrated by maintenance technician. Nominal operation restored.";
      station.severity = "LOW";
      station.health_score = 98;
      station.anomaly_score = 0.09;
      station.reconstruction_error = 0.026;
      station.dispatched = false;
      station.neighbor_agreement = "Concordance verified normal across all neighbours";
      station.interpretation = "Nominal operation verified";
      station.recommended_action = "Optimal operation. Verification complete. Next scheduled cycle in 60 days.";
      station.reasoning = "All sensor parameters re-verified and adhering strictly to physical bounds and diurnal baseline.";
      
      if (station.temperature === null) {
        station.temperature = 29.2;
        station.humidity = 64.0;
        station.pressure = 1008.5;
        station.wind_speed = 3.6;
      } else if (originalFaultType === 'Flatline' || station.temperature > 45) {
        station.temperature = 28.5;
      }

      this.calculateDashboardStats();
      this.notifyListeners();
    }
  }

  refreshLiveData() {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    this.state.metadata.last_sync = timeStr;
    
    // Simulate slight natural physical fluctuations on healthy sensors
    this.state.stations.forEach(st => {
      if ((st.status === "HEALTHY" || st.status === "Normal") && typeof st.temperature === 'number') {
        const delta = (Math.random() - 0.5) * 0.2;
        st.temperature = Math.round((st.temperature + delta) * 10) / 10;
        st.last_updated = timeStr;
      }
    });

    this.notifyListeners();
  }

  subscribe(listener) {
    this.state.listeners.push(listener);
  }

  notifyListeners() {
    this.state.listeners.forEach(fn => fn(this.state));
  }
}

// Global data layer instance
window.dataStore = new MeteoGuardDataStore();
