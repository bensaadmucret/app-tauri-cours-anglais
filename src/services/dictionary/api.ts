export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  audio?: string;
  definition: string;
  example?: string;
}

export async function fetchWord(word: string): Promise<DictionaryEntry | null> {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const entry = data[0];
  const phonetic = entry.phonetic || entry.phonetics?.find((p: { text?: string }) => p.text)?.text;
  const audio = entry.phonetics?.find((p: { audio?: string }) => p.audio)?.audio;

  const meaning = entry.meanings?.[0];
  const def = meaning?.definitions?.[0];

  return {
    word: entry.word,
    phonetic,
    audio,
    definition: def?.definition || "",
    example: def?.example,
  };
}
