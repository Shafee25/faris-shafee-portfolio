import React from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#0A1619] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              I am currently available for freelance projects and full-time opportunities.
              If you have a project that needs some creative touch, feel free to contact me.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email Me</h4>
                  <a href="mailto:shafeeahamed494@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    shafeeahamed494@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Me</h4>
                  <a href="tel:+94750446123" className="text-gray-400 hover:text-white transition-colors">
                    +94 750446123
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Location</h4>
                  <p className="text-gray-400">
                    No 31B, OPA Road, Addalaichenai, Ampara, Sri Lanka.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-10">
              <a href="https://linkedin.com/in/shafee-ahamed" target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-highlight hover:border-highlight hover:text-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/Shafee25" target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-highlight hover:border-highlight hover:text-primary transition-all duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          {/* We add 'data-netlify="true"' so Netlify automatically handles this form when deployed */}
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  required
                  placeholder="How can I help you?"
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-highlight text-primary font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </div>
          </form>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-20 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Faris Shafee. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;