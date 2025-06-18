import { motion, AnimatePresence } from 'framer-motion';

function Resume() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Experience & Education
      </h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Work Experience
          </h3>
          <div className="space-y-4">
            {[
              {
                title: 'Senior Full Stack Developer',
                company: 'Tech Solutions Inc.',
                period: '2022 - Present',
                description:
                  'Led development of scalable web applications using React, Node.js, and cloud technologies.',
              },
              {
                title: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                description:
                  'Developed responsive web applications and collaborated with design teams to create engaging user experiences.',
              },
              {
                title: 'Junior Developer',
                company: 'Startup Co.',
                period: '2019 - 2020',
                description:
                  'Built and maintained web applications while learning modern development practices.',
              },
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
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Education
          </h3>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-800">
              Bachelor of Computer Science
            </h4>
            <p className="text-green-600 font-medium">
              University of Technology
            </p>
            <p className="text-gray-500 text-sm">2015 - 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
