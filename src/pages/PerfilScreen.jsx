import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function PerfilScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [senha, setSenha] = useState(""); 
  const [foto, setFoto] = useState(user.foto || ""); 

  function handleSave(e) {
    e.preventDefault();
    const updatedUser = { ...user, senha, foto };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Dados atualizados com sucesso!");
    navigate("/dashboard");
  }

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  }

  function handleAlterarFoto() {
    fileInputRef.current.click(); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400
      dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 p-4">
        <button
  type="button"
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl
             bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
             border border-purple-200 dark:border-purple-800
             hover:scale-105 transition-transform shadow-lg"
>
  <ArrowLeft className="w-5 h-5 text-white-700" />
  <span className="text-white-700 font-medium">Voltar</span>
</button>


      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Meu Perfil
        </h2>

       
        <div className="flex flex-col items-center mb-4">
          <img
            src={foto || "https://via.placeholder.com/100"}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full mb-2 object-cover border"
          />
          <button
            type="button"
            onClick={handleAlterarFoto}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Alterar Foto
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFotoChange}
            className="hidden" 
          />
        </div>

        
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nome</label>
          <input
            className="w-full mb-2 p-2 border rounded text-black placeholder-gray-500"
            value={user.nome || ""}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            placeholder="Digite seu nome"
          />
        </div>

        
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            className="w-full mb-2 p-2 border rounded text-black placeholder-gray-500"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Digite seu email"
          />
        </div>

      
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Data de Nascimento</label>
          <input
            type="date"
            className="w-full mb-2 p-2 border rounded text-black placeholder-gray-500"
            value={user.nascimento || ""}
            onChange={(e) => setUser({ ...user, nascimento: e.target.value })}
          />
        </div>

        
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nova Senha</label>
          <input
            type="password"
            className="w-full mb-2 p-2 border rounded text-black placeholder-gray-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite uma nova senha"
          />
        </div>

        <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition">
          Salvar
        </button>
      </form>
    </div>
  );
}
