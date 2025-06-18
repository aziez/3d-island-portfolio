import { PortfolioSection } from '@/components/Scene';
import { useModalCamera } from '@/hooks/useModalCamera';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Modal3DProps {
  section: PortfolioSection;
  onClose: () => void;
}

const MODAL_POS = new THREE.Vector3(0, 1, 0);

export default function Modal3D({ section, onClose }: Modal3DProps) {
  useModalCamera(true, MODAL_POS); // Smooth zoom-in and fov change

  return (
    <group position={MODAL_POS}>
      <Box args={[3, 2, 0.2]}>
        <meshStandardMaterial color="white" transparent opacity={0.95} />
      </Box>

      <Text
        position={[0, 0.5, 0.3]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {section.title}
      </Text>

      <Text
        position={[0, 0, 0.3]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        3D modal content for {section.type}
      </Text>

      <mesh
        position={[1.3, 0.8, 0.4]}
        onClick={(e) => {
          e.stopPropagation();
          onClose(); // This triggers zoom out + fov reset
        }}
      >
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}
