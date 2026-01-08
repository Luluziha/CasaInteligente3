import { CloudSun, Wind } from "lucide-react";

export default function WeatherCard({ onClick }) {
  const weather = {
    condition: "Parcialmente nublado",
    temperature: 25,
    windSpeed: 12,
  };

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 shadow-xl border border-cyan-200/50 dark:border-cyan-800/50 hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <CloudSun className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        <div className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/50">
          <span className="text-cyan-700 dark:text-cyan-300 text-sm font-semibold">
            Exterior
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            {weather.temperature}
          </span>
          <span className="text-3xl ml-1 text-cyan-600 dark:text-cyan-400">
            °C
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {weather.condition}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-cyan-200/50 dark:border-cyan-800/50">
        <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span className="text-slate-700 dark:text-slate-300 font-semibold">
          {weather.windSpeed} km/h
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          Vento
        </span>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl" />
    </div>
  );
}
