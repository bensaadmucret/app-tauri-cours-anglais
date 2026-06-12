import { motion } from "framer-motion";
import { useState } from "react";
import { Volume2, RotateCcw } from "lucide-react";
import type { Card } from "@/db/schema";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface FlashcardProps {
  card: Card;
}

export function Flashcard({ card }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { speak, isSpeaking } = useTextToSpeech();

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <motion.div
        className="relative w-full h-80 cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-bold mb-2">{card.word}</h2>
          {card.phonetic && (
            <p className="text-slate-400 text-lg">/{card.phonetic}/</p>
          )}
          <button
            className="mt-4 flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              speak(card.word);
            }}
          >
            <Volume2 size={18} className={isSpeaking ? "animate-pulse" : ""} />
            Écouter la prononciation
          </button>
          <div className="mt-6 text-slate-500 text-sm flex items-center gap-1">
            <RotateCcw size={14} />
            Cliquez pour retourner
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col items-center justify-center p-6 rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-lg text-slate-100 text-center leading-relaxed">{card.definition}</p>
          {card.example && (
            <p className="mt-4 text-slate-400 italic text-center">“{card.example}”</p>
          )}
          {card.audio_url && (
            <audio className="mt-4" controls src={card.audio_url} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
