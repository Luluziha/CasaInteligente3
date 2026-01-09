import { useState, useEffect } from "react";
import { Moon, Sun, Lightbulb } from "lucide-react";

import SerialMonitor from "./SerialMonitor";
import TemperatureCard from "./TemperatureCard";
import TemperatureControl from "./TemperatureControl";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";
import DateTimeCard from "./DateTimeCard";
import EnergyCard from "./EnergyCard";
import LightsControl from "./LightsControl";
import Arduino from "./Arduino";
import ProfileCard from "./ProfileCard";
import FireAlertOverlay from "./FireAlertOverlay";

import CasaIcon from "../assets/casa-inteligente (1).png";

export function Dashboard({ darkMode, onToggleDarkMode }) {
  const [connection, setConnection] = useState(null);
  const [showLights, setShowLights] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [greeting, setGreeting] = useState("Olá");

  
  const [temperature, setTemperature] = useState(23);
  //teste para verificar se alerta ttoca em 50 graus 
  useEffect(() => {
    setTemperature(60);
  }, []);

  const [showTemperature, setShowTemperature] = useState(false);
  const [humidity, setHumidity] = useState(65);
  const [batteryPercentage, setBatteryPercentage] = useState(10);
  const [batteryAmperage, setBatteryAmperage] = useState(12.5);

  // 🔥 ALERTA DE INCÊNDIO
  const [fireAlertVisible, setFireAlertVisible] = useState(false);
  const [fireAlertCiente, setFireAlertCiente] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};


    //simula dados reais a cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(v => v + (Math.random() - 0.5));
      setHumidity(v => Math.max(40, Math.min(80, v + (Math.random() - 0.5))));
      setBatteryPercentage(v => Math.max(20, Math.min(100, v + (Math.random() - 0.5))));
      setBatteryAmperage(v => Math.max(0, Math.min(20, v + (Math.random() - 0.5))));
    }, 3000);

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Bom dia");
    else if (hour >= 12 && hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");

    if (user?.nascimento) {
      const today = new Date();
      const birth = new Date(user.nascimento);

      if (
        birth.getUTCDate() === today.getUTCDate() &&
        birth.getUTCMonth() === today.getUTCMonth()
      ) {
        setIsBirthday(true);
      }
    }

    return () => clearInterval(interval);
  }, []);

  //alerta, para de tocar após usuário clicar em ciente
  useEffect(() => {
  if (temperature >= 50 && !fireAlertCiente) {
    setFireAlertVisible(true);
  }
}, [temperature, fireAlertCiente]);


  { connection && <SerialMonitor connection={connection} onDataReceived={handleSerialData} /> }
  return (
    <Arduino>
      <div className="p-4 md:p-8 relative min-h-screen">

       
        <header className="mb-10 flex justify-between items-center gap-6">
          <div>
            <h1 className="flex items-center text-4xl font-bold bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
              <img
                src={CasaIcon}
                alt="Casa Inteligente"
                className="w-10 h-10 mr-4 opacity-75 invert"
              />
              Smart Home
            </h1>

            <p className="mt-3 text-sm tracking-wide text-slate-500">
              Central de Controle
            </p>

            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              {greeting}, {user?.nome || "Usuário"} 👋
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="relative p-3 rounded-xl bg-white/70 dark:bg-slate-700/60 backdrop-blur-sm border shadow-md hover:scale-105 transition-all"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-indigo-500" />
              )}
            </button>

            <img
              src={user?.foto || "../assets/placeholder.png"}
              className="w-20 h-20 rounded-full cursor-pointer border-2 border-cyan-400 shadow-md object-cover"
              onClick={() => setShowProfile(!showProfile)}
            />
          </div>

          {showProfile && (
            <div className="absolute top-20 right-0 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="text-red-500 font-semibold hover:underline"
              >
                Sair da conta
              </button>
            </div>
          )}
        </header>

        
        {isBirthday && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 p-8 text-white shadow-2xl">
              <button
                onClick={() => setIsBirthday(false)}
                className="absolute top-4 right-4 text-xl"
              >
                ✕
              </button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
                className="w-28 mx-auto mb-4"
              />
              <h2 className="text-3xl font-extrabold text-center">
                Feliz Aniversário, {user?.nome}! 🎉
              </h2>
            </div>
          </div>
        )}

      
        {!showLights && !showTemperature && !showWeather ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TemperatureCard
              temperature={temperature}
              humidity={humidity}
              onClick={() => setShowTemperature(true)}
            />

            <WeatherCard onClick={() => setShowWeather(true)} />
            <DateTimeCard />
            <EnergyCard
              batteryPercentage={batteryPercentage}
              batteryAmperage={batteryAmperage}
            />

            <div
              onClick={() => setShowLights(true)}
              className="cursor-pointer rounded-2xl bg-gradient-to-br from-amber-500 to-pink-500 p-6 text-white hover:scale-105 transition-all"
            >
              <Lightbulb className="w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold">Iluminação</h3>
              <p>Gerenciar lâmpadas</p>
            </div>

            <ProfileCard />
          </div>
        ) : showLights ? (
          <LightsControl onBack={() => setShowLights(false)} />
        ) : showTemperature ? (
          <TemperatureControl onBack={() => setShowTemperature(false)} />
        ) : (
          <WeatherForecast onBack={() => setShowWeather(false)} />
        )}

        

        <FireAlertOverlay //logica do card de alerta de incendio
          visivel={fireAlertVisible}
          ciente={fireAlertCiente}
          temperatura={temperature}
          onCiente={() => {
            setFireAlertCiente(true);   // reconhece o incendio
          }}
          onFechar={() => {
            setFireAlertVisible(false); // fecha visualmente
          }}
        />

      </div>
    </Arduino>
  );
}
