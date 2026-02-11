import { Header, Footer } from '../../components/atoms';
import { SpeechSynthesizer } from '../../components/organisms';
import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <SpeechSynthesizer />
      </main>
      <Footer />
    </div>
  );
};
