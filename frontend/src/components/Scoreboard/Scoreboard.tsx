import React from "react";
import { ResponsiveLine } from '@nivo/line';
import { LiveScore } from "@/types/LiveScore";

type ScoreboardProps = {
  liveScore: {[key: number]: LiveScore}; 
}


export default function Scoreboard({liveScore}: ScoreboardProps)
{
  console.log(liveScore) 
  return(
  <>
    <div className="flex items-center justify-center">
      <div className="bg-slate-100 w-3/4 rounded-xl dark:bg-slate-800">
      </div>
    </div>
  </>
  );
}
