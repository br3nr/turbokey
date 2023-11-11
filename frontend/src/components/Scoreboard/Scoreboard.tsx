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

type GraphData = {
  avgWpm: number[];
  avgRaw: number[];
  time: number[];
};


export default function Scoreboard({ liveScore }: ScoreboardProps) {
  const [graphData, setGraphData] = useState<GraphData>();  
  const [wpm, setWpm] = useState<number>();
  
  function getAverages(timeArray: number[], wpmArray: number[])
  {
    const sumMap = new Map<number, number>();
    const countMap = new Map<number, number>();
    const averages: number[] = [];
    
    for (let i = 0; i < timeArray.length; i++) {
      const position = Math.floor(timeArray[i]);
      const value = wpmArray[i];
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
    });
    
    return averages;
  }


  function getGraphData(timeArray: number[], wpmArray: number[], rawArray: number[]) {
    
    const avgWpm = getAverages(timeArray, wpmArray);
    const avgRaw = getAverages(timeArray, rawArray);
    const time = []

    for(let i = 0; i < avgWpm.length; i++)
    {
      time.push(i);  
    }

    const graphScore: GraphData = {
      avgWpm: avgWpm,
      avgRaw: avgRaw,
      time: time,
    };

    console.log(time)

    return graphScore;
  }

  useEffect(() => {
    const wpm = liveScore.map((score) => score.wpm);
    const rawWpm = liveScore.map((score) => score.rawWpm);
    const rawSeconds = liveScore.map((seconds) => seconds.time);
    const graphData = getGraphData(rawSeconds, wpm, rawWpm);
    setGraphData(graphData);
    }, [liveScore]);

  return (
  <>
    <div className="flex items-center justify-center">
      <div>
      {liveScore[liveScore.length-1].wpm}
      </div>
      <div>
      {liveScore[liveScore.length-1].time}
     </div>
    </div>

    <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/2 h-1/2">
        <Line
          data={{
            labels: graphData?.time,
            datasets: [
               {
                data: graphData?.avgWpm,
                backgroundColor: "white",
                borderColor: "purple",
                tension: 0.1,
                fill: true,
              },             {
                data: graphData?.avgRaw,
                backgroundColor: "gray",
                borderColor: "gray",
                tension: 0.1,
                fill: true,
              },             
            ],
          }}
          options={{
            scales : {
              y: {
                suggestedMin: 0,
              },
            },
          }}
        />
      </div>
    </div>
  </>
  );
}
