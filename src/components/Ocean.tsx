/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Mesh } from 'three';
// import * as THREE from 'three';

// const Ocean = () => {
//   const meshRef = useRef<Mesh>(null);
//   const materialRef = useRef<THREE.ShaderMaterial>(null);

//   useFrame((state) => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
//     }
//   });

//   const vertexShader = `
//     uniform float uTime;
//     varying vec2 vUv;
//     varying vec3 vPosition;

//     void main() {
//       vUv = uv;
//       vPosition = position;

//       vec3 pos = position;
//       float wave1 = sin(pos.x * 0.5 + uTime * 0.8) * 0.1;
//       float wave2 = sin(pos.z * 0.3 + uTime * 0.6) * 0.08;
//       pos.y += wave1 + wave2;

//       gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//     }
//   `;

//   const fragmentShader = `
//     uniform float uTime;
//     varying vec2 vUv;
//     varying vec3 vPosition;

//     void main() {
//       vec2 uv = vUv;

//       // Water color with depth
//       vec3 deepWater = vec3(0.1, 0.3, 0.6);
//       vec3 shallowWater = vec3(0.2, 0.5, 0.8);

//       // Simple foam effect
//       float foam = sin(vPosition.x * 8.0 + uTime * 2.0) * sin(vPosition.z * 8.0 + uTime * 1.5);
//       foam = smoothstep(0.7, 1.0, foam);

//       vec3 color = mix(deepWater, shallowWater, foam * 0.3);
//       color = mix(color, vec3(1.0), foam * 0.2);

//       gl_FragColor = vec4(color, 0.8);
//     }
//   `;

//   const uniforms = {
//     uTime: { value: 0 },
//   };

//   return (
//     <mesh
//       ref={meshRef}
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, -0.9, 0]}
//       receiveShadow
//     >
//       <planeGeometry args={[100, 100, 64, 64]} />
//       <shaderMaterial
//         ref={materialRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         uniforms={uniforms}
//         transparent
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// };

// export default Ocean;

// components/RealisticSea.tsx
import { useRef, useEffect } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { extend } from '@react-three/fiber';

extend({ Water });

export default function RealisticSea() {
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
        time: 3000,
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
