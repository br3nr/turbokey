import Papa from "papaparse";
import { WordObject } from "@/types/WordObject";

export async function generateWordList(): Promise<string> {
  const response = await fetch("/wordlist/monkey.csv");
  const data = await response.text();

  const parsedData = Papa.parse(data, { header: true }).data;
  // @ts-ignore
  const words = parsedData.map((row) => row.lemma);
  var sentence = "";

  var randomIndexes: number[] = [];

  for (var i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * words.length);

    while (randomIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * words.length);
    }

    let randomWord = words[randomIndex];

    randomIndexes.push(randomIndex);

    sentence += randomWord + " ";
  }
  return sentence;
}

export const getWordList = (sentence: string): WordObject[] => {
  const words = sentence.split(" ");
  const wordList: WordObject[] = [];

  for (let i = 0; i < words.length; i++) {
    let wordObj: WordObject = {
      targetWord: "",
      typedWord: "",
      isCorrect: null,
      attempted: false,
    };
    if (i !== words.length - 1) {
      wordObj.targetWord = words[i];
    } else {
      wordObj.targetWord = words[i];
    }
    wordList.push(wordObj);
  }
  return wordList;
};


// calcWordPerMin currently has a few issues at present:
//  1. We add on an extra char for each word to include a correct space, 
//     however this does not include incorrectly typed words with a correct space, 
//     or if it is the final word therefore no space.
//  2. Takes in an already split array, not the full character array. 
//
//  Need to take inspiration from:
//  https://github.com/monkeytypegame/monkeytype/blob/master/frontend/src/ts/test/test-stats.ts
export const calcWordPerMin = (wordList: WordObject[], seconds: number): number => {
  if (wordList.length === 0 || seconds === 0) {
    return 0; // Exit early if wordList is empty
  }
  let wordCount: number = 0;
  for (let i = 0; i < wordList.length; i++) {
    if (wordList[i].isCorrect === true) {
      wordCount = wordCount + wordList[i].targetWord.length;
    }
  }  return Math.floor(((wordCount) * (60 / seconds))/5);
};

export const calcRawWordPerMin = (typedWords: string, seconds: number): number => {
    const totalChars = typedWords.length;
    const wpm = (totalChars / 5) * 60 / seconds
    return wpm
};

export const isAlphabetOrGrammar = (event: KeyboardEvent): boolean => {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
};
