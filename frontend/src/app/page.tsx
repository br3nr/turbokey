"use client";
import * as THREE from "three";
import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Key from "../components/Key";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Flex, Heading, Box, AbsoluteCenter } from "@chakra-ui/react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const materials = useLoader(MTLLoader, "Poimandres.mtl");
  const obj = useLoader(OBJLoader, "Poimandres.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(obj);
  return <primitive object={obj} scale={0.4} />;
};

export default function Home() {
  const handleClick = (key: string) => {
    console.log(`Clicked key: ${key}`);
    // Handle the key press event here
  };
  return (
    <>
      <Box height="100vh">
        <Canvas>
          <Suspense fallback={null}>
            <Key />

            <OrbitControls />
          </Suspense>
        </Canvas>
      </Box>
    </>
  );
}
