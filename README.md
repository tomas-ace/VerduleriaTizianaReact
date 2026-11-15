# Frutería Tiziana 🍎🥑

> **“No vendemos solo fruta, vendemos la solución para tu cena”**

Aplicación web de comercio electrónico y planificación de comidas desarrollada en **React + Vite** para la materia **Práctica Profesionalizante 2 (PP2)** de la carrera **Analista de Sistemas (2° Año)**.

---

## 👥 Autores del Proyecto

* **Priscilla Rojas** — [@Priscilla-Rojas](https://github.com/Priscilla-Rojas)
* **Tomás Acevedo** — [@tomas-ace](https://github.com/tomas-ace)

---

## 📝 Sobre el Proyecto y Propuesta de Valor

**Frutería Tiziana** nace para resolver tres problemáticas concretas de una verdulería de cercanía real:

1. **Merma diaria de mercadería:** Las frutas y verduras maduras que no rotan a tiempo representan pérdida directa de capital.
2. **Límite geográfico:** El comercio tradicional depende únicamente del tránsito peatonal frente al local.
3. **Gestión manual por WhatsApp y comisiones externas:** Tomar pedidos manualmente genera errores y cuellos de botella en hora pico, mientras que las plataformas de delivery retienen comisiones elevadas (25%–35%).

### 💡 Nuestra Solución
Una **sucursal digital propia disponible 24/7**, rápida y sin intermediarios, que combina la compra directa de productos frescos con una función diferencial: **Recetas Inteligentes en 1 Clic**. Cuando el comerciante activa una **Oferta del Día** sobre mercadería que necesita rotar, el sistema destaca automáticamente el porcentaje y monto de ahorro en todas las recetas que utilizan esos ingredientes, aumentando el ticket promedio y reduciendo el desperdicio.

---

## ✨ Funcionalidades Principales

* **🛒 Catálogo de Productos con Unidades Reales:**
  * Compra flexible según el tipo de mercadería: **kilogramos (`kg`)**, **gramos (`g`)**, **unidad**, **atado** o **planta**, con cálculo automático de precio proporcional y peso estimado por unidad.
  * Buscador en tiempo real y filtros por categoría (*Frutas*, *Verduras*, *Ofertas del día*).
* **👩‍🍳 Función Estrella — Recetas Inteligentes:**
  * Escalado dinámico de ingredientes según la cantidad de comensales (`2`, `4`, `6`, `8` o ingreso manual personalizado).
  * Opción para **excluir ingredientes** que el cliente ya tiene en su casa antes de sumarlos al carrito.
  * Cruce automático con las **Ofertas del Día** activas, informando el ahorro exacto en pesos y porcentaje.
  * Sistema de **Recetas Favoritas**: guardado desde el Inicio, el catálogo de Recetas o el Detalle de cada plato, con filtro dedicado `Favoritas` en la vista de Recetas.
* **🛍️ Carrito Lateral Desplegable (`CartDrawer`) y Checkout:**
  * Ajuste de cantidades, conversión de unidad de medida directamente desde el carrito y unificación automática de productos repetidos.
  * Resumen transparente de subtotales y descuentos aplicados.
  * Confirmación de compra seleccionando modalidad de entrega (*Envío a domicilio* o *Retiro en local*) y medio de pago (*Mercado Pago*, *Efectivo* o *Transferencia*).
* **👤 Gestión de Usuarios y Post-Venta:**
  * Registro de nuevos clientes, inicio de sesión y persistencia de sesión activa.
  * Sección **Mi Perfil**: edición de datos de contacto y dirección de entrega, cambio de contraseña y baja permanente de cuenta.
  * Sección **Mis Pedidos**: seguimiento de estado (*Preparando*, *En camino*, *Entregado*), desglose por compra y botón **Repetir pedido** en un clic.
* **🌗 Modo Claro y Modo Oscuro:**
  * Tema oscuro con paleta botánica accesible activable desde la barra superior, recordando la preferencia del usuario.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React, React Router DOM y JavaScript.
* **Entorno de desarrollo:** Vite.
* **Estilos:** CSS3 con diseño adaptable (*Mobile-First*), metodología **BEM** y soporte para modo claro y oscuro (`DarkMode.css`).
* **Base de datos local (`db.json`):**
  * Usamos el archivo `db.json` para guardar los productos, recetas, ofertas, usuarios, pedidos y recetas favoritas.
  * Configuramos Vite (`vite.config.js`) para que al correr `npm run dev` la página se conecte directamente a `db.json` y mantenga los cambios guardados (por ejemplo, al crear o eliminar un usuario, confirmar una compra o marcar una receta favorita) sin tener que abrir otra consola aparte.
  * Además, sumamos datos de respaldo en `src/data/mockData.js` y `localStorage` para que la tienda siga funcionando sin problemas si se sube a una página web estática.

---

## 📂 Estructura del Proyecto

```text
VerduleriaTizianaReact/
├── public/
│   └── assets/               # Imágenes públicas de productos y recetas
├── src/
│   ├── assets/               # Recursos gráficos y logos del proyecto
│   ├── components/
│   │   ├── CartDrawer/       # Carrito lateral desplegable y flujo de checkout
│   │   ├── Footer/           # Pie de página institucional
│   │   ├── Header/           # Navegación, buscador móvil, carrito y selector de tema
│   │   ├── LoginModal/       # Modal de inicio de sesión y registro de usuario
│   │   └── ModalPrepararCompra/ # Escalador rápido de ingredientes por comensales
│   ├── data/
│   │   └── mockData.js       # Conexión con los datos, unidades de medida y respaldo local
│   ├── Pages/
│   │   ├── home.jsx          # Página de inicio (Hero, Ofertas, Destacados y Recetas)
│   │   ├── Productos.jsx     # Catálogo completo con filtros y selector de unidades
│   │   ├── Recetas.jsx       # Catálogo de recetas con filtros por categoría, ofertas y favoritas
│   │   ├── RecetaDetalle.jsx # Paso a paso, calculadora de porciones y compra de ingredientes
│   │   ├── Pedidos.jsx       # Historial de pedidos del cliente y repetición de compra
│   │   ├── Perfil.jsx        # Gestión de perfil, contraseña y eliminación de cuenta
│   │   └── Contacto.jsx      # Formulario e información de contacto
│   ├── styles/               # Hojas de estilo modulares por vista y DarkMode.css
│   ├── App.jsx               # Enrutamiento principal y estado global de la aplicación
│   └── main.jsx              # Punto de entrada de React
├── db.json                   # Base de datos en JSON (productos, recetas, usuarios, pedidos)
├── vite.config.js            # Configuración de Vite y conexión local con db.json
└── package.json              # Dependencias y scripts del proyecto
```

---

## 💻 Instalación y Ejecución en Local

### Requisitos previos
* **Node.js** y **npm**.

### 1. Clonar el repositorio e ingresar a la carpeta del proyecto
```bash
git clone https://github.com/tomas-ace/VerduleriaTizianaReact.git
cd VerduleriaTizianaReact
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Luego abrí en el navegador la URL indicada en consola (habitualmente `http://localhost:5173`). Todos los usuarios creados/eliminados, pedidos confirmados y recetas favoritas se guardarán automáticamente en `db.json`.

---

## 🔑 Usuarios de Prueba Precargados

Además de poder registrar una cuenta nueva desde el botón **Ingresar**, `db.json` incluye cuentas de prueba listas para revisar el historial de pedidos y el perfil:

| Usuario | Correo electrónico | Contraseña |
| :--- | :--- | :--- |
| Juan Pérez | `juan.perez@example.com` | `1234` |
| María Gómez | `maria.gomez@example.com` | `1234` |
| Carlos López | `carlos.lopez@example.com` | `1234` |

---

*Desarrollado por **Priscilla Rojas** y **Tomás Acevedo** — Práctica Profesionalizante 2 (Analista de Sistemas).*
