// 種目データ構造

const exerciseData = {
  chest: {
    name: '胸',
    machine: ['チェストプレス', 'ペックデック', 'バタフライマシン', 'インクラインチェストプレス'],
    freeWeight: ['ベンチプレス', 'ダンベルプレス', 'インクラインベンチプレス', 'ダンベルフライ', 'デクラインベンチプレス'],
    bodyweight: ['腕立て伏せ', 'ディップス', 'パイクプッシュアップ', 'デクラインプッシュアップ'],
    cable: ['ケーブルフライ', 'ケーブルクロスオーバー', 'ケーブルプレス']
  },
  back: {
    name: '背中',
    machine: ['ラットプルダウン', 'シーテッドロウ', 'ケーブルロウ', 'バックエクステンション'],
    freeWeight: ['デッドリフト', 'ベントオーバーロウ', 'ワンハンドダンベルロウ', 'Tバーロウ', 'バーベルロウ'],
    bodyweight: ['懸垂', '逆手懸垂', 'バックエクステンション', 'スーパーマン'],
    cable: ['ケーブルロウ', 'ケーブルプルダウン', 'ケーブルフェイスプル']
  },
  legs: {
    name: '脚',
    machine: ['レッグプレス', 'レッグエクステンション', 'レッグカール', 'カーフレイズ'],
    freeWeight: ['スクワット', 'フロントスクワット', 'ルーマニアンデッドリフト', 'レッグプレス', 'ランジ', 'ブルガリアンスクワット'],
    bodyweight: ['スクワット', 'ランジ', 'カーフレイズ', 'ワルツスクワット', 'ピストルスクワット'],
    cable: ['ケーブルスクワット', 'ケーブルレッグカール']
  },
  shoulders: {
    name: '肩',
    machine: ['ショルダープレス', 'サイドレイズマシン', 'リアデルトマシン'],
    freeWeight: ['ショルダープレス', 'サイドレイズ', 'フロントレイズ', 'リアデルトフライ', 'アップライトロウ', 'アーノルドプレス'],
    bodyweight: ['パイクプッシュアップ', 'ハンドスタンドプッシュアップ', 'ウォールウォーク'],
    cable: ['ケーブルサイドレイズ', 'ケーブルフロントレイズ', 'ケーブルリアデルト']
  },
  arms: {
    name: '腕',
    machine: ['アームカールマシン', 'トライセップスプレスダウン', 'ケーブルカール'],
    freeWeight: ['バーベルカール', 'ダンベルカール', 'ハンマーカール', 'トライセップスキックバック', 'オーバーヘッドトライセップスエクステンション', 'クローズグリップベンチプレス'],
    bodyweight: ['ディップス', '逆立ち腕立て', 'プランク'],
    cable: ['ケーブルカール', 'ケーブルトライセップスプレスダウン', 'ケーブルハンマーカール']
  },
  abs: {
    name: '腹筋',
    machine: ['アブクランチマシン', 'ケーブルクランチ'],
    freeWeight: ['ケーブルクランチ', 'ダンベルサイドベンド'],
    bodyweight: ['クランチ', 'シットアップ', 'プランク', 'レッグレイズ', 'ロシアンツイスト', 'マウンテンクライマー'],
    cable: ['ケーブルクランチ', 'ケーブルサイドベンド']
  }
};

const equipmentTypes = {
  machine: 'マシン',
  freeWeight: 'フリーウェイト',
  bodyweight: '自重',
  cable: 'ケーブル'
};

function getBodyParts() {
  return Object.keys(exerciseData).map(key => ({
    id: key,
    name: exerciseData[key].name
  }));
}

function getEquipmentTypes(bodyPart) {
  if (!exerciseData[bodyPart]) return [];
  return Object.keys(exerciseData[bodyPart])
    .filter(key => key !== 'name')
    .map(key => ({
      id: key,
      name: equipmentTypes[key] || key
    }));
}

function getExercises(bodyPart, equipmentType) {
  if (!exerciseData[bodyPart] || !exerciseData[bodyPart][equipmentType]) {
    return [];
  }
  return exerciseData[bodyPart][equipmentType];
}
