import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecoveryScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSend(e) {
    e.preventDefault();

    if (!email) {
      alert("Por favor, digite seu email.");
      return;
    }

    
    alert(`Email de redefinição de senha enviado para o email cadastrado: ${email}`);
    
    
    setEmail("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white text-lg"
      >
        ← Voltar
      </button>

      <div className="w-full max-w-sm p-6">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Recuperar Senha
        </h1>

        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full h-11 border border-white rounded-md text-white font-semibold hover:bg-white hover:text-purple-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
