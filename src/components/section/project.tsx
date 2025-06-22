'use client';

import { Float, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { Group } from 'three';

function Projects() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Featured Projects
      </h2>
      <div className="space-y-6">
        {[
          {
            title: '3D Portfolio Island',
            description:
              'Interactive 3D portfolio built with React Three Fiber and Next.js',
            tech: ['React', 'Three.js', 'Next.js', 'TypeScript'],
            github: '#',
            demo: '#',
          },
          {
            title: 'E-Commerce Platform',
            description:
              'Full-stack e-commerce solution with payment integration',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: '#',
            demo: '#',
          },
          {
            title: 'Task Management App',
            description: 'Collaborative task management with real-time updates',
            tech: ['Vue.js', 'Socket.io', 'Express', 'PostgreSQL'],
            github: '#',
            demo: '#',
          },
        ].map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-lg border"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={project.github}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Github size={18} />
                Code
              </a>
              <a
                href={project.demo}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const ProjectsScene = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const projects: {
    name: string;
    color: string;
    position: [number, number, number];
  }[] = [
    { name: '3D Portfolio', color: '#ff6b6b', position: [0, 2, 0] },
    { name: 'Web App', color: '#4ecdc4', position: [2, 0, 0] },
    { name: 'Mobile App', color: '#45b7d1', position: [-2, 0, 0] },
    { name: 'AI Project', color: '#96ceb4', position: [0, -2, 0] },
  ];

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.3}
          floatIntensity={0.8}
        >
          <group position={project.position}>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={project.color}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <Html position={[0, 1.5, 0]} center>
              <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {project.name}
              </div>
            </Html>
          </group>
        </Float>
      ))}

      {/* Center glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

export default Projects;
