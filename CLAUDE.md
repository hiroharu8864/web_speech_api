# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Development Commands
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Lint code: `npm run lint`
- Preview production build: `npm run preview`

## Architecture & Technology Stack
- Frontend Framework: React 19 with TypeScript
- Build Tool: Vite 7
- Data Fetching: @tanstack/react-query
- UI Components: Material UI
- Architecture: Atomic Design（atoms / molecules / organisms）

## Folder Structure

src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── pages/            # ページレベルコンポーネント
├── router/           # ルーティング設定
├── hooks/            # カスタムReactフック（API呼び出しはここ経由）
├── api/              # API呼び出し専用
├── types/            # TypeScript型定義（Props・APIレスポンス含む）
├── utils/            # ユーティリティ関数
└── assets/           # 静的アセット

## TypeScript Configuration
- Strict mode enabled
- Target: ES2022 with DOM libraries
- JSX: react-jsx transform（コンポーネントでのReact importは不要）
- Project references: tsconfig.app.json（アプリ）/ tsconfig.node.json（ビルドツール）

## Project Rules
- 型安全性: すべてのPropsとAPIレスポンスの型を`types/`フォルダに定義する
- API呼び出し: 外部APIへのアクセスは必ず`hooks/`配下のカスタムフック経由で行う
- 404ページを用意する