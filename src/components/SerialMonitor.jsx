import { useEffect } from "react";

/**
 * Componente que monitora a entrada serial do Arduino.
 *
 * @param {object} connection Objeto de conexão com a porta serial (deve conter 'reader').
 * @param {function} onDataReceived Callback para quando um dado é recebido (e.g., para atualizar o estado isNight).
 */
export default function SerialMonitor({ connection, onDataReceived }) {
  // useEffect para iniciar o loop de leitura quando a conexão mudar
  useEffect(() => {
    if (!connection || !connection.reader) return;

    const reader = connection.reader;
    let keepReading = true;

    // Função assíncrona para ler a serial em um loop
    const readSerial = async () => {
      console.log("Monitor Serial Iniciado...");
      try {
        while (keepReading) {
          const { value, done } = await reader.read();

          if (done) {
            // Permite que o loop termine se o leitor for cancelado
            console.log("Leitor serial cancelado.");
            break;
          }

          // O Arduino enviará uma string (ex: "DAY" ou "NIGHT")
          if (value) {
            const data = value.trim();
            console.log(`📥 Recebido da Serial: ${data}`);
           
          }
        }
      } catch (error) {
        console.error("Erro na leitura serial:", error);
      }
    };

    readSerial();

    // Função de limpeza: interrompe o loop de leitura quando o componente é desmontado
    return () => {
      keepReading = false;
      // Não é necessário reader.cancel() aqui, pois o reader é fornecido pelo App.js
      // e pode ser usado para outras operações (se o loop travar, pode ser necessário).
    };
  }, [connection, onDataReceived]); // Depende do objeto connection e do callback

  // Este componente não renderiza nada visível
  return null;
}