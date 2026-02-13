import React, { useState } from 'react';
import { Terminal, Check, X } from 'lucide-react';

const RegexTester = () => {
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('gm');
  const [text, setText] = useState('');

  const getHighlightedText = () => {
    if (!regex || !text) return text;
    try {
      const re = new RegExp(regex, flags);
      const parts = text.split(re);
      const matches = text.match(re);
      if (!matches) return text;
      
      let result = [];
      for(let i = 0; i < parts.length; i++) {
        result.push(parts[i]);
        if(i < parts.length - 1) result.push(<span key={i} className="bg-highlight/40 text-white font-bold border-b-2 border-highlight">{matches[i] || (text.match(re)[0])}</span>);
      }
      return result;
    } catch (e) {
      return text;
    }
  };

  const isValid = () => {
    try { new RegExp(regex); return true; } catch(e) { return false; }
  };

  return (
    <div className="pt-32 pb-20 bg-primary min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Terminal className="text-purple-400" /> Regex Lab
        </h1>

        <div className="space-y-6">
          <div className="bg-[#0A1619] border border-[#1F4E56] p-4 rounded-xl flex gap-2 items-center">
            <span className="text-gray-500 font-mono text-xl">/</span>
            <input 
              value={regex} 
              onChange={e => setRegex(e.target.value)} 
              placeholder="Enter regex pattern..." 
              className="bg-transparent text-white font-mono text-xl w-full outline-none"
            />
            <span className="text-gray-500 font-mono text-xl">/</span>
            <input 
              value={flags} 
              onChange={e => setFlags(e.target.value)} 
              className="bg-transparent text-gray-400 font-mono text-xl w-16 outline-none"
            />
            {isValid() ? <Check className="text-green-500"/> : <X className="text-red-500"/>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <textarea 
              value={text} 
              onChange={e => setText(e.target.value)} 
              placeholder="Paste your test string here..."
              className="w-full h-64 bg-[#0A1619] border border-[#1F4E56] text-gray-300 p-4 rounded-xl font-mono text-sm focus:border-highlight outline-none"
            />
            <div className="w-full h-64 bg-[#0A1619] border border-[#1F4E56] text-gray-400 p-4 rounded-xl font-mono text-sm overflow-auto whitespace-pre-wrap">
              {getHighlightedText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;