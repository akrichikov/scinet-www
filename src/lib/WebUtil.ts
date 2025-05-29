export async function calculateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function expireSession(): void {}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const EMOJI_REGEX =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u0023-\u0039]\uFE0F?\u20E3|[\u3297\u3299]\uFE0F?|[\uD83C\uDDE6-\uDDFF\uD83C\uDDFF-\uDFF0\uDC00-\uDFFF]|[\uD83C\uDF00-\uDF20]|[\uD83C\uDDE7-\uDDFF]|[\uD83C\uDF00-\uDF93]|[\uD83C\uDFE0-\uDFE7]|[\uD83C\uDFE8-\uDFED]|[\uD83D\uDC00-\uDC3E\uDC40-\uDC7F\uDCA0-\uDCA9\uDCAB-\uDCAF\uDCC0-\uDCC9\uDCCE-\uDDFF\uDE00-\uDE4F\uDE80-\uDF47\uDF49-\uDFE3\uDFE6-\uDFFF]|[\uDC00-\uDFFF])/g;

export function preprocessText(text: string): string {
  return text.replace(EMOJI_REGEX, ' ').replace(/[*#]/g, ' ').replace(/\s+/g, ' ').trim();
}

const booleanFromString = (v: string): boolean => v.toLowerCase() === 'true';

const IS_MUTED_KEY = 'isMuted';

export const isMutedPref = (): boolean => {
  const val = localStorage.getItem(IS_MUTED_KEY) ?? 'false';
  localStorage.setItem(IS_MUTED_KEY, val);
  return booleanFromString(val);
};

export const setMutedPref = (muted: boolean): void => {
  localStorage.setItem(IS_MUTED_KEY, String(muted));
};

export function toggleMutedPref(): boolean {
  const current = isMutedPref();
  setMutedPref(!current);
  return !current;
}

export function getSessionValue<T>(key: string): T | null {
  const v = localStorage.getItem(key);
  if (!v) return null;
  try {
    return JSON.parse(v) as T;
  } catch {
    return null;
  }
}

export function setLocalSession(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalSession = getSessionValue;

export function cleanTextForSpeech(input: string): string {
  return input
    .replace(/[-*#]/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\$(\d+(?:,\d+)?(?:\.\d+)?)/g, '$1 dollars')
    .replace(/(\d+(?:,\d+)?(?:\.\d+)?)%/g, '$1 percent')
    .trim()
    .split(' ')
    .filter(Boolean)
    .join(' ');
}

export function removeEmojis(text: string): string {
  return text.replace(EMOJI_REGEX, '');
}

export type SentenceList = string[];

export function extractSentences(text: string): SentenceList {
  const cleaned = cleanTextForSpeech(removeEmojis(text));
  const re = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/g;
  return cleaned
    .split(re)
    .map((s) => s.trim())
    .filter(Boolean);
}
