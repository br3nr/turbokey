"use client";
import React from "react";
import styles from "./page.module.css";
import Scene from "../components/Scene/Scene";
import TypeControls from "../components/TypeControls/TypeControls";
import ThemeChanger from "@/components/ThemeChanger/ThemeChanger";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8000/auth/login", { credentials: "include" });
      if (response.status === 401) {
        router.push("/login");
      } else {
        setLoading(false);
        console.log(await response.json());
      }
    };
    fetchUserData();
  }, [loading]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className={styles.typeDiv} >
          <div>
            <ThemeChanger />

            <TypeControls />
          </div>
          <div className={styles.sceneDiv}>
            <Scene />
          </div>
        </div>
      )}
    </>
  );
}
