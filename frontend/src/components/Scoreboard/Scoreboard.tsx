import React, {useState, useEffect} from "react";
import { ResponsiveLine } from '@nivo/line';
import { LiveScore } from "@/types/LiveScore";

type ScoreboardProps = {
  liveScore: LiveScore[]; 
}

export default function Scoreboard({liveScore}: ScoreboardProps)
{
  
  useEffect(() => {
    console.log(liveScore); 
  },[liveScore])


  return(
  <>
    <div className="flex items-center justify-center">
      <div className="bg-slate-100 w-3/4 rounded-xl dark:bg-slate-800">
        
      </div>
    </div>
  </>
  );
}
