/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useEffect, FC } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { extend } from '@react-three/fiber';

extend({ Water });

interface OceanProps {
  theme: 'light' | 'dark';
}

const THEME_CONFIG = {
  light: {
    sunColor: 0xffffff,
    waterColor: new THREE.Color('#1ca3ec'),
  },
  dark: {
    sunColor: 0x222244,
    waterColor: new THREE.Color('#0a1a2f'),
  },
};

const Ocean: FC<OceanProps> = ({ theme }) => {
  const ref = useRef<THREE.Mesh>(null);
  const waterRef = useRef<any>(null);
  const { scene } = useThree();

  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpg');

  useEffect(() => {
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  }, [waterNormals]);

  useEffect(() => {
    if (ref.current) {
      const config = THEME_CONFIG[theme];
      const water = new Water(ref.current.geometry, {
        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals,
        sunDirection: new THREE.Vector3(1, 1, 1),
        sunColor: config.sunColor,
        waterColor: config.waterColor,
        distortionScale: 4.0,
        fog: !!scene.fog,
      });
      waterRef.current = water;
      ref.current.material = water.material;
    }
  }, [scene, waterNormals, theme]);

  // Update water color and sun color when theme changes
  useEffect(() => {
    if (waterRef.current) {
      const config = THEME_CONFIG[theme];
      waterRef.current.material.uniforms['sunColor'].value.set(config.sunColor);
      waterRef.current.material.uniforms['waterColor'].value.copy(
        config.waterColor,
      );
    }
  }, [theme]);

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
};

export default Ocean;
