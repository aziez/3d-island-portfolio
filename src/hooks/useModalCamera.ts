// hooks/useModalCamera.ts
import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useModalCamera(
  isModalOpen: boolean,
  modalTarget = new THREE.Vector3(0, 2, 0),
) {
  const { camera } = useThree();
  const prevPosition = useRef(new THREE.Vector3());
  const prevTarget = useRef(new THREE.Vector3());
  const targetCameraPos = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Save previous camera state and set modal target
  useEffect(() => {
    if (isModalOpen) {
      prevPosition.current.copy(camera.position);
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      prevTarget.current.copy(camera.position.clone().add(direction));

      targetCameraPos.current.set(0, 2, 4);
      lookAtTarget.current.copy(modalTarget);
    } else {
      targetCameraPos.current.copy(prevPosition.current);
      lookAtTarget.current.copy(prevTarget.current);
    }

    setShouldAnimate(true);
  }, [isModalOpen]);

  // Animate on every frame
  useFrame(() => {
    if (!shouldAnimate) return;

    // Smooth camera transition
    camera.position.lerp(targetCameraPos.current, 0.05);

    // Smooth lookAt by interpolating a dummy vector
    const currentLookAt = new THREE.Vector3();
    currentLookAt.lerpVectors(
      camera.getWorldDirection(new THREE.Vector3()).add(camera.position),
      lookAtTarget.current,
      0.05,
    );
    camera.lookAt(currentLookAt);

    const distance = camera.position.distanceTo(targetCameraPos.current);
    if (distance < 0.05) {
      setShouldAnimate(false);
    }
  });
}
