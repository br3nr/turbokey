"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Key from "@/components/Key/LogoKey";
import { TrackballControls } from "@react-three/drei";

export default function Page() {
  const authenticateUser = () => {
    window.location.href =
      "https://discord.com/api/oauth2/authorize?client_id=1124947743190814740&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fredirect&response_type=code&scope=identify";
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="m-5">
          <Canvas camera={{ fov: 20, position: [0, 0, 7] }}>
            <ambientLight intensity={0.3} position={[0, -0, 0]} />
            <spotLight position={[0, -0, 50]} angle={0.3} />
            <spotLight position={[0, -0, -50]} angle={-0.3} />
            <Key position={[0, 0, 0]} colour="#9d4edd" size="1u" />
            <TrackballControls
              dynamicDampingFactor={0.05}
              noZoom={true}
              noPan={true}
              rotateSpeed={2.0}
            />
          </Canvas>
        </div>
        <h3 className="items-center justify-center flex">
          Welcome to Turbokey
        </h3>

        <div className="flex items-center justify-center m-10">
          <button onClick={authenticateUser}>Login</button>
        </div>
      </div>
    </div>
  );
}
