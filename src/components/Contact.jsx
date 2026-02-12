import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'success', 'error', or ''

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create form data for Netlify
    const form = e.target;
    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      })
      .catch((error) => {
        console.error("Form Error:", error);
        setStatus('error');
      });
  };

  return (
    <section id="contact" className="py-20 bg-[#0A1619] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              I am currently available for freelance projects and full-time opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email Me</h4>
                  <a href="mailto:shafeeahamed494@gmail.com" className="text-gray-400 hover:text-white transition-colors">shafeeahamed494@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Me</h4>
                  <a href="tel:+94750446123" className="text-gray-400 hover:text-white transition-colors">+94 750446123</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-highlight" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Location</h4>
                  <p className="text-gray-400">Ampara, Sri Lanka.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            {/* The Actual Form Tag */}
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
            >
              {/* IMPORTANT: Hidden Input for Netlify */}
              <input type="hidden" name="form-name" value="contact" />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-highlight text-primary font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </button>

                {/* Success/Error Messages */}
                {status === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm flex items-center gap-2 mt-4">
                    <CheckCircle size={16} /> Message sent successfully!
                  </div>
                )}
                {status === 'error' && (
                   <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2 mt-4">
                    <AlertCircle size={16} /> Failed to send. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-20 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Faris Shafee. All rights reserved.</p>
        </div>
    </section>
  );
};

export default Contact;