const bengaliToEnglishMap = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

const englishToBengaliMap = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export const convertBengaliToEnglish = (bengaliNum = "") => {
  if (typeof bengaliNum !== "string") bengaliNum = String(bengaliNum || "");
  return bengaliNum
    .split("")
    .map((char) => bengaliToEnglishMap[char] || char)
    .join("");
};

export const convertEnglishToBengali = (englishNum = "") => {
  if (typeof englishNum !== "string") englishNum = String(englishNum || "");
  return englishNum
    .split("")
    .map((char) => englishToBengaliMap[char] || char)
    .join("");
};

/**
 * Returns formatted bilingual ID string: e.g. "101 (১০১)" or just "101"
 */
export const formatBilingualId = (id = "") => {
  if (!id) return "";
  const en = convertBengaliToEnglish(id);
  const bn = convertEnglishToBengali(en);
  if (en === bn) return en;
  return `${en} (${bn})`;
};

/**
 * Normalizes search text to allow matching both Bangla and English digits
 */
export const normalizeSearchQuery = (query = "") => {
  const text = String(query).trim().toLowerCase();
  const enVersion = convertBengaliToEnglish(text);
  const bnVersion = convertEnglishToBengali(text);
  return {
    raw: text,
    en: enVersion,
    bn: bnVersion,
  };
};
