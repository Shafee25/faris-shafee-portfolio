import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Faris's AI Assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // SYSTEM PROMPT
  const systemPrompt = `
    You are an AI Assistant for Faris Shafee Ahamed, a Software Engineer.
    
    HERE IS FARIS'S RESUME DATA:
    - Role: Full Stack Engineer, Cloud Developer (Azure/AWS), IoT Specialist.
    - Education: BICT (Hons) in Software Tech from South Eastern University of Sri Lanka (2021-2025).
    - Current Jobs: Associate Software Engineer at AI Generix (Laravel/React), Intern at MobioS (React/Node/MSSQL).
    - Experience: Freelancer on Fiverr (Web Dev), IT Lecturer at Zips Campus.
    - Tech Stack: React, Laravel, Node.js, Python, Java, Flutter, Azure Functions, Cosmos DB, Docker, MySQL.
    - Key Projects: 
      1. Oasis Amps (EV Charger Booking - Laravel/Bootstrap).
      2. Low Stock Alert System (Azure Serverless - React/Node).
      3. Smart Cradle System (IoT - Flutter/Arduino/ESP32).
      4. Customer Churn Prediction (AI/ML - XGBoost).
    - Contact: shafeeahamed494@gmail.com, +94 750446123.
    - Location: Ampara, Sri Lanka.

    RULES:
    - Keep answers concise, professional, and friendly.
    - If asked about hiring, encourage them to use the Contact form or email.
    - You are REPRESENTING Faris. Be polite.
  `;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // DEBUG: Check if Key exists
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is missing! Check .env file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [{ text: "Understood. I am ready to answer questions about Faris Shafee." }],
          },
        ],
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("Gemini Error:", error); // <-- THIS PRINTS TO CONSOLE (F12)
      
      let errorMessage = "Oops! My brain is offline right now.";
      
      if (error.message.includes("API Key is missing")) {
        errorMessage = "Configuration Error: API Key is missing.";
      } else if (error.message.includes("400")) {
        errorMessage = "Connection Error: Please try again.";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-secondary to-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group border border-highlight/30"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} className="animate-bounce" />}
        {!isOpen && (
           <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F1C20] animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] z-50 bg-[#0F1C20]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          <div className="bg-gradient-to-r from-secondary to-primary p-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
               <Bot size={20} className="text-highlight" />
               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Faris AI Assistant</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <Sparkles size={10} /> Powered by Gemini
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-highlight text-primary font-medium rounded-tr-none'
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-highlight" />
                  <span className="text-xs text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-black/20 border-t border-white/10">
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-highlight/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Faris's skills..."
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`p-2 rounded-full ${isLoading ? 'text-gray-600' : 'text-highlight hover:bg-white/10'} transition-colors`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;