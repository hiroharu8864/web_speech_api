# Web Speech API テキスト読み上げアプリ

ブラウザの Web Speech API（SpeechSynthesis）を使用したテキスト読み上げアプリケーションです。

## 機能

- テキスト入力（複数行対応）
- 音声読み上げ / 停止
- 音声設定
  - 音声の選択（OS/ブラウザで利用可能な音声）
  - 読み上げ速度（0.1〜10）
  - 音の高さ（0〜2）
  - 音量（0〜1）
- ブラウザ非対応時の警告表示
- レスポンシブデザイン

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | React 19 |
| 言語 | TypeScript |
| ビルドツール | Vite 7 |
| ルーティング | React Router |
| 音声合成 | Web Speech API |
| アーキテクチャ | Atomic Design |

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# コードチェック
npm run lint

# ビルド結果のプレビュー
npm run preview
```

## プロジェクト構成

```
src/
├── components/
│   ├── atoms/          # Header, Footer
│   ├── molecules/      # TextInput, VoiceSettings, ControlButtons
│   └── organisms/      # SpeechSynthesizer
├── pages/              # HomePage, NotFoundPage
├── router/             # ルーティング設定
├── hooks/              # useSpeechSynthesis
└── types/              # 型定義
```

## 対応ブラウザ

- Google Chrome（最新版）
- Microsoft Edge（最新版）
- Safari（最新版）
- Firefox（最新版）

## デプロイ

### Vercel

1. [Vercel](https://vercel.com) にログイン
2. 「New Project」からGitHubリポジトリをインポート
3. フレームワークは自動検出（Vite）
4. 「Deploy」をクリック

設定は `vercel.json` で管理されています（SPAのルーティング対応済み）。

## 注意事項

- 利用可能な音声の種類と品質は OS およびブラウザに依存します
- 一部のブラウザでは長文テキストの読み上げが途中で停止する場合があります
