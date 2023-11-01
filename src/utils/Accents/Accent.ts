interface VowelsObjectCapital {
  A: string[];
  E: string[];
  I: string[];
  O: string[];
  U: string[];
  Y: string[];
}
interface VowelsObjectSmall {
  a: string[];
  e: string[];
  i: string[];
  o: string[];
  u: string[];
  y: string[];
}
interface ConstantsObjectCapital {
  C: string[];
  D: string[];
  G: string[];
  H: string[];
  J: string[];
  K: string[];
  L: string[];
  N: string[];
  R: string[];
  S: string[];
  T: string[];
  Z: string[];
}
interface ConstantsObjectSmall {
  c: string[];
  d: string[];
  g: string[];
  h: string[];
  j: string[];
  k: string[];
  l: string[];
  n: string[];
  r: string[];
  s: string[];
  t: string[];
  z: string[];
}

export const Vowels_Capital_Letter: VowelsObjectCapital = {
  A: [
    "A",
    "Á",
    "À",
    "Â",
    "Ä",
    "Ã",
    "Å",
    "Ā",
    "Æ",
    "Ą",
    "Ă",
    "Ά",
    "Ά",
    "Ӑ",
    "Ǎ",
  ],
  E: ["E", "É", "È", "Ê", "Ë", "Ē", "Ė", "Ę", "Ě", "Έ", "Έ", "Ә", "Ẽ"],
  I: ["I", "Í", "Ì", "Î", "Ï", "Ī", "Į", "Ί", "Ί", "Ї", "Ї", "Ỉ"],
  O: ["O", "Ó", "Ò", "Ô", "Ö", "Õ", "Ō", "Ő", "Ό", "Ό", "Ө", "Ỏ"],
  U: ["U", "Ú", "Ù", "Û", "Ü", "Ū", "Ů", "Ű", "Ų", "Ύ", "Ύ", "Ў", "Ủ"],
  Y: ["Y", "Ý", "Ŷ", "Ÿ", "Ÿ́", "Ү", "Ỳ"],
};

export const Vowels_Small_Letter: VowelsObjectSmall = {
  a: [
    "a",
    "á",
    "à",
    "â",
    "ä",
    "ã",
    "å",
    "ā",
    "æ",
    "ą",
    "ă",
    "ά",
    "ά",
    "ӑ",
    "ǎ",
  ],
  e: ["e", "é", "è", "ê", "ë", "ē", "ė", "ę", "ě", "έ", "έ", "ә", "ẽ"],
  i: ["i", "í", "ì", "î", "ï", "ī", "į", "ί", "ί", "ї", "ї", "ỉ"],
  o: ["o", "ó", "ò", "ô", "ö", "õ", "ō", "ő", "ό", "ό", "ө", "ỏ"],
  u: ["u", "ú", "ù", "û", "ü", "ū", "ů", "ű", "ų", "ύ", "ύ", "ў", "ủ"],
  y: ["y", "ý", "ÿ", "ў", "ү", "ỳ"],
};

export const Constants_Capital_Letter: ConstantsObjectCapital = {
  C: ["C", "Ç", "Č", "Ć", "Ĉ", "Ƈ"],
  D: ["D", "Đ", "Ď", "Ḑ", "Ḓ"],
  G: ["G", "Ĝ", "Ğ", "Ǵ"],
  H: ["H", "Ĥ", "Ħ"],
  J: ["J", "Ĵ"],
  K: ["K", "Ķ", "Ƙ"],
  L: ["L", "Ĺ", "Ļ", "Ľ", "Ł"],
  N: ["N", "Ń", "Ň", "Ñ", "Ņ", "Ɲ"],
  R: ["R", "Ŕ", "Ř", "Ŗ"],
  S: ["S", "Ś", "Š", "Ş", "Ŝ", "Š́"],
  T: ["T", "Ţ", "Ť", "Ŧ"],
  Z: ["Z", "Ź", "Ž", "Ż", "Ƶ"],
};

export const Constants_Small_Letter: ConstantsObjectSmall = {
  c: ["c", "ç", "č", "ć", "ĉ", "ƈ"],
  d: ["d", "đ", "ď", "ḑ", "ḓ"],
  g: ["g", "ĝ", "ğ", "ǵ"],
  h: ["h", "ĥ", "ħ"],
  j: ["j", "ĵ"],
  k: ["k", "ķ", "ƙ"],
  l: ["l", "ĺ", "ļ", "ľ", "ł"],
  n: ["n", "ń", "ň", "ñ", "ņ", "ƞ"],
  r: ["r", "ŕ", "ř", "ŗ"],
  s: ["s", "ś", "š", "ş", "ŝ", "š́"],
  t: ["t", "ţ", "ť", "ŧ"],
  z: ["z", "ź", "ž", "ż", "ƶ"],
};
