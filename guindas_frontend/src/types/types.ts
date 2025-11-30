export type Usuario = {
  id: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  rol: "admin" | "cliente";
  estado: "Activo" | "Inactivo";
};

export type Plato = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  disponible: boolean;
};

export type Pedido = {
  id: number;
  usuario: string;
  total: number;
  metodo_pago: "Efectivo" | "Tarjeta" | "QR";
  fecha: string;
  estado: "En preparación" | "Listo" | "Entregado";
  comentario?: string;
  detalle?: DetallePedido[];
};

export type DetallePedido = {
  id: number;
  id_pedido: number;
  id_plato: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
};

export type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
};

export type Reseña = {
  id: number;
  id_plato: number;
  id_usuario: string;
  puntuacion: number; // 1 a 5
  comentario: string;
};
