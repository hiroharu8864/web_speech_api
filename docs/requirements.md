# Web Speech API テキスト読み上げアプリケーション 仕様書

## 1. 概要

### 1.1 プロジェクト名

**web_speech_api** — Web Speech API を利用したテキスト読み上げフロントエンドアプリケーション

### 1.2 目的

ユーザーが入力したテキストを、ブラウザ標準の Web Speech API（SpeechSynthesis）を用いて音声で読み上げるWebアプリケーションを提供する。

### 1.3 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | React 18+ |
| 言語 | TypeScript |
| ビルドツール | Vite |
| 音声合成 | Web Speech API（SpeechSynthesis） |
| スタイリング | CSS Modules または CSS（任意） |

### 1.4 プロジェクト作成コマンド

```bash
npm create vite@latest web_speech_api -- --template react-ts
```

---

## 2. 機能要件

### 2.1 テキスト入力機能

- トップ画面にテキスト入力用のテキストボックス（`<textarea>`）を配置する
- 複数行のテキスト入力に対応する
- プレースホルダーとして「読み上げたいテキストを入力してください」を表示する

### 2.2 音声読み上げ機能

- 「読み上げ」ボタンをクリックすると、テキストボックスに入力された内容を Web Speech API（`SpeechSynthesisUtterance`）で読み上げる
- テキストが未入力の場合はボタンを無効化（disabled）する
- 読み上げ中に「停止」ボタンで読み上げを中断できる
- 読み上げ中はUIで再生状態を視覚的に示す（ボタンラベルの切り替え等）

### 2.3 音声設定機能

以下のパラメータをUIから調整可能とする。

| パラメータ | 説明 | 範囲 | デフォルト値 |
|---|---|---|---|
| voice | 使用する音声（声の種類） | OS/ブラウザ依存 | デフォルト音声 |
| lang | 言語 | BCP-47形式 | `ja-JP` |
| rate | 読み上げ速度 | 0.1 〜 10 | 1.0 |
| pitch | 音の高さ | 0 〜 2 | 1.0 |
| volume | 音量 | 0 〜 1 | 1.0 |

- 音声（voice）はドロップダウンで選択可能とし、`speechSynthesis.getVoices()` から取得した一覧を表示する
- rate / pitch / volume はスライダー（`<input type="range">`）で調整する

### 2.4 ブラウザ非対応時の対応

- `window.speechSynthesis` が存在しない環境では、「お使いのブラウザは Web Speech API に対応していません」というメッセージを表示し、読み上げ機能を無効化する

---

## 3. 画面設計

### 3.1 画面構成

アプリケーションは単一画面（シングルページ）構成とする。

```
┌──────────────────────────────────────────┐
│              ヘッダー                      │
│         「テキスト読み上げアプリ」            │
├──────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │      テキスト入力エリア              │  │
│  │      （textarea）                   │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  音声選択:  [ドロップダウン ▼]       │  │
│  │  速度:      ──●────── 1.0          │  │
│  │  高さ:      ──●────── 1.0          │  │
│  │  音量:      ──●────── 1.0          │  │
│  └────────────────────────────────────┘  │
│                                          │
│       [ 読み上げ ]   [ 停止 ]             │
│                                          │
├──────────────────────────────────────────┤
│              フッター                      │
│     Powered by Web Speech API             │
└──────────────────────────────────────────┘
```

### 3.2 レスポンシブ対応

- モバイル・タブレット・デスクトップの各画面幅に対応する
- テキストエリアおよびコントロール要素は画面幅に応じて伸縮する

---

## 4. コンポーネント設計

### 4.1 コンポーネント構成

```
App
├── Header
├── TextInput
├── VoiceSettings
├── ControlButtons
└── Footer
```

### 4.2 各コンポーネントの責務

| コンポーネント | 責務 |
|---|---|
| `App` | 全体のレイアウトと状態管理 |
| `Header` | アプリケーションタイトルの表示 |
| `TextInput` | テキスト入力エリアの表示と入力値の管理 |
| `VoiceSettings` | 音声・速度・高さ・音量の設定UI |
| `ControlButtons` | 読み上げ/停止ボタンの表示と制御 |
| `Footer` | フッター情報の表示 |

### 4.3 主要な状態（State）

| 状態名 | 型 | 説明 |
|---|---|---|
| `text` | `string` | 入力されたテキスト |
| `isSpeaking` | `boolean` | 現在読み上げ中かどうか |
| `selectedVoice` | `SpeechSynthesisVoice \| null` | 選択中の音声 |
| `rate` | `number` | 読み上げ速度 |
| `pitch` | `number` | 音の高さ |
| `volume` | `number` | 音量 |
| `voices` | `SpeechSynthesisVoice[]` | 利用可能な音声の一覧 |
| `isSupported` | `boolean` | ブラウザが Web Speech API に対応しているか |

---

## 5. 技術仕様

### 5.1 Web Speech API 使用箇所

#### 音声一覧の取得

```typescript
const loadVoices = () => {
  const availableVoices = speechSynthesis.getVoices();
  setVoices(availableVoices);
};

speechSynthesis.addEventListener("voiceschanged", loadVoices);
```

#### 読み上げの実行

```typescript
const handleSpeak = () => {
  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.lang = selectedVoice?.lang ?? "ja-JP";
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  utterance.onerror = () => setIsSpeaking(false);

  speechSynthesis.speak(utterance);
};
```

#### 読み上げの停止

```typescript
const handleStop = () => {
  speechSynthesis.cancel();
  setIsSpeaking(false);
};
```

### 5.2 カスタムフック `useSpeechSynthesis`

音声合成に関するロジックをカスタムフックとして切り出す。

**提供する値・関数：**

- `voices` — 利用可能な音声一覧
- `isSpeaking` — 読み上げ中フラグ
- `isSupported` — ブラウザ対応フラグ
- `speak(text, options)` — 読み上げ実行
- `stop()` — 読み上げ停止

---

## 6. 非機能要件

### 6.1 対応ブラウザ

| ブラウザ | SpeechSynthesis 対応 |
|---|---|
| Google Chrome（最新版） | ○ |
| Microsoft Edge（最新版） | ○ |
| Safari（最新版） | ○ |
| Firefox（最新版） | ○ |

### 6.2 パフォーマンス

- 読み上げ開始までのレイテンシはブラウザ・OS の音声エンジン性能に依存する
- アプリケーション自体は軽量な SPA とし、初期ロード時間を最小限に抑える

### 6.3 アクセシビリティ

- 各入力要素に適切な `<label>` を付与する
- ボタンには `aria-label` を設定する
- キーボード操作に対応する

---

## 7. 制約事項・注意点

- Web Speech API はブラウザ標準機能であり、利用可能な音声の種類と品質は OS およびブラウザに依存する
- `speechSynthesis.getVoices()` は非同期で返される場合があるため、`voiceschanged` イベントで音声一覧を取得する必要がある
- 一部のブラウザでは長文テキストの読み上げが途中で停止する既知の問題がある（Chrome 等）。必要に応じてテキストを分割して読み上げる対策を検討する
- 本アプリケーションはフロントエンドのみで完結し、バックエンドサーバーは不要である