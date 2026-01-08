import { useState } from "react";
import { ArrowLeft, Thermometer, Droplets } from "lucide-react";

export default function TemperatureControl({ onBack, darkMode }) {
  const [rooms] = useState([
    { name: "Sala de Estar", temperature: 23, humidity: 60 },
    { name: "Quarto", temperature: 25, humidity: 55 },
    { name: "Cozinha", temperature: 27, humidity: 65 },
    { name: "Banheiro", temperature: 24, humidity: 70 },
    { name: "Varanda", temperature: 22, humidity: 50 },
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      
      <header className="mb-8 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 dark:from-purple-400 dark:via-cyan-400 dark:to-pink-400 bg-clip-text text-transparent">
          Temperatura e Umidade por Cômodo
        </h1>
      </header>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-800/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>

            <h2 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-200">
              {room.name}
            </h2>

            <p className="text-slate-700 dark:text-slate-300 font-semibold">
              Temperatura: {room.temperature}°C
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Umidade: {room.humidity}%
            </p>

            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/20 dark:bg-purple-700/20 rounded-full blur-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
