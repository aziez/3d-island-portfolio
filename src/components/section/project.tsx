'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

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

export default Projects;
