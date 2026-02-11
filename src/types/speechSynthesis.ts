/** 音声合成オプション */
export interface SpeechOptions {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

/** useSpeechSynthesis フックの戻り値 */
export interface UseSpeechSynthesisReturn {
  voices: SpeechSynthesisVoice[];
  isSpeaking: boolean;
  isSupported: boolean;
  speak: (text: string, options: SpeechOptions) => void;
  stop: () => void;
}

/** 音声設定のデフォルト値 */
export const DEFAULT_SPEECH_OPTIONS: Omit<SpeechOptions, 'voice'> = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
};
