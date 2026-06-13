export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  audio?: string;
  definition: string;
  example?: string;
  translation?: string;
  exampleTranslation?: string;
}

async function translateText(text: string): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
    );
    const data = await res.json();
    return data.responseData?.translatedText;
  } catch {
    return undefined;
  }
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

  const definition = def?.definition || "";
  const example = def?.example;

  const [translation, exampleTranslation] = await Promise.all([
    translateText(definition),
    example ? translateText(example) : Promise.resolve(undefined),
  ]);

  return {
    word: entry.word,
    phonetic,
    audio,
    definition,
    example,
    translation,
    exampleTranslation,
  };
}
