import { useState } from 'react';
import { useSpeechSynthesis } from '../../../hooks';
import { DEFAULT_SPEECH_OPTIONS } from '../../../types';
import { TextInput } from '../../molecules/TextInput';
import { VoiceSettings } from '../../molecules/VoiceSettings';
import { ControlButtons } from '../../molecules/ControlButtons';
import styles from './SpeechSynthesizer.module.css';

export const SpeechSynthesizer = () => {
  const { voices, isSpeaking, isSupported, speak, stop } = useSpeechSynthesis();
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(DEFAULT_SPEECH_OPTIONS.rate);
  const [pitch, setPitch] = useState(DEFAULT_SPEECH_OPTIONS.pitch);
  const [volume, setVolume] = useState(DEFAULT_SPEECH_OPTIONS.volume);

  const handleSpeak = () => {
    speak(text, { voice: selectedVoice, rate, pitch, volume });
  };

  if (!isSupported) {
    return (
      <div className={styles.container}>
        <div className={styles.unsupported}>
          お使いのブラウザは Web Speech API に対応していません
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TextInput value={text} onChange={setText} disabled={isSpeaking} />

      <VoiceSettings
        voices={voices}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        rate={rate}
        onRateChange={setRate}
        pitch={pitch}
        onPitchChange={setPitch}
        volume={volume}
        onVolumeChange={setVolume}
        disabled={isSpeaking}
      />

      <ControlButtons
        onSpeak={handleSpeak}
        onStop={stop}
        isSpeaking={isSpeaking}
        canSpeak={text.trim().length > 0}
      />
    </div>
  );
};
