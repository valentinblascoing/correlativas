// =============================================
// CONFIGURATION: Year colors matching style.css
// =============================================
const YEAR_COLORS = {
  1: { bg: '#1d4ed8', border: '#3b82f6', highlight: '#60a5fa' },
  2: { bg: '#065f46', border: '#10b981', highlight: '#34d399' },
  3: { bg: '#92400e', border: '#f59e0b', highlight: '#fbbf24' },
  4: { bg: '#9d174d', border: '#ec4899', highlight: '#f472b6' },
  5: { bg: '#5b21b6', border: '#8b5cf6', highlight: '#a78bfa' },
};
const SPECIAL_COLOR = { bg: '#1e3a5f', border: '#38bdf8', highlight: '#7dd3fc' };
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
    const isSpecial = subject.id.startsWith('I0');
    const colors = isSpecial ? SPECIAL_COLOR : YEAR_COLORS[subject.year];
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
// =============================================
// HIGHLIGHT CONNECTED NODES
// =============================================
function highlightConnected(selectedId) {
  const allNodeIds = nodesDataset.getIds();
  const connectedNodes = network.getConnectedNodes(selectedId);
  const connectedSet = new Set([selectedId, ...connectedNodes]);
  const updates = allNodeIds.map((id) => {
    const subject = curriculumData.find((s) => s.id === id);
    const isSpecial = id.startsWith('I0');
    const colors = isSpecial ? SPECIAL_COLOR : YEAR_COLORS[subject ? subject.year : 1];
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
    const subject = curriculumData.find((s) => s.id === id);
    const isSpecial = id.startsWith('I0');
    const colors = isSpecial ? SPECIAL_COLOR : YEAR_COLORS[subject ? subject.year : 1];
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
