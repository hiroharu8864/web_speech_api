import { useState, useEffect, useCallback, useMemo } from 'react';
import type { SpeechOptions, UseSpeechSynthesisReturn } from '../types';

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const isSupported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window,
    []
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  const speak = useCallback((text: string, options: SpeechOptions) => {
    if (!isSupported || !text.trim()) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = options.voice;
    utterance.lang = options.voice?.lang ?? 'ja-JP';
    utterance.rate = options.rate;
    utterance.pitch = options.pitch;
    utterance.volume = options.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return {
    voices,
    isSpeaking,
    isSupported,
    speak,
    stop,
  };
};
