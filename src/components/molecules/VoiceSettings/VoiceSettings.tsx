import styles from './VoiceSettings.module.css';

interface VoiceSettingsProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice | null) => void;
  rate: number;
  onRateChange: (rate: number) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  disabled?: boolean;
}

export const VoiceSettings = ({
  voices,
  selectedVoice,
  onVoiceChange,
  rate,
  onRateChange,
  pitch,
  onPitchChange,
  volume,
  onVolumeChange,
  disabled = false,
}: VoiceSettingsProps) => {
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    const voice = voices.find((v) => v.name === voiceName) ?? null;
    onVoiceChange(voice);
  };

  return (
    <div className={styles.container}>
      <div className={styles.setting}>
        <label htmlFor="voice-select" className={styles.label}>
          音声選択
        </label>
        <select
          id="voice-select"
          className={styles.select}
          value={selectedVoice?.name ?? ''}
          onChange={handleVoiceChange}
          disabled={disabled}
          aria-label="音声を選択"
        >
          <option value="">デフォルト音声</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.setting}>
        <label htmlFor="rate-range" className={styles.label}>
          速度: {rate.toFixed(1)}
        </label>
        <input
          id="rate-range"
          type="range"
          className={styles.range}
          min="0.1"
          max="10"
          step="0.1"
          value={rate}
          onChange={(e) => onRateChange(Number(e.target.value))}
          disabled={disabled}
          aria-label="読み上げ速度"
        />
      </div>

      <div className={styles.setting}>
        <label htmlFor="pitch-range" className={styles.label}>
          高さ: {pitch.toFixed(1)}
        </label>
        <input
          id="pitch-range"
          type="range"
          className={styles.range}
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => onPitchChange(Number(e.target.value))}
          disabled={disabled}
          aria-label="音の高さ"
        />
      </div>

      <div className={styles.setting}>
        <label htmlFor="volume-range" className={styles.label}>
          音量: {volume.toFixed(1)}
        </label>
        <input
          id="volume-range"
          type="range"
          className={styles.range}
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          disabled={disabled}
          aria-label="音量"
        />
      </div>
    </div>
  );
};
