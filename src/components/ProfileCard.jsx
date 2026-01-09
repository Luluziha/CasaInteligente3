import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileCard() {
  const navigate = useNavigate();

  

  
  return (
    
    <div

      
      onClick={() => navigate("/perfil")}
      className="cursor-pointer rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-6 text-white hover:scale-105 transition-all"
    >
      <User className="w-10 h-10 mb-4" />
      <h3 className="text-2xl font-bold">Meu Perfil</h3>
      <p>Editar dados cadastrais</p>
    </div>
  );
}
