import React, { useState, useEffect } from 'react';
import { Braces, Code, FileCode, Copy, Check, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const DevTools = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonResult, setJsonResult] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [base64Result, setBase64Result] = useState('');
  const [uuid, setUuid] = useState('');
  const [ipData, setIpData] = useState(null);
  const [copied, setCopied] = useState('');

  // 1. JSON Formatter
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonResult(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (e) {
      setJsonError('Invalid JSON Format');
      setJsonResult('');
    }
  };

  // 2. Base64 Encoder
  const handleBase64 = (type) => {
    try {
      if (type === 'encode') setBase64Result(btoa(base64Input));
      else setBase64Result(atob(base64Input));
    } catch (e) {
      setBase64Result('Error: Invalid Input');
    }
  };

  // 3. UUID Generator
  const generateUUID = () => {
    setUuid(crypto.randomUUID());
  };

  // 4. IP Checker
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpData(data.ip));
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Code className="text-highlight" /> Developer Toolkit
          </h1>
          <p className="text-gray-400">Essential utilities for software engineers. Free & Open.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* TOOL 1: JSON FORMATTER */}
          <div className="bg-[#0A1619] border border-[#1F4E56] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Braces className="text-blue-400"/> JSON Formatter</h2>
            <textarea 
              className="w-full bg-[#0F1C20] border border-[#1F4E56] text-gray-300 p-3 rounded-lg font-mono text-xs h-32 mb-4 focus:border-highlight outline-none"
              placeholder='Paste ugly JSON here... {"key":"value"}'
              onChange={(e) => setJsonInput(e.target.value)}
            ></textarea>
            <button onClick={formatJson} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-500 mb-4">Format JSON</button>
            
            {jsonError ? (
              <div className="text-red-400 text-sm font-mono bg-red-500/10 p-3 rounded border border-red-500/20">{jsonError}</div>
            ) : (
              <div className="relative">
                <pre className="bg-[#0F1C20] p-4 rounded-lg overflow-x-auto text-green-400 text-xs font-mono h-48 border border-[#1F4E56]">
                  {jsonResult || '// Result will appear here'}
                </pre>
                {jsonResult && (
                  <button onClick={() => copyToClipboard(jsonResult, 'json')} className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 text-white">
                    {copied === 'json' ? <Check size={14}/> : <Copy size={14}/>}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* TOOL 2: BASE64 CONVERTER */}
          <div className="bg-[#0A1619] border border-[#1F4E56] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FileCode className="text-purple-400"/> Base64 Converter</h2>
            <input 
              className="w-full bg-[#0F1C20] border border-[#1F4E56] text-gray-300 p-3 rounded-lg font-mono text-sm mb-4 focus:border-highlight outline-none"
              placeholder="Enter text to encode/decode..."
              onChange={(e) => setBase64Input(e.target.value)}
            />
            <div className="flex gap-4 mb-4">
              <button onClick={() => handleBase64('encode')} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-purple-500">Encode</button>
              <button onClick={() => handleBase64('decode')} className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-bold text-sm hover:bg-gray-600">Decode</button>
            </div>
            <div className="bg-[#0F1C20] p-4 rounded-lg text-gray-300 text-xs font-mono break-all border border-[#1F4E56] relative">
              {base64Result || '// Result...'}
              {base64Result && (
                  <button onClick={() => copyToClipboard(base64Result, 'b64')} className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 text-white">
                    {copied === 'b64' ? <Check size={14}/> : <Copy size={14}/>}
                  </button>
                )}
            </div>
          </div>

          {/* TOOL 3: UUID GENERATOR */}
          <div className="bg-[#0A1619] border border-[#1F4E56] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Shield className="text-green-400"/> UUID Generator</h2>
            <div className="flex items-center gap-4">
              <input readOnly value={uuid} className="flex-1 bg-[#0F1C20] border border-[#1F4E56] text-highlight p-3 rounded-lg font-mono text-sm" placeholder="Click generate..." />
              <button onClick={() => copyToClipboard(uuid, 'uuid')} className="p-3 bg-[#1F4E56] text-white rounded-lg hover:bg-[#2a6670]">
                {copied === 'uuid' ? <Check size={20}/> : <Copy size={20}/>}
              </button>
            </div>
            <button onClick={generateUUID} className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-500">Generate New UUID</button>
          </div>

          {/* TOOL 4: SYSTEM INFO */}
          <div className="bg-[#0A1619] border border-[#1F4E56] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe className="text-orange-400"/> My System Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400 text-sm">Your IP Address:</span>
                <span className="text-white font-mono text-sm">{ipData || 'Loading...'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400 text-sm">Screen Resolution:</span>
                <span className="text-white font-mono text-sm">{window.screen.width} x {window.screen.height}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-400 text-sm">User Agent:</span>
                <span className="text-white font-mono text-xs max-w-[200px] truncate" title={navigator.userAgent}>{navigator.userAgent}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DevTools;