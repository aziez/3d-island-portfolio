import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { Group, Vector3 } from 'three';
import ComicPopup from '@/components/ui/comic-popup';
import { motion } from 'framer-motion';

export default function Shark({
  userName,
  showWelcome = false,
  onWelcomeComplete,
  ...props
}) {
  const group = useRef(null);
  const { scene, animations } = useGLTF('/shark-transformed.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const [showPopup, setShowPopup] = useState(showWelcome);
  const [welcomePhase, setWelcomePhase] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);

  const welcomeMessages = [
    `Hi ${userName || 'Visitor'}! 🦈`,
    `Welcome to my underwater world!`,
    `I'm your guide through this 3D journey`,
    `Click on the island elements to explore!`,
    `Let's dive into the portfolio adventure! 🌊`,
  ];

  const randomMessages = [
    `Hey ${userName || 'Friend'}! Having fun exploring? 🦈`,
    `Need help navigating? Just keep swimming! 🏊‍♂️`,
    `Don't forget to check out all the interactive elements!`,
    `This 3D world has many secrets to discover! ✨`,
    `Swimming is my thing, but coding is theirs! 💻`,
  ];

  console.log(actions, 'SHR');

  useEffect(() => {
    const swimAction =
      actions[
        'SharkArmature|SharkArmature|SharkArmature|Swim_Fast|SharkArmature|Swim_Fast'
      ];
    swimAction?.play();

    // Show welcome sequence
    if (showWelcome && userName) {
      let currentPhase = 0;
      const welcomeInterval = setInterval(() => {
        setWelcomePhase(currentPhase);
        currentPhase++;

        if (currentPhase >= welcomeMessages.length) {
          clearInterval(welcomeInterval);
          setTimeout(() => {
            setShowPopup(false);
            onWelcomeComplete?.();
          }, 3000);
        }
      }, 2500);

      return () => clearInterval(welcomeInterval);
    }
  }, [actions, showWelcome, userName, onWelcomeComplete]);

  function handleClickShark() {
    // Bite animation
    actions[
      'SharkArmature|SharkArmature|SharkArmature|Swim_Bite|SharkArmature|Swim_Bite'
    ].play();

    setTimeout(() => {
      actions[
        'SharkArmature|SharkArmature|SharkArmature|Swim_Bite|SharkArmature|Swim_Bite'
      ].stop();
    }, 2000);

    // Show different messages based on interaction
    if (!showWelcome) {
      setShowPopup(true);
      setInteractionCount((prev) => prev + 1);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }

  const getCurrentMessage = () => {
    if (showWelcome) {
      return welcomeMessages[welcomePhase] || welcomeMessages[0];
    }
    return randomMessages[interactionCount % randomMessages.length];
  };

  useFrame(({ clock }) => {
    const radius = 10;
    const speed = 0.3;
    const time = clock.getElapsedTime() * speed;
    const x = Math.cos(time) * radius;
    const z = Math.sin(time) * radius;
    const y = -1;

    if (group.current) {
      group.current.position.set(x, y, z);
      const nextX = Math.cos(time + 0.01) * radius;
      const nextZ = Math.sin(time + 0.01) * radius;
      group.current.lookAt(new Vector3(nextX, y, nextZ));
    }
  });

  return (
    <group ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <ComicPopup show={showPopup} variant={showWelcome ? 'welcome' : 'info'}>
        <span className="font-bold text-black">{getCurrentMessage()}</span>
      </ComicPopup>

      <group name="Root_Scene" onClick={handleClickShark}>
        <group name="SharkArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <primitive object={nodes.Abdomen} />
          <primitive object={nodes.Center} />
        </group>
        <primitive object={nodes.Root} />
        <skinnedMesh
          name="Shark"
          geometry={nodes.Shark.geometry}
          material={materials.AtlasMaterial}
          skeleton={nodes.Shark.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <skinnedMesh
          name="Shark001"
          geometry={nodes.Shark001.geometry}
          material={materials.AtlasMaterial}
          skeleton={nodes.Shark001.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/shark-transformed.glb');
