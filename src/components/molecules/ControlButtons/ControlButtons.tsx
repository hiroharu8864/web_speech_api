import styles from './ControlButtons.module.css';

interface ControlButtonsProps {
  onSpeak: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  canSpeak: boolean;
  disabled?: boolean;
}

export const ControlButtons = ({
  onSpeak,
  onStop,
  isSpeaking,
  canSpeak,
  disabled = false,
}: ControlButtonsProps) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${styles.speakButton}`}
        onClick={onSpeak}
        disabled={disabled || !canSpeak || isSpeaking}
        aria-label={isSpeaking ? '読み上げ中' : '読み上げ'}
      >
        {isSpeaking ? '読み上げ中...' : '読み上げ'}
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.stopButton}`}
        onClick={onStop}
        disabled={disabled || !isSpeaking}
        aria-label="停止"
      >
        停止
      </button>
    </div>
  );
};
