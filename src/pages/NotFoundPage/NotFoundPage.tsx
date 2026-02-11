import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>ページが見つかりませんでした</p>
      <Link to="/" className={styles.link}>
        ホームに戻る
      </Link>
    </div>
  );
};
