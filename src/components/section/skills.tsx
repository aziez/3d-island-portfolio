import { motion, AnimatePresence } from 'framer-motion';

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

export default Skills;
