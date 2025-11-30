import { useState, useEffect } from "react";

type NavbarProps = {
  usuarioNombre?: string;
  onLogout: () => void;
};

export default function Navbar({ usuarioNombre, onLogout }: NavbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "linear-gradient(90deg, #FFECB3, #FFB74D)",
        color: "#1E0F05",
        fontWeight: "bold",
        fontSize: "18px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        borderRadius: "0 0 20px 20px",
        transform: visible ? "translateY(0)" : "translateY(-100px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div style={{ fontSize: "22px", fontWeight: "bold" }}>
        Churrasquería ♨️"LAS GUINDAS"♨️
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span>Hola, {usuarioNombre}</span>
        <button
          onClick={onLogout}
          style={{
            background: "linear-gradient(45deg, #FFD700, #FFA000)",
            color: "#1E0F05",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 12px 2px #FFD700";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
