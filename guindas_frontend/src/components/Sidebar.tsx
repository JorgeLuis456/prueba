import { useState, useEffect } from "react";

type SidebarProps = {
  setSeccion: (s: string) => void;
  rol: "admin" | "cliente";
};

export default function Sidebar({ setSeccion, rol }: SidebarProps) {
  const [activo, setActivo] = useState<string>("Inicio");
  const [visible, setVisible] = useState(false); // controla la animación

  useEffect(() => {
    // pequeña demora para que se vea el efecto
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (seccion: string) => {
    setActivo(seccion);
    setSeccion(seccion);
  };

  const botones = [
    { label: "Inicio" },
    ...(rol === "admin"
      ? [
          { label: "Usuarios" },
          { label: "Pedidos" },
          { label: "Platos" },
          { label: "Categorías" },
          { label: "Reseñas" },
        ]
      : []),
    //{ label: "Menú" },
  ];

  return (
    <div
      style={{
        width: "220px",
        background: "linear-gradient(to bottom, #FFECB3, #FFB74D)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        transformStyle: "preserve-3d",
        transform: visible ? "translateX(0)" : "translateX(-300px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {botones.map((b) => (
        <button
          key={b.label}
          onClick={() => handleClick(b.label)}
          style={{
            background:
              activo === b.label
                ? "linear-gradient(45deg, #FFD700, #FFA000)"
                : "linear-gradient(45deg, #FFCC80, #FFB74D)",
            color: "#1E0F05",
            padding: "12px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow:
              activo === b.label
                ? "0 0 12px 2px #FFD700"
                : "0 4px 6px rgba(0,0,0,0.3)",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: activo === b.label ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (activo !== b.label)
              e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            if (activo !== b.label)
              e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
