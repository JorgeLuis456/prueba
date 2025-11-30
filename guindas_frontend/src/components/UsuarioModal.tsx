import { useState } from "react";
import { Usuario } from "../types";

type UsuarioModalProps = {
  usuario: Usuario | null;
  setUsuarioEditar: (u: Usuario | null) => void;
  setUsuarios: (u: Usuario[]) => void;
  setMostrarModal: (b: boolean) => void;
};

export default function UsuarioModal({
  usuario,
  setUsuarioEditar,
  setUsuarios,
  setMostrarModal,
}: UsuarioModalProps) {
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>(
    usuario || {
      id: 0,
      nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      email: "",
      rol: "cliente",
      estado: "Activo",
    }
  );

  const [animarSalida, setAnimarSalida] = useState(false);

  const guardarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email)
      return alert("Completa todos los campos");
    setUsuarios((prev) => {
      if (usuario)
        return prev.map((u) =>
          u.id === usuario.id ? { ...u, ...nuevoUsuario } : u
        );
      else return [...prev, { ...nuevoUsuario, id: prev.length + 1 }];
    });
    cerrarConAnimacion();
  };

  const cerrarConAnimacion = () => {
    setAnimarSalida(true);
    setTimeout(() => {
      setMostrarModal(false);
      setUsuarioEditar(null);
    }, 600);
  };

  const modalAnimacion = animarSalida
    ? { animation: "exitZoom 0.6s ease forwards" }
    : { animation: "enterPop 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.275)" };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)", // solo un fondo oscuro semi-transparente
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
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px #ffb300; }
          50% { transform: scale(1.08); box-shadow: 0 0 25px #ffdd77; }
        }
      `}
      </style>

      {/* Contenedor principal del modal */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(145deg, #fff6d6, #ffe9b3)",
          padding: "35px",
          borderRadius: "20px",
          border: "3px solid #5c3b09",
          width: "440px",
          transformStyle: "preserve-3d",
          transform: "rotateY(0deg)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          ...modalAnimacion,
          zIndex: 1,
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
          {usuario ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        {[
          { label: "Nombre", key: "nombre", type: "text" },
          { label: "Primer Apellido", key: "primer_apellido", type: "text" },
          { label: "Segundo Apellido", key: "segundo_apellido", type: "text" },
          { label: "Email", key: "email", type: "email" },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: "13px" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                color: "#3B200B",
                marginBottom: "4px",
              }}
            >
              {f.label}:
            </label>
            <input
              type={f.type}
              value={(nuevoUsuario as any)[f.key]}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, [f.key]: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #e2b773",
                backgroundColor: "#fff",
                transition: "0.3s",
                fontSize: "0.95rem",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #ffb300")}
              onBlur={(e) => (e.target.style.border = "2px solid #e2b773")}
            />
          </div>
        ))}

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: 600, color: "#3B200B" }}>Rol:</label>
          <select
            value={nuevoUsuario.rol}
            onChange={(e) =>
              setNuevoUsuario({
                ...nuevoUsuario,
                rol: e.target.value as "admin" | "cliente",
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #e2b773",
              backgroundColor: "#fff",
              marginTop: "5px",
            }}
          >
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: 600, color: "#3B200B" }}>Estado:</label>
          <select
            value={nuevoUsuario.estado}
            onChange={(e) =>
              setNuevoUsuario({
                ...nuevoUsuario,
                estado: e.target.value as "Activo" | "Inactivo",
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #e2b773",
              backgroundColor: "#fff",
              marginTop: "5px",
            }}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: "25px",
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
            onClick={guardarUsuario}
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
            {usuario ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
