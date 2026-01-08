import { Battery, Sun, Zap } from "lucide-react";

export default function EnergyCard({ batteryPercentage, batteryAmperage }) {
  const getBatteryColor = (percentage) => {
    if (percentage > 60) return "from-green-500 to-emerald-500";
    if (percentage > 30) return "from-yellow-500 to-orange-500";
    return "from-orange-500 to-red-500";
  };

  const maxPower = 5;
  

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 shadow-xl border border-green-200/50 dark:border-green-800/50 hover:scale-105 transition-all duration-300 hover:shadow-green-500/20">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Battery className="w-8 h-8 text-green-600 dark:text-green-400" />
          <Sun className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50">
          <span className="text-green-700 dark:text-green-300 text-sm font-semibold">
            Energia
          </span>
        </div>
      </div>

      
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            {batteryPercentage.toFixed(0)}
          </span>
          <span className="text-3xl ml-1 text-green-600 dark:text-green-400">
            %
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Bateria
        </p>
      </div>

      <div className="mb-4">
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getBatteryColor(
              batteryPercentage
            )} transition-all duration-500 rounded-full relative`}
            style={{ width: `${batteryPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pb-4 border-b border-green-200/50 dark:border-green-800/50">
        <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        <span className="text-slate-700 dark:text-slate-300 font-semibold">
          {batteryAmperage.toFixed(1)} A
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          Amperagem
        </span>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-orange-500/20 rounded-full blur-2xl" />
    </div>
  );
}
