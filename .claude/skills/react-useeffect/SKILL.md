---
name: react-useeffect
description: React useEffectの使用原則。useEffectを書こうとしている場面、副作用の実装方針を決める場面で使用する。
---

# useEffect使用原則

## いつuseEffectを使うか

useEffectの使用は、**外部システムとの同期**に限定する。

### 使ってよいケース
- 外部API・WebSocketとの接続・同期
- ブラウザAPI（DOM操作、イベントリスナー、Intersection Observer等）との同期
- サードパーティライブラリとの統合

### 使ってはいけないケース
- 派生状態の計算 → レンダー中に計算する
- ユーザーアクションへの応答 → イベントハンドラで処理する
- 状態の初期化 → `useState`の初期値か、useMemoで対応する

## 書き方のルール

1. **同期対象を明記するコメント**を必ず書く
```typescript
   // 同期対象: WebSocket接続の確立と切断
   useEffect(() => {
     const ws = new WebSocket(url);
     return () => ws.close();
   }, [url]);
```

2. **依存配列を正確に指定する**（ESLintのexhaustive-depsルールに従う）

3. **クリーンアップ関数を必ず返す**（リソースを確保する場合）

## 判断フローチャート

1. この処理はレンダー結果から計算できるか？ → YES → useEffect不要。レンダー中に計算する。
2. この処理はユーザーの操作に応じたものか？ → YES → useEffect不要。イベントハンドラに書く。
3. この処理は外部システムとの同期か？ → YES → useEffectを使う。
4. 上記いずれにも当てはまらない → 設計を見直す。