import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { Group, Vector3 } from 'three';
import ComicPopup from '@/components/ui/comic-popup';

export default function Shark(props) {
  const group = useRef(null);
  const { scene, animations } = useGLTF('/shark-transformed.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const [showPopup, setShowPopup] = useState(true); // control popup display

  console.log(actions, 'SHR');

  useEffect(() => {
    const swimAction =
      actions[
        'SharkArmature|SharkArmature|SharkArmature|Swim_Fast|SharkArmature|Swim_Fast'
      ];
    swimAction?.play();
  }, [actions]);

  function handleClickShark() {
    setShowPopup(!showPopup);
    actions[
      'SharkArmature|SharkArmature|SharkArmature|Swim_Bite|SharkArmature|Swim_Bite'
    ].play();

    setTimeout(() => {
      actions[
        'SharkArmature|SharkArmature|SharkArmature|Swim_Bite|SharkArmature|Swim_Bite'
      ].stop();
    }, 2000);
  }

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
      <ComicPopup show={showPopup} variant="info">
        <span className="font-bold text-black">Hey there! 🦈</span>
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
