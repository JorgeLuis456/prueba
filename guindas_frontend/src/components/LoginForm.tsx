import { useState } from "react";
import { Usuario } from "./types";

type LoginFormProps = {
  setAuth: (auth: { logueado: boolean; usuario?: Usuario }) => void;
};

export default function LoginForm({ setAuth }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animarEntrada, setAnimarEntrada] = useState(true);

  const login = () => {
    if (!email) return alert("Ingresa tu email");
    // Login simulado
    setAuth({
      logueado: true,
      usuario: {
        id: 1,
        nombre: "Admin",
        primer_apellido: "Admin",
        segundo_apellido: "",
        email,
        rol: "admin",
        estado: "Activo",
      },
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://img.freepik.com/foto-gratis/parrilla-variedad-carnes-ella_188544-8372.jpg?semt=ais_hybrid&w=740&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        perspective: "1500px",
      }}
    >
      <style>
        {`
          @keyframes enterPop {
            0% { transform: scale(0.4) rotateX(-90deg); opacity: 0; filter: brightness(0.5); }
            60% { transform: scale(1.1) rotateX(10deg); opacity: 1; filter: brightness(1.3); }
            100% { transform: scale(1) rotateX(0deg); filter: brightness(1); }
          }
          @keyframes buttonPulse {
            0%,100% { transform: scale(1); box-shadow: 0 0 10px #ffb300; }
            50% { transform: scale(1.08); box-shadow: 0 0 25px #ffdd77; }
          }
        `}
      </style>

      <div
        style={{
          /*background: "linear-gradient(145deg, #fff6d6, #ffe9b3)",*/
          background: "rgba(255, 246, 214, 0.1)", // color amarillo claro con 85% de opacidad
          backdropFilter: "blur(8px)", // difumina un poco lo que hay detrás

          padding: "40px",
          borderRadius: "20px",
          border: "3px solid #5c3b09",
          width: "360px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          transformStyle: "preserve-3d",
          animation: animarEntrada
            ? "enterPop 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : undefined,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#3B200B",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "30px",
            textShadow: "2px 2px 8px #facc15",
          }}
        >
          Churrasqueria "LAS GUINDAS" Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo Electronico" //Español
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            fontSize: "1rem",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "24px",
            borderRadius: "10px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg, #ffb300, #ffdd77, #ffb300)",
            color: "#3B200B",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            animation: "buttonPulse 2s infinite",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
