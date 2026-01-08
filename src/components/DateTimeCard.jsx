import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

export default function DateTimeCard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date) =>
    date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 shadow-xl border border-pink-200/50 dark:border-pink-800/50 hover:scale-105 transition-all duration-300 hover:shadow-pink-500/20">
      <div className="flex items-center justify-between mb-4">
        <Clock className="w-8 h-8 text-pink-600 dark:text-pink-400" />
        <div className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/50">
          <span className="text-pink-700 dark:text-pink-300 text-sm font-semibold">
            Agora
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
          {formatTime(currentTime)}
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Hora atual
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-pink-200/50 dark:border-pink-800/50">
        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <span className="text-slate-700 dark:text-slate-300 capitalize">
          {formatDate(currentTime)}
        </span>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
    </div>
  );
}
