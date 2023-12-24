import _ from "lodash";
import {
  Vowels_Capital_Letter,
  Vowels_Small_Letter,
  Constants_Capital_Letter,
  Constants_Small_Letter,
} from "./Accent";

interface CheckedChar {
  char: string;
  isCapital?: boolean;
  isLetter?: boolean;
  isVowel?: boolean;
}

const checkForAccents = (char: string): CheckedChar => {
  for (const vowel in Vowels_Capital_Letter) {
    if (
      Vowels_Capital_Letter[
        vowel as keyof typeof Vowels_Capital_Letter
      ].includes(char)
    ) {
      //return as CheckedChar type
      const checkedChar: CheckedChar = {
        char: vowel,
        isCapital: true,
        isLetter: true,
        isVowel: true,
      };
      return checkedChar;
    }
  }
  for (const vowel in Vowels_Small_Letter) {
    if (
      Vowels_Small_Letter[vowel as keyof typeof Vowels_Small_Letter].includes(
        char
      )
    ) {
      const checkedChar: CheckedChar = {
        char: vowel,
        isCapital: false,
        isLetter: true,
        isVowel: true,
      };
      return checkedChar;
    }
  }
  for (const constant in Constants_Capital_Letter) {
    if (
      Constants_Capital_Letter[
        constant as keyof typeof Constants_Capital_Letter
      ].includes(char)
    ) {
      const checkedChar: CheckedChar = {
        char: constant,
        isCapital: true,
        isLetter: true,
        isVowel: false,
      };
      return checkedChar;
    }
  }
  for (const constant in Constants_Small_Letter) {
    if (
      Constants_Small_Letter[
        constant as keyof typeof Constants_Small_Letter
      ].includes(char)
    ) {
      const checkedChar: CheckedChar = {
        char: constant,
        isCapital: false,
        isLetter: true,
        isVowel: false,
      };
      return checkedChar;
    }
  }
  if (!char.match(/[a-zA-Z]/)) {
    const checkedChar: CheckedChar = {
      char: char,
      isCapital: false,
      isLetter: false,
    };
    return checkedChar;
  }
  if (_.toUpper(char) === char) {
    return { char: char, isCapital: true, isLetter: true };
  } else if (_.toLower(char) === char) {
    return { char: char, isCapital: false, isLetter: true };
  }

  const checkedChar: CheckedChar = {
    char: char,
    isCapital: false,
    isLetter: false,
  };
  return checkedChar;
};

const formString = (strings: string): string => {
  strings = _.trim(strings);
  strings += " ";
  let newString = "";
  let newWord = "";

  for (const character of strings) {
    const checkedChar: CheckedChar = checkForAccents(character);
    if (true) {
      // if (checkedChar.isLetter) {
      newWord += checkedChar.char;
    }
    if (!checkedChar.isLetter) {
      if (checkedChar.char === " ") {
        // newWord = _.capitalize(newWord);
        newString += newWord + " ";
        newWord = "";
      }
    }
  }
  return newString;
};

export { checkForAccents, formString };
