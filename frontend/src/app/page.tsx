"use client";
import React from "react";
import styles from "./page.module.css";
import Scene from "../components/Scene/Scene";
import TypeControls from "../components/TypeControls/TypeControls";
import { Roboto_Mono } from "next/font/google";
import EndScreen from "@/components/EndScreen/EndScreen";
import ThemeChanger from "@/components/ThemeChanger/ThemeChanger";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
      <div className={styles.typeDiv} style={robotoMono.style}>
        <div>
          <ThemeChanger />
  
          <TypeControls />
        </div>
        <div className={styles.sceneDiv}>
          <Scene />
        </div>
      </div>
  );
}
