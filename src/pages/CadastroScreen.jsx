import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CasaIcon from "../assets/casa-inteligente (1).png";

export default function CadastroScreen() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    nascimento: "",
    usuario: "",
    senha: "",
    foto: null,
    novidades: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFoto(e) {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        foto: URL.createObjectURL(file),
      }));
    }
  }

  function handleCadastro(e) {
    e.preventDefault();

    const { nome, email, nascimento, usuario, senha } = form;

    if (!nome || !email || !nascimento || !usuario || !senha) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    alert("Usuário cadastrado com sucesso");
    navigate("/");
  }

  const inputClass =
    "h-11 px-4 bg-transparent border border-white rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white text-lg"
      >
        ← Voltar
      </button>

      <div className="w-full max-w-sm p-6 flex flex-col items-center">
        <img
          src={CasaIcon}
          alt="Casa Inteligente"
          className="w-32 mb-4 opacity-25 invert"
        />

        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Criar Conta
        </h1>

        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-3">

          <input
            name="nome"
            type="text"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="nascimento"
            type="date"
            value={form.nascimento}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="usuario"
            type="text"
            placeholder="Usuário"
            value={form.usuario}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className={inputClass}
          />

          
          <label className="w-full">
            <span className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">
              Escolher Foto
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFoto}
              className="hidden"
            />
          </label>

         
          {form.foto && (
            <img
              src={form.foto}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full mt-2 self-center border border-gray-300"
            />
          )}

          <label className="flex items-center gap-2 text-white text-sm mt-2">
            <input
              type="checkbox"
              name="novidades"
              checked={form.novidades}
              onChange={handleChange}
            />
            Deseja receber novidades sobre Smart Home?
          </label>

          <button
            type="submit"
            className="mt-4 h-11 border border-white rounded-md text-white font-semibold hover:bg-white hover:text-purple-600 transition shadow-lg shadow-cyan-500/50"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
