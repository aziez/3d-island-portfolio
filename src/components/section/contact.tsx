import { Center, Float, Html, SpotLight, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useRef } from 'react';
import { Mesh } from 'three';

function Contact() {
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
}

export const ContactScene = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Center>
          <Text3D
            font="/fonts/Caprasimo_Regular.json"
            size={1}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            GET IN TOUCH
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
        </Center>
      </Float>

      {/* Communication icons floating around */}
      {['📧', '📱', '💼', '🌐'].map((icon, index) => (
        <Float
          key={index}
          speed={1 + index * 0.3}
          rotationIntensity={0.3}
          floatIntensity={0.8}
        >
          <Html
            position={[
              Math.cos((index / 4) * Math.PI * 2) * 4,
              Math.sin(index * 2) * 2,
              Math.sin((index / 4) * Math.PI * 2) * 2,
            ]}
            center
          >
            <div className="text-4xl animate-pulse">{icon}</div>
          </Html>
        </Float>
      ))}

      {/* Spotlight effect */}
      <SpotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
    </group>
  );
};

export default Contact;
