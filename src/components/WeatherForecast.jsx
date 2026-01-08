import { useState } from 'react';
import { ArrowLeft, CloudSun, CloudRain, Sun } from 'lucide-react';

export default function WeatherForecast({ onBack }) {
  const [forecast] = useState([
    { day: 'Seg', temp: 25, condition: 'Parcialmente nublado' },
    { day: 'Ter', temp: 22, condition: 'Chuva leve' },
    { day: 'Qua', temp: 28, condition: 'Ensolarado' },
    { day: 'Qui', temp: 24, condition: 'Parcialmente nublado' },
    { day: 'Sex', temp: 21, condition: 'Chuva forte' },
    { day: 'Sáb', temp: 29, condition: 'Ensolarado' },
    { day: 'Dom', temp: 26, condition: 'Parcialmente nublado' },
  ]);

  const getIcon = (condition) => {
    if (condition.includes('Chuva')) return <CloudRain className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    if (condition.includes('Ensolarado')) return <Sun className="w-6 h-6 text-yellow-400" />;
    return <CloudSun className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
    
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 dark:from-purple-400 dark:via-cyan-400 dark:to-pink-400 bg-clip-text text-transparent">
          Previsão do Tempo - Próximos 7 dias
        </h1>
      </header>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecast.map((day, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl p-6 shadow-xl border border-cyan-200/50 dark:border-cyan-800/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              {getIcon(day.condition)}
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{day.day}</span>
            </div>
            <h3 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-200">{day.temp}°C</h3>
            <p className="text-slate-600 dark:text-slate-400">{day.condition}</p>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-cyan-200/20 dark:bg-cyan-500/20 rounded-full blur-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
