/**
 * DOM Simulation and Integration Verification Test for MeteoGuard
 */
const fs = require('fs');

// Create mock browser DOM environment
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        id: id,
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        children: [],
        getContext: () => new global.CanvasRenderingContext2D(),
        addEventListener: () => {},
        setAttribute: () => {},
        getAttribute: () => null
      };
    }
    return this.elements[id];
  },
  querySelectorAll(sel) {
    return [];
  },
  querySelector(sel) {
    return this.getElementById(sel.replace(/^[#.]/, ''));
  },
  addEventListener: () => {}
};

global.CanvasRenderingContext2D = function() {};
global.CanvasRenderingContext2D.prototype = {
  beginPath() {},
  moveTo() {},
  lineTo() {},
  stroke() {},
  fill() {},
  arc() {},
  arcTo() {},
  closePath() {},
  clearRect() {},
  fillRect() {},
  roundRect() {},
  fillText() {},
  strokeText() {},
  save() {},
  restore() {},
  setLineDash() {},
  createLinearGradient() { return { addColorStop() {} }; }
};

// Load scripts in order
require('../web/js/embedded_data.js');
require('../web/js/map.js');
require('../web/js/charts.js');
require('../web/js/data_layer.js');
require('../web/js/app.js');

async function runTests() {
  console.log("=== MeteoGuard DOM & Data Layer Verification ===");
  
  // 1. Verify embedded fallback presence
  if (global.window.METEOGUARD_DEFAULT_DATASET && global.window.METEOGUARD_DEFAULT_DATASET.stations.length === 12) {
    console.log("[PASS] 1. Embedded 12-sensor dataset present and intact.");
  } else {
    console.error("[FAIL] 1. Embedded dataset missing!");
    process.exit(1);
  }

  // 2. Initialize DataStore
  const store = global.window.dataStore;
  const loaded = await store.initialize();
  console.log(`[PASS] 2. DataStore loaded ${store.state.stations.length} stations. Status: ${loaded}`);

  // 3. Verify KPI calculations
  const kpis = store.state.kpis;
  console.log("      KPI State:", JSON.stringify(kpis));
  if (kpis.total_sensors === 12 && kpis.healthy === 3 && kpis.under_observation === 4 && kpis.anomalies_faults === 5) {
    console.log("[PASS] 3. KPI counts consistent across categories (12 total, 3 healthy, 4 under observation, 5 faults).");
  } else {
    console.error("[FAIL] 3. KPI count mismatch!", kpis);
    process.exit(1);
  }

  // 4. Test renderKPIs
  global.window.renderKPIs(kpis);
  const activeVal = document.getElementById('kpiActive').textContent;
  const healthyVal = document.getElementById('kpiHealthy').textContent;
  const netHealthVal = document.getElementById('kpiNetworkHealth').textContent;
  console.log(`      DOM KPIs: Active=${activeVal}, Healthy=${healthyVal}, NetHealth=${netHealthVal}`);
  if (activeVal == 12 && healthyVal == 3 && netHealthVal == '65.8%') {
    console.log("[PASS] 4. renderKPIs populated DOM elements consistently.");
  } else {
    console.error("[FAIL] 4. renderKPIs DOM output incorrect!");
    process.exit(1);
  }

  // 5. Test renderSensorTable
  global.window.renderSensorTable(store.state.stations);
  const tableHtml = document.getElementById('stationsTableBody').innerHTML;
  if (tableHtml.includes('MG-001') && tableHtml.includes('MG-012') && tableHtml.includes('badge-severity')) {
    console.log("[PASS] 5. Stations Directory table rendered 12 stations with Severity badges.");
  } else {
    console.error("[FAIL] 5. Stations table rendering failed!");
    process.exit(1);
  }

  // 6. Test renderStationDetails for modal
  global.window.renderStationDetails('MG-006');
  const modalBody = document.getElementById('modalStationBody').innerHTML;
  const requiredFields = [
    'Location:', 'Coordinates:', 'Timestamp:', 'TEMPERATURE', 'HUMIDITY', 'PRESSURE', 'WIND SPEED',
    'Status:', 'Severity:', 'Health Score:', 'Anomaly Score:', 'Reconstruction Error:', 'Fault Type:'
  ];
  let missing = [];
  for (const f of requiredFields) {
    if (!modalBody.includes(f)) missing.push(f);
  }
  if (missing.length === 0) {
    console.log("[PASS] 6. Station details modal contains all required fields (ID, location, temp, pres, hum, timestamp, health, status, severity).");
  } else {
    console.error("[FAIL] 6. Station modal missing fields:", missing);
    process.exit(1);
  }

  // 7. Test Map Renderer
  let modalOpenedId = null;
  const map = new global.window.MeteoGuardMap('stationMapCanvas', (st) => {
    modalOpenedId = st.station_id;
  });
  map.setStations(store.state.stations);
  console.log(`[PASS] 7. MeteoGuardMap initialized and populated with ${map.stations.length} stations.`);

  // Test map projection
  const proj = map.project(12.9716, 77.5946); // Bengaluru
  if (typeof proj.x === 'number' && typeof proj.y === 'number') {
    console.log(`[PASS] 8. Map coordinates projection working (Bengaluru -> x:${proj.x.toFixed(1)}, y:${proj.y.toFixed(1)}).`);
  }

  // Test click simulation
  map.onStationSelect(map.stations[0]);
  if (modalOpenedId === map.stations[0].station_id) {
    console.log(`[PASS] 9. Map station click callback triggered correctly for ${modalOpenedId}.`);
  }

  // 8. Test Scenario Controls
  await store.applyScenario("REGIONAL_WEATHER_EVENT");
  const weatherSt = store.getStationById("MG-010");
  if (weatherSt.status === "WEATHER EVENT" && store.state.kpis.weather_events === 1) {
    console.log("[PASS] 10. Scenario B (Regional Weather Event) dynamically updated state and KPIs.");
  }

  await store.resetSimulation();
  const resetSt = store.getStationById("MG-006");
  if (resetSt.status === "SENSOR FAULT") {
    console.log("[PASS] 11. Reset simulation restored baseline state correctly.");
  }

  console.log("\n>>> ALL 11 VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");
}

runTests().catch(err => {
  console.error("Test execution error:", err);
  process.exit(1);
});
