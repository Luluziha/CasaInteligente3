import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CasaIcon from "../assets/casa-inteligente (1).png";

export default function LoginScreen({ onLogin }) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const userStorage = localStorage.getItem("user");

    if (!userStorage) {
      setErro("Nenhum usuário cadastrado");
      return;
    }

    const user = JSON.parse(userStorage);

    if (usuario === user.usuario && senha === user.senha) {
      setErro("");

      
      localStorage.setItem("isAuthenticated", "true");

      
      onLogin();

      navigate("/dashboard");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
      <div className="flex flex-col items-center w-full max-w-md px-6">

        <img
          src={CasaIcon}
          alt="Casa Inteligente"
          className="w-40 mx-auto mb-6 opacity-25 invert"
        />

        <h1 className="text-white text-2xl font-bold text-center mb-8">
          Bem-Vindo ao APP da Casa Inteligente
        </h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full h-11 px-4 bg-transparent border border-white rounded-md text-white placeholder-white/70"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full h-11 px-4 bg-transparent border border-white rounded-md text-white placeholder-white/70"
          />

          {erro && (
            <p className="text-red-200 text-center font-semibold">{erro}</p>
          )}

          <button
            type="submit"
            className="mt-4 h-11 border border-white rounded-md text-white font-semibold hover:bg-white hover:text-purple-600 transition shadow-lg shadow-cyan-500/50"
          >
            Entrar
          </button>

          <Link
            to="/recuperar"
            className="text-white text-center hover:underline"
          >
            Esqueceu a senha?
          </Link>

          <Link
            to="/cadastro"
            className="text-white text-center font-semibold hover:underline"
          >
            Criar conta
          </Link>

        </form>
      </div>
    </div>
  );
}
