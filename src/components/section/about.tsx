function About() {
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
          Passionate full-stack developer with expertise in modern web
          technologies. I love creating beautiful, functional, and user-friendly
          applications that solve real-world problems.
        </p>
        <p>
          When I'm not coding, you can find me exploring new technologies,
          contributing to open-source projects, or enjoying the great outdoors.
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
}

export default About;
