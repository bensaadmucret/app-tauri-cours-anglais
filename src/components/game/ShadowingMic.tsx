import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface ShadowingMicProps {
  targetWord: string;
  onResult: (transcript: string) => void;
}

export function ShadowingMic({ targetWord, onResult }: ShadowingMicProps) {
  const { isListening, transcript, startListening, stopListening, error, supported } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  if (!supported) {
    return (
      <p className="text-amber-400 text-sm text-center">
        Reconnaissance vocale non supportée
      </p>
    );
  }

  const isCorrect = transcript.toLowerCase().trim() === targetWord.toLowerCase().trim();

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isListening
            ? "bg-red-500 animate-pulse"
            : isCorrect
            ? "bg-emerald-500"
            : "bg-sky-500 hover:bg-sky-400"
        }`}
      >
        {isListening ? <MicOff size={28} /> : <Mic size={28} />}
      </motion.button>

      {isListening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-400"
        >
          Écoute...
        </motion.p>
      )}

      {transcript && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-lg font-medium ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}
        >
          {isCorrect ? "Parfait !" : `Vous avez dit : "${transcript}"`}
        </motion.p>
      )}

      {error && <p className="text-rose-400 text-sm">{error}</p>}
    </div>
  );
}
