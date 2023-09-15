import React, { useEffect, useRef, useState } from "react";
import { generateWordList } from "@/utils/generateWordList";
import WordWrapper from "../WordWrapper/WordWrapper";
import styles from "./TypeControls.module.css";
import { WordObject } from "@/types/WordObject";

interface LiveScore {
  time: number;
  wpm: number;
  errors: number;
  corrects: number;
}

interface TypeControlProps {
  onGameOver: () => void;
}

function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
}

function getWords(sentence: string): WordObject[] {
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
}


export default function TypeControls({onGameOver}: TypeControlProps) {
  const [curKeys, setCurKeys] = useState<string>("");
  const [targetSentence, setTargetSentence] = useState<string>(""); // TODO: replace with words from backend
  const [wordList, setWordList] = useState<WordObject[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [wpm, setWpm] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const [attemptedWords, setAttemptedWords] = useState<number>(0);
  const [totalWords, setTotalWords] = useState<number>(0);
  const [liveScore, setLiveScore] = useState<{[key: number]: LiveScore}>({0:{time: 0, errors: 0, wpm: 0, corrects: 0}});

  const calcWordPerMin = (words: WordObject[]) => {
    if (words.length === 0) {
      return; // Exit early if wordList is empty
    }
    let wordCount: number = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i].isCorrect === true) {
        wordCount = wordCount + 1;
      }
    }
    setWpm(Math.floor((wordCount / seconds) * 60));
  };

  useEffect(() => {
    calcWordPerMin(wordList);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameStarted && hasTyped && !gameOver) {
        setSeconds((prevSeconds) => prevSeconds + 1); // TODO: create livescore here
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, hasTyped, gameOver]);

  useEffect(() => {
    const getWordList = async () => {
      const sentence = await generateWordList();
      setTargetSentence(sentence);
      setWordList(getWords(sentence));
    };
    getWordList();
  }, []);

  const setTypedWords = (keyList: string) => {
    const curKeyArray = keyList.split(" ");
    setWordList((prevWordList) => {
      return prevWordList.map((word, index) => {
        if (index < curKeyArray.length) {
          let correct = null;
          if (index < curKeyArray.length - 1) {
            // check if the previous word is missspelt
            if (curKeyArray[index] === wordList[index].targetWord) {
              correct = true;
            } else {
              correct = false;
            }
          }
          return { ...word, typedWord: curKeyArray[index], isCorrect: correct, attempted: true};
        }
        return word;
      });
    });
  };

  const handleBackSpace = (keyList: string[]) => {
    if (
      wordList[keyList.length - 2] &&
      wordList[keyList.length - 2].targetWord ===
        wordList[keyList.length - 2].typedWord
    ) {
      if (keyList[keyList.length - 1].length > 0) {
        setTypedWords(curKeys.slice(0, -1));
        setCurKeys((prevList) => prevList.slice(0, -1));
      }
    } else {
      setTypedWords(curKeys.slice(0, -1));
      setCurKeys((prevList) => prevList.slice(0, -1));
    }
  };
  

  function detectError(event: KeyboardEvent)
  {
    const typedKeys = curKeys + event.key
    const words = typedKeys.split(" ");
    const currentWord = words.slice(-1)[0];
    const targetWord = targetSentence.split(" ")[typedKeys.split(" ").length-1] + " ";
    const targetLetter = targetWord[currentWord.length-1];
    const currentLetter = currentWord.slice(-1);

    if(currentWord.length !=0)
    {
      let newScore = liveScore[seconds];
      if(newScore == undefined)
      {
        newScore = { time: seconds + 1, wpm: wpm, errors: 0, corrects: 0 }
      }
      
      if(event.key === " " && currentWord.length != targetWord.length
          || currentLetter !== targetLetter)
      { // This seems to be thread safe, by adding seconds to useEffect
        newScore.errors++
        setLiveScore({...liveScore, [seconds]: newScore});
      }
      else
      {
        newScore.corrects++
        setLiveScore({...liveScore, [seconds]: newScore});
      }
    }
  }


  useEffect(() => {
    if (gameStarted) {
      const handleKeyDown = (event: KeyboardEvent) => {
        setHasTyped(true);
        if (isAlphabetOrGrammar(event) && event.key.length === 1) {
          detectError(event)
          setCurKeys((prevList) => prevList + event.key);
          setTypedWords(curKeys + event.key)
          // check here or smtn 
          
        } else if (event.key === "Backspace") {
          let curKeyList = curKeys.split(" ");
          handleBackSpace(curKeyList);
        }
      };

      const targetWordArr: string[] = [];
      const typedWordArr: string[] = [];

      wordList.forEach(obj => {
        targetWordArr.push(obj.targetWord);
        if(obj.attempted) { typedWordArr.push(obj.typedWord); }
      });
     
      setTotalWords(targetWordArr.length);
      setAttemptedWords(typedWordArr.length);
      
      if(targetWordArr.slice(-2)[0] === typedWordArr.slice(-1)[0] ||
      targetWordArr.length == typedWordArr.length)
      {
        setGameOver(true);
        onGameOver();
        console.log(liveScore)
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [curKeys, targetSentence, wordList, gameStarted]);
  

  return (
    <>
      <div className={styles.center}>
        <div>Time: {seconds}</div>
        <div>Words per minute: {wpm}</div>
        <div>{attemptedWords}/{totalWords}</div>
        <div>Game over: {gameOver == true ? "true" : "false"}</div>
      </div>
      <div className={styles.container}>
        <div className={!gameStarted ? styles.blur : ""}>
          <WordWrapper wordList={wordList} />
        </div>
        {!gameStarted ? (
          <button onClick={() => setGameStarted(true)} className={styles.overlayButton}>
            Click to Start
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );}
