import { Mail, MapPin, Phone } from 'lucide-react';

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

export default Contact;
