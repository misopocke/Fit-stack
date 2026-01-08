// ============================================================================
// Constants & State
// ============================================================================

/**
 * アプリケーション全体で使用する定数
 */
const CONSTANTS = {
  // セクションID
  SECTIONS: {
    RECORD: 'record',
    SETS: 'sets',
    HISTORY: 'history',
    PROGRESS: 'progress'
  },
  
  // DOM要素ID
  ELEMENT_IDS: {
    CONTENT_AREA: 'contentArea',
    STICKY_FOOTER: 'stickyFooter',
    BOTTOM_NAV: 'bottomNav',
    RECORD_DATE: 'recordDate',
    RECORD_FORM: 'recordForm',
    SETS_CONTAINER: 'setsContainer',
    RECORDS_LIST: 'recordsList',
    WORKOUT_SETS_LIST: 'workoutSetsList'
  },
  
  // CSSクラス
  CLASSES: {
    ACTIVE: 'active',
    HIDDEN: 'hidden',
    SECTION: 'section',
    NAV_BTN: 'nav-btn',
    BOTTOM_NAV_ITEM: 'bottom-nav-item',
    ACTIVE_TEXT: 'text-indigo-400',
    INACTIVE_TEXT: 'text-slate-500',
    RECENT_EXERCISE_CHIP: 'recent-exercise-chip'
  },
  
  // 進捗グラフ設定
  PROGRESS: {
    MAX_RECENT_EXERCISES: 5, // 最近の種目の最大表示数
    CHIP_CONTAINER_ID: 'recentExercisesChips' // チップコンテナのID
  },
  
  // ボトムナビゲーション設定
  BOTTOM_NAV: {
    ITEMS: [
      { id: 'record', label: '記録', icon: 'edit-3' },
      { id: 'sets', label: 'セット管理', icon: 'dumbbell' },
      { id: 'history', label: '履歴', icon: 'calendar' },
      { id: 'progress', label: '進捗', icon: 'line-chart' }
    ],
    HEIGHT: 70, // ボトムナビの高さ（px）
    PADDING_OFFSET: 32 // コンテンツエリアの追加padding（px）
  },
  
  // 固定フッター設定
  STICKY_FOOTER: {
    BOTTOM_OFFSET: 70 // ボトムナビの上に配置する際のoffset（px）
  },
  
  // タイミング設定
  TIMING: {
    SELECT_EXERCISE_DELAY: 100, // 種目選択の遅延時間（ms）
    UPDATE_PADDING_DELAY: 100 // padding更新の遅延時間（ms）
  },
  
  // プレースホルダーテキスト
  PLACEHOLDERS: {
    REPS: 'レップ数',
    WEIGHT: '重量 (kg)',
    NOTES: 'メモ（任意）'
  },
  
  // 積むボタンの設定
  STACK_BUTTONS: {
    WEIGHT: [
      { label: '+0.25', value: 0.25 },
      { label: '+0.5', value: 0.5 },
      { label: '+1.0', value: 1.0 }
    ],
    REPS: [
      { label: '+1', value: 1 }
    ]
  },
  
  // SVGアイコン（インライン）
  ICONS: {
    PLUS: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    COPY: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    CHEVRON_LEFT: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    CHEVRON_RIGHT: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    SAVE: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>',
    EDIT: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    TRASH: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
  }
};

/**
 * アプリケーションの状態管理
 */
const AppState = {
  currentEditingRecordId: null,
  currentEditingSetId: null,
  progressChart: null,
  currentSetExercises: [],
  selectedWorkoutSet: null,
  currentExerciseIndex: 0,
  completedExercises: new Set()
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * アプリケーションの初期化処理
 */
function initializeApp() {
  const today = new Date().toISOString().split('T')[0];
  const recordDateInput = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_DATE);
  
  if (recordDateInput) {
    recordDateInput.value = today;
  }
  
  setupNavigation();
  initializeHierarchicalSelects();
  setupRecordForm();
  setupWorkoutSetForm();
  loadRecords();
  loadWorkoutSets();
  setupProgressGraph();
  
  // Lucide Iconsの初期化
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // 履歴フィルターのイベントリスナーを設定（一度だけ）
  const historyDateFilter = document.getElementById('historyDateFilter');
  if (historyDateFilter) {
    historyDateFilter.addEventListener('change', loadRecords);
  }
}

// サービスワーカーの登録（PWA対応）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .catch((error) => {
        // サービスワーカーの登録に失敗した場合もアプリは動作する
        console.error('サービスワーカーの登録に失敗しました:', error);
      });
  });
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * 最近の種目チップのクリックイベントを処理する
 * @param {Object} exercise - 種目オブジェクト { bodyPart, equipmentType, name }
 */
function handleRecentExerciseChipClick(exercise) {
  if (!exercise) return;
  
  // 進捗グラフ用のプルダウンを更新
  selectProgressExercise(exercise.bodyPart, exercise.equipmentType, exercise.name);
}

/**
 * 進捗グラフ用の種目を選択する
 * @param {string} bodyPart - 部位ID
 * @param {string} equipmentType - 器具タイプID
 * @param {string} exercise - 種目名
 */
function selectProgressExercise(bodyPart, equipmentType, exercise) {
  const bodyPartSelect = document.getElementById('graphBodyPartSelect');
  if (!bodyPartSelect) return;
  
  // 部位を選択
  bodyPartSelect.value = bodyPart;
  const bodyPartChangeEvent = new Event('change', { bubbles: true });
  bodyPartSelect.dispatchEvent(bodyPartChangeEvent);
  
  // 器具タイプと種目の選択肢を更新するために少し待つ
  setTimeout(() => {
    const equipmentTypeSelect = document.getElementById('graphEquipmentTypeSelect');
    if (!equipmentTypeSelect) return;
    
    // 器具タイプを選択
    equipmentTypeSelect.value = equipmentType;
    const equipmentTypeChangeEvent = new Event('change', { bubbles: true });
    equipmentTypeSelect.dispatchEvent(equipmentTypeChangeEvent);
    
    // 種目の選択肢を更新するために少し待つ
    setTimeout(() => {
      const exerciseSelect = document.getElementById('graphExerciseSelect');
      if (exerciseSelect) {
        exerciseSelect.value = exercise;
        const exerciseChangeEvent = new Event('change', { bubbles: true });
        exerciseSelect.dispatchEvent(exerciseChangeEvent);
      }
    }, CONSTANTS.TIMING.SELECT_EXERCISE_DELAY * 2);
  }, CONSTANTS.TIMING.SELECT_EXERCISE_DELAY * 2);
}

/**
 * ナビゲーションの設定とイベントハンドラーの登録
 */
function setupNavigation() {
  const bottomNavItems = document.querySelectorAll(`.${CONSTANTS.CLASSES.BOTTOM_NAV_ITEM}`);
  const sections = document.querySelectorAll(`.${CONSTANTS.CLASSES.SECTION}`);
  const stickyFooter = document.getElementById(CONSTANTS.ELEMENT_IDS.STICKY_FOOTER);
  
  if (bottomNavItems.length === 0) return;
  
  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetSectionId = item.getAttribute('data-section');
      if (!targetSectionId) return;
      
      switchToSection(targetSectionId, sections, stickyFooter);
    });
  });
  
  // 初期表示時の処理
  const recordSection = document.getElementById(CONSTANTS.SECTIONS.RECORD);
  if (recordSection && recordSection.classList.contains(CONSTANTS.CLASSES.ACTIVE)) {
    showStickyFooter(stickyFooter);
    // 初期表示時のボトムナビのアクティブ状態を設定
    const recordNavItem = document.querySelector(`[data-section="${CONSTANTS.SECTIONS.RECORD}"]`);
    if (recordNavItem) {
      updateBottomNavItemStyle(recordNavItem, true);
    }
  }
  
  // コンテンツエリアのpadding-bottomを調整
  setTimeout(updateContentPadding, CONSTANTS.TIMING.UPDATE_PADDING_DELAY);
  
  // ウィンドウリサイズ時も更新
  window.addEventListener('resize', updateContentPadding);
}

/**
 * 指定されたセクションに切り替える
 * @param {string} targetSectionId - 切り替え先のセクションID
 * @param {NodeList} sections - すべてのセクション要素
 * @param {HTMLElement} stickyFooter - 固定フッター要素
 */
function switchToSection(targetSectionId, sections, stickyFooter) {
  // すべてのナビゲーションアイテムとセクションからactiveクラスを削除
  document.querySelectorAll(`.${CONSTANTS.CLASSES.BOTTOM_NAV_ITEM}`).forEach(item => {
    item.classList.remove(CONSTANTS.CLASSES.ACTIVE);
    // アイコンとラベルの色を非アクティブ状態に変更
    updateBottomNavItemStyle(item, false);
  });
  
  sections.forEach(section => {
    section.classList.remove(CONSTANTS.CLASSES.ACTIVE);
  });
  
  // 対象のナビゲーションアイテムとセクションにactiveクラスを追加
  const targetNavItem = document.querySelector(`[data-section="${targetSectionId}"]`);
  const targetSection = document.getElementById(targetSectionId);
  
  if (targetNavItem) {
    targetNavItem.classList.add(CONSTANTS.CLASSES.ACTIVE);
    // アイコンとラベルの色をアクティブ状態に変更
    updateBottomNavItemStyle(targetNavItem, true);
  }
  
  if (targetSection) {
    targetSection.classList.add(CONSTANTS.CLASSES.ACTIVE);
  }
  
  // 固定フッターの表示制御（記録セクションのみ表示）
  if (targetSectionId === CONSTANTS.SECTIONS.RECORD) {
    showStickyFooter(stickyFooter);
  } else {
    hideStickyFooter(stickyFooter);
  }
  
  // コンテンツエリアのpadding-bottomを更新
  updateContentPadding();
  
  // セクション固有の処理
  handleSectionSpecificActions(targetSectionId);
  
  // Lucide Iconsを再初期化（DOM更新後）
  if (typeof lucide !== 'undefined') {
    setTimeout(() => {
      lucide.createIcons();
      // アイコン再初期化後にスタイルを再適用（SVG変換後に適用）
      setTimeout(() => {
        if (targetNavItem) {
          updateBottomNavItemStyle(targetNavItem, true);
        }
        document.querySelectorAll(`.${CONSTANTS.CLASSES.BOTTOM_NAV_ITEM}`).forEach(item => {
          if (item !== targetNavItem) {
            updateBottomNavItemStyle(item, false);
          }
        });
      }, 200); // 遅延を増やしてSVG変換を確実に待つ
    }, 50);
  }
}

/**
 * セクション固有のアクションを実行
 * @param {string} sectionId - セクションID
 */
function handleSectionSpecificActions(sectionId) {
  if (sectionId === CONSTANTS.SECTIONS.HISTORY) {
    loadRecords();
  } else if (sectionId === CONSTANTS.SECTIONS.PROGRESS) {
    const graphContainer = document.getElementById(CONSTANTS.SECTIONS.PROGRESS)
      ?.querySelector('div[class*="h-[400px]"]');
    
    if (graphContainer && !graphContainer.querySelector('#progressChart')) {
      graphContainer.innerHTML = '<canvas id="progressChart"></canvas>';
    }
    
    // 最近の種目チップを描画
    renderRecentExerciseChips();
    
    updateProgressGraph();
  }
}

/**
 * 固定フッターを表示する
 * @param {HTMLElement} stickyFooter - 固定フッター要素
 */
function showStickyFooter(stickyFooter) {
  if (!stickyFooter) return;
  stickyFooter.classList.remove(CONSTANTS.CLASSES.HIDDEN);
}

/**
 * 固定フッターを非表示にする
 * @param {HTMLElement} stickyFooter - 固定フッター要素
 */
function hideStickyFooter(stickyFooter) {
  if (!stickyFooter) return;
  stickyFooter.classList.add(CONSTANTS.CLASSES.HIDDEN);
}

/**
 * ボトムナビゲーションアイテムのスタイルを更新する
 * @param {HTMLElement} item - ナビゲーションアイテム要素
 * @param {boolean} isActive - アクティブ状態かどうか
 */
function updateBottomNavItemStyle(item, isActive) {
  if (!item) return;
  
  // SVG要素を検索（Lucide Iconsが変換した後）
  const icon = item.querySelector('svg') || item.querySelector('i[data-lucide]') || item.querySelector('i');
  const label = item.querySelector('span');
  
  if (icon) {
    const colorClass = isActive ? 'text-indigo-400' : 'text-slate-500';
    
    // SVG要素の場合（Lucide Iconsが変換した後）
    if (icon.tagName === 'SVG') {
      icon.className = `w-6 h-6 mb-1 ${colorClass}`;
      // SVG内のすべてのパス要素にcurrentColorを適用
      icon.querySelectorAll('path, line, polyline, circle, rect').forEach(path => {
        if (!path.getAttribute('stroke') || path.getAttribute('stroke') !== 'none') {
          path.setAttribute('stroke', 'currentColor');
        }
        if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
          path.setAttribute('fill', 'currentColor');
        }
      });
    } else {
      // i要素の場合（まだ変換されていない場合）
      const lucideName = icon.getAttribute('data-lucide');
      icon.className = `w-6 h-6 mb-1 ${colorClass}`;
      if (lucideName) {
        icon.setAttribute('data-lucide', lucideName);
      }
    }
  }
  
  if (label) {
    label.className = isActive
      ? 'text-[10px] font-medium text-indigo-400'
      : 'text-[10px] font-medium text-slate-500';
  }
}

// ============================================================================
// DOM Manipulation
// ============================================================================

/**
 * コンテンツエリアのpadding-bottomを固定フッターとボトムナビの高さに合わせて調整
 */
function updateContentPadding() {
  const contentArea = document.getElementById(CONSTANTS.ELEMENT_IDS.CONTENT_AREA);
  if (!contentArea) return;
  
  const stickyFooter = document.getElementById(CONSTANTS.ELEMENT_IDS.STICKY_FOOTER);
  const bottomNav = document.getElementById(CONSTANTS.ELEMENT_IDS.BOTTOM_NAV);
  
  let totalHeight = 0;
  
  // ボトムナビの高さを常に加算
  if (bottomNav) {
    totalHeight += bottomNav.offsetHeight || CONSTANTS.BOTTOM_NAV.HEIGHT;
  }
  
  // 固定フッターの高さを条件付きで加算
  if (stickyFooter && !stickyFooter.classList.contains(CONSTANTS.CLASSES.HIDDEN)) {
    totalHeight += stickyFooter.offsetHeight;
  }
  
  // padding-bottomを設定
  contentArea.style.paddingBottom = `${totalHeight + CONSTANTS.BOTTOM_NAV.PADDING_OFFSET}px`;
}

/**
 * 階層的選択UIの初期化
 */
function initializeHierarchicalSelects() {
  setupHierarchicalSelect('bodyPartSelect', 'equipmentTypeSelect', 'exerciseSelect');
  setupHierarchicalSelect('setBodyPartSelect', 'setEquipmentTypeSelect', 'setExerciseSelect');
  setupHierarchicalSelect('graphBodyPartSelect', 'graphEquipmentTypeSelect', 'graphExerciseSelect');
}

/**
 * 階層的選択UIを設定する
 * @param {string} bodyPartId - 部位選択の要素ID
 * @param {string} equipmentTypeId - 器具タイプ選択の要素ID
 * @param {string} exerciseId - 種目選択の要素ID
 */
function setupHierarchicalSelect(bodyPartId, equipmentTypeId, exerciseId) {
  const bodyPartSelect = document.getElementById(bodyPartId);
  const equipmentTypeSelect = document.getElementById(equipmentTypeId);
  const exerciseSelect = document.getElementById(exerciseId);
  
  if (!bodyPartSelect || !equipmentTypeSelect || !exerciseSelect) return;
  
  // 部位の選択肢を追加
  populateBodyPartOptions(bodyPartSelect);
  
  // 部位選択時の処理
  bodyPartSelect.addEventListener('change', () => {
    handleBodyPartChange(bodyPartSelect, equipmentTypeSelect, exerciseSelect);
    updatePreviousValueDisplays(); // 前回値を更新
  });
  
  // 器具タイプ選択時の処理
  equipmentTypeSelect.addEventListener('change', () => {
    handleEquipmentTypeChange(bodyPartSelect, equipmentTypeSelect, exerciseSelect);
    updatePreviousValueDisplays(); // 前回値を更新
  });
  
  // 種目選択時の処理（追加）
  exerciseSelect.addEventListener('change', () => {
    updatePreviousValueDisplays(); // 前回値を更新
  });
}

/**
 * 部位選択のオプションを追加する
 * @param {HTMLSelectElement} bodyPartSelect - 部位選択要素
 */
function populateBodyPartOptions(bodyPartSelect) {
  const bodyParts = getBodyParts();
  bodyParts.forEach(part => {
    const option = document.createElement('option');
    option.value = part.id;
    option.textContent = part.name;
    bodyPartSelect.appendChild(option);
  });
}

/**
 * 部位選択変更時の処理
 * @param {HTMLSelectElement} bodyPartSelect - 部位選択要素
 * @param {HTMLSelectElement} equipmentTypeSelect - 器具タイプ選択要素
 * @param {HTMLSelectElement} exerciseSelect - 種目選択要素
 */
function handleBodyPartChange(bodyPartSelect, equipmentTypeSelect, exerciseSelect) {
  const selectedBodyPart = bodyPartSelect.value;
  
  if (!selectedBodyPart) {
    disableEquipmentTypeAndExercise(equipmentTypeSelect, exerciseSelect);
    return;
  }
  
  enableEquipmentTypeSelect(equipmentTypeSelect, selectedBodyPart);
  disableExerciseSelect(exerciseSelect);
}

/**
 * 器具タイプ選択変更時の処理
 * @param {HTMLSelectElement} bodyPartSelect - 部位選択要素
 * @param {HTMLSelectElement} equipmentTypeSelect - 器具タイプ選択要素
 * @param {HTMLSelectElement} exerciseSelect - 種目選択要素
 */
function handleEquipmentTypeChange(bodyPartSelect, equipmentTypeSelect, exerciseSelect) {
  const selectedBodyPart = bodyPartSelect.value;
  const selectedEquipmentType = equipmentTypeSelect.value;
  
  if (!selectedBodyPart || !selectedEquipmentType) {
    disableExerciseSelect(exerciseSelect);
    return;
  }
  
  enableExerciseSelect(exerciseSelect, selectedBodyPart, selectedEquipmentType);
}

/**
 * 器具タイプと種目選択を無効化する
 * @param {HTMLSelectElement} equipmentTypeSelect - 器具タイプ選択要素
 * @param {HTMLSelectElement} exerciseSelect - 種目選択要素
 */
function disableEquipmentTypeAndExercise(equipmentTypeSelect, exerciseSelect) {
  equipmentTypeSelect.disabled = true;
  equipmentTypeSelect.innerHTML = '<option value="">器具タイプを選択</option>';
  equipmentTypeSelect.className = 'px-4 py-3 min-h-[48px] border border-slate-600 rounded-lg text-base bg-slate-600 text-slate-500 cursor-not-allowed transition-all duration-200';
  disableExerciseSelect(exerciseSelect);
}

/**
 * 器具タイプ選択を有効化し、オプションを追加する
 * @param {HTMLSelectElement} equipmentTypeSelect - 器具タイプ選択要素
 * @param {string} bodyPart - 選択された部位ID
 */
function enableEquipmentTypeSelect(equipmentTypeSelect, bodyPart) {
  equipmentTypeSelect.disabled = false;
  equipmentTypeSelect.innerHTML = '<option value="">器具タイプを選択</option>';
  
  // CSSクラスを更新（disabled状態のクラスを削除）
  equipmentTypeSelect.className = 'px-4 py-3 min-h-[48px] border border-slate-600 rounded-lg text-base bg-slate-700 text-slate-200 transition-all duration-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20';
  
  const equipmentTypes = getEquipmentTypes(bodyPart);
  equipmentTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type.id;
    option.textContent = type.name;
    equipmentTypeSelect.appendChild(option);
  });
}

/**
 * 種目選択を無効化する
 * @param {HTMLSelectElement} exerciseSelect - 種目選択要素
 */
function disableExerciseSelect(exerciseSelect) {
  exerciseSelect.disabled = true;
  exerciseSelect.innerHTML = '<option value="">種目を選択</option>';
  exerciseSelect.className = 'px-4 py-3 min-h-[48px] border border-slate-600 rounded-lg text-base bg-slate-600 text-slate-500 cursor-not-allowed transition-all duration-200';
}

/**
 * 種目選択を有効化し、オプションを追加する
 * @param {HTMLSelectElement} exerciseSelect - 種目選択要素
 * @param {string} bodyPart - 選択された部位ID
 * @param {string} equipmentType - 選択された器具タイプID
 */
function enableExerciseSelect(exerciseSelect, bodyPart, equipmentType) {
  exerciseSelect.disabled = false;
  exerciseSelect.innerHTML = '<option value="">種目を選択</option>';
  
  // CSSクラスを更新（disabled状態のクラスを削除）
  exerciseSelect.className = 'px-4 py-3 min-h-[48px] border border-slate-600 rounded-lg text-base bg-slate-700 text-slate-200 transition-all duration-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20';
  
  const exercises = getExercises(bodyPart, equipmentType);
  exercises.forEach(exercise => {
    const option = document.createElement('option');
    option.value = exercise;
    option.textContent = exercise;
    exerciseSelect.appendChild(option);
  });
}

/**
 * 記録フォームの設定
 */
function setupRecordForm() {
  const form = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_FORM);
  const addSetBtn = document.getElementById('addSetBtn');
  const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
  const copySetBtn = document.getElementById('copyLastSetBtn');
  
  if (!form || !addSetBtn || !setsContainer || !copySetBtn) return;
  
  addSetBtn.addEventListener('click', () => {
    addSetInput(setsContainer);
    updatePreviousValueDisplays(); // セット追加後に前回値を更新
  });
  addSetInput(setsContainer);
  updatePreviousValueDisplays(); // 初期表示時に前回値を更新
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveRecord();
  });
  
  copySetBtn.addEventListener('click', duplicateCurrentSets);
  setupWorkoutSetSelector();
}

/**
 * トレーニングセット選択機能の設定
 */
function setupWorkoutSetSelector() {
  const select = document.getElementById('workoutSetSelect');
  const prevBtn = document.getElementById('prevExerciseBtn');
  const nextBtn = document.getElementById('nextExerciseBtn');
  
  if (!select || !prevBtn || !nextBtn) return;
  
  updateWorkoutSetSelector();
  
  select.addEventListener('change', () => {
    const setId = select.value;
    if (!setId) {
      hideExerciseList();
      return;
    }
    
    const workoutSet = getWorkoutSetById(setId);
    if (!workoutSet || workoutSet.exercises.length === 0) {
      hideExerciseList();
      return;
    }
    
    AppState.selectedWorkoutSet = workoutSet;
    AppState.currentExerciseIndex = 0;
    AppState.completedExercises.clear();
    displayExerciseList(workoutSet.exercises);
    selectCurrentExercise();
  });
  
  prevBtn.addEventListener('click', () => {
    if (AppState.currentExerciseIndex > 0) {
      AppState.currentExerciseIndex--;
      selectCurrentExercise();
      updateExerciseList();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (AppState.selectedWorkoutSet && 
        AppState.currentExerciseIndex < AppState.selectedWorkoutSet.exercises.length - 1) {
      AppState.currentExerciseIndex++;
      selectCurrentExercise();
      updateExerciseList();
    }
  });
}

/**
 * 種目リストを表示する
 * @param {Array} exercises - 種目の配列
 */
function displayExerciseList(exercises) {
  const container = document.getElementById('exerciseListContainer');
  const list = document.getElementById('exerciseList');
  
  if (!container || !list) return;
  
  container.classList.remove(CONSTANTS.CLASSES.HIDDEN);
  container.classList.add('block');
  list.innerHTML = '';
  
  exercises.forEach((exercise, index) => {
    const item = createExerciseListItem(exercise, index);
    list.appendChild(item);
  });
  
  updateExerciseList();
  updateNavigationButtons();
}

/**
 * 種目リストアイテムを作成する
 * @param {Object} exercise - 種目オブジェクト
 * @param {number} index - インデックス
 * @returns {HTMLElement} 作成されたリストアイテム要素
 */
function createExerciseListItem(exercise, index) {
  const item = document.createElement('div');
  item.className = 'px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 flex items-center justify-between transition-all duration-200';
  item.id = `exercise-item-${index}`;
  
  const bodyPartName = exerciseData[exercise.bodyPart].name;
  const equipmentTypeName = equipmentTypes[exercise.equipmentType];
  
  item.innerHTML = `
    <div>
      <span class="font-medium text-slate-200">${exercise.name}</span>
      <div class="text-xs text-slate-400 mt-1">${bodyPartName} / ${equipmentTypeName}</div>
    </div>
    <div class="text-xs text-slate-400" id="status-${index}">未記録</div>
  `;
  
  return item;
}

/**
 * 種目リストの状態を更新する
 */
function updateExerciseList() {
  if (!AppState.selectedWorkoutSet) return;
  
  AppState.selectedWorkoutSet.exercises.forEach((exercise, index) => {
    const item = document.getElementById(`exercise-item-${index}`);
    const status = document.getElementById(`status-${index}`);
    
    if (!item || !status) return;
    
    updateExerciseListItemStyle(item, status, index);
  });
}

/**
 * 種目リストアイテムのスタイルを更新する
 * @param {HTMLElement} item - リストアイテム要素
 * @param {HTMLElement} status - ステータス要素
 * @param {number} index - インデックス
 */
function updateExerciseListItemStyle(item, status, index) {
  // 基本クラスをリセット
  item.className = 'px-4 py-3 rounded-lg border flex items-center justify-between transition-all duration-200';
  
  if (index === AppState.currentExerciseIndex) {
    item.className += ' bg-indigo-600 text-white border-indigo-500';
    status.textContent = '記録中';
    status.className = 'text-xs text-white';
  } else if (AppState.completedExercises.has(index)) {
    item.className += ' bg-slate-600 text-slate-400 border-slate-500';
    status.textContent = '完了';
    status.className = 'text-xs text-slate-400';
  } else {
    item.className += ' bg-slate-700 text-slate-200 border-slate-600';
    status.textContent = '未記録';
    status.className = 'text-xs text-slate-400';
  }
}

/**
 * ナビゲーションボタンの状態を更新する
 */
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevExerciseBtn');
  const nextBtn = document.getElementById('nextExerciseBtn');
  
  if (!prevBtn || !nextBtn) return;
  
  if (!AppState.selectedWorkoutSet) {
    prevBtn.classList.add(CONSTANTS.CLASSES.HIDDEN);
    nextBtn.classList.add(CONSTANTS.CLASSES.HIDDEN);
    return;
  }
  
  // 常に表示し、disabledで制御（ボタン位置を固定）
  prevBtn.classList.remove(CONSTANTS.CLASSES.HIDDEN);
  nextBtn.classList.remove(CONSTANTS.CLASSES.HIDDEN);
  prevBtn.disabled = AppState.currentExerciseIndex === 0;
  nextBtn.disabled = AppState.currentExerciseIndex >= AppState.selectedWorkoutSet.exercises.length - 1;
  
  // disabled状態のスタイル
  updateButtonStyle(prevBtn, prevBtn.disabled);
  updateButtonStyle(nextBtn, nextBtn.disabled);
}

/**
 * ボタンのスタイルを更新する
 * @param {HTMLButtonElement} button - ボタン要素
 * @param {boolean} isDisabled - 無効化されているか
 */
function updateButtonStyle(button, isDisabled) {
  const baseClasses = 'px-4 py-2 text-sm border border-slate-600 rounded-lg font-medium transition-all duration-200 font-sans flex items-center gap-2';
  
  if (isDisabled) {
    button.className = `${baseClasses} bg-slate-600 text-slate-500 cursor-not-allowed opacity-50`;
    // アイコンを追加（前の種目/次の種目）
    if (button.id === 'prevExerciseBtn') {
      button.innerHTML = `
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.CHEVRON_LEFT}</span>
        <span>前の種目</span>
      `;
    } else if (button.id === 'nextExerciseBtn') {
      button.innerHTML = `
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.CHEVRON_RIGHT}</span>
        <span>次の種目</span>
      `;
    }
  } else {
    button.className = `${baseClasses} bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer`;
    // アイコンを追加（前の種目/次の種目）
    if (button.id === 'prevExerciseBtn') {
      button.innerHTML = `
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.CHEVRON_LEFT}</span>
        <span>前の種目</span>
      `;
    } else if (button.id === 'nextExerciseBtn') {
      button.innerHTML = `
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.CHEVRON_RIGHT}</span>
        <span>次の種目</span>
      `;
    }
  }
}

/**
 * 現在の種目を選択する
 */
function selectCurrentExercise() {
  if (!AppState.selectedWorkoutSet || !AppState.selectedWorkoutSet.exercises[AppState.currentExerciseIndex]) {
    return;
  }
  
  const exercise = AppState.selectedWorkoutSet.exercises[AppState.currentExerciseIndex];
  selectExercise(exercise.bodyPart, exercise.equipmentType, exercise.name);
  updateExerciseList();
  updateNavigationButtons();
}

/**
 * 種目リストを非表示にする
 */
function hideExerciseList() {
  const container = document.getElementById('exerciseListContainer');
  if (container) {
    container.classList.add(CONSTANTS.CLASSES.HIDDEN);
    container.classList.remove('block');
  }
  
  AppState.selectedWorkoutSet = null;
  AppState.currentExerciseIndex = 0;
  AppState.completedExercises.clear();
}

/**
 * トレーニングセットセレクターを更新する
 */
function updateWorkoutSetSelector() {
  const select = document.getElementById('workoutSetSelect');
  if (!select) return;
  
  const sets = getWorkoutSets();
  
  select.innerHTML = '<option value="">セットを選択...</option>';
  sets.forEach(set => {
    const option = document.createElement('option');
    option.value = set.id;
    option.textContent = set.name;
    select.appendChild(option);
  });
}

/**
 * セット入力欄を追加する
 * @param {HTMLElement} container - コンテナ要素
 */
function addSetInput(container) {
  if (!container) return;
  
  const setDiv = document.createElement('div');
  setDiv.className = 'set-item bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700';
  
  // セット番号を取得
  const existingSets = container.querySelectorAll('.set-item');
  const setIndex = existingSets.length;
  setDiv.setAttribute('data-set-index', setIndex);
  
  // 前回値表示用の要素
  const previousValueDisplay = document.createElement('div');
  previousValueDisplay.className = 'previous-value text-xs text-slate-400 mt-1 mb-2 min-h-[20px]';
  previousValueDisplay.style.display = 'none';
  
  // レップ数入力欄とボタン
  const repsContainer = createInputWithStackButtons(
    'number',
    CONSTANTS.PLACEHOLDERS.REPS,
    { min: '1', required: true },
    CONSTANTS.STACK_BUTTONS.REPS,
    (currentValue, increment) => {
      const newValue = (parseFloat(currentValue) || 0) + increment;
      return Math.max(1, Math.floor(newValue)); // 最小値1
    },
    setDiv
  );
  
  // 重量入力欄とボタン
  const weightContainer = createInputWithStackButtons(
    'number',
    CONSTANTS.PLACEHOLDERS.WEIGHT,
    { min: '0', step: '0.25', required: true },
    CONSTANTS.STACK_BUTTONS.WEIGHT,
    (currentValue, increment) => {
      const newValue = (parseFloat(currentValue) || 0) + increment;
      return Math.max(0, Math.round(newValue * 4) / 4); // 0.25刻み
    },
    setDiv
  );
  
  // メモ入力欄
  const notesInput = createInput('text', CONSTANTS.PLACEHOLDERS.NOTES, {});
  
  // 削除ボタン
  const deleteBtn = createButton(
    '削除',
    'bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-sm rounded-lg font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-2',
    () => {
      setDiv.remove();
      updatePreviousValueDisplays(); // 削除後に前回値を更新
    },
    CONSTANTS.ICONS.TRASH
  );
  
  // レイアウト: グリッドレイアウトを使用
  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid grid-cols-1 md:grid-cols-3 gap-3 items-start';
  
  // 前回値表示をグリッドの上部に独立した行として配置（全列にまたがる）
  const previousValueRow = document.createElement('div');
  previousValueRow.className = 'col-span-1 md:col-span-3';
  previousValueRow.appendChild(previousValueDisplay);
  gridContainer.appendChild(previousValueRow);
  
  // レップ数セクション
  const repsSection = document.createElement('div');
  repsSection.className = 'flex flex-col';
  repsSection.appendChild(repsContainer);
  
  // 重量セクション
  const weightSection = document.createElement('div');
  weightSection.className = 'flex flex-col';
  weightSection.appendChild(weightContainer);
  
  // メモと削除ボタンセクション
  const notesSection = document.createElement('div');
  notesSection.className = 'flex flex-col md:flex-row md:items-center gap-3';
  const notesWrapper = document.createElement('div');
  notesWrapper.className = 'flex-1';
  notesWrapper.appendChild(notesInput);
  notesSection.appendChild(notesWrapper);
  const deleteWrapper = document.createElement('div');
  deleteWrapper.className = 'flex-shrink-0';
  deleteWrapper.appendChild(deleteBtn);
  notesSection.appendChild(deleteWrapper);
  
  gridContainer.appendChild(repsSection);
  gridContainer.appendChild(weightSection);
  gridContainer.appendChild(notesSection);
  
  setDiv.appendChild(gridContainer);
  container.appendChild(setDiv);
  
  // 前回値を表示
  updatePreviousValueForSet(setDiv, setIndex);
}

/**
 * 入力要素を作成する
 * @param {string} type - 入力タイプ
 * @param {string} placeholder - プレースホルダーテキスト
 * @param {Object} attributes - 追加属性
 * @returns {HTMLInputElement} 作成された入力要素
 */
function createInput(type, placeholder, attributes) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.className = 'px-3 py-2.5 min-h-[48px] border border-slate-600 rounded-lg text-base bg-slate-700 text-slate-200 transition-all duration-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500 w-full';
  
  Object.entries(attributes).forEach(([key, value]) => {
    input.setAttribute(key, value);
  });
  
  return input;
}

/**
 * 積むボタン付き入力欄を作成する
 * @param {string} type - 入力タイプ
 * @param {string} placeholder - プレースホルダーテキスト
 * @param {Object} attributes - 追加属性
 * @param {Array} stackButtons - 積むボタンの設定 [{ label, value }, ...]
 * @param {Function} incrementFunction - 加算処理関数 (currentValue, increment) => newValue
 * @param {HTMLElement} setItem - セット入力行の要素（前回値を取得するため）
 * @returns {HTMLElement} コンテナ要素
 */
function createInputWithStackButtons(type, placeholder, attributes, stackButtons, incrementFunction, setItem) {
  const container = document.createElement('div');
  container.className = type === 'number' && placeholder.includes('重量') ? 'weight-container flex flex-col' : 'reps-container flex flex-col';
  
  const input = createInput(type, placeholder, attributes);
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex gap-1 mt-1';
  
  stackButtons.forEach(buttonConfig => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = buttonConfig.label;
    button.className = 'px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded border border-slate-600 active:scale-95 transition-all duration-150 font-sans';
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const currentValue = input.value || '';
      const previousValue = getPreviousValueForInput(input, setItem);
      const baseValue = currentValue ? parseFloat(currentValue) : (previousValue !== null ? previousValue : 0);
      const newValue = incrementFunction(baseValue, buttonConfig.value);
      input.value = newValue;
      // changeイベントも発火
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    buttonsContainer.appendChild(button);
  });
  
  container.appendChild(input);
  container.appendChild(buttonsContainer);
  
  return container;
}

/**
 * 入力欄に対応する前回値を取得する
 * @param {HTMLInputElement} input - 入力要素
 * @param {HTMLElement} setItem - セット入力行の要素
 * @returns {number|null} 前回値またはnull
 */
function getPreviousValueForInput(input, setItem) {
  if (!setItem) return null;
  
  const setIndex = parseInt(setItem.getAttribute('data-set-index'), 10);
  if (isNaN(setIndex)) return null;
  
  const exercise = getCurrentSelectedExercise();
  if (!exercise) return null;
  
  const lastRecord = getLastRecordForExercise(exercise, setIndex);
  if (!lastRecord) return null;
  
  // レップ数入力欄か重量入力欄かを判定
  const isRepsInput = input.placeholder.includes('レップ');
  return isRepsInput ? lastRecord.reps : lastRecord.weight;
}

/**
 * ボタン要素を作成する
 * @param {string} text - ボタンテキスト
 * @param {string} className - CSSクラス名
 * @param {Function} onClick - クリック時のコールバック関数
 * @param {string} iconSvg - SVGアイコン文字列（オプション）
 * @returns {HTMLButtonElement} 作成されたボタン要素
 */
function createButton(text, className, onClick, iconSvg = null) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  
  if (iconSvg) {
    button.innerHTML = `
      <span class="flex items-center gap-2">
        <span class="w-4 h-4 flex-shrink-0">${iconSvg}</span>
        <span>${text}</span>
      </span>
    `;
  } else {
    button.textContent = text;
  }
  
  button.addEventListener('click', onClick);
  return button;
}

/**
 * 記録アイテムを作成する
 * @param {Object} record - 記録オブジェクト
 * @returns {HTMLElement} 作成された記録アイテム要素
 */
function createRecordItem(record) {
  const item = document.createElement('div');
  item.className = 'bg-slate-800 p-5 rounded-xl mb-4 border border-slate-700';
  
  const bodyPartName = exerciseData[record.exercise.bodyPart].name;
  const equipmentTypeName = equipmentTypes[record.exercise.equipmentType];
  const setsHtml = record.sets.map((set, index) => 
    `<span class="inline-block bg-slate-700 px-3 py-2 rounded-lg mr-2 mb-2 text-sm border border-slate-600 text-slate-200">セット${index + 1}: ${set.reps}回 × ${set.weight}kg${set.notes ? ' (' + set.notes + ')' : ''}</span>`
  ).join('');
  
  item.innerHTML = `
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-slate-200 text-lg font-semibold">${record.exercise.name}</h3>
      <span class="text-slate-400 text-sm">${formatDate(record.date)}</span>
    </div>
    <div class="text-slate-400 mb-2.5">
      ${bodyPartName} / ${equipmentTypeName}
    </div>
    <div class="mt-3">
      ${setsHtml}
    </div>
    <div class="mt-2.5 flex gap-2">
      <button class="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 rounded-lg font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-2" onclick="editRecord('${record.id}')">
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.EDIT}</span>
        <span>編集</span>
      </button>
      <button class="px-4 py-2 text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-2" onclick="deleteRecord('${record.id}')">
        <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.TRASH}</span>
        <span>削除</span>
      </button>
    </div>
  `;
  
  return item;
}

/**
 * トレーニングセットアイテムを作成する
 * @param {Object} set - トレーニングセットオブジェクト
 * @returns {HTMLElement} 作成されたセットアイテム要素
 */
function createWorkoutSetItem(set) {
  const item = document.createElement('div');
  item.className = 'bg-slate-800 p-5 rounded-xl mb-4 border border-slate-700';
  
  const exercisesHtml = set.exercises.map(exercise => {
    const bodyPartName = exerciseData[exercise.bodyPart].name;
    const equipmentTypeName = equipmentTypes[exercise.equipmentType];
    return `<span class="bg-slate-700 px-3 py-2 rounded-lg text-sm border border-slate-600 text-slate-200">${exercise.name} (${bodyPartName} / ${equipmentTypeName})</span>`;
  }).join('');
  
  item.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-slate-200 text-lg font-semibold">${set.name}</h3>
      <div class="flex gap-2">
        <button class="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 rounded-lg font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-2" onclick="editWorkoutSet('${set.id}')">
          <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.EDIT}</span>
          <span>編集</span>
        </button>
        <button class="px-4 py-2 text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-2" onclick="deleteWorkoutSet('${set.id}')">
          <span class="w-4 h-4 flex-shrink-0">${CONSTANTS.ICONS.TRASH}</span>
          <span>削除</span>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      ${exercisesHtml}
    </div>
  `;
  
  return item;
}

/**
 * 最近の種目チップを描画する
 */
function renderRecentExerciseChips() {
  const progressSection = document.getElementById(CONSTANTS.SECTIONS.PROGRESS);
  if (!progressSection) return;
  
  // 既存のチップコンテナを取得または作成
  let chipContainer = document.getElementById(CONSTANTS.PROGRESS.CHIP_CONTAINER_ID);
  
  if (!chipContainer) {
    // チップコンテナを作成
    chipContainer = document.createElement('div');
    chipContainer.id = CONSTANTS.PROGRESS.CHIP_CONTAINER_ID;
    chipContainer.className = 'mb-4';
    
    // ラベルを追加
    const label = document.createElement('div');
    label.className = 'text-xs text-slate-400 mb-2';
    label.textContent = '最近の種目:';
    chipContainer.appendChild(label);
    
    // チップを配置するコンテナ
    const chipsWrapper = document.createElement('div');
    chipsWrapper.className = 'flex flex-wrap gap-2';
    chipsWrapper.id = 'recentExercisesChipsWrapper';
    chipContainer.appendChild(chipsWrapper);
    
    // プルダウンセクションの前に挿入
    const selectSection = progressSection.querySelector('.bg-slate-800.p-5.rounded-xl');
    if (selectSection) {
      progressSection.insertBefore(chipContainer, selectSection);
    } else {
      const h2 = progressSection.querySelector('h2');
      if (h2 && h2.nextSibling) {
        progressSection.insertBefore(chipContainer, h2.nextSibling);
      }
    }
  }
  
  // チップをクリア
  const chipsWrapper = document.getElementById('recentExercisesChipsWrapper');
  if (!chipsWrapper) return;
  chipsWrapper.innerHTML = '';
  
  // 最近の種目を取得
  const recentExercises = getRecentExercises();
  
  if (recentExercises.length === 0) {
    chipContainer.style.display = 'none';
    return;
  }
  
  chipContainer.style.display = 'block';
  
  // チップを生成
  recentExercises.forEach(exercise => {
    const chip = createRecentExerciseChip(exercise);
    chipsWrapper.appendChild(chip);
  });
}

/**
 * 最近の種目チップ要素を作成する
 * @param {Object} exercise - 種目オブジェクト { bodyPart, equipmentType, name }
 * @returns {HTMLElement} チップ要素
 */
function createRecentExerciseChip(exercise) {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = `${CONSTANTS.CLASSES.RECENT_EXERCISE_CHIP} bg-slate-800 border border-slate-700 text-xs text-slate-300 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-700 transition-colors duration-200`;
  chip.textContent = getExerciseDisplayName(exercise);
  
  // データ属性に種目情報を保存
  chip.setAttribute('data-body-part', exercise.bodyPart);
  chip.setAttribute('data-equipment-type', exercise.equipmentType);
  chip.setAttribute('data-exercise-name', exercise.name);
  
  // クリックイベントを追加
  chip.addEventListener('click', () => {
    handleRecentExerciseChipClick(exercise);
  });
  
  return chip;
}

/**
 * すべてのセット入力行の前回値を更新する
 */
function updatePreviousValueDisplays() {
  const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
  if (!setsContainer) return;
  
  const setItems = setsContainer.querySelectorAll('.set-item');
  setItems.forEach((item, index) => {
    item.setAttribute('data-set-index', index);
    updatePreviousValueForSet(item, index);
  });
}

/**
 * 特定のセット入力行の前回値を更新する
 * @param {HTMLElement} setItem - セット入力行の要素
 * @param {number} setIndex - セット番号
 */
function updatePreviousValueForSet(setItem, setIndex) {
  if (!setItem) return;
  
  const previousValueDisplay = setItem.querySelector('.previous-value');
  if (!previousValueDisplay) return;
  
  const exercise = getCurrentSelectedExercise();
  if (!exercise) {
    previousValueDisplay.style.display = 'none';
    return;
  }
  
  const lastRecord = getLastRecordForExercise(exercise, setIndex);
  if (!lastRecord) {
    previousValueDisplay.style.display = 'none';
    return;
  }
  
  // 前回値を表示
  previousValueDisplay.textContent = `前回: ${lastRecord.weight}kg / ${lastRecord.reps}回`;
  previousValueDisplay.style.display = 'block';
  
  // 入力欄が空の場合、前回値を自動入力
  const repsInput = setItem.querySelector('.reps-container input[type="number"]');
  const weightInput = setItem.querySelector('.weight-container input[type="number"]');
  
  if (repsInput && !repsInput.value) {
    repsInput.value = lastRecord.reps;
    // changeイベントを発火して、他の処理が正しく動作するようにする
    repsInput.dispatchEvent(new Event('input', { bubbles: true }));
    repsInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  if (weightInput && !weightInput.value) {
    weightInput.value = lastRecord.weight;
    // changeイベントを発火して、他の処理が正しく動作するようにする
    weightInput.dispatchEvent(new Event('input', { bubbles: true }));
    weightInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

/**
 * セット内種目リストを更新する
 * @param {HTMLElement} container - コンテナ要素
 */
function updateSetExercisesList(container) {
  if (!container) return;
  
  container.innerHTML = '';
  
  AppState.currentSetExercises.forEach((exercise, index) => {
    const tag = createSetExerciseTag(exercise, index);
    container.appendChild(tag);
  });
}

/**
 * セット内種目タグを作成する
 * @param {Object} exercise - 種目オブジェクト
 * @param {number} index - インデックス
 * @returns {HTMLElement} 作成されたタグ要素
 */
function createSetExerciseTag(exercise, index) {
  const tag = document.createElement('div');
  tag.className = 'bg-slate-700 px-3 py-2 rounded-lg text-sm border border-slate-600 text-slate-200 flex items-center gap-2';
  
  const bodyPartName = exerciseData[exercise.bodyPart].name;
  const equipmentTypeName = equipmentTypes[exercise.equipmentType];
  
    tag.innerHTML = `
      <strong class="font-semibold">${exercise.name}</strong> <span class="text-slate-400">(${bodyPartName} / ${equipmentTypeName})</span>
      <button type="button" class="ml-2.5 px-2 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded font-medium cursor-pointer transition-all duration-200 font-sans flex items-center gap-1" data-index="${index}">
        <span class="w-3 h-3 flex-shrink-0">${CONSTANTS.ICONS.TRASH}</span>
        <span>削除</span>
      </button>
    `;
  
  tag.querySelector('button').addEventListener('click', () => {
    AppState.currentSetExercises.splice(index, 1);
    updateSetExercisesList(document.getElementById('setExercisesList'));
  });
  
  return tag;
}

// ============================================================================
// Data Logic
// ============================================================================

/**
 * 現在選択されている種目を取得する
 * @returns {Object|null} 種目オブジェクト { bodyPart, equipmentType, name } または null
 */
function getCurrentSelectedExercise() {
  const bodyPart = document.getElementById('bodyPartSelect')?.value;
  const equipmentType = document.getElementById('equipmentTypeSelect')?.value;
  const exercise = document.getElementById('exerciseSelect')?.value;
  
  if (!bodyPart || !equipmentType || !exercise) {
    return null;
  }
  
  return { bodyPart, equipmentType, name: exercise };
}

/**
 * 最近記録した種目を取得する（最大5件）
 * @returns {Array} 種目オブジェクトの配列
 */
function getRecentExercises() {
  const records = getRecords();
  if (records.length === 0) return [];
  
  // 種目ごとに最新の記録日を取得
  const exerciseMap = new Map();
  
  records.forEach(record => {
    const key = `${record.exercise.bodyPart}-${record.exercise.equipmentType}-${record.exercise.name}`;
    if (!exerciseMap.has(key)) {
      exerciseMap.set(key, {
        exercise: record.exercise,
        latestDate: new Date(record.date)
      });
    } else {
      const existing = exerciseMap.get(key);
      const recordDate = new Date(record.date);
      if (recordDate > existing.latestDate) {
        existing.latestDate = recordDate;
      }
    }
  });
  
  // 日付でソートして最大5件を返す
  return Array.from(exerciseMap.values())
    .sort((a, b) => b.latestDate - a.latestDate)
    .slice(0, CONSTANTS.PROGRESS.MAX_RECENT_EXERCISES)
    .map(item => item.exercise);
}

/**
 * 特定の種目の最後の記録を取得する
 * @param {Object} exercise - 種目オブジェクト { bodyPart, equipmentType, name }
 * @param {number} setIndex - セット番号（オプション）
 * @returns {Object|null} 最後の記録のセット情報 { reps, weight, notes } または null
 */
function getLastRecordForExercise(exercise, setIndex = null) {
  if (!exercise) return null;
  
  const records = getRecordsByExercise(exercise);
  if (records.length === 0) return null;
  
  // 最新の記録を取得
  const latestRecord = records[0];
  
  // セット番号が指定されている場合、そのセットを優先
  if (setIndex !== null && latestRecord.sets[setIndex]) {
    return latestRecord.sets[setIndex];
  }
  
  // セット番号が指定されていない場合、最後のセットを返す
  if (latestRecord.sets.length > 0) {
    return latestRecord.sets[latestRecord.sets.length - 1];
  }
  
  return null;
}

/**
 * 種目の表示名を取得する
 * @param {Object} exercise - 種目オブジェクト { bodyPart, equipmentType, name }
 * @returns {string} 表示名
 */
function getExerciseDisplayName(exercise) {
  if (!exercise) return '';
  
  const bodyPartName = exerciseData[exercise.bodyPart]?.name || exercise.bodyPart;
  const equipmentTypeName = equipmentTypes[exercise.equipmentType] || exercise.equipmentType;
  
  return `${bodyPartName} / ${equipmentTypeName} / ${exercise.name}`;
}

/**
 * 記録を保存する
 */
function saveRecord() {
  const date = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_DATE)?.value;
  const bodyPart = document.getElementById('bodyPartSelect')?.value;
  const equipmentType = document.getElementById('equipmentTypeSelect')?.value;
  const exercise = document.getElementById('exerciseSelect')?.value;
  
  if (!date || !bodyPart || !equipmentType || !exercise) {
    alert('すべての項目を入力してください。');
    return;
  }
  
  const sets = extractSetsFromForm();
  if (sets.length === 0) {
    alert('有効なセット情報を入力してください。');
    return;
  }
  
  const record = {
    id: AppState.currentEditingRecordId || generateId(),
    date: date,
    exercise: { bodyPart, equipmentType, name: exercise },
    sets: sets
  };
  
  saveRecordToStorage(record);
  resetRecordForm();
  alert('記録を保存しました！');
  
  const historySection = document.getElementById(CONSTANTS.SECTIONS.HISTORY);
  if (historySection && historySection.classList.contains(CONSTANTS.CLASSES.ACTIVE)) {
    loadRecords();
  }
}

/**
 * フォームからセット情報を抽出する
 * @returns {Array} セット情報の配列
 */
function extractSetsFromForm() {
  const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
  if (!setsContainer) return [];
  
  const setItems = setsContainer.querySelectorAll('.set-item');
  const sets = [];
  
  setItems.forEach(item => {
    // Phase 2の構造に対応（コンテナ内の入力欄を検索）
    const repsInput = item.querySelector('.reps-container input[type="number"]') || 
                     item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.REPS}"]`);
    const weightInput = item.querySelector('.weight-container input[type="number"]') || 
                        item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.WEIGHT}"]`);
    const notesInput = item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.NOTES}"]`);
    
    if (!repsInput || !weightInput) return;
    
    const reps = parseInt(repsInput.value);
    const weight = parseFloat(weightInput.value);
    const notes = notesInput?.value || '';
    
    if (reps && weight) {
      sets.push({ reps, weight, notes });
    }
  });
  
  return sets;
}

/**
 * 記録フォームをリセットする
 */
function resetRecordForm() {
  // 日付はリセットしない（セット選択中は同じ日付で記録するため）
  if (!AppState.selectedWorkoutSet) {
    const form = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_FORM);
    const recordDate = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_DATE);
    
    if (form) form.reset();
    if (recordDate) {
      recordDate.value = new Date().toISOString().split('T')[0];
    }
  }
  
  const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
  if (setsContainer) {
    setsContainer.innerHTML = '';
    addSetInput(setsContainer);
  }
  
  AppState.currentEditingRecordId = null;
}

/**
 * 記録をlocalStorageに保存する
 * @param {Object} record - 記録オブジェクト
 */
function saveRecordToStorage(record) {
  const records = getRecords();
  const existingIndex = records.findIndex(r => r.id === record.id);
  
  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }
  
  records.sort((a, b) => new Date(b.date) - new Date(a.date));
  localStorage.setItem('workout_records', JSON.stringify(records));
}

/**
 * 現在入力中の最終行のセットを複製する
 */
function duplicateCurrentSets() {
  const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
  if (!setsContainer) return;
  
  const setItems = setsContainer.querySelectorAll('.set-item');
  
  if (setItems.length === 0) {
    alert('コピーするセットがありません。');
    return;
  }
  
  // 入力されている最終行を取得（後ろから検索）
  const lastValidItem = findLastValidSetItem(setItems);
  
  if (!lastValidItem) {
    alert('有効なセット情報がありません。レップ数と重量を入力してください。');
    return;
  }
  
  // 最終行の値を取得して新しいセットを追加
  const setData = extractSetDataFromItem(lastValidItem);
  addSetInput(setsContainer);
  
  // 前回値を更新（新しく追加されたセットも含む）
  updatePreviousValueDisplays();
  
  const newSetItems = setsContainer.querySelectorAll('.set-item');
  const newItem = newSetItems[newSetItems.length - 1];
  populateSetInputFields(newItem, setData);
}

/**
 * 最後の有効なセットアイテムを検索する
 * @param {NodeList} setItems - セットアイテムのリスト
 * @returns {HTMLElement|null} 最後の有効なセットアイテム、見つからない場合はnull
 */
function findLastValidSetItem(setItems) {
  for (let i = setItems.length - 1; i >= 0; i--) {
    const item = setItems[i];
    // コンテナ内の入力欄を検索（Phase 2の構造に対応）
    const repsInput = item.querySelector('.reps-container input[type="number"]') || 
                     item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.REPS}"]`);
    const weightInput = item.querySelector('.weight-container input[type="number"]') || 
                        item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.WEIGHT}"]`);
    
    if (repsInput?.value && weightInput?.value) {
      return item;
    }
  }
  return null;
}

/**
 * セットアイテムからデータを抽出する
 * @param {HTMLElement} item - セットアイテム要素
 * @returns {Object} セットデータオブジェクト
 */
function extractSetDataFromItem(item) {
  // コンテナ内の入力欄を検索（Phase 2の構造に対応）
  const repsInput = item.querySelector('.reps-container input[type="number"]') || 
                   item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.REPS}"]`);
  const weightInput = item.querySelector('.weight-container input[type="number"]') || 
                      item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.WEIGHT}"]`);
  const notesInput = item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.NOTES}"]`);
  
  return {
    reps: repsInput?.value || '',
    weight: weightInput?.value || '',
    notes: notesInput?.value || ''
  };
}

/**
 * セット入力フィールドにデータを設定する
 * @param {HTMLElement} item - セットアイテム要素
 * @param {Object} setData - セットデータオブジェクト
 */
function populateSetInputFields(item, setData) {
  // コンテナ内の入力欄を検索（Phase 2の構造に対応）
  const repsInput = item.querySelector('.reps-container input[type="number"]') || 
                   item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.REPS}"]`);
  const weightInput = item.querySelector('.weight-container input[type="number"]') || 
                      item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.WEIGHT}"]`);
  const notesInput = item.querySelector(`input[placeholder="${CONSTANTS.PLACEHOLDERS.NOTES}"]`);
  
  if (repsInput) repsInput.value = setData.reps;
  if (weightInput) weightInput.value = setData.weight;
  if (notesInput) notesInput.value = setData.notes;
}

/**
 * 種目を選択する
 * @param {string} bodyPart - 部位ID
 * @param {string} equipmentType - 器具タイプID
 * @param {string} exercise - 種目名
 */
function selectExercise(bodyPart, equipmentType, exercise) {
  const bodyPartSelect = document.getElementById('bodyPartSelect');
  if (!bodyPartSelect) return;
  
  bodyPartSelect.value = bodyPart;
  bodyPartSelect.dispatchEvent(new Event('change'));
  
  setTimeout(() => {
    const equipmentTypeSelect = document.getElementById('equipmentTypeSelect');
    if (!equipmentTypeSelect) return;
    
    equipmentTypeSelect.value = equipmentType;
    equipmentTypeSelect.dispatchEvent(new Event('change'));
    
    setTimeout(() => {
      const exerciseSelect = document.getElementById('exerciseSelect');
      if (exerciseSelect) {
        exerciseSelect.value = exercise;
        // 種目選択のchangeイベントを手動で発火
        exerciseSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, CONSTANTS.TIMING.SELECT_EXERCISE_DELAY);
  }, CONSTANTS.TIMING.SELECT_EXERCISE_DELAY);
}

/**
 * セット管理フォームの設定
 */
function setupWorkoutSetForm() {
  const form = document.getElementById('workoutSetForm');
  const addExerciseBtn = document.getElementById('addExerciseToSetBtn');
  const clearBtn = document.getElementById('clearSetFormBtn');
  const exercisesList = document.getElementById('setExercisesList');
  
  if (!form || !addExerciseBtn || !clearBtn || !exercisesList) return;
  
  AppState.currentSetExercises = [];
  
  addExerciseBtn.addEventListener('click', handleAddExerciseToSet);
  clearBtn.addEventListener('click', handleClearSetForm);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveWorkoutSet();
  });
}

/**
 * セットに種目を追加する処理
 */
function handleAddExerciseToSet() {
  const bodyPart = document.getElementById('setBodyPartSelect')?.value;
  const equipmentType = document.getElementById('setEquipmentTypeSelect')?.value;
  const exercise = document.getElementById('setExerciseSelect')?.value;
  
  if (!bodyPart || !equipmentType || !exercise) {
    alert('すべての項目を選択してください。');
    return;
  }
  
  const exerciseData = { bodyPart, equipmentType, name: exercise };
  
  if (isExerciseAlreadyAdded(exerciseData)) {
    alert('この種目は既に追加されています。');
    return;
  }
  
  AppState.currentSetExercises.push(exerciseData);
  updateSetExercisesList(document.getElementById('setExercisesList'));
  resetExerciseSelectors();
}

/**
 * 種目が既に追加されているかチェックする
 * @param {Object} exerciseData - 種目データ
 * @returns {boolean} 既に追加されている場合true
 */
function isExerciseAlreadyAdded(exerciseData) {
  return AppState.currentSetExercises.some(e => 
    e.bodyPart === exerciseData.bodyPart &&
    e.equipmentType === exerciseData.equipmentType &&
    e.name === exerciseData.name
  );
}

/**
 * セットフォームをクリアする処理
 */
function handleClearSetForm() {
  const form = document.getElementById('workoutSetForm');
  if (form) form.reset();
  
  AppState.currentSetExercises = [];
  updateSetExercisesList(document.getElementById('setExercisesList'));
  AppState.currentEditingSetId = null;
}

/**
 * 種目選択をリセットする
 */
function resetExerciseSelectors() {
  const bodyPartSelect = document.getElementById('setBodyPartSelect');
  const equipmentTypeSelect = document.getElementById('setEquipmentTypeSelect');
  const exerciseSelect = document.getElementById('setExerciseSelect');
  
  if (bodyPartSelect) bodyPartSelect.value = '';
  if (equipmentTypeSelect) {
    equipmentTypeSelect.value = '';
    equipmentTypeSelect.disabled = true;
  }
  if (exerciseSelect) {
    exerciseSelect.value = '';
    exerciseSelect.disabled = true;
  }
}

/**
 * トレーニングセットを保存する
 */
function saveWorkoutSet() {
  const nameInput = document.getElementById('workoutSetName');
  if (!nameInput) return;
  
  const name = nameInput.value;
  
  if (!name) {
    alert('セット名を入力してください。');
    return;
  }
  
  if (AppState.currentSetExercises.length === 0) {
    alert('少なくとも1つの種目を追加してください。');
    return;
  }
  
  const workoutSet = {
    id: AppState.currentEditingSetId || generateId(),
    name: name,
    exercises: AppState.currentSetExercises
  };
  
  saveWorkoutSetToStorage(workoutSet);
  
  const form = document.getElementById('workoutSetForm');
  if (form) form.reset();
  
  AppState.currentSetExercises = [];
  updateSetExercisesList(document.getElementById('setExercisesList'));
  AppState.currentEditingSetId = null;
  
  alert('セットを保存しました！');
  loadWorkoutSets();
  updateWorkoutSetSelector();
  
  // トレーニング記録画面でセット選択中の場合、リストを更新
  if (AppState.selectedWorkoutSet && AppState.selectedWorkoutSet.id === workoutSet.id) {
    AppState.selectedWorkoutSet = workoutSet;
    displayExerciseList(workoutSet.exercises);
    selectCurrentExercise();
  }
}

/**
 * トレーニングセットをlocalStorageに保存する
 * @param {Object} workoutSet - トレーニングセットオブジェクト
 */
function saveWorkoutSetToStorage(workoutSet) {
  const sets = getWorkoutSets();
  const existingIndex = sets.findIndex(s => s.id === workoutSet.id);
  const now = new Date().toISOString();
  
  if (existingIndex >= 0) {
    workoutSet.updatedAt = now;
    sets[existingIndex] = workoutSet;
  } else {
    workoutSet.createdAt = now;
    workoutSet.updatedAt = now;
    sets.push(workoutSet);
  }
  
  localStorage.setItem('workout_sets', JSON.stringify(sets));
}

/**
 * 記録一覧を読み込む
 */
function loadRecords() {
  const container = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORDS_LIST);
  if (!container) return;
  
  const dateFilter = document.getElementById('historyDateFilter')?.value;
  
  let records = getRecords();
  if (dateFilter) {
    records = records.filter(r => r.date === dateFilter);
  }
  
  if (records.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-400 py-16 px-5 text-base">記録がありません。</div>';
    return;
  }
  
  container.innerHTML = '';
  
  records.forEach(record => {
    const item = createRecordItem(record);
    container.appendChild(item);
  });
}

/**
 * 記録を編集する
 * @param {string} recordId - 記録ID
 */
function editRecord(recordId) {
  const record = getRecords().find(r => r.id === recordId);
  if (!record) return;
  
  AppState.currentEditingRecordId = recordId;
  
  // 編集時は種目リストを非表示
  hideExerciseList();
  const workoutSetSelect = document.getElementById('workoutSetSelect');
  if (workoutSetSelect) workoutSetSelect.value = '';
  
  // 記録セクションに切り替え
  const recordNavItem = document.querySelector(`[data-section="${CONSTANTS.SECTIONS.RECORD}"]`);
  if (recordNavItem) recordNavItem.click();
  
  const recordDate = document.getElementById(CONSTANTS.ELEMENT_IDS.RECORD_DATE);
  if (recordDate) recordDate.value = record.date;
  
  selectExercise(record.exercise.bodyPart, record.exercise.equipmentType, record.exercise.name);
  
  setTimeout(() => {
    const setsContainer = document.getElementById(CONSTANTS.ELEMENT_IDS.SETS_CONTAINER);
    if (!setsContainer) return;
    
    setsContainer.innerHTML = '';
    
    record.sets.forEach(set => {
      addSetInput(setsContainer);
      const setItems = setsContainer.querySelectorAll('.set-item');
      const lastItem = setItems[setItems.length - 1];
      
      if (lastItem) {
        const setData = { reps: set.reps, weight: set.weight, notes: set.notes || '' };
        populateSetInputFields(lastItem, setData);
      }
    });
    
    // 前回値を更新
    updatePreviousValueDisplays();
  }, 400); // タイミングを調整
}

/**
 * 記録を削除する（UI操作）
 * @param {string} recordId - 記録ID
 */
function deleteRecordFromUI(recordId) {
  if (!confirm('この記録を削除しますか？')) return;
  
  const records = getRecords();
  const filtered = records.filter(r => r.id !== recordId);
  localStorage.setItem('workout_records', JSON.stringify(filtered));
  loadRecords();
}

/**
 * トレーニングセット一覧を読み込む
 */
function loadWorkoutSets() {
  const container = document.getElementById(CONSTANTS.ELEMENT_IDS.WORKOUT_SETS_LIST);
  if (!container) return;
  
  const sets = getWorkoutSets();
  
  if (sets.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-400 py-16 px-5 text-base">トレーニングセットがありません。</div>';
    return;
  }
  
  container.innerHTML = '';
  
  sets.forEach(set => {
    const item = createWorkoutSetItem(set);
    container.appendChild(item);
  });
}

/**
 * トレーニングセットを編集する
 * @param {string} setId - セットID
 */
function editWorkoutSet(setId) {
  const set = getWorkoutSetById(setId);
  if (!set) return;
  
  AppState.currentEditingSetId = setId;
  AppState.currentSetExercises = [...set.exercises];
  
  // セット管理セクションに切り替え
  const setsNavItem = document.querySelector(`[data-section="${CONSTANTS.SECTIONS.SETS}"]`);
  if (setsNavItem) setsNavItem.click();
  
  const workoutSetName = document.getElementById('workoutSetName');
  if (workoutSetName) workoutSetName.value = set.name;
  
  updateSetExercisesList(document.getElementById('setExercisesList'));
}

/**
 * トレーニングセットを削除する（UI操作）
 * @param {string} setId - セットID
 */
function deleteWorkoutSetFromUI(setId) {
  if (!confirm('このトレーニングセットを削除しますか？')) return;
  
  deleteWorkoutSet(setId);
  loadWorkoutSets();
  updateWorkoutSetSelector();
  
  // 削除したセットが選択中の場合、リストを非表示
  if (AppState.selectedWorkoutSet && AppState.selectedWorkoutSet.id === setId) {
    hideExerciseList();
    const workoutSetSelect = document.getElementById('workoutSetSelect');
    if (workoutSetSelect) workoutSetSelect.value = '';
  }
}

/**
 * 進捗グラフの設定
 */
function setupProgressGraph() {
  const bodyPartSelect = document.getElementById('graphBodyPartSelect');
  const equipmentTypeSelect = document.getElementById('graphEquipmentTypeSelect');
  const exerciseSelect = document.getElementById('graphExerciseSelect');
  
  if (bodyPartSelect) {
    bodyPartSelect.addEventListener('change', updateProgressGraph);
  }
  if (equipmentTypeSelect) {
    equipmentTypeSelect.addEventListener('change', updateProgressGraph);
  }
  if (exerciseSelect) {
    exerciseSelect.addEventListener('change', updateProgressGraph);
  }
}

/**
 * 進捗グラフを更新する
 */
function updateProgressGraph() {
  const bodyPart = document.getElementById('graphBodyPartSelect')?.value;
  const equipmentType = document.getElementById('graphEquipmentTypeSelect')?.value;
  const exercise = document.getElementById('graphExerciseSelect')?.value;
  
  const graphContainer = document.getElementById(CONSTANTS.SECTIONS.PROGRESS)
    ?.querySelector('div[class*="h-[400px]"]');
  
  if (!graphContainer) return;
  
  if (!bodyPart || !equipmentType || !exercise) {
    destroyProgressChart();
    graphContainer.innerHTML = '<canvas id="progressChart"></canvas>';
    return;
  }
  
  const selectedExercise = { bodyPart, equipmentType, name: exercise };
  const records = getRecordsByExercise(selectedExercise);
  
  if (records.length === 0) {
    destroyProgressChart();
    graphContainer.innerHTML = '<div class="text-center text-slate-400 py-16 px-5 text-base">この種目の記録がありません。</div>';
    return;
  }
  
  let canvas = document.getElementById('progressChart');
  
  // キャンバスが存在しない場合は作成
  if (!canvas) {
    graphContainer.innerHTML = '<canvas id="progressChart"></canvas>';
    canvas = document.getElementById('progressChart');
  }
  
  if (!canvas) return;
  
  // グラフを描画
  renderProgressChart(canvas, records);
}

/**
 * 進捗グラフを破棄する
 */
function destroyProgressChart() {
  if (AppState.progressChart) {
    AppState.progressChart.destroy();
    AppState.progressChart = null;
  }
}

/**
 * 進捗グラフを描画する
 * @param {HTMLCanvasElement} canvas - キャンバス要素
 * @param {Array} records - 記録の配列
 */
function renderProgressChart(canvas, records) {
  records.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const labels = records.map(r => formatDate(r.date));
  const weightData = records.map(r => Math.max(...r.sets.map(s => s.weight)));
  const repsData = records.map(r => Math.max(...r.sets.map(s => s.reps)));
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  destroyProgressChart();
  
  const chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '最大重量 (kg)',
          data: weightData,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          yAxisID: 'y',
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: '最大レップ数',
          data: repsData,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          yAxisID: 'y1',
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0',
            font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 14 }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 12 } },
          grid: { color: 'rgba(148, 163, 184, 0.2)' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: { display: true, text: '重量 (kg)', color: '#e2e8f0', font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 14 } },
          ticks: { color: '#94a3b8', font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 12 } },
          grid: { color: 'rgba(148, 163, 184, 0.2)' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: { display: true, text: 'レップ数', color: '#e2e8f0', font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 14 } },
          ticks: { color: '#94a3b8', font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif', size: 12 } },
          grid: { drawOnChartArea: false, color: 'rgba(148, 163, 184, 0.2)' }
        }
      }
    }
  };
  
  AppState.progressChart = new Chart(ctx, chartConfig);
}

// ============================================================================
// Utils
// ============================================================================

/**
 * 日付をフォーマットする
 * @param {string} dateString - 日付文字列（YYYY-MM-DD形式）
 * @returns {string} フォーマットされた日付文字列
 */
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// ============================================================================
// Global Functions
// ============================================================================

/**
 * グローバル関数として公開（HTMLのonclick属性から呼び出される）
 */
window.editRecord = editRecord;
window.deleteRecord = deleteRecordFromUI;
window.editWorkoutSet = editWorkoutSet;
window.deleteWorkoutSet = deleteWorkoutSetFromUI;
