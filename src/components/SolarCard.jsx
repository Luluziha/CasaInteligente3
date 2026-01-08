import { Sun, Zap } from "lucide-react";

export default function SolarCard({ power }) {
  const maxPower = 5; 
  const percentage = (power / maxPower) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 shadow-xl border border-yellow-200/50 dark:border-yellow-800/50 hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/20">
      
      <div className="flex items-center justify-between mb-4">
        <Sun className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/50">
          <span className="text-yellow-700 dark:text-yellow-300 text-sm font-semibold">
            Solar
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            {power.toFixed(1)}
          </span>
          <span className="text-3xl ml-1 text-yellow-600 dark:text-yellow-400">
            kW
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Geração atual
        </p>
      </div>

      <div className="mb-4">
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 rounded-full relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-yellow-200/50 dark:border-yellow-800/50">
        <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        <span className="text-slate-700 dark:text-slate-300 font-semibold">
          {percentage.toFixed(0)}%
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          Capacidade
        </span>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl" />
    </div>
  );
}
