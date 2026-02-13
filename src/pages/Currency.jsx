import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, DollarSign, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('LKR');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Live Rates (Free API)
  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        setRate(data.rates[to]);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchRate();
  }, [from, to]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="pt-24 pb-20 bg-[#0F1C20] min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-highlight to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
            <DollarSign className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">Currency Master</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time Global Exchange Rates</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="text-gray-400 text-xs font-bold uppercase ml-2">Amount</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0A1619] border border-[#1F4E56] text-white text-2xl font-bold p-4 rounded-xl focus:border-highlight outline-none mt-1"
            />
          </div>

          {/* Selectors */}
          <div className="flex items-center gap-4">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="flex-1 bg-[#1F4E56] text-white p-3 rounded-xl font-bold outline-none cursor-pointer">
              <option value="USD">USD 🇺🇸</option>
              <option value="LKR">LKR 🇱🇰</option>
              <option value="EUR">EUR 🇪🇺</option>
              <option value="GBP">GBP 🇬🇧</option>
              <option value="AED">AED 🇦🇪</option>
            </select>

            <button onClick={handleSwap} className="p-3 bg-highlight rounded-full text-primary hover:rotate-180 transition-transform shadow-lg">
              <ArrowRightLeft size={20} />
            </button>

            <select value={to} onChange={(e) => setTo(e.target.value)} className="flex-1 bg-[#1F4E56] text-white p-3 rounded-xl font-bold outline-none cursor-pointer">
              <option value="LKR">LKR 🇱🇰</option>
              <option value="USD">USD 🇺🇸</option>
              <option value="EUR">EUR 🇪🇺</option>
              <option value="JPY">JPY 🇯🇵</option>
              <option value="INR">INR 🇮🇳</option>
            </select>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-r from-[#1F4E56] to-[#0A1619] p-6 rounded-2xl border border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-1">Converted Amount</p>
            {loading ? (
              <RefreshCw className="animate-spin text-highlight mx-auto" />
            ) : (
              <h2 className="text-4xl font-bold text-white">
                {rate ? (amount * rate).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'} 
                <span className="text-lg text-highlight ml-2">{to}</span>
              </h2>
            )}
            <p className="text-xs text-gray-500 mt-2">1 {from} = {rate} {to}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Currency;