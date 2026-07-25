export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  audio?: string;
  definition: string;
  example?: string;
  translation?: string;
  exampleTranslation?: string;
}

const CACHE_PREFIX = "dict-cache:";
const TRANSLATE_PREFIX = "trans-cache:";
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7;

function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data as T;
  } catch {
    return null;
  }
}

function setCached<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage full or unavailable
  }
}

async function translateText(text: string): Promise<string | undefined> {
  const cacheKey = `${TRANSLATE_PREFIX}${text}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
    );
    const data = await res.json();
    const translated = data.responseData?.translatedText;
    if (translated) setCached(cacheKey, translated);
    return translated;
  } catch {
    return getCached<string>(cacheKey) ?? undefined;
  }
}

export async function fetchWord(word: string): Promise<DictionaryEntry | null> {
  const cacheKey = `${CACHE_PREFIX}${word.toLowerCase()}`;
  const cached = getCached<DictionaryEntry>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!res.ok) return getCached<DictionaryEntry>(cacheKey);
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

    const result: DictionaryEntry = {
      word: entry.word,
      phonetic,
      audio,
      definition,
      example,
      translation,
      exampleTranslation,
    };

    setCached(cacheKey, result);
    return result;
  } catch {
    return getCached<DictionaryEntry>(cacheKey) ?? null;
  }
}
