// データ保存・読み込み機能（localStorage）

const STORAGE_KEYS = {
  RECORDS: 'workout_records',
  WORKOUT_SETS: 'workout_sets',
  VERSION: 'workout_app_version'
};

const APP_VERSION = '1.0.0';

// データの初期化
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.VERSION)) {
    localStorage.setItem(STORAGE_KEYS.VERSION, APP_VERSION);
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.WORKOUT_SETS, JSON.stringify([]));
  }
}

// 記録の取得
function getRecords() {
  const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
  return data ? JSON.parse(data) : [];
}

// 特定の種目の記録を取得（進捗グラフ用）
function getRecordsByExercise(exercise) {
  const records = getRecords();
  return records.filter(r => 
    r.exercise.bodyPart === exercise.bodyPart &&
    r.exercise.equipmentType === exercise.equipmentType &&
    r.exercise.name === exercise.name
  );
}

// 記録の削除
function deleteRecord(recordId) {
  const records = getRecords();
  const filtered = records.filter(r => r.id !== recordId);
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(filtered));
}

// トレーニングセットの取得
function getWorkoutSets() {
  const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_SETS);
  return data ? JSON.parse(data) : [];
}

// トレーニングセットの取得（ID指定）
function getWorkoutSetById(id) {
  const sets = getWorkoutSets();
  return sets.find(s => s.id === id);
}

// トレーニングセットの削除
function deleteWorkoutSet(setId) {
  const sets = getWorkoutSets();
  const filtered = sets.filter(s => s.id !== setId);
  localStorage.setItem(STORAGE_KEYS.WORKOUT_SETS, JSON.stringify(filtered));
}

// 一意のIDを生成
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 初期化
initStorage();
