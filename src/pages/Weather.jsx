import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, MapPin, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const cities = [
  { name: "Colombo", lat: 6.9271, lon: 79.8612, color: "from-orange-500 to-yellow-500" },
  { name: "Kandy", lat: 7.2906, lon: 80.6337, color: "from-blue-500 to-cyan-500" },
  { name: "Galle", lat: 6.0535, lon: 80.2210, color: "from-teal-500 to-emerald-500" },
  { name: "Nuwara Eliya", lat: 6.9497, lon: 80.7891, color: "from-indigo-500 to-purple-500" },
  { name: "Jaffna", lat: 9.6615, lon: 80.0255, color: "from-red-500 to-pink-500" },
  { name: "Trincomalee", lat: 8.5711, lon: 81.2335, color: "from-cyan-600 to-blue-600" }
];

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    const data = {};
    try {
      for (const city of cities) {
        // Fetching from Open-Meteo (Free Real-Time API)
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        const json = await res.json();
        data[city.name] = json.current_weather;
      }
      setWeatherData(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchWeather, 300000); 
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code) => {
    if (code <= 3) return <Sun size={40} className="text-white animate-spin-slow" />;
    if (code <= 60) return <Cloud size={40} className="text-gray-200" />;
    return <CloudRain size={40} className="text-blue-200" />;
  };

  return (
    <div className="pt-28 pb-20 bg-[#0F1C20] min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sri Lanka Climate Hub</h1>
          <p className="text-gray-400 text-lg">Live satellite weather conditions across major cities.</p>
          
          {/* REAL-TIME INDICATOR (Added Here) */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2 text-xs font-mono bg-[#1F4E56]/50 text-green-400 py-1.5 px-4 rounded-full border border-green-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Data • Updated: {lastUpdated || "Syncing..."}
            </div>
            
            <button 
              onClick={fetchWeather} 
              className="p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Grid Section */}
        {loading && Object.keys(weatherData).length === 0 ? (
          <div className="flex justify-center h-64 items-center">
            <Loader2 className="animate-spin text-highlight" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${city.color} shadow-2xl group hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Decorative Blur */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all"></div>
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                      <MapPin size={24} /> {city.name}
                    </h2>
                    <p className="text-white/80 text-sm font-medium mt-1">Sri Lanka</p>
                  </div>
                  {getWeatherIcon(weatherData[city.name]?.weathercode)}
                </div>

                <div className="text-white relative z-10">
                  <div className="text-7xl font-bold tracking-tighter mb-2">
                    {Math.round(weatherData[city.name]?.temperature)}°
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/90 font-medium bg-white/10 w-fit px-3 py-1 rounded-lg backdrop-blur-sm">
                    <Wind size={18} /> 
                    {weatherData[city.name]?.windspeed} km/h Wind
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;