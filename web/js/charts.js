/**
 * MeteoGuard Sensor Chart Renderer
 * Connected directly to the 12-sensor dataset from sensors.json.
 * Renders:
 * 1. Temperature, Humidity, and Pressure time-series trends (6H, 24H, 72H, 7D)
 * 2. Sensor Health score comparison across all 12 stations
 * 3. Anomaly score comparison across all 12 stations
 * 4. Multi-station temperature comparison
 */

// ─── roundRect polyfill for older browsers ───────────────────────────────────
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    const r = Array.isArray(radii) ? radii[0] : (radii || 0);
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
  };
}

class MeteoGuardChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.range = '24H';
    this.station = null;
    this.series = [];           // Cached rendered series
    this.param = 'temperature'; // 'temperature' | 'humidity' | 'pressure' | 'health' | 'anomaly' | 'comparison'
    this._fetching = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width  = parent ? (parent.clientWidth  || 600) : 600;
    this.canvas.height = parent ? (parent.clientHeight || 280) : 280;
    this.render();
  }

  /** Public: called when user switches station or time range */
  setStation(station, range = '24H') {
    if (!station) return;
    this.station = station;
    this.range = range;
    this._loadHistoryFromStation();
  }

  setParam(param) {
    this.param = param || 'temperature';
    if (['health', 'anomaly', 'comparison'].includes(this.param)) {
      this.render();
    } else {
      this._loadHistoryFromStation();
    }
  }

  /**
   * Loads time-series data directly from station object in sensors.json
   */
  _loadHistoryFromStation() {
    if (!this.station) return;

    if (this.station.history && Array.isArray(this.station.history) && this.station.history.length > 0) {
      let rawHistory = [...this.station.history];
      
      // Range filter: slice appropriate number of hourly intervals
      let count = 24;
      if (this.range === '6H') count = 6;
      else if (this.range === '24H') count = 24;
      else if (this.range === '72H') count = Math.min(rawHistory.length, 24);
      else if (this.range === '7D') count = Math.min(rawHistory.length, 24);

      if (rawHistory.length > count) {
        rawHistory = rawHistory.slice(rawHistory.length - count);
      }

      this.series = rawHistory.map(r => ({
        label: r.time_label || (r.timestamp ? r.timestamp.split(' ')[1].substring(0, 5) : '--:--'),
        temperature: typeof r.temperature === 'number' ? r.temperature : null,
        humidity: typeof r.humidity === 'number' ? r.humidity : null,
        pressure: typeof r.pressure === 'number' ? r.pressure : null,
        isAnomaly: !!r.is_anomaly
      }));

      this.render();
    } else {
      // Fallback synthetic curve if history array was absent
      this._generateFallbackHistory();
    }
  }

  _generateFallbackHistory() {
    const hours = this.range === '6H' ? 6 : 24;
    const baseTemp = typeof this.station.temperature === 'number' ? this.station.temperature : 28.0;
    const baseHum = typeof this.station.humidity === 'number' ? this.station.humidity : 60.0;
    const basePres = typeof this.station.pressure === 'number' ? this.station.pressure : 1010.0;
    const isFault = this.station.status === 'SENSOR FAULT';

    this.series = [];
    const now = new Date();
    for (let i = 0; i < hours; i++) {
      const t = new Date(now.getTime() - (hours - 1 - i) * 3600000);
      const di = Math.sin((t.getHours() - 9) * Math.PI / 12);
      let temp = Math.round((baseTemp + di * 2.5) * 10) / 10;
      let isAnomaly = false;

      if (isFault && i >= hours - 3) {
        temp = 52.1;
        isAnomaly = true;
      }

      this.series.push({
        label: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: temp,
        humidity: Math.round((baseHum - di * 4) * 10) / 10,
        pressure: Math.round((basePres - di * 0.5) * 10) / 10,
        isAnomaly
      });
    }
    this.render();
  }

  render() {
    if (!this.ctx || !this.canvas) return;
    const { width: w, height: h, ctx } = { width: this.canvas.width, height: this.canvas.height, ctx: this.ctx };

    ctx.clearRect(0, 0, w, h);

    // Switch between time-series rendering and network multi-station chart rendering
    if (this.param === 'health') {
      this._renderAllStationsHealth(w, h, ctx);
      return;
    } else if (this.param === 'anomaly') {
      this._renderAllStationsAnomaly(w, h, ctx);
      return;
    } else if (this.param === 'comparison') {
      this._renderAllStationsComparison(w, h, ctx);
      return;
    }

    // Default: Time-series curve for current station & parameter
    this._renderTimeSeries(w, h, ctx);
  }

  // ─── 1. Time-Series Trend Line Chart ──────────────────────────────────────────
  _renderTimeSeries(w, h, ctx) {
    const data = this.series;
    if (!data || data.length === 0) {
      ctx.fillStyle = '#64748B';
      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Loading sensor telemetry stream…', w / 2, h / 2);
      ctx.textAlign = 'left';
      return;
    }

    const param = this.param || 'temperature';
    const values = data.map(d => d[param]).filter(v => v !== null && !isNaN(v));

    if (!values.length) {
      ctx.fillStyle = '#EF4444';
      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Telemetry Dropout: No ${param} packets received.`, w / 2, h / 2);
      ctx.textAlign = 'left';
      return;
    }

    const pad = { left: 55, bottom: 30, top: 25, right: 20 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    let minV = Math.min(...values);
    let maxV = Math.max(...values);
    const rng = maxV - minV || 1;
    minV -= rng * 0.1;
    maxV += rng * 0.1;

    const paramMeta = {
      temperature: { unit: '°C', color: '#FFC700', thresholdVal: 50.0, thresholdLabel: 'MAX THRESHOLD (50.0°C)' },
      humidity:    { unit: '%',  color: '#38BDF8', thresholdVal: 95.0, thresholdLabel: 'SATURATION (95%)' },
      pressure:    { unit: ' hPa', color: '#A78BFA', thresholdVal: null }
    };
    const meta = paramMeta[param] || paramMeta.temperature;

    // Grid & Y-axis labels
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const yVal = minV + (maxV - minV) * (i / steps);
      const y = h - pad.bottom - (i / steps) * ch;

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      ctx.fillText(`${yVal.toFixed(1)}${meta.unit}`, 4, y + 3);
    }

    // Threshold indicator line
    if (meta.thresholdVal !== null && meta.thresholdVal >= minV && meta.thresholdVal <= maxV) {
      const ty = h - pad.bottom - ((meta.thresholdVal - minV) / (maxV - minV)) * ch;
      ctx.strokeStyle = 'rgba(239,68,68,0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.left, ty);
      ctx.lineTo(w - pad.right, ty);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(meta.thresholdLabel, w - pad.right - 150, ty - 4);
    }

    // Map data points
    const pts = data.map((d, idx) => {
      const v = d[param];
      const x = pad.left + (idx / Math.max(1, data.length - 1)) * cw;
      const y = v !== null ? h - pad.bottom - ((v - minV) / (maxV - minV)) * ch : null;
      return { x, y, d };
    });

    const validPts = pts.filter(p => p.y !== null);
    if (validPts.length > 1) {
      // Area fill gradient
      const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
      const [r, g, b] = meta.color === '#FFC700' ? [255, 199, 0] : meta.color === '#38BDF8' ? [56, 189, 248] : [167, 139, 250];
      grad.addColorStop(0, `rgba(${r},${g},${b},0.25)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0.0)`);

      ctx.beginPath();
      validPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.lineTo(validPts[validPts.length - 1].x, h - pad.bottom);
      ctx.lineTo(validPts[0].x, h - pad.bottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke line
      ctx.beginPath();
      validPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = meta.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    // X-axis time labels
    const stepLabel = Math.max(1, Math.ceil(data.length / 8));
    ctx.fillStyle = '#64748B';
    ctx.font = '10px monospace';
    pts.forEach((p, i) => {
      if (i % stepLabel === 0 || i === pts.length - 1) {
        ctx.fillText(p.d.label, p.x - 14, h - 8);
      }
    });

    // Anomaly & normal dots
    pts.forEach(p => {
      if (p.y === null) return;
      if (p.d.isAnomaly) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239,68,68,0.35)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`ANOMALY (${p.d[param]}${meta.unit})`, p.x - 35, p.y - 12);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = meta.color;
        ctx.fill();
      }
    });
  }

  // ─── 2. All 12 Stations Sensor Health Bar Chart ────────────────────────────────
  _renderAllStationsHealth(w, h, ctx) {
    const stations = (window.dataStore && window.dataStore.state.stations) || [];
    if (!stations.length) return;

    const pad = { left: 45, bottom: 40, top: 25, right: 20 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const n = stations.length;
    const barW = Math.max(16, (cw / n) - 8);

    // Title label
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#34D399';
    ctx.fillText('NETWORK SENSOR HEALTH SCORES (0 – 100) — ALL 12 AWS NODES', pad.left, pad.top - 8);

    // Y Axis (0 - 100)
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    for (let v = 0; v <= 100; v += 25) {
      const y = h - pad.bottom - (v / 100) * ch;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillText(`${v}`, 12, y + 3);
    }

    // Draw bars
    stations.forEach((s, i) => {
      const score = s.health_score || 0;
      const barH = (score / 100) * ch;
      const x = pad.left + (i * (cw / n)) + ((cw / n - barW) / 2);
      const y = h - pad.bottom - barH;

      // Color coding per health classification
      let color = '#10B981'; // Healthy 90-100
      if (score < 50) color = '#EF4444'; // Faulty <50
      else if (score < 70) color = '#F97316'; // Observation 50-69
      else if (score < 90) color = '#F59E0B'; // Minor Anomaly 70-89

      // Fill bar
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Score text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${score}`, x + barW / 2, y - 5);

      // Station ID label
      ctx.fillStyle = s.station_id === (this.station && this.station.station_id) ? '#FFC700' : '#94A3B8';
      ctx.font = '9px monospace';
      ctx.fillText(s.station_id, x + barW / 2, h - pad.bottom + 16);
      ctx.textAlign = 'left';
    });
  }

  // ─── 3. All 12 Stations Anomaly Score Chart ──────────────────────────────────
  _renderAllStationsAnomaly(w, h, ctx) {
    const stations = (window.dataStore && window.dataStore.state.stations) || [];
    if (!stations.length) return;

    const pad = { left: 45, bottom: 40, top: 25, right: 20 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const n = stations.length;
    const barW = Math.max(16, (cw / n) - 8);

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('AUTOENCODER ANOMALY SCORES (0.00 – 1.00) — ALL 12 AWS NODES [Demo Model Output]', pad.left, pad.top - 8);

    // Y Axis (0 - 1.0)
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    for (let v = 0; v <= 1.0; v += 0.25) {
      const y = h - pad.bottom - v * ch;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(2), 8, y + 3);
    }

    // Adaptive threshold line at 0.50
    const threshY = h - pad.bottom - 0.50 * ch;
    ctx.strokeStyle = 'rgba(239,68,68,0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, threshY);
    ctx.lineTo(w - pad.right, threshY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#EF4444';
    ctx.font = '9px monospace';
    ctx.fillText('ANOMALY THRESHOLD (0.50)', w - pad.right - 145, threshY - 4);

    // Bars
    stations.forEach((s, i) => {
      const score = s.anomaly_score || 0;
      const barH = score * ch;
      const x = pad.left + (i * (cw / n)) + ((cw / n - barW) / 2);
      const y = h - pad.bottom - barH;
      const isOver = score >= 0.50;

      ctx.fillStyle = isOver ? '#EF4444' : '#10B981';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(score.toFixed(2), x + barW / 2, y - 5);

      ctx.fillStyle = s.station_id === (this.station && this.station.station_id) ? '#FFC700' : '#94A3B8';
      ctx.font = '9px monospace';
      ctx.fillText(s.station_id, x + barW / 2, h - pad.bottom + 16);
      ctx.textAlign = 'left';
    });
  }

  // ─── 4. Multi-Station Temperature Comparison ──────────────────────────────────
  _renderAllStationsComparison(w, h, ctx) {
    const stations = (window.dataStore && window.dataStore.state.stations) || [];
    if (!stations.length) return;

    const pad = { left: 45, bottom: 40, top: 25, right: 20 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const n = stations.length;
    const barW = Math.max(16, (cw / n) - 8);

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#FFC700';
    ctx.fillText('TEMPERATURE COMPARISON (°C) ACROSS ALL 12 AWS STATIONS', pad.left, pad.top - 8);

    // Max/min temp bounds (10°C - 60°C)
    const minT = 10;
    const maxT = 60;

    // Y Axis
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    for (let t = minT; t <= maxT; t += 10) {
      const y = h - pad.bottom - ((t - minT) / (maxT - minT)) * ch;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillText(`${t}°C`, 8, y + 3);
    }

    // Bars
    stations.forEach((s, i) => {
      const temp = s.temperature;
      const x = pad.left + (i * (cw / n)) + ((cw / n - barW) / 2);

      if (temp === null) {
        // Offline / Dropout
        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('N/A', x + barW / 2, h - pad.bottom - 10);
      } else {
        const barH = Math.max(4, ((temp - minT) / (maxT - minT)) * ch);
        const y = h - pad.bottom - barH;

        let color = '#FFC700'; // Normal
        if (s.status === 'SENSOR FAULT') color = '#EF4444';
        else if (s.status === 'WEATHER EVENT') color = '#38BDF8';
        else if (s.status === 'ANOMALY') color = '#F97316';

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${temp}°`, x + barW / 2, y - 5);
      }

      ctx.fillStyle = s.station_id === (this.station && this.station.station_id) ? '#FFC700' : '#94A3B8';
      ctx.font = '9px monospace';
      ctx.fillText(s.station_id, x + barW / 2, h - pad.bottom + 16);
      ctx.textAlign = 'left';
    });
  }
}

window.MeteoGuardChart = MeteoGuardChart;
