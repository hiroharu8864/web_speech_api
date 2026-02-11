import styles from './TextInput.module.css';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TextInput = ({ value, onChange, disabled = false }: TextInputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor="speech-text" className={styles.label}>
        読み上げテキスト
      </label>
      <textarea
        id="speech-text"
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="読み上げたいテキストを入力してください"
        disabled={disabled}
        rows={6}
        aria-label="読み上げたいテキストを入力"
      />
    </div>
  );
};
