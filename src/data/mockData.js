const API_URL = 'http://localhost:3000';

export const fallbackData = {
  tienda: [
    {
      Slogan: '"No vendemos solo fruta, vendemos la solución para tu cena." Frutas y verduras frescas con entrega a domicilio en Buenos Aires.',
      Nombre: 'Tiziana',
      Mail: 'hola@fruteria-tiziana.com',
      Telefono: '+54 11 5555-8494',
      Direccion: 'Buenos Aires, Argentina',
      'Horarios de Entrega': 'Entrega: Lun-Dom de 9 a 21 hs',
    },
  ],
  productos: [
    {
      id: 1,
      nombre: 'Tomate Perita',
      precioPorPeso: 1200,
      categoria: 'Verduras',
      descripcion: 'Tomate perita especial para salsa o ensaladas.',
      imagen: '/assets/productos-img/tomate-redondo.png',
    },
    {
      id: 2,
      nombre: 'Papa Negra',
      precioPorPeso: 600,
      categoria: 'Verduras',
      descripcion: 'Papa negra ideal para puré o freír.',
      imagen: '/assets/productos-img/papa-negra.png',
    },
    {
      id: 3,
      nombre: 'Cebolla',
      precioPorPeso: 700,
      categoria: 'Verduras',
      descripcion: 'Cebolla de origen nacional, muy sabrosa.',
      imagen: '/assets/productos-img/cebolla.jpg',
    },
    {
      id: 4,
      nombre: 'Zanahoria',
      precioPorPeso: 850,
      categoria: 'Verduras',
      descripcion: 'Zanahoria fresca y dulce.',
      imagen: '/assets/productos-img/zanahoria.png',
    },
    {
      id: 5,
      nombre: 'Manzana Roja',
      precioPorPeso: 1500,
      categoria: 'Frutas',
      descripcion: 'Manzana roja comercial, muy jugosa.',
      imagen: '/assets/productos-img/apple.jpg',
    },
  ],
  Oferta: [
    { IdProducto: 1, Porcentaje: 25, Estado: 'Activa' },
    { IdProducto: 2, Porcentaje: 30, Estado: 'Activa' },
    { IdProducto: 3, Porcentaje: 15, Estado: 'Activa' },
  ],
  dificultad: [
    { id: 1, nivel: 'Fácil' },
    { id: 2, nivel: 'Media' },
    { id: 3, nivel: 'Difícil' },
  ],
  recetas: [
    {
      id: 1,
      title: 'Sopa de Verduras',
      Pasos: {
        1: 'Comenzar lavando minuciosamente todas las verduras bajo un chorro de agua fría. Luego, con la ayuda de un pelador, retirar la cáscara de las zanahorias, papas y zapallo.',
      },
      imagen: '/assets/recetas-img/sopa-zapallo.png',
      idDificultad: 2,
      comensales: 4,
    },
    {
      id: 2,
      title: 'Ensalada Clásica',
      Pasos: {
        1: 'Deshojar la lechuga y lavar cada hoja individualmente para retirar cualquier resto de tierra. Escurrir bien o utilizar un centrifugador de verduras.',
      },
      imagen: '/assets/recetas-img/ensalada-clasica.jpg',
      idDificultad: 1,
      comensales: 4,
    },
    {
      id: 3,
      title: 'Licuado de Banana y Frutilla',
      Pasos: {
        1: 'Lavar cuidadosamente las frutillas, retirarles el cabito verde y cortarlas a la mitad. Pelar las bananas, quitando los filamentos, y trocearlas en pedazos medianos.',
      },
      imagen: '/assets/recetas-img/licuada-bananaFrutilla.jpg',
      idDificultad: 1,
      comensales: 2,
    },
    {
      id: 4,
      title: 'Ensalada de Frutas',
      Pasos: {
        1: 'Seleccionar una variedad de frutas frescas de temporada. Lavarlas minuciosamente, pelar aquellas que lo requieran y retirar las semillas de manzanas y uvas.',
      },
      imagen: '/assets/recetas-img/ensalada de frutas.jpg',
      idDificultad: 1,
      comensales: 4,
    },
    {
      id: 5,
      title: 'Guacamole',
      Pasos: {
        1: 'Cortar las paltas maduras por la mitad, retirar el carozo y extraer toda la pulpa con la ayuda de una cuchara. Colocar la pulpa en un bol hondo y pisarla con un tenedor.',
      },
      imagen: '/assets/recetas-img/guacamole.jpg',
      idDificultad: 2,
      comensales: 4,
    },
    {
      id: 6,
      title: 'Jugo de Naranja y Zanahoria',
      Pasos: {
        1: 'Lavar muy bien la zanahoria, pelarla con un pelapapas y cortarla en trozos pequeños o rodajas para facilitar el licuado. Exprimir las naranjas.',
      },
      imagen: '/assets/recetas-img/jugo-naranjazanahoria.jpg',
      idDificultad: 1,
      comensales: 2,
    },
  ],
  usuarios: [
    {
      id: 1,
      nombre: 'juan',
      apellido: 'perez',
      mail: 'juan.perez@example.com',
      nombreUsuario: 'juanperez',
      telefono: '1123456789',
      contrasena: '1234',
    },
    {
      id: 2,
      nombre: 'maria',
      apellido: 'gomez',
      mail: 'maria.gomez@example.com',
      nombreUsuario: 'mariag',
      telefono: '1198765432',
      contrasena: '1234',
    },
    {
      id: 3,
      nombre: 'carlos',
      apellido: 'lopez',
      mail: 'carlos.lopez@example.com',
      nombreUsuario: 'carlopez',
      telefono: '1145678901',
      contrasena: '1234',
    },
  ],
};

export async function fetchWithFallback(endpoint, fallbackKey) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error('API no disponible');
    return await response.json();
  } catch {
    return fallbackData[fallbackKey];
  }
}
