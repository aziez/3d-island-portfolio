'use client';

import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

export interface CameraAnimation {
  position: [number, number, number];
  target: [number, number, number];
  duration?: number;
  ease?: string;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

export const useCameraAnimations = () => {
  const { camera, gl } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimatingRef = useRef(false);

  // Initialize camera if needed
  if (!camera.userData.initialized) {
    camera.position.set(-2, -15, 10);
    targetRef.current.set(0, 0, 0);
    camera.lookAt(targetRef.current);
    camera.userData.initialized = true;
  }

  // Camera update loop
  useFrame(() => {
    if (!isAnimatingRef.current) {
      camera.lookAt(targetRef.current);
    }
  });

  // Fly-through animation to island
  const flyToIsland = useCallback((userName?: string, onComplete?: () => void) => {
    isAnimatingRef.current = true;
    
    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onComplete?.();
      }
    });

    // Start from far away
    timeline.set(camera.position, { x: -50, y: 30, z: 50 })
      .set(targetRef.current, { x: 0, y: 0, z: 0 })
      
      // Dramatic approach
      .to(camera.position, {
        x: -20,
        y: 15,
        z: 25,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(targetRef.current, {
        x: 0,
        y: 2,
        z: 0,
        duration: 2,
        ease: "power2.inOut"
      }, 0)
      
      // Circle around the island
      .to(camera.position, {
        x: 0,
        y: 8,
        z: 15,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(targetRef.current, {
        x: 0,
        y: 1,
        z: 0,
        duration: 2,
        ease: "power2.inOut"
      }, "-=2")
      
      // Final approach - land near the island
      .to(camera.position, {
        x: -8,
        y: 5,
        z: 12,
        duration: 1.5,
        ease: "power2.out"
      })
      .to(targetRef.current, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5");

    return timeline;
  }, [camera]);

  // Animate to specific section
  const animateToSection = useCallback((
    position: [number, number, number],
    target: [number, number, number] = [0, 0, 0],
    duration = 2
  ) => {
    isAnimatingRef.current = true;
    
    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    timeline.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration,
      ease: "power2.inOut"
    })
    .to(targetRef.current, {
      x: target[0],
      y: target[1],
      z: target[2],
      duration,
      ease: "power2.inOut"
    }, 0);

    return timeline;
  }, [camera]);

  // Reset to default view
  const resetCamera = useCallback(() => {
    return animateToSection([-2, -15, 10], [0, 0, 0], 2);
  }, [animateToSection]);

  // Orbit around point
  const orbitAnimation = useCallback((
    center: [number, number, number] = [0, 0, 0],
    radius = 15,
    height = 8,
    duration = 8
  ) => {
    isAnimatingRef.current = true;
    
    const timeline = gsap.timeline({
      repeat: -1,
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // Create circular motion
    timeline.to(camera.position, {
      motionPath: {
        path: `M${center[0] + radius},${height},${center[2]} 
               A${radius},${radius} 0 1,1 ${center[0] - radius},${height},${center[2]} 
               A${radius},${radius} 0 1,1 ${center[0] + radius},${height},${center[2]}`,
        autoRotate: false,
      },
      duration,
      ease: "none"
    });

    // Keep looking at center
    timeline.to(targetRef.current, {
      x: center[0],
      y: center[1],
      z: center[2],
      duration: 0.1,
      ease: "none"
    }, 0);

    return timeline;
  }, [camera]);

  // Dramatic reveal animation
  const dramaticReveal = useCallback((onComplete?: () => void) => {
    isAnimatingRef.current = true;
    
    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onComplete?.();
      }
    });

    // Start underwater
    timeline.set(camera.position, { x: 0, y: -10, z: 0 })
      .set(targetRef.current, { x: 0, y: 5, z: 0 })
      
      // Rise from underwater
      .to(camera.position, {
        x: 0,
        y: 2,
        z: 8,
        duration: 3,
        ease: "power2.out"
      })
      .to(targetRef.current, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: "power2.out"
      }, 0)
      
      // Pull back to reveal full island
      .to(camera.position, {
        x: -8,
        y: 12,
        z: 15,
        duration: 2,
        ease: "power1.inOut"
      })
      .to(targetRef.current, {
        x: 0,
        y: 2,
        z: 0,
        duration: 2,
        ease: "power1.inOut"
      }, "-=2");

    return timeline;
  }, [camera]);

  // Modal entrance animation
  const modalEntranceAnimation = useCallback((
    modalPosition: [number, number, number],
    focusTarget: [number, number, number],
    onComplete?: () => void
  ) => {
    isAnimatingRef.current = true;
    
    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onComplete?.();
      }
    });

    timeline.to(camera.position, {
      x: modalPosition[0],
      y: modalPosition[1],
      z: modalPosition[2],
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(targetRef.current, {
      x: focusTarget[0],
      y: focusTarget[1],
      z: focusTarget[2],
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);

    return timeline;
  }, [camera]);

  return {
    flyToIsland,
    animateToSection,
    resetCamera,
    orbitAnimation,
    dramaticReveal,
    modalEntranceAnimation,
    isAnimating: isAnimatingRef.current,
    currentTarget: targetRef.current
  };
};
