'use client';
import React from 'react';
import styles from './page.module.css';
import Scene from '../components/Scene/Scene';
import Scoreboard from '../components/Scoreboard/Scoreboard';
import TypeControls from '../components/TypeControls/TypeControls';
import ThemeChanger from '@/components/ThemeChanger/ThemeChanger';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sleep } from '../utils/utils';
import { LiveScore } from '@/types/LiveScore';
import { FinalScore } from '@/types/FinalScore';

type GameStats = {
  time: number;
  targetWords: string[];
  typedWords: string[];
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats[]>();
  const [liveScore, setLiveScore] = useState<{ [key: number]: LiveScore }>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:8000/auth/login', {
        credentials: 'include',
      });
      if (response.status === 401) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [loading]);

  const onGameOver = (liveScore: LiveScore[], finalScore: FinalScore) => {
    setLiveScore(liveScore);
    console.log(finalScore);
    sleep(1000, () => {
      setGameOver(true);
    });
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className={styles.typeDiv}>
          {!gameOver ? (
            <>
              <div>
                <ThemeChanger />
                <TypeControls onGameOver={onGameOver} />
              </div>
              <div className={styles.sceneDiv}>
                <Scene />
              </div>
            </>
          ) : (
            <Scoreboard liveScore={liveScore} />
          )}
        </div>
      )}
    </>
  );
}
