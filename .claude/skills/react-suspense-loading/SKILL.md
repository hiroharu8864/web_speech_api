---
name: react-suspense-loading
description: ReactのSuspenseとTanStack Queryを組み合わせた非同期ローディングパターン。データ取得中のUI表示、ローディング状態の実装で使用する。
---

# Suspense + TanStack Queryによるローディングパターン

## 基本方針

非同期データ取得のローディング状態には、React Suspenseを使用する。

## 実装パターン

### 1. カスタムフックでデータ取得
```typescript
// hooks/useUsers.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import type { User } from '../types/user';

export const useUsers = () => {
  return useSuspenseQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
```

`useSuspenseQuery` を使うことで、Suspenseとの統合が自然に行える。

### 2. Suspense境界の配置
```tsx
// pages/UsersPage.tsx
import { Suspense } from 'react';
import { UserList } from '../components/organisms/UserList';
import { LoadingFallback } from '../components/atoms/LoadingFallback';

export const UsersPage = () => (
  <Suspense fallback={<LoadingFallback />}>
    <UserList />
  </Suspense>
);
```

### 3. フォールバックコンポーネント

フォールバックは専用コンポーネントとして作成し、ユーザーに待機中であることを明示する。

## 設計上の注意

- Suspense境界はデータを使うコンポーネントの**親**に配置する
- 複数の非同期コンポーネントを並列で表示する場合は、それぞれにSuspense境界を設ける
- ネストされたSuspenseで段階的なローディング表示が可能