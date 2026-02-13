import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Clock, Play, Pause, RefreshCw } from 'lucide-react';

const MeetingCost = () => {
  const [attendees, setAttendees] = useState(5);
  const [avgSalary, setAvgSalary] = useState(60); // Hourly rate
  const [duration, setDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setDuration(d => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const cost = ((attendees * avgSalary) / 3600) * duration;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-32 pb-20 bg-primary min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#0A1619] border border-[#1F4E56] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">Meeting Cost Ticker</h1>
          <p className="text-gray-400 text-sm mt-2">Is this meeting really worth it?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <label className="text-gray-500 text-xs font-bold uppercase block mb-2">Attendees</label>
            <div className="flex items-center bg-[#0F1C20] rounded-xl border border-[#1F4E56] p-3">
              <Users className="text-highlight mr-3" />
              <input type="number" value={attendees} onChange={e => setAttendees(e.target.value)} className="bg-transparent text-white font-bold w-full outline-none" />
            </div>
          </div>
          <div>
            <label className="text-gray-500 text-xs font-bold uppercase block mb-2">Avg Rate ($/hr)</label>
            <div className="flex items-center bg-[#0F1C20] rounded-xl border border-[#1F4E56] p-3">
              <DollarSign className="text-green-400 mr-3" />
              <input type="number" value={avgSalary} onChange={e => setAvgSalary(e.target.value)} className="bg-transparent text-white font-bold w-full outline-none" />
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="text-7xl font-bold text-white mb-2 tracking-tighter">
            ${cost.toFixed(2)}
          </div>
          <div className="text-xl font-mono text-gray-400 flex items-center justify-center gap-2">
            <Clock size={20}/> {formatTime(duration)}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => setIsActive(!isActive)} className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${isActive ? 'bg-red-500 text-white' : 'bg-highlight text-primary hover:scale-105'}`}>
            {isActive ? <><Pause size={20}/> Pause</> : <><Play size={20}/> Start Meeting</>}
          </button>
          <button onClick={() => {setIsActive(false); setDuration(0);}} className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
            <RefreshCw size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCost;