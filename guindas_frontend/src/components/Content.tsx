import { Usuario, Pedido, Plato, Categoria, Reseña } from "../types";
import { useEffect, useState } from "react";

type ContentProps = {
  seccion: string;
  rol: "admin" | "cliente";
  usuarios?: Usuario[];
  setUsuarios?: (u: Usuario[]) => void;
  pedidos?: Pedido[];
  setPedidos?: (p: Pedido[]) => void;
  platos?: Plato[];
  setPlatos?: (p: Plato[]) => void;
  categorias?: Categoria[];
  setCategorias?: (c: Categoria[]) => void;
  resenas?: Reseña[];
  setResenas?: (r: Reseña[]) => void;
  abrirModal: (tipo: string, item?: any) => void;
};

export default function Content({
  seccion,
  rol,
  usuarios = [],
  setUsuarios,
  pedidos = [],
  setPedidos,
  platos = [],
  setPlatos,
  categorias = [],
  setCategorias,
  resenas = [],
  setResenas,
  abrirModal,
}: ContentProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    setVisibleCards([]);
    const itemsLength =
      seccion === "Usuarios"
        ? usuarios.length
        : seccion === "Pedidos"
        ? pedidos.length
        : seccion === "Platos"
        ? platos.length
        : seccion === "Categorías"
        ? categorias.length
        : seccion === "Reseñas"
        ? resenas.length
        : 0;

    for (let i = 0; i < itemsLength; i++) {
      setTimeout(() => setVisibleCards((prev) => [...prev, i]), i * 100);
    }
  }, [seccion, usuarios, pedidos, platos, categorias, resenas]);

  const cardStyle = {
    background: "linear-gradient(135deg, #FFECB3, #FFB74D)",
    padding: "14px",
    borderRadius: "16px",
    marginBottom: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    color: "#1E0F05",
    transform: "translateY(20px)",
    opacity: 0,
  } as React.CSSProperties;

  const buttonStyle = {
    background: "linear-gradient(45deg, #FFD700, #FFA000)",
    color: "#1E0F05",
    padding: "8px 16px",
    fontWeight: "bold",
    borderRadius: "12px",
    marginLeft: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-in-out",
  } as React.CSSProperties;

  const renderCard = (content: JSX.Element, index: number) => (
    <div
      key={index}
      style={{
        ...cardStyle,
        transform: visibleCards.includes(index)
          ? "translateY(0) scale(1.03)"
          : "translateY(20px)",
        opacity: visibleCards.includes(index) ? 1 : 0,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(0) scale(1.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0) scale(1.03)")
      }
    >
      {content}
    </div>
  );

  const containerStyle = {
    padding: "16px",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1740&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative" as "relative",
    overflowX: "hidden",
    overflowY: "auto",
  };

  const overlayStyle = {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 0,
  };

  const contentWrapperStyle = {
    position: "relative" as "relative",
    zIndex: 1,
  };

  // ------------------- MEJORADO: Pantalla de Inicio / Menu -------------------
  const renderInicio = () => (
    <div
      style={{
        textAlign: "center",
        color: "#fff",
        marginTop: "60px",
        textShadow: "0 4px 12px rgba(0,0,0,0.7)",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
        ¡Bienvenido al Restaurante!
      </h1>
      <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
        Explora nuestras opciones y gestiona tu restaurante de manera fácil y
        rápida. Selecciona una sección desde el menú lateral para comenzar.
      </p>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            img: "https://boliviana.com.bo/wp-content/uploads/2025/04/2_2.jpg",
            title: "Platos",
            text: "Administra los platos del menú.",
          },
          {
            img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            title: "Pedidos",
            text: "Controla pedidos, estados y métodos de pago.",
          },
          {
            img: "https://i0.wp.com/blog.howlanders.com/wp-content/uploads/2021/04/pique-macho-bolivia.jpg?w=500&ssl=1",
            title: "Categorías",
            text: "Organiza y clasifica tus platos.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              width: "280px",
              padding: "16px",
              borderRadius: "16px",
              backdropFilter: "blur(6px)",
              background: "rgba(255,255,255,0.2)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              cursor: "default",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.img}
              style={{ width: "100%", borderRadius: "12px" }}
            />
            <h3 style={{ marginTop: "12px" }}>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ------------------- OPCIONAL: Sección de Menu Cliente (igual al Inicio) -------------------
  const renderMenuCliente = () => renderInicio(); // ahora es igual al inicio, no hay botón extra

  // ------------------- FUNCIONES EXISTENTES -------------------
  const renderUsuarios = () => (
    <div style={contentWrapperStyle}>
      <button style={buttonStyle} onClick={() => abrirModal("usuario")}>
        + Agregar Usuario
      </button>
      {usuarios.map((u, i) =>
        renderCard(
          <>
            <strong>
              {u.nombre} {u.primer_apellido}
            </strong>{" "}
            ({u.rol}) - {u.estado}
            <button
              style={buttonStyle}
              onClick={() => abrirModal("usuario", u)}
            >
              Editar
            </button>
          </>,
          i
        )
      )}
    </div>
  );

  const renderPedidos = () => (
    <div style={contentWrapperStyle}>
      <button style={buttonStyle} onClick={() => abrirModal("pedido")}>
        + Agregar Pedido
      </button>
      {pedidos.map((p, i) =>
        renderCard(
          <>
            <strong>{p.usuario}</strong> - ${p.total} ({p.estado}) -{" "}
            {p.metodo_pago}
            <button style={buttonStyle} onClick={() => abrirModal("pedido", p)}>
              Editar
            </button>
          </>,
          i
        )
      )}
    </div>
  );

  const renderPlatos = () => (
    <div style={contentWrapperStyle}>
      <button style={buttonStyle} onClick={() => abrirModal("plato")}>
        + Agregar Plato
      </button>
      {platos.map((p, i) =>
        renderCard(
          <>
            <strong>{p.nombre}</strong> - {p.categoria} - ${p.precio}
            <button style={buttonStyle} onClick={() => abrirModal("plato", p)}>
              Editar
            </button>
          </>,
          i
        )
      )}
    </div>
  );

  const renderCategorias = () => (
    <div style={contentWrapperStyle}>
      <button style={buttonStyle} onClick={() => abrirModal("categoria")}>
        + Agregar Categoría
      </button>
      {categorias.map((c, i) =>
        renderCard(
          <>
            <strong>{c.nombre}</strong> - {c.descripcion}
            <button
              style={buttonStyle}
              onClick={() => abrirModal("categoria", c)}
            >
              Editar
            </button>
          </>,
          i
        )
      )}
    </div>
  );

  const renderResenas = () => (
    <div style={contentWrapperStyle}>
      <button style={buttonStyle} onClick={() => abrirModal("resena")}>
        + Agregar Reseña
      </button>
      {resenas.map((r, i) =>
        renderCard(
          <>
            Usuario {r.id_usuario} - Plato {r.id_plato} - {r.puntuacion}⭐
            <div>{r.comentario}</div>
            <button style={buttonStyle} onClick={() => abrirModal("resena", r)}>
              Editar
            </button>
          </>,
          i
        )
      )}
    </div>
  );

  // ------------------- RENDER FINAL -------------------
  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      {seccion === "Usuarios" ? (
        rol === "admin" ? (
          renderUsuarios()
        ) : (
          <p style={{ color: "#FFD700" }}>Acceso denegado</p>
        )
      ) : seccion === "Pedidos" ? (
        rol === "admin" ? (
          renderPedidos()
        ) : (
          <p style={{ color: "#FFD700" }}>Acceso denegado</p>
        )
      ) : seccion === "Platos" ? (
        rol === "admin" ? (
          renderPlatos()
        ) : (
          <p style={{ color: "#FFD700" }}>Acceso denegado</p>
        )
      ) : seccion === "Categorías" ? (
        rol === "admin" ? (
          renderCategorias()
        ) : (
          <p style={{ color: "#FFD700" }}>Acceso denegado</p>
        )
      ) : seccion === "Reseñas" ? (
        rol === "admin" ? (
          renderResenas()
        ) : (
          <p style={{ color: "#FFD700" }}>Acceso denegado</p>
        )
      ) : (
        renderInicio()
      )}
    </div>
  );
}
