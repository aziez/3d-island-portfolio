"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioSection } from "./Scene";
import { X, Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

interface UIProps {
  activeSection: PortfolioSection | null;
  onClose: () => void;
  sections: PortfolioSection[];
}

const UI = ({ activeSection, onClose, sections }: UIProps) => {
  const renderContent = () => {
    if (!activeSection) return null;

    switch (activeSection.type) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
                AZ
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Aziz Avatar</h2>
              <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Passionate full-stack developer with expertise in modern web technologies. 
                I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or enjoying the great outdoors.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                <p className="text-gray-600">Available Worldwide</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
                <p className="text-gray-600">5+ Years</p>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Projects</h2>
            <div className="space-y-6">
              {[
                {
                  title: "3D Portfolio Island",
                  description: "Interactive 3D portfolio built with React Three Fiber and Next.js",
                  tech: ["React", "Three.js", "Next.js", "TypeScript"],
                  github: "#",
                  demo: "#"
                },
                {
                  title: "E-Commerce Platform",
                  description: "Full-stack e-commerce solution with payment integration",
                  tech: ["React", "Node.js", "MongoDB", "Stripe"],
                  github: "#",
                  demo: "#"
                },
                {
                  title: "Task Management App",
                  description: "Collaborative task management with real-time updates",
                  tech: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
                  github: "#",
                  demo: "#"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg border"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                      <Github size={18} />
                      Code
                    </a>
                    <a href={project.demo} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience & Education</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h3>
                <div className="space-y-4">
                  {
                    [
                      {
                        title: "Senior Full Stack Developer",
                        company: "Tech Solutions Inc.",
                        period: "2022 - Present",
                        description: "Led development of scalable web applications using React, Node.js, and cloud technologies."
                      },
                      {
                        title: "Frontend Developer",
                        company: "Digital Agency",
                        period: "2020 - 2022",
                        description: "Developed responsive web applications and collaborated with design teams to create engaging user experiences."
                      },
                      {
                        title: "Junior Developer",
                        company: "Startup Co.",
                        period: "2019 - 2020",
                        description: "Built and maintained web applications while learning modern development practices."
                      }
                    ].map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 border-blue-500 pl-4"
                      >
                        <h4 className="font-semibold text-gray-800">{job.title}</h4>
                        <p className="text-blue-600 font-medium">{job.company}</p>
                        <p className="text-gray-500 text-sm mb-2">{job.period}</p>
                        <p className="text-gray-600">{job.description}</p>
                      </motion.div>
                    ))
                  }
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Bachelor of Computer Science</h4>
                  <p className="text-green-600 font-medium">University of Technology</p>
                  <p className="text-gray-500 text-sm">2015 - 2019</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {
                [
                  {
                    category: "Frontend",
                    skills: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
                    color: "blue"
                  },
                  {
                    category: "Backend",
                    skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
                    color: "green"
                  },
                  {
                    category: "Tools & DevOps",
                    skills: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Webpack"],
                    color: "purple"
                  },
                  {
                    category: "3D & Graphics",
                    skills: ["Three.js", "React Three Fiber", "Blender", "WebGL", "GLSL"],
                    color: "orange"
                  }
                ].map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-lg border"
                  >
                    <h3 className={`text-xl font-semibold mb-4 text-${skillGroup.color}-600`}>
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
                ))
              }
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="text-blue-600" size={20} />
                  <span>aziz.avatar@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="text-green-600" size={20} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="text-red-600" size={20} />
                  <span>Available Worldwide</span>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Navigation Dots */}
      <div className="absolute top-8 right-8 pointer-events-auto">
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => activeSection?.id === section.id ? onClose() : {}}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                activeSection?.id === section.id
                  ? 'bg-white border-white'
                  : 'bg-transparent border-white/60 hover:border-white'
              }`}
              whileHover={{ scale: 1.2 }}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      {!activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        >
          <div className="bg-black/70 text-white px-4 py-3 rounded-full backdrop-blur-sm max-w-md mx-auto">
            <p className="text-xs sm:text-sm text-center">
              <span className="hidden sm:inline">Click elements to explore • Drag to rotate • Scroll to zoom • WASD to move</span>
              <span className="sm:hidden">Tap elements • Drag to rotate • Pinch to zoom</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation Helper */}
      <div className="absolute top-8 left-8 pointer-events-auto sm:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">📱</div>
              <div>Tap</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">🔄</div>
              <div>Drag</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">🤏</div>
              <div>Pinch</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 pointer-events-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl p-8 max-w-4xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
              {renderContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UI;

