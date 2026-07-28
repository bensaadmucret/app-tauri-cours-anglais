import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Loader2, Tag } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { fetchWord } from "@/services/dictionary/api";
import { insertCard } from "@/db/queries";
import type { DictionaryEntry } from "@/services/dictionary/api";

export function CardBuilder() {
  const { setView } = useLearnStore();
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState("");

  async function search() {
    if (!word.trim()) return;
    setLoading(true);
    setError(null);
    setEntry(null);
    try {
      const result = await fetchWord(word.trim());
      if (!result) {
        setError("Mot non trouvé dans le dictionnaire.");
      } else {
        setEntry(result);
      }
    } catch (e) {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  async function saveCard() {
    if (!entry) return;
    try {
      await insertCard({
        deck_id: 1,
        word: entry.word,
        phonetic: entry.phonetic || null,
        definition: entry.definition,
        example: entry.example || null,
        audio_url: entry.audio || null,
        translation_fr: entry.translation || null,
        tags: tags.trim() || null,
      });
      setEntry(null);
      setWord("");
      setTags("");
      setView("dashboard");
    } catch (e) {
      setError("Erreur lors de la sauvegarde.");
    }
  }

  return (
    <div className="min-h-full flex flex-col p-6 max-w-2xl mx-auto">
      <button
        onClick={() => setView("dashboard")}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Retour
      </button>

      <h2 className="text-2xl font-bold mb-4">Ajouter un mot</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Tapez un mot en anglais..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={search}
          disabled={loading || !word.trim()}
          className="px-4 py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 rounded-xl font-semibold shadow transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          Chercher
        </motion.button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-rose-400 mb-4"
        >
          {error}
        </motion.p>
      )}

      {entry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg"
        >
          <h3 className="text-xl font-bold capitalize mb-1">{entry.word}</h3>
          {entry.phonetic && (
            <p className="text-slate-400 mb-3">/{entry.phonetic}/</p>
          )}
          <p className="text-slate-100 mb-1">
            <span className="text-slate-500">Définition :</span> {entry.definition}
          </p>
          {entry.translation && (
            <p className="text-emerald-400 mb-2">
              <span className="text-emerald-600 text-sm">Traduction :</span> {entry.translation}
            </p>
          )}
          {entry.example && (
            <p className="text-slate-300 italic mb-1">
              “{entry.example}”
            </p>
          )}
          {entry.exampleTranslation && (
            <p className="text-emerald-400/80 italic mb-4">
              <span className="text-emerald-600 text-sm not-italic">Traduction :</span> “{entry.exampleTranslation}”
            </p>
          )}
          {entry.audio && (
            <audio className="w-full mb-4" controls src={entry.audio} />
          )}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <Tag size={16} />
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ex: vocabulaire, voyage, business"
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <button
            onClick={saveCard}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-semibold shadow transition-colors"
          >
            Ajouter à mon deck
          </button>
        </motion.div>
      )}
    </div>
  );
}
