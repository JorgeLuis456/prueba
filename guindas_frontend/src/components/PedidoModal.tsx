import { useState } from "react";
import { Pedido, Usuario, Plato } from "../types";

type PedidoModalProps = {
  pedido: Pedido | null;
  setPedidoEditar: (p: Pedido | null) => void;
  setPedidos: (p: Pedido[]) => void;
  setMostrarModal: (b: boolean) => void;
  usuarios: Usuario[];
  platos: Plato[];
};

export default function PedidoModal({
  pedido,
  setPedidoEditar,
  setPedidos,
  setMostrarModal,
  usuarios,
  platos,
}: PedidoModalProps) {
  const [nuevoPedido, setNuevoPedido] = useState<Pedido>(
    pedido || {
      id: 0,
      usuario: "",
      total: 0,
      metodo_pago: "Efectivo",
      fecha: new Date().toISOString(),
      estado: "En preparación",
    }
  );

  const [animarSalida, setAnimarSalida] = useState(false);

  const agregarPlato = (plato: Plato) => {
    const currentPlatos = nuevoPedido.platos || [];
    currentPlatos.push(plato);
    const total = currentPlatos.reduce((sum, p) => sum + p.precio, 0);
    setNuevoPedido({ ...nuevoPedido, platos: currentPlatos, total });
  };

  const guardarPedido = () => {
    if (!nuevoPedido.usuario) return alert("Selecciona un usuario");
    setPedidos((prev) => {
      if (pedido)
        return prev.map((p) => (p.id === pedido.id ? nuevoPedido : p));
      else return [...prev, { ...nuevoPedido, id: prev.length + 1 }];
    });
    cerrarConAnimacion();
  };

  const cerrarConAnimacion = () => {
    setAnimarSalida(true);
    setTimeout(() => {
      setMostrarModal(false);
      setPedidoEditar(null);
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
          position: "relative",
          background: "linear-gradient(145deg, #fff6d6, #ffe9b3)",
          padding: "35px",
          borderRadius: "20px",
          border: "3px solid #5c3b09",
          width: "440px",
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
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
          {pedido ? "Editar Pedido" : "Nuevo Pedido"}
        </h2>

        <label style={{ fontWeight: 600, color: "#3B200B" }}>Usuario:</label>
        <select
          value={nuevoPedido.usuario}
          onChange={(e) =>
            setNuevoPedido({ ...nuevoPedido, usuario: e.target.value })
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            marginBottom: "12px",
          }}
        >
          <option value="">Selecciona</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.nombre}>
              {u.nombre}
            </option>
          ))}
        </select>

        <label style={{ fontWeight: 600, color: "#3B200B" }}>
          Método de Pago:
        </label>
        <select
          value={nuevoPedido.metodo_pago}
          onChange={(e) =>
            setNuevoPedido({
              ...nuevoPedido,
              metodo_pago: e.target.value as "Efectivo" | "Tarjeta" | "QR",
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #e2b773",
            backgroundColor: "#fff",
            marginBottom: "12px",
          }}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="QR">QR</option>
        </select>

        <label style={{ fontWeight: 600, color: "#3B200B" }}>Platos:</label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "120px",
            overflowX: "hidden",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          {platos.map((p) => (
            <button
              key={p.id}
              onClick={() => agregarPlato(p)}
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                border: "2px solid #e2b773",
                background: "#fff7e6",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffedc2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff7e6")
              }
            >
              {p.nombre} - ${p.precio}
            </button>
          ))}
        </div>

        <p
          style={{ fontWeight: "bold", color: "#3B200B", marginBottom: "20px" }}
        >
          Total: ${nuevoPedido.total}
        </p>

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
            onClick={guardarPedido}
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
            {pedido ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
