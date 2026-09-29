/**
 * MeteoGuard AWS Network Map Renderer
 * Interactive canvas map plotting AWS stations across geographic coordinates
 * with spatial links, place labels, interactive hover tooltips, and station diagnostics modal trigger.
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

class MeteoGuardMap {
  constructor(canvasId, onStationSelect) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.onStationSelect = onStationSelect;
    this.stations = [];
    this.filterStatus = 'All';
    this.selectedStation = null;
    this.hoveredStation = null;
    
    // Geographic bounds for India viewport (Lat 6.5°N - 37.5°N, Lon 67.0°E - 98.0°E)
    this.minLat = 6.5;
    this.maxLat = 37.5;
    this.minLon = 67.0;
    this.maxLon = 98.0;

    this.panX = 0;
    this.panY = 0;
    this.zoom = 1.0;

    this.isDragging = false;
    this.hasDragged = false;
    this.startX = 0;
    this.startY = 0;
    this.startPanX = 0;
    this.startPanY = 0;

    this.initEvents();
    this.resizeCanvas();

    // Auto-resize observer if container dimensions change
    if (window.ResizeObserver && this.canvas.parentElement) {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.canvas.parentElement);
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const w = parent ? parent.clientWidth : 0;
    const h = parent ? parent.clientHeight : 0;
    if (w > 50) this.canvas.width = w;
    else if (!this.canvas.width || this.canvas.width < 100) this.canvas.width = 850;
    if (h > 50) this.canvas.height = h;
    else if (!this.canvas.height || this.canvas.height < 100) this.canvas.height = 520;
    this.render();
  }

  setStations(stations) {
    this.stations = Array.isArray(stations) ? stations : [];
    // If selected station was updated in dataStore, refresh reference
    if (this.selectedStation) {
      const updated = this.stations.find(s => s.station_id === this.selectedStation.station_id);
      if (updated) this.selectedStation = updated;
    }
    this.render();
  }

  setFilter(status) {
    this.filterStatus = status || 'All';
    this.render();
  }

  setSelectedStation(station) {
    this.selectedStation = station;
    this.render();
  }

  zoomIn() {
    this.zoom = Math.min(5.0, this.zoom * 1.25);
    this.render();
  }

  zoomOut() {
    this.zoom = Math.max(0.7, this.zoom / 1.25);
    this.render();
  }

  resetView() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.selectedStation = null;
    this.render();
  }

  project(lat, lon) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    const padding = 60;
    const mapW = w - padding * 2;
    const mapH = h - padding * 2;

    const normX = (lon - this.minLon) / (this.maxLon - this.minLon);
    const normY = (lat - this.minLat) / (this.maxLat - this.minLat);

    const x = padding + normX * mapW;
    const y = h - padding - normY * mapH;

    // Apply zoom and pan anchored to canvas center
    const cx = w / 2;
    const cy = h / 2;
    return {
      x: cx + (x - cx) * this.zoom + this.panX,
      y: cy + (y - cy) * this.zoom + this.panY
    };
  }

  render() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Clear background
    this.ctx.fillStyle = '#060911';
    this.ctx.fillRect(0, 0, w, h);

    // Draw background subtle latitude/longitude grid
    this.drawGeoGrid(w, h);

    // Draw India outline vector mesh
    this.drawIndiaOutline();

    // Filter stations based on selected filter chip
    const filtered = this.stations.filter(s => {
      const st = (s.status || '').toUpperCase();
      if (this.filterStatus === 'All') return true;
      if (this.filterStatus === 'Faults') return st === 'SENSOR FAULT';
      if (this.filterStatus === 'Weather Events') return st === 'WEATHER EVENT';
      if (this.filterStatus === 'Suspicious') return st === 'OBSERVATION' || st === 'SUSPICIOUS' || st === 'ANOMALY';
      if (this.filterStatus === 'Offline') return st === 'DATA DROPOUT' || st === 'OFFLINE';
      if (this.filterStatus === 'Healthy') return st === 'HEALTHY' || st === 'NORMAL';
      return true;
    });

    // Draw Spatial corroboration connections if a station is selected
    if (this.selectedStation && this.selectedStation.neighbor_check) {
      const p1 = this.project(this.selectedStation.latitude, this.selectedStation.longitude);
      this.selectedStation.neighbor_check.forEach(nb => {
        const nSt = this.stations.find(s => s.station_id === nb.id);
        if (nSt) {
          const p2 = this.project(nSt.latitude, nSt.longitude);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          const isFault = (this.selectedStation.status || '').toUpperCase().includes('FAULT');
          this.ctx.strokeStyle = isFault ? 'rgba(239, 68, 68, 0.75)' : 'rgba(56, 189, 248, 0.75)';
          this.ctx.lineWidth = 2;
          this.ctx.setLineDash([5, 4]);
          this.ctx.stroke();
          this.ctx.setLineDash([]);

          // Draw correlation badge on midpoint
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          this.ctx.fillStyle = 'rgba(18, 26, 44, 0.9)';
          this.ctx.strokeStyle = isFault ? '#EF4444' : '#38BDF8';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.roundRect(midX - 28, midY - 9, 56, 18, 3);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.fillStyle = '#E2E8F0';
          this.ctx.font = '9px monospace';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(`${nb.dist_km}km`, midX, midY + 3);
          this.ctx.textAlign = 'left';
        }
      });
    }

    // Draw Station Markers & Place Labels
    filtered.forEach(st => {
      const pt = this.project(st.latitude, st.longitude);
      const statusUpper = (st.status || 'NORMAL').toUpperCase();
      
      let color = '#10B981'; // Green
      if (statusUpper.includes('FAULT')) color = '#EF4444';
      else if (statusUpper.includes('WEATHER')) color = '#38BDF8';
      else if (statusUpper.includes('OBSERVATION') || statusUpper.includes('SUSPICIOUS')) color = '#F59E0B';
      else if (statusUpper.includes('ANOMALY')) color = '#FB923C';
      else if (statusUpper.includes('DROPOUT') || statusUpper.includes('OFFLINE')) color = '#64748B';

      const isSelected = this.selectedStation && this.selectedStation.station_id === st.station_id;
      const isHovered = this.hoveredStation && this.hoveredStation.station_id === st.station_id;

      // Outer Pulse / Glow Ring for Anomalies, Faults, Selected or Hovered
      if (statusUpper !== 'HEALTHY' && statusUpper !== 'NORMAL' || isSelected || isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, isSelected ? 15 : (isHovered ? 12 : 9), 0, Math.PI * 2);
        this.ctx.fillStyle = isSelected 
          ? 'rgba(255, 199, 0, 0.35)' 
          : (color === '#EF4444' ? 'rgba(239, 68, 68, 0.35)' : (color === '#38BDF8' ? 'rgba(56, 189, 248, 0.35)' : 'rgba(245, 158, 11, 0.3)'));
        this.ctx.fill();
      }

      // Selection indicator ring
      if (isSelected) {
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#FFC700';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      // Core Marker Dot
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, isSelected ? 6.5 : 5, 0, Math.PI * 2);
      this.ctx.fillStyle = isSelected ? '#FFC700' : color;
      this.ctx.fill();
      this.ctx.strokeStyle = '#060911';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Geographic Place Name & Station ID Label
      const placeName = st.location || st.station_name.replace(' AWS', '').replace(' Sub-station', '');
      const tempStr = st.temperature !== null && st.temperature !== undefined ? `${st.temperature}°` : 'OFFLINE';
      
      this.ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
      let labelColor = '#E2E8F0';
      if (isSelected) labelColor = '#FFC700';
      else if (statusUpper.includes('FAULT')) labelColor = '#FCA5A5';
      else if (statusUpper.includes('WEATHER')) labelColor = '#BAE6FD';
      else if (statusUpper.includes('ANOMALY')) labelColor = '#FED7AA';

      // Draw dark outline for high contrast against dark canvas
      const labelText = `${placeName} (${st.station_id})`;
      this.ctx.strokeStyle = '#060911';
      this.ctx.lineWidth = 3;
      this.ctx.strokeText(labelText, pt.x + 9, pt.y + 4);
      this.ctx.fillStyle = labelColor;
      this.ctx.fillText(labelText, pt.x + 9, pt.y + 4);

      // Temperature indicator tag
      this.ctx.font = '9px monospace';
      this.ctx.fillStyle = '#94A3B8';
      this.ctx.strokeText(tempStr, pt.x + 9, pt.y + 15);
      this.ctx.fillText(tempStr, pt.x + 9, pt.y + 15);
    });

    // Compass indicator (North)
    this.drawCompass(w, h);

    // Draw Tooltip for Hovered or Selected Station
    const targetInfo = this.hoveredStation || this.selectedStation;
    if (targetInfo) {
      this.drawMapTooltip(targetInfo);
    }
  }

  drawGeoGrid(w, h) {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 1;

    // Latitudes (10, 15, 20, 25, 30, 35)
    for (let lat = 10; lat <= 35; lat += 5) {
      const p1 = this.project(lat, this.minLon);
      const p2 = this.project(lat, this.maxLon);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();

      this.ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      this.ctx.font = '9px monospace';
      this.ctx.fillText(`${lat}°N`, 10, p1.y + 3);
    }

    // Longitudes (70, 75, 80, 85, 90, 95)
    for (let lon = 70; lon <= 95; lon += 5) {
      const p1 = this.project(this.minLat, lon);
      const p2 = this.project(this.maxLat, lon);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();

      this.ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      this.ctx.font = '9px monospace';
      this.ctx.fillText(`${lon}°E`, p1.x - 12, h - 8);
    }
  }

  drawCompass(w, h) {
    const cx = w - 45;
    const cy = 45;
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(18, 26, 44, 0.8)';
    this.ctx.strokeStyle = 'rgba(255, 199, 0, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // North pointer arrow
    this.ctx.fillStyle = '#FFC700';
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - 12);
    this.ctx.lineTo(cx - 4, cy + 6);
    this.ctx.lineTo(cx, cy + 2);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = '#64748B';
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - 12);
    this.ctx.lineTo(cx + 4, cy + 6);
    this.ctx.lineTo(cx, cy + 2);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = '#FFC700';
    this.ctx.font = 'bold 8px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('N', cx, cy - 13);
    this.ctx.restore();
  }

  drawMapTooltip(st) {
    const pt = this.project(st.latitude, st.longitude);
    const ctx = this.ctx;
    
    const cardW = 270;
    const cardH = 145;
    let cardX = pt.x + 16;
    let cardY = pt.y - 65;

    // Bounds checking
    if (cardX + cardW > this.canvas.width) cardX = pt.x - cardW - 16;
    if (cardY + cardH > this.canvas.height) cardY = this.canvas.height - cardH - 12;
    if (cardY < 12) cardY = 12;

    // Background Card Panel with drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#121A2C';
    ctx.strokeStyle = '#FFC700';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Title / Station ID
    ctx.fillStyle = '#FFC700';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(`${st.station_id} — ${st.station_name || st.location}`, cardX + 12, cardY + 20);

    // Coordinates & Timestamp
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px monospace';
    ctx.fillText(`📍 ${st.latitude.toFixed(4)}°N, ${st.longitude.toFixed(4)}°E`, cardX + 12, cardY + 36);
    ctx.fillText(`🕒 ${st.timestamp || st.last_updated || 'Realtime'}`, cardX + 12, cardY + 50);

    // Telemetry stream values
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '11px Inter, sans-serif';
    const tempStr = st.temperature !== null && st.temperature !== undefined ? `${st.temperature}°C` : 'OFFLINE';
    const rhStr = st.humidity !== null && st.humidity !== undefined ? `${st.humidity}%` : 'OFFLINE';
    const presStr = st.pressure !== null && st.pressure !== undefined ? `${st.pressure} hPa` : 'OFFLINE';
    const windStr = st.wind_speed !== null && st.wind_speed !== undefined ? `${st.wind_speed} m/s` : '--';
    ctx.fillText(`Temp: ${tempStr} | RH: ${rhStr}`, cardX + 12, cardY + 70);
    ctx.fillText(`Pressure: ${presStr} | Wind: ${windStr}`, cardX + 12, cardY + 86);

    // Status & Severity
    const statusUpper = (st.status || 'NORMAL').toUpperCase();
    let statusColor = '#10B981';
    if (statusUpper.includes('FAULT')) statusColor = '#EF4444';
    else if (statusUpper.includes('WEATHER')) statusColor = '#38BDF8';
    else if (statusUpper.includes('OBSERVATION') || statusUpper.includes('ANOMALY')) statusColor = '#F59E0B';
    else if (statusUpper.includes('DROPOUT')) statusColor = '#64748B';

    ctx.fillStyle = statusColor;
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText(`Status: ${st.status} (Severity: ${st.severity || 'LOW'})`, cardX + 12, cardY + 106);

    // Health Score & Click Hint
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText(`Health: ${st.health_score}/100 | Anomaly: ${st.anomaly_score !== undefined ? Number(st.anomaly_score).toFixed(2) : '--'}`, cardX + 12, cardY + 122);
    
    ctx.fillStyle = '#FFC700';
    ctx.font = '9px Inter, sans-serif';
    ctx.fillText(`👉 Click station to view full diagnostics`, cardX + 12, cardY + 137);
  }

  drawIndiaOutline() {
    const boundary = [
      {lat: 35.5, lon: 77.0}, {lat: 34.5, lon: 74.0}, {lat: 32.5, lon: 75.8},
      {lat: 30.0, lon: 78.0}, {lat: 27.5, lon: 88.0}, {lat: 28.0, lon: 95.0},
      {lat: 24.0, lon: 93.5}, {lat: 22.0, lon: 88.5}, {lat: 18.0, lon: 84.0},
      {lat: 13.0, lon: 80.2}, {lat: 8.1, lon: 77.5},  {lat: 12.0, lon: 75.0},
      {lat: 16.0, lon: 73.5}, {lat: 20.0, lon: 72.8}, {lat: 23.5, lon: 68.5},
      {lat: 28.0, lon: 70.0}, {lat: 32.0, lon: 71.0}, {lat: 35.5, lon: 77.0}
    ];

    this.ctx.beginPath();
    boundary.forEach((pt, i) => {
      const p = this.project(pt.lat, pt.lon);
      if (i === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.closePath();
    this.ctx.strokeStyle = 'rgba(255, 199, 0, 0.22)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.fillStyle = 'rgba(255, 199, 0, 0.025)';
    this.ctx.fill();
  }

  initEvents() {
    if (!this.canvas) return;

    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.hasDragged = false;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startPanX = this.panX;
      this.startPanY = this.panY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        if (Math.hypot(dx, dy) > 4) {
          this.hasDragged = true;
        }
        this.panX = this.startPanX + dx;
        this.panY = this.startPanY + dy;
        this.render();
      } else {
        // Station hover detection
        let found = null;
        for (let st of this.stations) {
          const pt = this.project(st.latitude, st.longitude);
          if (Math.hypot(pt.x - mouseX, pt.y - mouseY) < 14) {
            found = st;
            break;
          }
        }
        if (found) {
          this.canvas.style.cursor = 'pointer';
        } else {
          this.canvas.style.cursor = 'grab';
        }
        if (this.hoveredStation !== found) {
          this.hoveredStation = found;
          this.render();
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      if (this.canvas) this.canvas.style.cursor = 'grab';
    });

    // Mouse wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newZoom = Math.max(0.6, Math.min(6.0, this.zoom * zoomFactor));
      this.zoom = newZoom;
      this.render();
    }, { passive: false });

    // Station Click to Open Details (Requirement 4)
    this.canvas.addEventListener('click', (e) => {
      if (this.hasDragged) return; // Prevent selection if user was panning

      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closest = null;
      let minDistance = 20;

      this.stations.forEach(st => {
        const pt = this.project(st.latitude, st.longitude);
        const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
        if (dist < minDistance) {
          minDistance = dist;
          closest = st;
        }
      });

      if (closest) {
        this.selectedStation = closest;
        this.render();
        if (this.onStationSelect) {
          this.onStationSelect(closest);
        }
      }
    });
  }
}

window.MeteoGuardMap = MeteoGuardMap;
