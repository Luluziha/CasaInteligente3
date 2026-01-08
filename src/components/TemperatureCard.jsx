import { Thermometer, Droplets } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

export default function TemperatureCard({ temperature, humidity, onClick }) {
  const [temp, setTemp] = useState(0);
  const [incendio, setIncendio] = useState(false);
  function TempReader({ serialData } ) {
    
  
    useEffect(() => {
      if (!serialData) return;
  
      const data = serialData.trim();
  
      // 🚨 Incêndio
      if (data.startsWith("I")) {
        setIncendio(true);
        alert("🚨 ATENÇÃO: Sinal de incêndio detectado!");
        return;
      }
  
      // 🌡️ Temperatura
      if (data.startsWith("T")) {
        const valor = data.slice(1);
        const temperatura = parseFloat(valor);
  
        if (!isNaN(temperatura)) {
          setTemp(temperatura);
          setIncendio(false);
        }
      }
    }, [serialData]);
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 shadow-xl border border-purple-200/50 dark:border-purple-800/50 hover:scale-105 transition-all duration-300 hover:shadow-purple-500/20 cursor-pointer"
    >
      
      <div className="flex items-center justify-between mb-4">
        <Thermometer className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50">
          <span className="text-purple-700 dark:text-purple-300 text-sm font-semibold">
            Ambiente
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {temp.toFixed(1)}
          </span>
          <span className="text-3xl ml-1 text-purple-600 dark:text-purple-400">
            °C
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Temperatura
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-purple-200/50 dark:border-purple-800/50">
        <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        <span className="text-slate-700 dark:text-slate-300 font-semibold">
          {humidity.toFixed(0)}%
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          Umidade
        </span>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
    </div>
  );
}
