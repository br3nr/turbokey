/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["DSA_Spacebar_625u_(50mm_spacing)"]: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/spacebar.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["DSA_Spacebar_625u_(50mm_spacing)"].geometry}
        material={nodes["DSA_Spacebar_625u_(50mm_spacing)"].material}
        rotation={[Math.PI / 1, 0, 0]}
        position={[0, -6, 0]}
        scale={0.1}
      >
        <meshStandardMaterial attach="material" color={"hotpink"} />
    </mesh> 
    </group>
  );
}

useGLTF.preload("/spacebar.glb");