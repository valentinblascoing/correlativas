// =============================================
// CONFIGURATION: Colors based on course availability
// =============================================
const SUBJECT_AVAILABILITY = {
  both: new Set(['03051', '03058', '05551', '05552', '05744', '05793', '05912', '07655', '07713', '07791', '07820', '07949', '07951']),
  one: new Set(['02115', '05523', '05561', '05704', '05949', '06601', '07527', '07534', '07552', '07668', '07714', '07821', '07891', '07903', '07911', '07922', '07993']),
};
const AVAILABILITY_COLORS = {
  both: { bg: '#166534', border: '#4ade80', highlight: '#15803d' },
  one: { bg: '#854d0e', border: '#facc15', highlight: '#a16207' },
  unknown: { bg: '#334155', border: '#64748b', highlight: '#475569' },
};
let currentMode = 'cursar';
let network = null;
let nodesDataset = null;
let edgesDataset = null;
// =============================================
// MAIN INIT
// =============================================
function init() {
  const container = document.getElementById('graph-container');
  const { nodes, edges } = buildGraphData('cursar');
  nodesDataset = new vis.DataSet(nodes);
  edgesDataset = new vis.DataSet(edges);
  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        direction: 'LR',
        sortMethod: 'directed',
        levelSeparation: 280,
        nodeSpacing: 120,
        treeSpacing: 220,
      },
    },
    physics: {
      enabled: false,
    },
    nodes: {
      shape: 'box',
      borderWidth: 2,
      borderWidthSelected: 3,
      font: {
        color: '#f8fafc',
        size: 13,
        face: 'Inter, sans-serif',
        multi: true,
      },
      widthConstraint: { minimum: 160, maximum: 200 },
      margin: { top: 10, bottom: 10, left: 12, right: 12 },
      shadow: { enabled: true, color: 'rgba(0,0,0,0.4)', x: 3, y: 3, size: 8 },
    },
    edges: {
      arrows: { to: { enabled: true, scaleFactor: 0.7 } },
      smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 },
      color: { color: '#475569', highlight: '#94a3b8', hover: '#94a3b8' },
      width: 1.5,
      selectionWidth: 3,
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      zoomView: true,
      dragView: true,
      selectConnectedEdges: true,
    },
  };
  network = new vis.Network(container, { nodes: nodesDataset, edges: edgesDataset }, options);
  network.on('beforeDrawing', drawYearMarkers);
  // Event: click on a node
  network.on('click', (params) => {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      showNodeInfo(nodeId);
      highlightConnected(nodeId);
    } else {
      resetHighlight();
      document.getElementById('info-box').classList.add('hidden');
    }
  });
  // Event: hover
  network.on('hoverNode', () => {
    container.style.cursor = 'pointer';
  });
  network.on('blurNode', () => {
    container.style.cursor = 'default';
  });
  // Mode toggle
  document.querySelectorAll('input[name="mode"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      currentMode = e.target.value;
      rebuildEdges();
      document.getElementById('info-box').classList.add('hidden');
      resetHighlight();
    });
  });
}
// =============================================
// BUILD GRAPH DATA
// =============================================
function buildGraphData(mode) {
  const nodes = curriculumData.map((subject) => {
    const colors = getAvailabilityColors(subject.id);
    const label = wrapText(subject.label, 22);
    return {
      id: subject.id,
      label: label,
      color: {
        background: colors.bg,
        border: colors.border,
        highlight: { background: colors.highlight, border: colors.border },
        hover: { background: colors.highlight, border: colors.border },
      },
      level: (subject.year - 1) * 2 + (subject.term - 1),
      title: `<b>${subject.label}</b><br>Año ${subject.year} - Cuatrimestre ${subject.term}`,
    };
  });
  const edges = [];
  curriculumData.forEach((subject) => {
    subject.deps.forEach((dep) => {
      const condition = mode === 'cursar' ? dep.cursar : dep.rendir;
      if (condition) {
        const isAprobada = condition === 'Aprobada';
        edges.push({
          from: dep.id,
          to: subject.id,
          color: {
            color: isAprobada ? '#10b981' : '#f59e0b',
            highlight: isAprobada ? '#34d399' : '#fbbf24',
          },
          dashes: !isAprobada,
          title: condition,
          label: condition,
          font: { color: isAprobada ? '#34d399' : '#fbbf24', size: 10, align: 'middle' },
        });
      }
    });
  });
  return { nodes, edges };
}
function getAvailabilityColors(subjectId) {
  const code = subjectId.startsWith('I') ? subjectId : subjectId.padStart(5, '0');
  if (SUBJECT_AVAILABILITY.both.has(code)) return AVAILABILITY_COLORS.both;
  if (SUBJECT_AVAILABILITY.one.has(code)) return AVAILABILITY_COLORS.one;
  return AVAILABILITY_COLORS.unknown;
}
function drawYearMarkers(context) {
  const positions = network.getPositions();
  const yearCenters = new Map();
  let top = Infinity;
  let bottom = -Infinity;
  curriculumData.forEach((subject) => {
    const position = positions[subject.id];
    if (!position) return;
    const center = yearCenters.get(subject.year) || { x: 0, top: Infinity, count: 0 };
    center.x += position.x;
    center.top = Math.min(center.top, position.y);
    center.count += 1;
    yearCenters.set(subject.year, center);
    top = Math.min(top, position.y);
    bottom = Math.max(bottom, position.y);
  });
  const orderedYears = [...yearCenters.entries()]
    .map(([year, center]) => ({ year, x: center.x / center.count }))
    .sort((a, b) => a.x - b.x);
  context.save();
  context.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  context.lineWidth = 2;
  orderedYears.slice(0, -1).forEach((year, index) => {
    const nextYear = orderedYears[index + 1];
    const x = (year.x + nextYear.x) / 2;
    context.beginPath();
    context.moveTo(x, top - 120);
    context.lineTo(x, bottom + 120);
    context.stroke();
  });
  context.fillStyle = 'rgba(255, 255, 255, 0.12)';
  context.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  context.lineWidth = 3;
  context.font = '700 300px Inter, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  yearCenters.forEach((center, year) => {
    const x = center.x / center.count;
    const y = center.top - 200;
    context.strokeText(String(year), x, y);
    context.fillText(String(year), x, y);
  });
  context.restore();
}
// =============================================
// REBUILD EDGES WHEN MODE CHANGES
// =============================================
function rebuildEdges() {
  const { edges } = buildGraphData(currentMode);
  edgesDataset.clear();
  edgesDataset.add(edges);
}
// =============================================
// SHOW NODE INFO IN SIDEBAR
// =============================================
function showNodeInfo(nodeId) {
  const subject = curriculumData.find((s) => s.id === nodeId);
  if (!subject) return;
  document.getElementById('info-code').textContent = subject.id;
  document.getElementById('info-title').textContent = subject.label;
  document.getElementById('info-year-val').textContent = subject.year;
  document.getElementById('info-term-val').textContent = subject.term;
  const offering = offeringData[subject.id];
  document.getElementById('info-offering-period').textContent = offering && offering.period
    ? `Último período registrado: ${formatOfferingPeriod(offering.period)}`
    : 'Sin datos de oferta en los períodos consultados';
  document.getElementById('info-enrolled').textContent = offering && offering.enrolled !== null
    ? offering.enrolled.toLocaleString('es-AR')
    : 'Sin datos';
  const professorList = document.getElementById('info-professors');
  professorList.replaceChildren();
  if (offering && offering.professors.length > 0) {
    offering.professors.forEach((professor) => {
      const li = document.createElement('li');
      li.textContent = professor;
      professorList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Sin datos';
    professorList.appendChild(li);
  }
  const reqList = document.getElementById('info-reqs');
  reqList.innerHTML = '';
  const relevantDeps = subject.deps.filter((dep) => {
    return currentMode === 'cursar' ? dep.cursar : dep.rendir;
  });
  if (relevantDeps.length === 0) {
    const li = document.createElement('li');
    li.style.borderLeft = '3px solid #475569';
    li.style.color = '#94a3b8';
    li.textContent = 'Sin correlativas previas';
    reqList.appendChild(li);
  } else {
    relevantDeps.forEach((dep) => {
      const depSubject = curriculumData.find((s) => s.id === dep.id);
      if (!depSubject) return;
      const condition = currentMode === 'cursar' ? dep.cursar : dep.rendir;
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${depSubject.label}</span>
        <span class="req-status ${condition.toLowerCase()}">${condition}</span>
      `;
      reqList.appendChild(li);
    });
  }
  document.getElementById('info-box').classList.remove('hidden');
}
function formatOfferingPeriod(period) {
  const [term, year] = period.split('_');
  return `${term === '1C' ? '1.er' : '2.º'} cuatrimestre ${year}`;
}
// =============================================
// HIGHLIGHT CONNECTED NODES
// =============================================
function highlightConnected(selectedId) {
  const allNodeIds = nodesDataset.getIds();
  const connectedNodes = network.getConnectedNodes(selectedId);
  const connectedSet = new Set([selectedId, ...connectedNodes]);
  const updates = allNodeIds.map((id) => {
    const colors = getAvailabilityColors(id);
    if (connectedSet.has(id)) {
      return {
        id,
        color: {
          background: colors.highlight,
          border: colors.border,
          highlight: { background: colors.highlight, border: colors.border },
        },
        opacity: 1,
      };
    } else {
      return {
        id,
        color: {
          background: colors.bg + '55',
          border: colors.border + '55',
        },
        opacity: 0.3,
        font: { color: '#ffffff44' },
      };
    }
  });
  nodesDataset.update(updates);
}
// =============================================
// RESET HIGHLIGHT
// =============================================
function resetHighlight() {
  const updates = nodesDataset.getIds().map((id) => {
    const colors = getAvailabilityColors(id);
    return {
      id,
      color: {
        background: colors.bg,
        border: colors.border,
        highlight: { background: colors.highlight, border: colors.border },
        hover: { background: colors.highlight, border: colors.border },
      },
      opacity: 1,
      font: { color: '#f8fafc', size: 13 },
    };
  });
  nodesDataset.update(updates);
}
// =============================================
// UTILITY: Wrap long text for node labels
// =============================================
function wrapText(text, maxLen) {
  if (text.length <= maxLen) return text;
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach((word) => {
    if ((current + ' ' + word).trim().length > maxLen) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  });
  if (current) lines.push(current.trim());
  return lines.join('\n');
}
// =============================================
// START
// =============================================
document.addEventListener('DOMContentLoaded', init);
