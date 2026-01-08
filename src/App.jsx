import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import LoginScreen from "./pages/LoginScreen";
import CadastroScreen from "./pages/CadastroScreen";
import RecoveryScreen from "./pages/RecoveryScreen";
import { Dashboard } from "./components/Dashboard";
import PerfilScreen from "./pages/PerfilScreen";

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [darkMode, setDarkMode] = useState(true);

  
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br
        from-pink-100 via-rose-200 to-purple-200
        dark:from-pink-950 dark:via-rose-950 dark:to-purple-950
        transition-colors duration-500"
    >
      <Routes>
        <Route
          path="/"
          element={
            <LoginScreen
              onLogin={() => setIsAuthenticated(true)}
            />
          }
        />

        <Route path="/cadastro" element={<CadastroScreen />} />
        <Route path="/recuperar" element={<RecoveryScreen />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/perfil" element={<PerfilScreen />} />
      </Routes>
    </div>
  );
}
