"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ControlsProps {
  target?: [number, number, number];
}

const Controls = ({ target = [0, 0, 0] }: ControlsProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!controlsRef.current) return;

    const speed = 0.1;
    const controls = controlsRef.current;
    const camera = controls.object;

    // WASD movement
    if (keysPressed.current['KeyW']) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      camera.position.add(direction.multiplyScalar(speed));
      controls.target.add(direction.multiplyScalar(speed));
    }
    if (keysPressed.current['KeyS']) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      camera.position.sub(direction.multiplyScalar(speed));
      controls.target.sub(direction.multiplyScalar(speed));
    }
    if (keysPressed.current['KeyA']) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.cross(camera.up);
      direction.y = 0;
      direction.normalize();
      camera.position.add(direction.multiplyScalar(speed));
      controls.target.add(direction.multiplyScalar(speed));
    }
    if (keysPressed.current['KeyD']) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.cross(camera.up);
      direction.y = 0;
      direction.normalize();
      camera.position.sub(direction.multiplyScalar(speed));
      controls.target.sub(direction.multiplyScalar(speed));
    }

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={30}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2.2}
      target={target}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      panSpeed={0.8}
      zoomSpeed={0.8}
      // Mobile optimizations
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
};

export default Controls;

