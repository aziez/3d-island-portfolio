import { Float, Html, MeshReflectorMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

function Skills() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Skills & Technologies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            category: 'Frontend',
            skills: [
              'React',
              'Vue.js',
              'TypeScript',
              'HTML5',
              'CSS3',
              'Tailwind CSS',
            ],
            color: 'blue',
          },
          {
            category: 'Backend',
            skills: [
              'Node.js',
              'Python',
              'Express',
              'FastAPI',
              'PostgreSQL',
              'MongoDB',
            ],
            color: 'green',
          },
          {
            category: 'Tools & DevOps',
            skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack'],
            color: 'purple',
          },
          {
            category: '3D & Graphics',
            skills: [
              'Three.js',
              'React Three Fiber',
              'Blender',
              'WebGL',
              'GLSL',
            ],
            color: 'orange',
          },
        ].map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-lg border"
          >
            <h3
              className={`text-xl font-semibold mb-4 text-${skillGroup.color}-600`}
            >
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 bg-${skillGroup.color}-100 text-${skillGroup.color}-800 rounded-full text-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const SkillsScene = () => {
  const skills = [
    { name: 'React', level: 0.9, color: '#61dafb' },
    { name: 'Three.js', level: 0.8, color: '#049ef4' },
    { name: 'TypeScript', level: 0.85, color: '#3178c6' },
    { name: 'Node.js', level: 0.75, color: '#339933' },
    { name: 'Python', level: 0.7, color: '#3776ab' },
  ];

  return (
    <group>
      {skills.map((skill, index) => (
        <Float
          key={index}
          speed={1.5 + index * 0.1}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <group
            position={[
              Math.cos((index / skills.length) * Math.PI * 2) * 3,
              Math.sin(index * 0.5) * 2,
              Math.sin((index / skills.length) * Math.PI * 2) * 3,
            ]}
          >
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, skill.level * 3]} />
              <meshStandardMaterial color={skill.color} />
            </mesh>
            <Html position={[0, skill.level * 1.5 + 0.5, 0]} center>
              <div className="bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-800">
                {skill.name}
              </div>
            </Html>
          </group>
        </Float>
      ))}

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151515"
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

export default Skills;
