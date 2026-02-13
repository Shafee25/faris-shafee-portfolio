import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DevTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Faris.OS v2.0.0 (Tech Lead Edition)' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'command', content: input }];

      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: about, skills, projects, contact, tools, github, clear, sudo';
          break;
        case 'about':
          response = 'Faris Shafee | Full-Stack Engineer | IoT Specialist | Building scalable cloud solutions.';
          break;
        case 'skills':
          response = 'Stack: React, Laravel, Node.js, Azure, AWS, Flutter, Docker, C++, Python.';
          break;
        case 'projects':
          response = 'Navigate to the Projects section to see "Oasis Amps" and "Low Stock Alert".';
          navigate('/');
          setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 500);
          break;
        case 'contact':
          response = 'Email: shafeeahamed494@gmail.com | Phone: +94 750446123';
          break;
        case 'tools':
          response = 'Available Apps: "currency", "weather", "focus", "cost", "regex". Type "open <app>" to launch.';
          break;
        case 'open currency': navigate('/currency'); response = 'Launching Currency Converter...'; break;
        case 'open weather': navigate('/weather'); response = 'Launching SL Climate Hub...'; break;
        case 'open focus': navigate('/focus'); response = 'Launching DevZen Timer...'; break;
        case 'open cost': navigate('/meeting-cost'); response = 'Launching Meeting Calculator...'; break;
        case 'open regex': navigate('/regex'); response = 'Launching Regex Lab...'; break;
        case 'github':
          response = 'Opening GitHub...';
          window.open('https://github.com/Shafee25', '_blank');
          break;
        case 'sudo':
          response = 'Permission denied: You are not an Admin. Access restricted to Faris Shafee.';
          break;
        case 'clear':
          setHistory([]); setInput(''); return;
        default:
          response = `Command not found: ${cmd}. Type "help" for list.`;
      }

      setHistory([...newHistory, { type: 'output', content: response }]);
      setInput('');
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-black/80 text-green-500 p-3 rounded-full border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-black hover:scale-110 transition-all group"
      >
        <Terminal size={24} />
        <span className="absolute left-14 top-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800">
          Dev Terminal
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 w-[90vw] md:w-[500px] h-[350px] bg-black/95 rounded-lg border border-green-500/30 shadow-2xl z-50 flex flex-col font-mono text-sm overflow-hidden"
          >
            <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800 select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)}></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-xs ml-2">guest@faris-portfolio:~</span>
              </div>
              <X size={16} className="text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}/>
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar text-green-400" onClick={() => inputRef.current?.focus()}>
              {history.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.type === 'command' ? (
                    <span className="text-white">
                      <span className="text-blue-400">➜</span> <span className="text-purple-400">~</span> {line.content}
                    </span>
                  ) : (
                    <span className="opacity-90">{line.content}</span>
                  )}
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-400">➜</span>
                <span className="text-purple-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-white flex-1 caret-green-500"
                  autoFocus
                />
              </div>
              <div ref={bottomRef}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevTerminal;