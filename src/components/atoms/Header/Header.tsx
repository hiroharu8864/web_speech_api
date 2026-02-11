import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>テキスト読み上げアプリ</h1>
    </header>
  );
};
