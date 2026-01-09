import { Flame, CheckCircle, XCircle } from "lucide-react";

export default function FireAlertOverlay({
  visivel,
  ciente,
  onCiente,
  onFechar,
  temperatura = 50,
}) {
  if (!visivel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
   
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl border
          ${
            ciente
              ? "bg-red-700 border-red-600"
              : "bg-red-600 border-red-500 animate-pulse"
          }`}
      >
      
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-yellow-300" />
            <h2 className="text-xl font-bold text-white">
              🚨 Incêndio Detectado
            </h2>
          </div>
        </div>

        
        <p className="text-white mb-4">
          Temperatura crítica detectada no ambiente.
        </p>

        <div className="text-4xl font-bold text-yellow-300 mb-4 text-center">
          {temperatura.toFixed(1)}°C
        </div>

      
        <div className="flex gap-3">
          <button
            onClick={onCiente}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
          >
            <CheckCircle />
            Ciente
          </button>

          <button
            onClick={onFechar}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black/40 text-white font-bold hover:bg-black/60 transition"
          >
            <XCircle />
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
