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

  for (var i = 0; i < 20; i++) {
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

export const calcWordPerMin = (wordList: WordObject[], seconds: number): number => {
  if (wordList.length === 0 || seconds === 0) {
    return 0; // Exit early if wordList is empty
  }
  let wordCount: number = 0;
  for (let i = 0; i < wordList.length; i++) {
    if (wordList[i].isCorrect === true) {
      wordCount = wordCount + 1;
    }
  }  return Math.floor((wordCount / seconds) * 60);
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
