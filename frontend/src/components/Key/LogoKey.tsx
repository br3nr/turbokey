/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    keycap: THREE.Mesh;
  };
  materials: {};
};

export default function Key(
  props: JSX.IntrinsicElements["group"] & {
    position: [number, number, number];
  } & { colour: string } & { size: string }
) {
  const { position, ...restProps } = props;
  const { nodes, materials } = useGLTF(`/keycaps/${props.size}.glb`) as GLTFResult;

  return (
    <group position={position} {...restProps} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        scale={[0.1, 0.1, 0.1]}
        geometry={nodes.keycap.geometry}
        material={nodes.keycap.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial attach="material" color={props.colour} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/keycaps/1u.glb");