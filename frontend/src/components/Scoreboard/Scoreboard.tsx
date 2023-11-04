"use client";
import React, { useState, useEffect } from "react";
import { LiveScore } from "@/types/LiveScore";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type ScoreboardProps = {
  liveScore: LiveScore[];
};

type GraphScore = {
  avgWpm: number[];
  time: number[];
};

export default function Scoreboard({ liveScore }: ScoreboardProps) {
  const [wpm, setWpm] = useState<number[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);

  function getAverages(num_array: number[], wpm: number[]) {
    const sumMap = new Map<number, number>();
    const countMap = new Map<number, number>();
    const averages: number[] = [];
    const time: number[] = [];

    for (let i = 0; i < num_array.length; i++) {
      const position = Math.floor(num_array[i]);
      const value = wpm[i];
      if (position != 0) {
        if (sumMap.has(position)) {
          sumMap.set(position, sumMap.get(position)! + value);
          countMap.set(position, countMap.get(position)! + 1);
        } else {
          sumMap.set(position, value);
          countMap.set(position, 1);
        }
      }
    }

    sumMap.forEach((sum, position) => {
      const count = countMap.get(position)!;
      const average = sum / count;
      averages.push(average);
      time.push(position);
    });

    const graphScore: GraphScore = {
      avgWpm: averages,
      time: time,
    };
    return graphScore;
  }

  useEffect(() => {
    const raw_wpm = liveScore.map((score) => score.wpm);
    const raw_seconds = liveScore.map((seconds) => seconds.time);
    const graphScore = getAverages(raw_seconds, raw_wpm);
    setWpm(graphScore.avgWpm);
    setSeconds(graphScore.time);
  }, [liveScore]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-1/2">
        <Line
          data={{
            labels: seconds,
            datasets: [
              {
                data: wpm,
                backgroundColor: "white",
                borderColor: "purple",
                tension: 0.1,
                fill: true,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
