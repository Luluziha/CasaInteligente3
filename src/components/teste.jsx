import { useEffect, useState } from "react";

export default function TempReader({ serialData } ) {
  const [temp, setTemp] = useState(null);
  const [incendio, setIncendio] = useState(false);

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

  return (
    <div>
      {incendio && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          🚨 INCÊNDIO DETECTADO!
        </p>
      )}

      {temp !== null && !incendio && (
        <p className="temperature-display">
          🌡️ Temperatura: {temp.toFixed(1)}°C
        </p>
      )}
    </div>
  );
}