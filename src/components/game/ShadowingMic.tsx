import { motion } from "framer-motion";
import { Mic, MicOff, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface ShadowingMicProps {
  targetWord: string;
  onResult: (transcript: string) => void;
}

export function ShadowingMic({ targetWord, onResult }: ShadowingMicProps) {
  const { isListening, transcript, startListening, stopListening, error, supported } =
    useSpeechRecognition();
  const [manualText, setManualText] = useState("");

  useEffect(() => {
    if (transcript) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  const isCorrect = transcript.toLowerCase().trim() === targetWord.toLowerCase().trim();
  const manualCorrect = manualText.toLowerCase().trim() === targetWord.toLowerCase().trim();
  const hasError = error && (error.includes("service-not-allowed") || error.includes("not-allowed"));

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

      {error && <p className="text-rose-400 text-sm text-center max-w-xs">{error}</p>}

      {(!supported || hasError) && (
        <div className="w-full max-w-sm mt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && manualText) {
                  onResult(manualText);
                }
              }}
              placeholder="Tapez le mot ici..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
              autoFocus
            />
            <button
              onClick={() => manualText && onResult(manualText)}
              disabled={!manualText}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          {manualText && (
            <p className={`text-sm mt-2 text-center ${manualCorrect ? "text-emerald-400" : "text-slate-400"}`}>
              {manualCorrect ? "Parfait !" : "Continuez à taper..."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
