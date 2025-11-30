import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import LoginForm from "./components/LoginForm";
import UsuarioModal from "./components/UsuarioModal";
import PedidoModal from "./components/PedidoModal";
import PlatoModal from "./components/PlatoModal";
import CategoriaModal from "./components/CategoriaModal";
import ReseñaModal from "./components/ReseñaModal";
import { Usuario, Pedido, Plato, Categoria, Reseña } from "./types";

type Auth = {
  logueado: boolean;
  usuario?: Usuario;
};

export default function App() {
  const [auth, setAuth] = useState<Auth>({ logueado: false });
  const [seccion, setSeccion] = useState<string>("Inicio");

  // Datos principales
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [resenas, setResenas] = useState<Reseña[]>([]);

  // Modales
  const [mostrarUsuarioModal, setMostrarUsuarioModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const [mostrarPedidoModal, setMostrarPedidoModal] = useState(false);
  const [pedidoEditar, setPedidoEditar] = useState<Pedido | null>(null);

  const [mostrarPlatoModal, setMostrarPlatoModal] = useState(false);
  const [platoEditar, setPlatoEditar] = useState<Plato | null>(null);

  const [mostrarCategoriaModal, setMostrarCategoriaModal] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState<Categoria | null>(
    null
  );

  const [mostrarResenaModal, setMostrarResenaModal] = useState(false);
  const [resenaEditar, setResenaEditar] = useState<Reseña | null>(null);

  // Función para abrir modales desde Content
  const abrirModal = (tipo: string, item?: any) => {
    switch (tipo) {
      case "usuario":
        setUsuarioEditar(item || null);
        setMostrarUsuarioModal(true);
        break;
      case "pedido":
        setPedidoEditar(item || null);
        setMostrarPedidoModal(true);
        break;
      case "plato":
        setPlatoEditar(item || null);
        setMostrarPlatoModal(true);
        break;
      case "categoria":
        setCategoriaEditar(item || null);
        setMostrarCategoriaModal(true);
        break;
      case "resena":
        setResenaEditar(item || null);
        setMostrarResenaModal(true);
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        backgroundColor: "#120F0A",
        color: "#FCCF46",
      }}
    >
      {auth.logueado ? (
        <>
          <Navbar
            onLogout={() => setAuth({ logueado: false })}
            usuarioNombre={auth.usuario?.nombre}
          />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar setSeccion={setSeccion} rol={auth.usuario!.rol} />
            <Content
              seccion={seccion}
              rol={auth.usuario!.rol}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              pedidos={pedidos}
              setPedidos={setPedidos}
              platos={platos}
              setPlatos={setPlatos}
              categorias={categorias}
              setCategorias={setCategorias}
              resenas={resenas}
              setResenas={setResenas}
              abrirModal={abrirModal}
            />
          </div>

          {/* Modales */}
          {mostrarUsuarioModal && (
            <UsuarioModal
              usuario={usuarioEditar}
              setUsuarioEditar={setUsuarioEditar}
              setUsuarios={setUsuarios}
              setMostrarModal={setMostrarUsuarioModal}
            />
          )}

          {mostrarPedidoModal && (
            <PedidoModal
              pedido={pedidoEditar}
              setPedidoEditar={setPedidoEditar}
              setPedidos={setPedidos}
              setMostrarModal={setMostrarPedidoModal}
              usuarios={usuarios}
              platos={platos}
            />
          )}

          {mostrarPlatoModal && (
            <PlatoModal
              plato={platoEditar}
              setPlatoEditar={setPlatoEditar}
              setPlatos={setPlatos}
              setMostrarModal={setMostrarPlatoModal}
              categorias={categorias}
            />
          )}

          {mostrarCategoriaModal && (
            <CategoriaModal
              categoria={categoriaEditar}
              setCategoriaEditar={setCategoriaEditar}
              setCategorias={setCategorias}
              setMostrarModal={setMostrarCategoriaModal}
            />
          )}

          {mostrarResenaModal && (
            <ReseñaModal
              resena={resenaEditar}
              setResenaEditar={setResenaEditar}
              setResenas={setResenas}
              setMostrarModal={setMostrarResenaModal}
              usuarios={usuarios}
              platos={platos}
            />
          )}
        </>
      ) : (
        <LoginForm setAuth={setAuth} />
      )}
    </div>
  );
}
