// ========================================
// CleanScore - ハウスクリーニング品質評価アプリ
// ========================================

// ---- 評価項目定義 ----
const AREAS = [
  {
    id: 'kitchen', name: '台所', emoji: '🍳',
    items: [
      { id: 'k1', label: 'シンク内の汚れ・水垢', deduction: -2 },
      { id: 'k2', label: '排水口の汚れ', deduction: -1 },
      { id: 'k3', label: 'コンロ周りの油汚れ', deduction: -2 },
      { id: 'k4', label: 'レンジフード・換気扇の汚れ', deduction: -3 },
      { id: 'k5', label: 'ワークトップの拭き残し', deduction: -1 },
      { id: 'k6', label: '収納内の清掃不備', deduction: -1 },
      { id: 'k7', label: '蛇口・金具の水垢', deduction: -1 },
    ]
  },
  {
    id: 'washroom', name: '洗面所', emoji: '🪥',
    items: [
      { id: 'w1', label: '洗面ボウルの汚れ', deduction: -2 },
      { id: 'w2', label: '鏡の曇り・汚れ', deduction: -1 },
      { id: 'w3', label: '蛇口周りの水垢', deduction: -1 },
      { id: 'w4', label: '排水口の汚れ', deduction: -1 },
      { id: 'w5', label: '収納内の清掃不備', deduction: -1 },
      { id: 'w6', label: '床の汚れ・水はね', deduction: -1 },
    ]
  },
  {
    id: 'toilet', name: 'トイレ', emoji: '🚽',
    items: [
      { id: 't1', label: '便器内の汚れ', deduction: -2 },
      { id: 't2', label: '便座・蓋の汚れ', deduction: -1 },
      { id: 't3', label: 'タンク周りの汚れ', deduction: -1 },
      { id: 't4', label: '床の汚れ', deduction: -1 },
      { id: 't5', label: 'ペーパーホルダー等の汚れ', deduction: -1 },
      { id: 't6', label: '換気扇の汚れ', deduction: -1 },
      { id: 't7', label: '臭い残り', deduction: -2 },
    ]
  },
  {
    id: 'bathroom', name: '浴室', emoji: '🛁',
    items: [
      { id: 'b1', label: '浴槽の汚れ・水垢', deduction: -2 },
      { id: 'b2', label: 'シャワーヘッドの水垢', deduction: -1 },
      { id: 'b3', label: '鏡のウロコ汚れ', deduction: -2 },
      { id: 'b4', label: '排水口の汚れ・髪の毛', deduction: -2 },
      { id: 'b5', label: '床のカビ・汚れ', deduction: -2 },
      { id: 'b6', label: 'ドア・パッキンのカビ', deduction: -1 },
      { id: 'b7', label: '蛇口・金具の水垢', deduction: -1 },
      { id: 'b8', label: '換気扇の汚れ', deduction: -1 },
    ]
  },
  {
    id: 'glass', name: 'ガラス', emoji: '🪟',
    items: [
      { id: 'g1', label: 'ガラス面の拭きムラ', deduction: -2 },
      { id: 'g2', label: 'サッシの汚れ', deduction: -1 },
      { id: 'g3', label: 'レール部分のゴミ', deduction: -1 },
      { id: 'g4', label: '網戸の汚れ', deduction: -1 },
      { id: 'g5', label: '窓枠の汚れ', deduction: -1 },
    ]
  },
  {
    id: 'room', name: '居室', emoji: '🛋️',
    items: [
      { id: 'r1', label: '床の汚れ・ホコリ', deduction: -2 },
      { id: 'r2', label: '巾木のホコリ', deduction: -1 },
      { id: 'r3', label: '照明器具の汚れ', deduction: -1 },
      { id: 'r4', label: 'スイッチ・コンセントの汚れ', deduction: -1 },
      { id: 'r5', label: 'クローゼット内の清掃不備', deduction: -1 },
      { id: 'r6', label: 'エアコンの汚れ', deduction: -2 },
      { id: 'r7', label: '壁紙の汚れ・シミ', deduction: -1 },
    ]
  },
  {
    id: 'appearance', name: '完成の見栄え', emoji: '✨',
    items: [
      { id: 'a1', label: '全体的な清潔感の不足', deduction: -3 },
      { id: 'a2', label: '残置物・ゴミの放置', deduction: -2 },
      { id: 'a3', label: '異臭の残り', deduction: -2 },
      { id: 'a4', label: '清掃道具の置き忘れ', deduction: -1 },
      { id: 'a5', label: '養生テープ等の剥がし忘れ', deduction: -1 },
    ]
  }
];

const AREA_MAX_SCORE = 10;

// ---- ストレージ ----
const Storage = {
  getStaffList() {
    return JSON.parse(localStorage.getItem('cs_staff') || '[]');
  },
  saveStaffList(list) {
    localStorage.setItem('cs_staff', JSON.stringify(list));
  },
  getEvaluations() {
    return JSON.parse(localStorage.getItem('cs_evaluations') || '[]');
  },
  saveEvaluations(evals) {
    localStorage.setItem('cs_evaluations', JSON.stringify(evals));
  },
  addEvaluation(ev) {
    const evals = this.getEvaluations();
    evals.push(ev);
    this.saveEvaluations(evals);
  },
  deleteEvaluation(id) {
    const evals = this.getEvaluations().filter(e => e.id !== id);
    this.saveEvaluations(evals);
  },
  exportAll() {
    return JSON.stringify({
      staff: this.getStaffList(),
      evaluations: this.getEvaluations()
    }, null, 2);
  },
  importAll(data) {
    const parsed = JSON.parse(data);
    let addedEvals = 0;
    let addedStaff = 0;

    // スタッフをマージ（名前で重複排除）
    if (parsed.staff) {
      const existing = this.getStaffList();
      for (const s of parsed.staff) {
        if (!existing.find(e => e.name === s.name)) {
          existing.push(s);
          addedStaff++;
        }
      }
      this.saveStaffList(existing);
    }

    // 評価データをマージ（IDで重複排除）
    if (parsed.evaluations) {
      const existing = this.getEvaluations();
      const existingIds = new Set(existing.map(e => e.id));
      for (const ev of parsed.evaluations) {
        if (!existingIds.has(ev.id)) {
          existing.push(ev);
          addedEvals++;
        }
      }
      this.saveEvaluations(existing);
    }

    return { addedEvals, addedStaff };
  }
};

// ---- スコア計算 ----
function calculateScores(deductions, staffAssignments) {
  const areaScores = {};
  for (const area of AREAS) {
    const deductedItems = deductions[area.id] || [];
    let totalDeduction = 0;
    for (const itemId of deductedItems) {
      const item = area.items.find(i => i.id === itemId);
      if (item) totalDeduction += Math.abs(item.deduction);
    }
    areaScores[area.id] = Math.max(0, AREA_MAX_SCORE - totalDeduction);
  }

  // 全体スコア（全箇所平均の100点換算）
  const allAreaIds = AREAS.map(a => a.id);
  const areaValues = allAreaIds.map(id => areaScores[id]);
  const totalScore = Math.round((areaValues.reduce((s, v) => s + v, 0) / areaValues.length) * 10);

  // 個人スコア
  const staffScores = {};
  for (const staff of staffAssignments) {
    const assignedAreas = staff.areas || [];
    // 完成の見栄えは全員に適用
    const personalAreas = [...new Set([...assignedAreas, 'appearance'])];
    if (personalAreas.length === 0) continue;

    const personalScores = personalAreas.map(id => areaScores[id]).filter(v => v !== undefined);
    if (personalScores.length === 0) continue;
    const avg = personalScores.reduce((s, v) => s + v, 0) / personalScores.length;
    staffScores[staff.name] = Math.round(avg * 10);
  }

  return { areaScores, totalScore, staffScores };
}

// ---- UUID生成 ----
function generateId() {
  return 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

// ---- トースト ----
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- スコア色クラス ----
function getScoreClass(score, max = 100) {
  const pct = (score / max) * 100;
  if (pct >= 80) return 'high';
  if (pct >= 60) return 'mid';
  return 'low';
}

function getScoreColor(score, max = 100) {
  const pct = (score / max) * 100;
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  return '#ef4444';
}

// ========================================
// App State
// ========================================
const state = {
  currentPage: 'evaluation',
  formStaff: [],       // [{ tempId, name, areas: [] }]
  formDeductions: {},  // { areaId: [itemId, ...] }
  formComments: {},    // { areaId: 'comment', overall: 'comment' }
  lastResult: null,
  historyChart: null,
};

// ========================================
// Navigation
// ========================================
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const page = tab.dataset.page;
      switchPage(page);
    });
  });
}

function switchPage(page) {
  state.currentPage = page;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');

  if (page === 'history') renderHistoryPage();
  if (page === 'staff') renderStaffPage();
}

// ========================================
// 評価入力フォーム
// ========================================
function initEvaluationForm() {
  // Set today's date
  document.getElementById('evalDate').value = new Date().toISOString().split('T')[0];

  // Init deductions & comments
  for (const area of AREAS) {
    state.formDeductions[area.id] = [];
    state.formComments[area.id] = '';
  }
  state.formComments.overall = '';

  // Render area sections
  renderAreaSections();

  // Add staff button
  document.getElementById('addStaffBtn').addEventListener('click', addStaffRow);

  // Calculate button
  document.getElementById('calculateBtn').addEventListener('click', handleCalculate);

  // Clear button
  document.getElementById('clearFormBtn').addEventListener('click', handleClearForm);

  // Add initial staff row
  addStaffRow();
}

function addStaffRow() {
  const tempId = 'ts_' + Date.now();
  state.formStaff.push({ tempId, name: '', areas: [] });

  // 1人体制かどうかチェック
  if (state.formStaff.length === 1) {
    // 1人の場合、全箇所を自動選択
    state.formStaff[0].areas = AREAS.filter(a => a.id !== 'appearance').map(a => a.id);
  }

  renderStaffAssignment();
}

function removeStaffRow(tempId) {
  state.formStaff = state.formStaff.filter(s => s.tempId !== tempId);
  if (state.formStaff.length === 1) {
    state.formStaff[0].areas = AREAS.filter(a => a.id !== 'appearance').map(a => a.id);
  }
  renderStaffAssignment();
}

function renderStaffAssignment() {
  const container = document.getElementById('staffAssignment');
  const staffList = Storage.getStaffList();

  container.innerHTML = state.formStaff.map((s, idx) => {
    const areaChips = AREAS.filter(a => a.id !== 'appearance').map(area => {
      const selected = s.areas.includes(area.id);
      return `<span class="area-chip ${selected ? 'selected' : ''}" 
                data-temp-id="${s.tempId}" data-area-id="${area.id}" onclick="toggleStaffArea(this)">
                ${area.emoji} ${area.name}
              </span>`;
    }).join('');

    // 名前のオプション: 既存スタッフリスト or 手入力
    const staffOptions = staffList.map(st =>
      `<option value="${st.name}" ${st.name === s.name ? 'selected' : ''}>${st.name}</option>`
    ).join('');

    return `
      <div class="staff-row">
        <div class="staff-row__name">
          <input type="text" class="form-input" value="${s.name}" 
                 placeholder="スタッフ名" list="staffNames_${idx}"
                 onchange="updateStaffName('${s.tempId}', this.value)">
          <datalist id="staffNames_${idx}">${staffOptions}</datalist>
        </div>
        <div class="staff-row__areas">${areaChips}</div>
        ${state.formStaff.length > 1 ? `<button class="btn btn-sm btn-danger btn-icon" onclick="removeStaffRow('${s.tempId}')">✕</button>` : ''}
      </div>`;
  }).join('');
}

// Global handlers
window.toggleStaffArea = function (el) {
  const tempId = el.dataset.tempId;
  const areaId = el.dataset.areaId;
  const staff = state.formStaff.find(s => s.tempId === tempId);
  if (!staff) return;

  if (staff.areas.includes(areaId)) {
    staff.areas = staff.areas.filter(a => a !== areaId);
  } else {
    staff.areas.push(areaId);
  }
  renderStaffAssignment();
};

window.updateStaffName = function (tempId, name) {
  const staff = state.formStaff.find(s => s.tempId === tempId);
  if (staff) staff.name = name;
};

window.removeStaffRow = removeStaffRow;

// ---- Area Sections ----
function renderAreaSections() {
  const container = document.getElementById('evaluationAreas');
  container.innerHTML = AREAS.map(area => {
    const currentScore = AREA_MAX_SCORE;
    const items = area.items.map(item => {
      return `
        <div class="checklist-item" data-area="${area.id}" data-item="${item.id}" onclick="toggleDeduction(this)">
          <span class="checklist-item__label">${item.label}</span>
          <span class="checklist-item__deduction">${item.deduction}点</span>
          <label class="toggle" onclick="event.stopPropagation()">
            <input type="checkbox" data-area="${area.id}" data-item="${item.id}" onchange="toggleDeductionCheckbox(this)">
            <span class="toggle-slider"></span>
          </label>
        </div>`;
    }).join('');

    return `
      <div class="area-section" id="area-section-${area.id}">
        <div class="area-section__header" onclick="toggleAreaSection('${area.id}')">
          <span class="area-section__title">${area.emoji} ${area.name}</span>
          <div class="flex items-center gap-sm">
            <span class="area-section__score" id="area-score-${area.id}">${currentScore} / ${AREA_MAX_SCORE}</span>
            <span class="area-section__chevron">▼</span>
          </div>
        </div>
        <div class="area-section__body">
          <div class="checklist">${items}</div>
          <div class="form-group mt-md">
            <label class="form-label">💬 ${area.name}のコメント</label>
            <textarea class="form-textarea" rows="2" placeholder="${area.name}に関するメモ..."
                      onchange="updateAreaComment('${area.id}', this.value)"
                      id="comment-${area.id}"></textarea>
          </div>
        </div>
      </div>`;
  }).join('');
}

window.toggleAreaSection = function (areaId) {
  const section = document.getElementById(`area-section-${areaId}`);
  section.classList.toggle('open');
};

window.toggleDeduction = function (el) {
  const checkbox = el.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event('change'));
};

window.toggleDeductionCheckbox = function (checkbox) {
  const areaId = checkbox.dataset.area;
  const itemId = checkbox.dataset.item;
  const listItem = checkbox.closest('.checklist-item');

  if (checkbox.checked) {
    if (!state.formDeductions[areaId].includes(itemId)) {
      state.formDeductions[areaId].push(itemId);
    }
    listItem.classList.add('checked');
  } else {
    state.formDeductions[areaId] = state.formDeductions[areaId].filter(id => id !== itemId);
    listItem.classList.remove('checked');
  }

  updateAreaScore(areaId);
};

window.updateAreaComment = function (areaId, value) {
  state.formComments[areaId] = value;
};

function updateAreaScore(areaId) {
  const area = AREAS.find(a => a.id === areaId);
  const deductedItems = state.formDeductions[areaId] || [];
  let totalDeduction = 0;
  for (const itemId of deductedItems) {
    const item = area.items.find(i => i.id === itemId);
    if (item) totalDeduction += Math.abs(item.deduction);
  }
  const score = Math.max(0, AREA_MAX_SCORE - totalDeduction);
  const el = document.getElementById(`area-score-${areaId}`);
  el.textContent = `${score} / ${AREA_MAX_SCORE}`;
  el.style.color = getScoreColor(score, AREA_MAX_SCORE);
}

// ---- Calculate ----
function handleCalculate() {
  const propertyName = document.getElementById('propertyName').value.trim();
  const evalDate = document.getElementById('evalDate').value;

  if (!propertyName) {
    showToast('物件名を入力してください', 'error');
    return;
  }
  if (!evalDate) {
    showToast('評価日を入力してください', 'error');
    return;
  }

  // Validate staff
  const validStaff = state.formStaff.filter(s => s.name.trim());
  if (validStaff.length === 0) {
    showToast('スタッフ名を入力してください', 'error');
    return;
  }

  // Auto-register staff
  const staffList = Storage.getStaffList();
  for (const s of validStaff) {
    if (!staffList.find(st => st.name === s.name.trim())) {
      staffList.push({ name: s.name.trim(), id: 'staff_' + Date.now() + Math.random().toString(36).substring(2, 5) });
    }
  }
  Storage.saveStaffList(staffList);

  const staffAssignments = validStaff.map(s => ({ name: s.name.trim(), areas: s.areas }));
  const { areaScores, totalScore, staffScores } = calculateScores(state.formDeductions, staffAssignments);

  const evaluation = {
    id: generateId(),
    date: evalDate,
    propertyName,
    staff: staffAssignments,
    deductions: { ...state.formDeductions },
    comments: { ...state.formComments },
    overallComment: document.getElementById('overallComment').value,
    scores: { areaScores, totalScore, staffScores }
  };

  Storage.addEvaluation(evaluation);
  state.lastResult = evaluation;

  showToast('評価を保存しました！');
  renderResultPage(evaluation);
  switchPage('result');
}

function handleClearForm() {
  document.getElementById('propertyName').value = '';
  document.getElementById('evalDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('overallComment').value = '';

  state.formStaff = [];
  state.formDeductions = {};
  state.formComments = {};
  for (const area of AREAS) {
    state.formDeductions[area.id] = [];
    state.formComments[area.id] = '';
  }
  state.formComments.overall = '';

  addStaffRow();
  renderAreaSections();
  showToast('フォームをクリアしました');
}

// ========================================
// 結果ページ
// ========================================
function renderResultPage(ev) {
  const container = document.getElementById('resultContent');
  const scoreClass = getScoreClass(ev.scores.totalScore);

  // Area score cards
  const areaCards = AREAS.map((area, i) => {
    const score = ev.scores.areaScores[area.id];
    const cls = getScoreClass(score, AREA_MAX_SCORE);
    return `
      <div class="score-card" style="animation-delay: ${i * 0.08}s">
        <div class="score-card__emoji">${area.emoji}</div>
        <div class="score-card__area">${area.name}</div>
        <div class="score-card__value ${cls}">${score}</div>
        <div class="score-card__max">/ ${AREA_MAX_SCORE}</div>
        <div class="score-bar">
          <div class="score-bar__fill ${cls}" style="width: ${(score / AREA_MAX_SCORE) * 100}%"></div>
        </div>
      </div>`;
  }).join('');

  // Staff cards
  const staffCards = Object.entries(ev.scores.staffScores).map(([name, score], i) => {
    const cls = getScoreClass(score);
    const staff = ev.staff.find(s => s.name === name);
    const areas = staff ? staff.areas.map(aid => {
      const a = AREAS.find(ar => ar.id === aid);
      return a ? a.emoji + a.name : '';
    }).join(', ') : '';
    const initial = name.charAt(0);

    return `
      <div class="staff-card" style="animation-delay: ${i * 0.1}s">
        <div class="staff-card__header">
          <div class="staff-card__avatar">${initial}</div>
          <div>
            <div class="staff-card__name">${name}</div>
            <div class="staff-card__areas">${areas}</div>
          </div>
        </div>
        <div class="staff-card__score ${cls}">${score}<span style="font-size:0.9rem;color:var(--text-muted)">点</span></div>
        <div class="score-bar">
          <div class="score-bar__fill ${cls}" style="width: ${score}%"></div>
        </div>
      </div>`;
  }).join('');

  // Deduction details
  const deductionDetails = AREAS.map(area => {
    const deducted = ev.deductions[area.id] || [];
    if (deducted.length === 0) return '';
    const items = deducted.map(itemId => {
      const item = area.items.find(i => i.id === itemId);
      return item ? `<span class="badge badge-danger">${item.label} (${item.deduction})</span>` : '';
    }).join(' ');
    return `<div class="mb-sm"><strong>${area.emoji} ${area.name}:</strong> ${items}</div>`;
  }).filter(Boolean).join('');

  // Comments
  const commentsHTML = AREAS.map(area => {
    const comment = ev.comments[area.id];
    if (!comment) return '';
    return `<div class="mb-sm"><strong>${area.emoji} ${area.name}:</strong> ${comment}</div>`;
  }).filter(Boolean).join('') + (ev.overallComment ? `<div class="mb-sm"><strong>💬 全体:</strong> ${ev.overallComment}</div>` : '');

  container.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-hero__label">${ev.propertyName} ― ${ev.date}</div>
        <div class="score-hero__value ${scoreClass} animate-count">${ev.scores.totalScore}</div>
        <div class="score-hero__label">/ 100点</div>
        <div class="score-bar mt-md" style="max-width:400px;margin:var(--space-md) auto 0;">
          <div class="score-bar__fill ${scoreClass}" style="width:${ev.scores.totalScore}%"></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card__header">
        <h2 class="card__title"><span class="emoji">📊</span> 箇所別スコア</h2>
      </div>
      <div class="score-grid">${areaCards}</div>
    </div>

    <div class="card">
      <div class="card__header">
        <h2 class="card__title"><span class="emoji">👥</span> 個人別スコア</h2>
      </div>
      <div class="staff-scores">${staffCards}</div>
    </div>

    ${deductionDetails ? `
    <div class="card">
      <div class="card__header">
        <h2 class="card__title"><span class="emoji">⚠️</span> 減点箇所</h2>
      </div>
      ${deductionDetails}
    </div>` : ''}

    ${commentsHTML ? `
    <div class="card">
      <div class="card__header">
        <h2 class="card__title"><span class="emoji">💬</span> コメント</h2>
      </div>
      ${commentsHTML}
    </div>` : ''}

    <div class="action-bar">
      <button class="btn btn-secondary" onclick="switchPage('evaluation')">📋 評価入力に戻る</button>
      <button class="btn btn-primary" onclick="exportPDF('${ev.id}')">📄 PDF出力</button>
    </div>
  `;
}

window.switchPage = switchPage;

// ========================================
// スコア推移ページ
// ========================================
function renderHistoryPage() {
  const evals = Storage.getEvaluations();
  const staffList = Storage.getStaffList();

  // Update filter dropdown
  const filter = document.getElementById('historyStaffFilter');
  const currentVal = filter.value;
  filter.innerHTML = '<option value="all">全体スコア</option>' +
    staffList.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
  filter.value = currentVal || 'all';
  filter.onchange = () => renderHistoryChart();

  renderHistoryChart();
  renderHistoryTable(evals);
}

function renderHistoryChart() {
  const evals = Storage.getEvaluations().sort((a, b) => a.date.localeCompare(b.date));
  const filterValue = document.getElementById('historyStaffFilter').value;

  if (state.historyChart) {
    state.historyChart.destroy();
  }

  const ctx = document.getElementById('historyChart').getContext('2d');

  let labels, data;
  if (filterValue === 'all') {
    labels = evals.map(e => e.date + '\n' + e.propertyName.substring(0, 10));
    data = evals.map(e => e.scores.totalScore);
  } else {
    const filtered = evals.filter(e => e.scores.staffScores && e.scores.staffScores[filterValue] !== undefined);
    labels = filtered.map(e => e.date + '\n' + e.propertyName.substring(0, 10));
    data = filtered.map(e => e.scores.staffScores[filterValue]);
  }

  if (data.length === 0) {
    const container = document.getElementById('historyChart').parentElement;
    container.innerHTML = '<canvas id="historyChart"></canvas><div class="empty-state"><div class="empty-state__icon">📈</div><p class="empty-state__text">データがありません</p></div>';
    return;
  }

  const avg = data.length > 0 ? Math.round(data.reduce((s, v) => s + v, 0) / data.length) : 0;

  state.historyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: filterValue === 'all' ? '全体スコア' : `${filterValue}のスコア`,
        data,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: data.map(d => getScoreColor(d)),
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.3,
      }, {
        label: `平均 (${avg}点)`,
        data: new Array(data.length).fill(avg),
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#9ca3af', font: { family: 'Noto Sans JP' } }
        },
        tooltip: {
          backgroundColor: '#222639',
          borderColor: '#2e3348',
          borderWidth: 1,
          titleColor: '#f0f0f5',
          bodyColor: '#9ca3af',
        }
      },
      scales: {
        x: {
          ticks: { color: '#6b7280', font: { size: 10 } },
          grid: { color: 'rgba(46, 51, 72, 0.5)' },
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: '#6b7280' },
          grid: { color: 'rgba(46, 51, 72, 0.5)' },
        }
      }
    }
  });
}

function renderHistoryTable(evals) {
  const container = document.getElementById('historyTableContainer');
  if (evals.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📝</div><p class="empty-state__text">まだ評価履歴がありません</p></div>';
    return;
  }

  const sorted = [...evals].sort((a, b) => b.date.localeCompare(a.date));

  container.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>物件名</th>
          <th>スコア</th>
          <th>スタッフ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map(ev => {
    const cls = getScoreClass(ev.scores.totalScore);
    const staffNames = ev.staff.map(s => s.name).join(', ');
    return `
            <tr onclick="viewEvaluation('${ev.id}')">
              <td>${ev.date}</td>
              <td>${ev.propertyName}</td>
              <td><span class="badge badge-${cls === 'high' ? 'success' : cls === 'mid' ? 'warning' : 'danger'}">${ev.scores.totalScore}点</span></td>
              <td>${staffNames}</td>
              <td>
                <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); exportPDF('${ev.id}')">📄</button>
                <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); deleteEval('${ev.id}')">🗑</button>
              </td>
            </tr>`;
  }).join('')}
      </tbody>
    </table>`;
}

window.viewEvaluation = function (id) {
  const ev = Storage.getEvaluations().find(e => e.id === id);
  if (ev) {
    state.lastResult = ev;
    renderResultPage(ev);
    switchPage('result');
  }
};

window.deleteEval = function (id) {
  if (confirm('この評価を削除しますか？')) {
    Storage.deleteEvaluation(id);
    renderHistoryPage();
    showToast('評価を削除しました');
  }
};

// ========================================
// スタッフ管理ページ
// ========================================
function renderStaffPage() {
  const staffList = Storage.getStaffList();
  const container = document.getElementById('staffManagerList');

  if (staffList.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">👤</div><p class="empty-state__text">スタッフが登録されていません</p></div>';
  } else {
    container.innerHTML = `
      <table class="history-table">
        <thead><tr><th>名前</th><th>評価回数</th><th>平均スコア</th><th></th></tr></thead>
        <tbody>
          ${staffList.map(s => {
      const evals = Storage.getEvaluations();
      const staffEvals = evals.filter(e => e.scores.staffScores && e.scores.staffScores[s.name] !== undefined);
      const count = staffEvals.length;
      const avg = count > 0 ? Math.round(staffEvals.reduce((sum, e) => sum + e.scores.staffScores[s.name], 0) / count) : '-';
      return `<tr>
              <td><strong>${s.name}</strong></td>
              <td>${count}回</td>
              <td>${avg !== '-' ? `<span class="badge badge-${getScoreClass(avg) === 'high' ? 'success' : getScoreClass(avg) === 'mid' ? 'warning' : 'danger'}">${avg}点</span>` : '-'}</td>
              <td><button class="btn btn-sm btn-danger btn-icon" onclick="deleteStaff('${s.name}')">✕</button></td>
            </tr>`;
    }).join('')}
        </tbody>
      </table>`;
  }

  // Staff averages
  renderStaffAverages();
}

function renderStaffAverages() {
  const staffList = Storage.getStaffList();
  const evals = Storage.getEvaluations();
  const container = document.getElementById('staffAverages');

  if (staffList.length === 0 || evals.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📊</div><p class="empty-state__text">評価データがありません</p></div>';
    return;
  }

  const cards = staffList.map(s => {
    const staffEvals = evals.filter(e => e.scores.staffScores && e.scores.staffScores[s.name] !== undefined);
    if (staffEvals.length === 0) return '';
    const avg = Math.round(staffEvals.reduce((sum, e) => sum + e.scores.staffScores[s.name], 0) / staffEvals.length);
    const cls = getScoreClass(avg);
    return `
      <div class="staff-card">
        <div class="staff-card__header">
          <div class="staff-card__avatar">${s.name.charAt(0)}</div>
          <div>
            <div class="staff-card__name">${s.name}</div>
            <div class="staff-card__areas">${staffEvals.length}回の評価</div>
          </div>
        </div>
        <div class="staff-card__score ${cls}">${avg}<span style="font-size:0.9rem;color:var(--text-muted)">点</span></div>
      </div>`;
  }).filter(Boolean).join('');

  container.innerHTML = cards ? `<div class="staff-scores">${cards}</div>` : '<div class="empty-state"><div class="empty-state__icon">📊</div><p class="empty-state__text">評価データがありません</p></div>';
}

window.deleteStaff = function (name) {
  if (confirm(`${name}を削除しますか？\n※過去の評価データは残ります`)) {
    const list = Storage.getStaffList().filter(s => s.name !== name);
    Storage.saveStaffList(list);
    renderStaffPage();
    showToast(`${name}を削除しました`);
  }
};

document.getElementById('addNewStaffBtn').addEventListener('click', () => {
  const name = prompt('スタッフ名を入力してください');
  if (name && name.trim()) {
    const list = Storage.getStaffList();
    if (list.find(s => s.name === name.trim())) {
      showToast('既に登録されています', 'error');
      return;
    }
    list.push({ name: name.trim(), id: 'staff_' + Date.now() });
    Storage.saveStaffList(list);
    renderStaffPage();
    showToast(`${name.trim()}を登録しました`);
  }
});

// ========================================
// エクスポート / インポート
// ========================================
document.getElementById('exportJsonBtn').addEventListener('click', () => {
  const json = Storage.exportAll();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cleanscore_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('データをエクスポートしました');
});

document.getElementById('importJsonInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const result = Storage.importAll(ev.target.result);
      renderHistoryPage();
      renderStaffPage();
      showToast(`データを合算しました（評価 +${result.addedEvals}件、スタッフ +${result.addedStaff}名）`);
    } catch (err) {
      showToast('インポートに失敗しました: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // 同じファイルを再選択可能に
});

// ========================================
// PDF出力
// ========================================
window.exportPDF = function (evalId) {
  const evals = Storage.getEvaluations();
  const ev = evals.find(e => e.id === evalId);
  if (!ev) {
    showToast('評価データが見つかりません', 'error');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  // 基本設定（日本語はASCIIフォールバック）
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // Helper: add text line
  function addLine(text, size = 10, style = 'normal', indent = 0) {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const maxWidth = pageWidth - margin * 2 - indent;
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin + indent, y);
      y += size * 0.45;
    }
    y += 2;
  }

  function addHr() {
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  }

  // Header
  addLine('CleanScore - Quality Evaluation Report', 16, 'bold');
  y += 2;
  addHr();

  // Property info
  addLine(`Property: ${ev.propertyName}`, 11);
  addLine(`Date: ${ev.date}`, 11);
  addLine(`Staff: ${ev.staff.map(s => s.name).join(', ')}`, 11);
  y += 3;

  // Total Score
  addLine(`Total Score: ${ev.scores.totalScore} / 100`, 18, 'bold');
  y += 3;
  addHr();

  // Area scores table
  addLine('Area Scores', 13, 'bold');
  y += 1;

  const areaTableData = AREAS.map(area => [
    area.name,
    `${ev.scores.areaScores[area.id]} / ${AREA_MAX_SCORE}`,
    (ev.deductions[area.id] || []).map(itemId => {
      const item = area.items.find(i => i.id === itemId);
      return item ? item.label : '';
    }).join(', ') || '-'
  ]);

  doc.autoTable({
    startY: y,
    head: [['Area', 'Score', 'Deductions']],
    body: areaTableData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [99, 102, 241] },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 8;

  // Staff Scores
  addLine('Staff Scores', 13, 'bold');
  y += 1;

  const staffTableData = Object.entries(ev.scores.staffScores).map(([name, score]) => {
    const staff = ev.staff.find(s => s.name === name);
    const areas = staff ? staff.areas.map(aid => {
      const a = AREAS.find(ar => ar.id === aid);
      return a ? a.name : '';
    }).join(', ') : '';

    // 個人平均
    const staffEvals = evals.filter(e => e.scores.staffScores && e.scores.staffScores[name] !== undefined);
    const avg = staffEvals.length > 0
      ? Math.round(staffEvals.reduce((sum, e) => sum + e.scores.staffScores[name], 0) / staffEvals.length)
      : '-';

    return [name, areas, `${score}`, `${avg}`];
  });

  doc.autoTable({
    startY: y,
    head: [['Name', 'Assigned Areas', 'Score', 'Avg']],
    body: staffTableData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [139, 92, 246] },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 8;

  // Average scores section
  const allEvals = evals;
  const totalAvg = allEvals.length > 0
    ? Math.round(allEvals.reduce((sum, e) => sum + e.scores.totalScore, 0) / allEvals.length)
    : '-';
  addLine(`Overall Average Score: ${totalAvg} (${allEvals.length} evaluations)`, 11);
  y += 3;

  // Comments
  const hasComments = AREAS.some(a => ev.comments && ev.comments[a.id]) || ev.overallComment;
  if (hasComments) {
    addHr();
    addLine('Comments', 13, 'bold');
    y += 1;

    for (const area of AREAS) {
      if (ev.comments && ev.comments[area.id]) {
        addLine(`[${area.name}] ${ev.comments[area.id]}`, 10, 'normal', 3);
      }
    }
    if (ev.overallComment) {
      addLine(`[Overall] ${ev.overallComment}`, 10, 'normal', 3);
    }
  }

  // Footer
  y += 5;
  addHr();
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`Generated by CleanScore - ${new Date().toISOString().split('T')[0]}`, margin, y);

  // Save
  doc.save(`CleanScore_${ev.propertyName.replace(/\s/g, '_')}_${ev.date}.pdf`);
  showToast('PDFを出力しました');
};

// ========================================
// 初期化
// ========================================
function init() {
  initNavigation();
  initEvaluationForm();
}

document.addEventListener('DOMContentLoaded', init);
