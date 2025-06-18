/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { extend } from '@react-three/fiber';

extend({ Water });

export default function Ocean() {
  const ref = useRef<THREE.Mesh>(null);
  const waterRef = useRef<any>(null);
  const { scene } = useThree();

  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpg');

  useEffect(() => {
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  }, [waterNormals]);

  useEffect(() => {
    if (ref.current) {
      const water = new Water(ref.current.geometry, {
        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals,
        sunDirection: new THREE.Vector3(1, 1, 1),
        sunColor: 0x1ca3ec,
        waterColor: new THREE.Color('#1ca3ec'),
        distortionScale: 4.0,
        fog: !!scene.fog,
      });
      waterRef.current = water;
      ref.current.material = water.material;
    }
  }, [scene, waterNormals]);

  useFrame(() => {
    if (waterRef.current) {
      waterRef.current.material.uniforms['time'].value += 1 / 60;
    }
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
      <planeGeometry args={[1000, 1000, 1, 1]} />
    </mesh>
  );
}
