import React, { useState } from "react";

export default function Arduino({ onConnect, connection, children }) {
  const [loading, setLoading] = useState(false);

  const connectSerial = async () => {
    if (connection) return;

    setLoading(true);
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const textEncoder = new TextEncoderStream();
      textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      console.log("✅ Conectado ao Arduino!");
      onConnect?.({ port, reader, writer });

    } catch (err) {
      console.error("Erro ao conectar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      
      
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={connectSerial}
          disabled={loading || connection}
          className={`px-5 py-3 rounded-lg font-bold text-white shadow-lg transition
            ${connection ? "bg-green-600" : loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {connection
            ? "🔌 Conectado"
            : loading
            ? "🔄 Conectando..."
            : "🔌 Conectar Arduino"}
        </button>
      </div>

      
      {children}
    </div>
  );
}
