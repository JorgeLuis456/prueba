import { useState } from "react";
import { Categoria } from "../types";

type CategoriaModalProps = {
  categoria: Categoria | null;
  setCategoriaEditar: (c: Categoria | null) => void;
  setCategorias: (c: Categoria[]) => void;
  setMostrarModal: (b: boolean) => void;
};

export default function CategoriaModal({
  categoria,
  setCategoriaEditar,
  setCategorias,
  setMostrarModal,
}: CategoriaModalProps) {
  const [nuevaCategoria, setNuevaCategoria] = useState<Categoria>(
    categoria || { id: 0, nombre: "", descripcion: "" }
  );

  const [animarSalida, setAnimarSalida] = useState(false);

  const guardarCategoria = () => {
    if (!nuevaCategoria.nombre) return alert("Nombre requerido");
    setCategorias((prev) =>
      categoria
        ? prev.map((c) => (c.id === categoria.id ? nuevaCategoria : c))
        : [...prev, { ...nuevaCategoria, id: prev.length + 1 }]
    );
    cerrarConAnimacion();
  };

  const cerrarConAnimacion = () => {
    setAnimarSalida(true);
    setTimeout(() => {
      setMostrarModal(false);
      setCategoriaEditar(null);
    }, 600);
  };

  const modalAnimacion = animarSalida
    ? { animation: "exitZoom 0.6s ease forwards" }
    : { animation: "enterPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)" };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
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
          @keyframes exitZoom {
            0% { transform: scale(1) rotateX(0deg); opacity: 1; }
            100% { transform: scale(0.5) rotateX(90deg); opacity: 0; }
          }
          @keyframes buttonPulse {
            0%,100% { transform: scale(1); box-shadow: 0 0 10px #ffb300; }
            50% { transform: scale(1.08); box-shadow: 0 0 25px #ffdd77; }
          }
        `}
      </style>

      <div
        style={{
          background: "linear-gradient(145deg, #fff6d6, #ffe9b3)",
          padding: "35px",
          borderRadius: "20px",
          border: "3px solid #5c3b09",
          width: "380px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          transformStyle: "preserve-3d",
          ...modalAnimacion,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#3B200B",
            fontSize: "1.9rem",
            textShadow: "2px 2px 8px #facc15",
            marginBottom: "22px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          {categoria ? "Editar Categoría" : "Nueva Categoría"}
        </h2>

        <label style={{ fontWeight: 600, color: "#3B200B" }}>Nombre:</label>
        <input
          value={nuevaCategoria.nombre}
          onChange={(e) =>
            setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            marginBottom: "12px",
          }}
        />

        <label style={{ fontWeight: 600, color: "#3B200B" }}>
          Descripción:
        </label>
        <input
          value={nuevaCategoria.descripcion}
          onChange={(e) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              descripcion: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            marginBottom: "18px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <button
            onClick={cerrarConAnimacion}
            style={{
              flex: 1,
              backgroundColor: "#fff",
              color: "#3B200B",
              border: "2px solid #3B200B",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffedd5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#fff")
            }
          >
            Cancelar
          </button>

          <button
            onClick={guardarCategoria}
            style={{
              flex: 1,
              background: "linear-gradient(90deg, #ffb300, #ffdd77, #ffb300)",
              color: "#3B200B",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              animation: "buttonPulse 2s infinite",
              transition: "all 0.3s ease",
            }}
          >
            {categoria ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
