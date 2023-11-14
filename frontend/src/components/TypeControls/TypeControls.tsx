import React, { useEffect, useRef, useState } from 'react';
import {
  generateWordList,
  getWordList,
  isAlphabetOrGrammar,
  calcWordPerMin,
  calcRawWordPerMin,
} from '@/utils/WordUtils';

import WordWrapper from '../WordWrapper/WordWrapper';
import styles from './TypeControls.module.css';
import { WordObject } from '@/types/WordObject';
import { LiveScore } from '@/types/LiveScore';
import { FinalScore } from '@/types/FinalScore';
import { TargetSentence } from '@/classes/TargetSentence';
import { InputSentence } from '@/classes/InputSentence';

interface TypeControlProps {
  onGameOver: (liveScore: LiveScore[], finalScore: FinalScore) => void;
}

const getTargetSentenceArray = (wordList: WordObject[]): string[] => {
  const targetSentence = wordList.map((wordObj) => wordObj.targetWord);
  return targetSentence;
};

export default function TypeControls({ onGameOver }: TypeControlProps) {
  const [curKeys, setCurKeys] = useState<string>('');
  const [wordList, setWordList] = useState<WordObject[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const [liveScore, setLiveScore] = useState<LiveScore[]>([]);
  const [targetSentence, setTargetSentence] = useState<TargetSentence>(
    new TargetSentence('')
  );
  const [inputSentence, setInputSentence] = useState<InputSentence>(
    new InputSentence()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameStarted && hasTyped && !gameOver) {
        setSeconds((prevSeconds) => prevSeconds + 0.1); // TODO: create livescore here
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, hasTyped, gameOver]);

  useEffect(() => {
    const initWordList = async () => {
      const sentence = await generateWordList();
      setWordList(getWordList(sentence));
      setTargetSentence(new TargetSentence(sentence));
    };
    initWordList();
  }, []);

  const updateWordList = (keyList: string) => {
    const curKeyArray = keyList.split(' ');
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
          return {
            ...word,
            typedWord: curKeyArray[index],
            isCorrect: correct,
            attempted: true,
          };
        }
        return word;
      });
    });
  };

  useEffect(() => {
    for (let i = 0; i < targetSentence?.getLength(); i++) {}
  }, [curKeys]);

  const handleBackSpace = (keyList: string[]) => {
    if (
      wordList[keyList.length - 2] &&
      wordList[keyList.length - 2].targetWord ===
        wordList[keyList.length - 2].typedWord
    ) {
      if (keyList[keyList.length - 1].length > 0) {
        updateWordList(curKeys.slice(0, -1));
        setCurKeys((prevList) => prevList.slice(0, -1));
      }
    } else {
      updateWordList(curKeys.slice(0, -1));
      setCurKeys((prevList) => prevList.slice(0, -1));
    }
  };

  function detectError(event: KeyboardEvent, keyList: string) {
    const words = keyList.split(' ');
    const currentWord = words.slice(-1)[0];
    const targetSentence = getTargetSentenceArray(wordList);
    const targetWord = targetSentence[keyList.split(' ').length - 1] + ' ';
    const targetLetter = targetWord[currentWord.length - 1];
    const currentLetter = currentWord.slice(-1);

    if (currentWord.length != 0) {
      const newScore = {
        time: seconds,
        wpm: calcWordPerMin(wordList, seconds),
        rawWpm: calcRawWordPerMin(curKeys, seconds),
        errors: 0,
        corrects: 0,
      };
      if (
        (event.key === ' ' && currentWord.length != targetWord.length) ||
        currentLetter !== targetLetter
      ) {
        // This seems to be thread safe, by adding seconds to useEffect
        newScore.errors++;
        setLiveScore([...liveScore, newScore]);
      } else {
        newScore.corrects++;
        setLiveScore([...liveScore, newScore]);
      }
    }
  }

  const checkGameOver = (wordList: WordObject[]): boolean => {
    const targetWordArr: string[] = [];
    const typedWordArr: string[] = [];

    wordList.forEach((obj) => {
      targetWordArr.push(obj.targetWord);
      if (obj.attempted) {
        typedWordArr.push(obj.typedWord);
      }
    });

    if (
      targetWordArr.slice(-2)[0] === typedWordArr.slice(-1)[0] ||
      targetWordArr.length == typedWordArr.length
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (gameStarted) {
      const handleKeyDown = (event: KeyboardEvent) => {
        setHasTyped(true);
        if (isAlphabetOrGrammar(event) && event.key.length === 1) {
          updateWordList(curKeys + event.key);
          detectError(event, curKeys + event.key);
          setCurKeys(curKeys + event.key);
          // check here or smtntypecon
        } else if (event.key === 'Backspace') {
          let curKeyList = curKeys.split(' ');
          handleBackSpace(curKeyList);
        }
      };
      if (checkGameOver(wordList)) {
        setGameOver(true);
        const finalScore = {
          wpm: liveScore[liveScore.length-1].wpm,
          raw: liveScore[liveScore.length-1].rawWpm,
          accuracy: 0,
        }
        onGameOver(liveScore, finalScore);
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [curKeys, wordList, gameStarted]);

  return (
    <>
      <div className={styles.container}>
        <div className={!gameStarted ? styles.blur : ''}>
          <WordWrapper wordList={wordList} />
        </div>
        {!gameStarted ? (
          <button
            onClick={() => setGameStarted(true)}
            className={styles.overlayButton}
          >
            Click to Start
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
