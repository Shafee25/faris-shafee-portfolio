import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const DevZen = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('code'); // 'code' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound here if you want
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'code' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'code' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`pt-24 pb-20 min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${mode === 'code' ? 'bg-[#0F1C20]' : 'bg-[#1a3a2a]'}`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">DevZen Focus</h1>
        <p className="text-gray-400">Productivity Timer for Engineers</p>
      </div>

      <div className="w-80 h-80 rounded-full border-8 border-white/5 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-sm">
        <motion.div 
          key={mode}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-white text-7xl font-mono font-bold tracking-widest"
        >
          {formatTime(timeLeft)}
        </motion.div>
        
        <div className="absolute -bottom-16 flex gap-4">
          <button onClick={toggleTimer} className="p-4 bg-white text-primary rounded-full shadow-lg hover:scale-110 transition-transform">
            {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button onClick={resetTimer} className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <div className="mt-24 flex bg-black/30 p-1 rounded-xl">
        <button 
          onClick={() => switchMode('code')}
          className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${mode === 'code' ? 'bg-highlight text-primary' : 'text-gray-400'}`}
        >
          <Code size={18} /> Deep Work
        </button>
        <button 
          onClick={() => switchMode('break')}
          className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${mode === 'break' ? 'bg-green-500 text-white' : 'text-gray-400'}`}
        >
          <Coffee size={18} /> Coffee Break
        </button>
      </div>
    </div>
  );
};

export default DevZen;