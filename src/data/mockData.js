const API_URL = 'http://localhost:3000';

export const fallbackData = {
  tienda: [
    {
      Slogan:
        '"No vendemos solo fruta, vendemos la solución para tu cena." Frutas y verduras frescas con entrega a domicilio en Buenos Aires.',
      Nombre: 'Tiziana',
      Mail: 'hola@fruteria-tiziana.com',
      Telefono: '+54 11 5555-8494',
      Direccion: 'Buenos Aires, Argentina',
      'Horarios de Entrega': 'Entrega: Lun-Dom de 9 a 21 hs',
      'Horarios de Atencion': '',
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
    {
      id: 6,
      nombre: 'Banana',
      precioPorPeso: 1300,
      categoria: 'Frutas',
      descripcion: 'Banana Cavendish de Ecuador.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
    {
      id: 7,
      nombre: 'Limón',
      precioPorPeso: 900,
      categoria: 'Frutas',
      descripcion: 'Limón Tucumano primera calidad.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
    {
      id: 8,
      nombre: 'Morrón Rojo',
      precioPorPeso: 2500,
      categoria: 'Verduras',
      descripcion: 'Morrón rojo carnoso, ideal para asar.',
      imagen: '/assets/productos-img/tomate-redondo.png',
    },
    {
      id: 9,
      nombre: 'Ajo',
      precioPorPeso: 4000,
      categoria: 'Verduras',
      descripcion: 'Cabeza de ajo blanco.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 10,
      nombre: 'Lechuga Capuchina',
      precioPorPeso: 1100,
      categoria: 'Verduras',
      descripcion: 'Lechuga fresca repollada.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 11,
      nombre: 'Palta Hass',
      precioPorPeso: 1800,
      categoria: 'Frutas',
      descripcion: 'Palta de tamaño mediano.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 12,
      nombre: 'Frutilla',
      precioPorPeso: 3500,
      categoria: 'Frutas',
      descripcion: 'Frutilla fresca por kilo.',
      imagen: '/assets/productos-img/frutilla.png',
    },
    {
      id: 13,
      nombre: 'Naranja Jugo',
      precioPorPeso: 1000,
      categoria: 'Frutas',
      descripcion: 'Naranja especial para hacer jugo.',
      imagen: '/assets/productos-img/naranja-navel.png',
    },
    {
      id: 14,
      nombre: 'Zapallo Anco',
      precioPorPeso: 500,
      categoria: 'Verduras',
      descripcion: 'Zapallo anco tipo coreano.',
      imagen: '/assets/productos-img/calabacin.png',
    },
    {
      id: 15,
      nombre: 'Uva Negra',
      precioPorPeso: 2800,
      categoria: 'Frutas',
      descripcion: 'Uva negra sin semilla.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
    {
      id: 16,
      nombre: 'Berenjena',
      precioPorPeso: 1200,
      categoria: 'Verduras',
      descripcion: 'Berenjena fresca para asar o rellenas.',
      imagen: '/assets/productos-img/berebjenas.png',
    },
    {
      id: 17,
      nombre: 'Jengibre',
      precioPorPeso: 8000,
      categoria: 'Verduras',
      descripcion: 'Raíz de jengibre fresca.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 18,
      nombre: 'Albahaca',
      precioPorPeso: 500,
      categoria: 'Verduras',
      descripcion: 'Atado de albahaca fresca y aromática.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 19,
      nombre: 'Cilantro',
      precioPorPeso: 400,
      categoria: 'Verduras',
      descripcion: 'Atado de cilantro fresco.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 20,
      nombre: 'Calabacín',
      precioPorPeso: 800,
      categoria: 'Verduras',
      descripcion: 'Calabacín (zucchini) verde y tierno.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 21,
      nombre: 'Espinaca',
      precioPorPeso: 600,
      categoria: 'Verduras',
      descripcion: 'Atado de espinaca fresca.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 22,
      nombre: 'Pepino',
      precioPorPeso: 700,
      categoria: 'Verduras',
      descripcion: 'Pepino fresco y crujiente.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 23,
      nombre: 'Apio',
      precioPorPeso: 500,
      categoria: 'Verduras',
      descripcion: 'Planta de apio verde y crujiente.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 24,
      nombre: 'Kiwi',
      precioPorPeso: 3500,
      categoria: 'Frutas',
      descripcion: 'Kiwi verde importado.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
    {
      id: 25,
      nombre: 'Ananá',
      precioPorPeso: 2000,
      categoria: 'Frutas',
      descripcion: 'Ananá tropical entero.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
    {
      id: 26,
      nombre: 'Menta',
      precioPorPeso: 450,
      categoria: 'Verduras',
      descripcion: 'Atado de menta fresca.',
      imagen: '/assets/productos-img/generico-verduras.png',
    },
    {
      id: 27,
      nombre: 'Granada',
      precioPorPeso: 1500,
      categoria: 'Frutas',
      descripcion: 'Granada roja, fresca y dulce.',
      imagen: '/assets/productos-img/generico-frutas.png',
    },
  ],
  Oferta: [
    { IdProducto: 1, Porcentaje: 25, Estado: 'Activa' },
    { IdProducto: 2, Porcentaje: 30, Estado: 'Activa' },
    { IdProducto: 3, Porcentaje: 15, Estado: 'Activa' },
    { IdProducto: 4, Porcentaje: 20, Estado: 'Activa' },
    { IdProducto: 5, Porcentaje: 5, Estado: 'Activa' },
  ],
  dificultad: [
    { id: 1, nivel: 'Fácil' },
    { id: 2, nivel: 'Media' },
    { id: 3, nivel: 'Difícil' },
  ],
  categorias: [
    { id: 1, Tipo: 'Recetas', Descripcion: 'Postres' },
    { id: 2, Tipo: 'Productos', Descripcion: 'Frutas' },
    { id: 3, Tipo: 'Productos', Descripcion: 'Verduras' },
    { id: 4, Tipo: 'Recetas', Descripcion: 'Entradas' },
    { id: 5, Tipo: 'Recetas', Descripcion: 'Sopas' },
    { id: 6, Tipo: 'Recetas', Descripcion: 'Platos Principales' },
    { id: 7, Tipo: 'Recetas', Descripcion: 'Ensaladas' },
    { id: 8, Tipo: 'Recetas', Descripcion: 'Bebidas' },
  ],
  CategoriaReceta: [
    { idReceta: 1, idCategoria: 5 },
    { idReceta: 2, idCategoria: 7 },
    { idReceta: 3, idCategoria: 8 },
    { idReceta: 4, idCategoria: 1 },
    { idReceta: 5, idCategoria: 4 },
    { idReceta: 6, idCategoria: 8 },
    { idReceta: 7, idCategoria: 5 },
    { idReceta: 8, idCategoria: 4 },
    { idReceta: 9, idCategoria: 7 },
    { idReceta: 10, idCategoria: 6 },
    { idReceta: 11, idCategoria: 1 },
    { idReceta: 12, idCategoria: 8 },
    { idReceta: 13, idCategoria: 6 },
    { idReceta: 14, idCategoria: 6 },
    { idReceta: 15, idCategoria: 7 },
  ],
  ingredienteReceta: [
    { idReceta: 1, idProducto: 2, cantidad: 500, unidad: 'gramos' },
    { idReceta: 1, idProducto: 4, cantidad: 300, unidad: 'gramos' },
    { idReceta: 1, idProducto: 3, cantidad: 200, unidad: 'gramos' },
    { idReceta: 1, idProducto: 14, cantidad: 400, unidad: 'gramos' },
    { idReceta: 2, idProducto: 10, cantidad: 1, unidad: 'planta' },
    { idReceta: 2, idProducto: 1, cantidad: 2, unidad: 'unidades' },
    { idReceta: 2, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 3, idProducto: 6, cantidad: 2, unidad: 'unidades' },
    { idReceta: 3, idProducto: 12, cantidad: 200, unidad: 'gramos' },
    { idReceta: 4, idProducto: 5, cantidad: 2, unidad: 'unidades' },
    { idReceta: 4, idProducto: 6, cantidad: 2, unidad: 'unidades' },
    { idReceta: 4, idProducto: 13, cantidad: 3, unidad: 'unidades' },
    { idReceta: 4, idProducto: 15, cantidad: 200, unidad: 'gramos' },
    { idReceta: 5, idProducto: 11, cantidad: 2, unidad: 'unidades' },
    { idReceta: 5, idProducto: 1, cantidad: 1, unidad: 'unidad' },
    { idReceta: 5, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 5, idProducto: 7, cantidad: 1, unidad: 'unidad' },
    { idReceta: 5, idProducto: 19, cantidad: 1, unidad: 'atado' },
    { idReceta: 6, idProducto: 13, cantidad: 4, unidad: 'unidades' },
    { idReceta: 6, idProducto: 4, cantidad: 2, unidad: 'unidades' },
    { idReceta: 7, idProducto: 1, cantidad: 1, unidad: 'kg' },
    { idReceta: 7, idProducto: 8, cantidad: 1, unidad: 'unidad' },
    { idReceta: 7, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 7, idProducto: 9, cantidad: 2, unidad: 'dientes' },
    { idReceta: 8, idProducto: 2, cantidad: 1, unidad: 'kg' },
    { idReceta: 8, idProducto: 9, cantidad: 3, unidad: 'dientes' },
    { idReceta: 9, idProducto: 1, cantidad: 2, unidad: 'unidades' },
    { idReceta: 9, idProducto: 11, cantidad: 1, unidad: 'unidad' },
    { idReceta: 9, idProducto: 7, cantidad: 1, unidad: 'unidad' },
    { idReceta: 9, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 9, idProducto: 19, cantidad: 1, unidad: 'atado' },
    { idReceta: 10, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 10, idProducto: 4, cantidad: 1, unidad: 'unidad' },
    { idReceta: 10, idProducto: 8, cantidad: 1, unidad: 'unidad' },
    { idReceta: 10, idProducto: 20, cantidad: 1, unidad: 'unidad' },
    { idReceta: 11, idProducto: 12, cantidad: 200, unidad: 'gramos' },
    { idReceta: 11, idProducto: 6, cantidad: 2, unidad: 'unidades' },
    { idReceta: 11, idProducto: 5, cantidad: 1, unidad: 'unidad' },
    { idReceta: 11, idProducto: 24, cantidad: 2, unidad: 'unidades' },
    { idReceta: 11, idProducto: 25, cantidad: 1, unidad: 'unidad' },
    { idReceta: 12, idProducto: 21, cantidad: 1, unidad: 'atado' },
    { idReceta: 12, idProducto: 5, cantidad: 1, unidad: 'unidad' },
    { idReceta: 12, idProducto: 22, cantidad: 1, unidad: 'unidad' },
    { idReceta: 12, idProducto: 23, cantidad: 1, unidad: 'planta' },
    { idReceta: 12, idProducto: 17, cantidad: 20, unidad: 'gramos' },
    { idReceta: 13, idProducto: 16, cantidad: 3, unidad: 'unidades' },
    { idReceta: 13, idProducto: 1, cantidad: 500, unidad: 'gramos' },
    { idReceta: 13, idProducto: 9, cantidad: 2, unidad: 'dientes' },
    { idReceta: 13, idProducto: 18, cantidad: 1, unidad: 'atado' },
    { idReceta: 14, idProducto: 14, cantidad: 1, unidad: 'unidad' },
    { idReceta: 14, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 15, idProducto: 14, cantidad: 300, unidad: 'gramos' },
    { idReceta: 15, idProducto: 3, cantidad: 1, unidad: 'unidad' },
    { idReceta: 15, idProducto: 19, cantidad: 1, unidad: 'atado' },
    { idReceta: 15, idProducto: 26, cantidad: 1, unidad: 'atado' },
    { idReceta: 15, idProducto: 27, cantidad: 1, unidad: 'unidad' },
    { idReceta: 15, idProducto: 7, cantidad: 20, unidad: 'ml' },
  ],
  recetas: [
    {
      id: 1,
      title: 'Sopa de Verduras',
      Pasos: {
        1: 'Comenzar lavando minuciosamente todas las verduras bajo un chorro de agua fría. Luego, con la ayuda de un pelador, retirar la cáscara de las zanahorias, papas y zapallo. Cortar todo en cubos de tamaño uniforme para asegurar una cocción pareja.',
        2: 'En una olla grande, colocar un chorrito de aceite y sofreír ligeramente las verduras cortadas. Cubrir con agua o caldo de verduras hasta tapar los ingredientes por completo. Llevar a ebullición y luego bajar el fuego, dejando cocinar a fuego lento durante aproximadamente 40 a 45 minutos, hasta que todo esté muy tierno.',
        3: 'Una vez listas y ligeramente entibiadas, trasladar las verduras y el líquido a una licuadora o utilizar una minipimer para procesar todo el contenido. Licuar de forma continua hasta obtener una textura suave, sedosa y sin grumos. Salpimentar al gusto y servir caliente.',
      },
      imagen: '/assets/recetas-img/sopa-zapallo.png',
      idDificultad: 2,
      comensales: 4,
      otrosIngredientes: ['Aceite', 'Sal', 'Agua o caldo'],
    },
    {
      id: 2,
      title: 'Ensalada Clásica',
      Pasos: {
        1: 'Deshojar la lechuga y lavar cada hoja individualmente para retirar cualquier resto de tierra. Escurrir bien o utilizar un centrifugador de verduras. Lavar el tomate y secarlo con un paño limpio.',
        2: 'Cortar el tomate cuidadosamente en rodajas finas o en gajos, según la preferencia. Tomar la cebolla, pelarla y cortarla en juliana muy fina (pluma). Para suavizar su sabor, se puede dejar remojando en agua fría durante 10 minutos y luego escurrir.',
        3: 'En un bol amplio, disponer una cama de hojas de lechuga troceadas con las manos, agregar el tomate y distribuir la cebolla por encima. En un recipiente aparte, preparar una vinagreta mezclando aceite de oliva, vinagre, sal y pimienta. Verter sobre la ensalada justo antes de servir y remover suavemente.',
      },
      imagen: '/assets/recetas-img/ensalada-clasica.jpg',
      idDificultad: 1,
      comensales: 4,
      otrosIngredientes: ['Aceite de oliva', 'Vinagre', 'Sal', 'Pimienta'],
    },
    {
      id: 3,
      title: 'Licuado de Banana y Frutilla',
      Pasos: {
        1: 'Lavar cuidadosamente las frutillas, retirarles el cabito verde y cortarlas a la mitad. Pelar las bananas, quitando los filamentos, y trocearlas en pedazos medianos.',
        2: 'Colocar todas las frutas preparadas dentro del vaso de la licuadora. Añadir la leche (puede ser de vaca o vegetal) hasta cubrir la fruta y agregar un puñado de hielo para que el resultado sea refrescante y espeso.',
        3: 'Licuar a velocidad alta durante un par de minutos, pausando si es necesario para asegurarse de que no queden trozos enteros de fruta. Probar y, si se desea, endulzar con azúcar o miel. Servir inmediatamente en vasos altos.',
      },
      imagen: '/assets/recetas-img/licuada-bananaFrutilla.jpg',
      idDificultad: 1,
      comensales: 2,
      otrosIngredientes: ['Leche o agua', 'Hielo', 'Azúcar o miel (opcional)'],
    },
    {
      id: 4,
      title: 'Ensalada de Frutas',
      Pasos: {
        1: 'Seleccionar una variedad de frutas frescas de temporada. Lavarlas minuciosamente, pelar aquellas que lo requieran (como manzanas, bananas o naranjas) y retirar las semillas de manzanas y uvas.',
        2: 'Sobre una tabla de cortar, picar todas las frutas en dados pequeños y parejos, para que en cada cucharada se puedan probar distintos sabores. Colocar toda la fruta picada en un recipiente grande o ensaladera.',
        3: 'Exprimir un par de naranjas para obtener jugo natural y verterlo sobre la fruta cortada, esto evitará que se oxiden y aportará un dulzor natural. Mezclar con cuidado, cubrir el bol y llevar a la heladera por al menos una hora antes de servir para que los sabores se integren y esté bien fresca.',
      },
      imagen: '/assets/recetas-img/ensalada de frutas.jpg',
      idDificultad: 1,
      comensales: 4,
      otrosIngredientes: [],
    },
    {
      id: 5,
      title: 'Guacamole',
      Pasos: {
        1: 'Cortar las paltas maduras por la mitad, retirar el carozo y extraer toda la pulpa con la ayuda de una cuchara. Colocar la pulpa en un bol hondo y pisarla vigorosamente con un tenedor hasta formar un puré, dejando algunos trocitos enteros para darle textura.',
        2: 'Lavar el tomate, retirar las semillas y picarlo en cubos extremadamente pequeños. Hacer lo mismo con la cebolla (preferentemente morada). Incorporar el tomate y la cebolla picados al puré de palta y revolver bien.',
        3: 'Exprimir el jugo de medio limón fresco sobre la mezcla (esto aporta acidez y evita que la palta se ponga negra). Añadir sal a gusto, pimienta y, si se desea, cilantro fresco picado finamente. Mezclar todo y servir inmediatamente acompañado de nachos.',
      },
      imagen: '/assets/recetas-img/guacamole.jpg',
      idDificultad: 2,
      comensales: 4,
      otrosIngredientes: ['Sal', 'Pimienta', 'Nachos (para acompañar)'],
    },
    {
      id: 6,
      title: 'Jugo de Naranja y Zanahoria',
      Pasos: {
        1: 'Lavar muy bien la zanahoria, pelarla con un pelapapas y cortarla en trozos pequeños o rodajas para facilitar el licuado. Exprimir las naranjas asegurándose de retirar cualquier semilla que pueda amargar el jugo.',
        2: 'Colocar los trozos de zanahoria en la licuadora junto con el jugo de naranja recién exprimido. Si se desea un jugo más ligero, añadir medio vaso de agua fría.',
        3: 'Licuar a máxima potencia durante dos a tres minutos, hasta que la zanahoria esté completamente deshecha. Para una textura más fina, pasar el jugo por un colador o tamiz. Servir frío, opcionalmente decorado con una rodajita de naranja.',
      },
      imagen: '/assets/recetas-img/jugo-naranjazanahoria.jpg',
      idDificultad: 1,
      comensales: 2,
      otrosIngredientes: ['Agua (opcional)', 'Hielo'],
    },
    {
      id: 7,
      title: 'Gazpacho Frío',
      Pasos: {
        1: 'Lavar muy bien los tomates maduros y el morrón. Retirar las semillas y las nervaduras blancas del morrón. Pelar el diente de ajo y retirar el germen central para evitar que repita. Pelar también un cuarto de cebolla.',
        2: 'Trocear todas las verduras y colocarlas en el vaso de la licuadora o procesadora. Añadir un buen chorro de aceite de oliva virgen extra, un chorrito de vinagre, sal al gusto y un vaso de agua fría. Si se quiere más espeso, se puede agregar un trozo de pan duro remojado.',
        3: 'Triturar todo a máxima velocidad durante varios minutos hasta obtener una crema muy fina y homogénea. Probar y rectificar de sal o vinagre si hiciera falta. Llevar a la heladera en un recipiente tapado durante al menos 2 a 3 horas para servirlo bien helado.',
      },
      imagen: '/assets/recetas-img/gazpacho-frío.jpg',
      idDificultad: 2,
      comensales: 4,
      otrosIngredientes: [
        'Aceite de oliva',
        'Vinagre',
        'Sal',
        'Agua',
        'Pan duro (opcional)',
      ],
    },
    {
      id: 8,
      title: 'Papas Rústicas al Horno',
      Pasos: {
        1: 'Como estas papas se preparan con su cáscara, es fundamental lavarlas exhaustivamente bajo el agua, utilizando un cepillo suave para quitar cualquier rastro de tierra. Secarlas bien con papel de cocina.',
        2: 'Cortar las papas a lo largo por la mitad, y luego cada mitad en gajos gruesos. Colocarlos en un bol grande, añadir un generoso chorro de aceite de oliva, pimentón dulce, sal, pimienta y dos dientes de ajo finamente picados o machacados. Mezclar con las manos para impregnar cada gajo.',
        3: 'Distribuir los gajos de papa en una bandeja para horno previamente aceitada, procurando que no queden amontonados para que se doren bien. Hornear en un horno precalentado a 200°C durante unos 35 a 45 minutos, volteándolas a la mitad de la cocción, hasta que estén crujientes por fuera y tiernas por dentro.',
      },
      imagen: '/assets/recetas-img/Receta-de-papas-rústicas-al-horno.jpg',
      idDificultad: 2,
      comensales: 4,
      otrosIngredientes: [
        'Aceite de oliva',
        'Pimentón dulce',
        'Sal',
        'Pimienta',
      ],
    },
    {
      id: 9,
      title: 'Ensalada de Tomate y Palta',
      Pasos: {
        1: 'Lavar los tomates y cortarlos en cubos medianos, procurando mantener su firmeza. Cortar la palta a la mitad, retirar el carozo y, con cuidado de no deshacerla, cortarla también en trozos de tamaño similar a los del tomate.',
        2: 'Colocar los cubos de tomate y palta en una ensaladera o plato hondo. Si se desea, se puede agregar un poco de cebolla morada picada o hojas de cilantro fresco para realzar los sabores.',
        3: 'Preparar un aliño simple mezclando en un cuenco pequeño jugo de limón fresco, una cucharada de aceite de oliva, sal y pimienta recién molida. Verter sobre la ensalada y mezclar con extrema delicadeza usando dos cucharas para no romper los trozos de palta. Servir como acompañamiento.',
      },
      imagen: '/assets/recetas-img/ensalada.png',
      idDificultad: 1,
      comensales: 2,
      otrosIngredientes: ['Aceite de oliva', 'Sal', 'Pimienta'],
    },
    {
      id: 10,
      title: 'Tarta de Verduras',
      Pasos: {
        1: 'Para el relleno, lavar y cortar en dados pequeños una variedad de verduras como calabacín, morrón, cebolla y zanahoria. En una sartén grande con aceite de oliva, sofreír la cebolla hasta que esté translúcida, luego incorporar el resto de las verduras y cocinar hasta que estén tiernas pero no desarmadas. Salpimentar y dejar enfriar.',
        2: 'En un bol, batir tres huevos con un chorrito de crema de leche o queso crema, sal, pimienta y nuez moscada. Incorporar las verduras salteadas y ya frías a esta mezcla de huevos, integrando todo de manera uniforme. Opcionalmente, sumar queso rallado.',
        3: 'Forrar una tartera previamente enmantecada con la masa de tarta (casera o comprada), pinchar la base con un tenedor para que no se infle y verter todo el relleno en el interior. Llevar a un horno precalentado a 180°C y hornear durante unos 40 a 45 minutos, o hasta que el relleno esté firme y los bordes de la masa dorados. Dejar entibiar antes de cortar.',
      },
      imagen: '/assets/recetas-img/tarta-verduras.png',
      idDificultad: 3,
      comensales: 4,
      otrosIngredientes: [
        'Masa de tarta',
        '3 huevos',
        'Crema de leche o queso crema',
        'Sal',
        'Pimienta',
        'Nuez moscada',
        'Queso rallado (opcional)',
      ],
    },
    {
      id: 11,
      title: 'Brochetas de Frutas',
      Pasos: {
        1: 'Elegir frutas coloridas y consistentes, como frutillas, kiwis, uvas, ananá o melón. Lavar bien todas las piezas, pelar las que corresponda y cortarlas en cubos gruesos o rodajas que sean fáciles de pinchar sin romperse.',
        2: 'Tomar palillos largos de madera (brochettes) y comenzar a ensartar los trozos de fruta. Es ideal alternar los tipos de fruta para crear un contraste de colores atractivo, por ejemplo: una uva, un cubo de ananá, una rodaja de kiwi y una frutilla en la punta.',
        3: 'Disponer las brochetas terminadas en una bandeja plana. Se pueden servir al natural, frías, o acompañarlas con un pequeño cuenco con yogur natural, miel o chocolate derretido para que cada comensal pueda bañar su brocheta al momento de degustar.',
      },
      imagen: '/assets/recetas-img/brochetas-de-frutas.jpg',
      idDificultad: 1,
      comensales: 4,
      otrosIngredientes: [
        'Yogur, miel o chocolate (para acompañar)',
        'Palillos de brochette',
      ],
    },
    {
      id: 12,
      title: 'Jugo Verde Detox',
      Pasos: {
        1: 'Separar y lavar exhaustivamente las hojas verdes (pueden ser espinacas frescas o apio), asegurándose de retirar toda la tierra. Lavar también una manzana verde y medio pepino. Pelar el pepino si tiene una cáscara muy gruesa y descorazonar la manzana.',
        2: 'Cortar el pepino, la manzana y el apio en trozos medianos. Pelar un trocito pequeño de jengibre fresco. Colocar todos los ingredientes en la licuadora junto con un vaso grande de agua mineral fría.',
        3: 'Licuar todo a velocidad máxima durante un par de minutos para desintegrar por completo las fibras de las verduras. Dependiendo del gusto personal, se puede beber así, espeso y con toda la fibra, o filtrarlo utilizando un colador de malla fina o bolsa para leches vegetales. Ideal para tomar recién preparado en ayunas.',
      },
      imagen: '/assets/recetas-img/jugo-verde-dtox.jpg',
      idDificultad: 2,
      comensales: 2,
      otrosIngredientes: ['Agua mineral'],
    },
    {
      id: 13,
      title: 'Lasaña de Berenjenas',
      Pasos: {
        1: 'Lavar minuciosamente las berenjenas, retirar los extremos y cortarlas a lo largo en láminas finas de aproximadamente medio centímetro de grosor. Espolvorear sal gruesa sobre cada lámina y dejarlas reposar en un colador durante 30 minutos para que suelten el jugo amargo. Luego, enjuagarlas con abundante agua fría y secarlas cuidadosamente con papel absorbente.',
        2: 'En una sartén amplia o plancha bien caliente con un hilo de aceite de oliva, dorar las láminas de berenjena por ambos lados hasta que estén tiernas y ligeramente tostadas. Reservar. Por otro lado, en una olla, preparar una salsa de tomate sofritando ajo picado, añadiendo puré de tomate, albahaca fresca, sal, pimienta y cocinando a fuego lento por 20 minutos.',
        3: 'En una fuente apta para horno, armar la lasaña colocando primero una capa delgada de salsa de tomate, luego una capa de láminas de berenjena, otra de salsa, espolvorear queso mozzarella rallado y un poco de queso parmesano. Repetir estas capas hasta terminar con los ingredientes, asegurando que la última capa quede bien cubierta de quesos. Hornear a 200°C durante 25 a 30 minutos, hasta que gratine y esté burbujeante. Dejar reposar 10 minutos antes de cortar.',
      },
      imagen: '/assets/recetas-img/lasaña-berenjena.jpg',
      idDificultad: 3,
      comensales: 4,
      otrosIngredientes: [
        'Aceite de oliva',
        'Puré de tomate',
        'Sal',
        'Pimienta',
        'Queso mozzarella',
        'Queso parmesano',
      ],
    },
    {
      id: 14,
      title: 'Risotto de Zapallo Anco',
      Pasos: {
        1: 'Pelar el zapallo anco, retirar las semillas y cortarlo en dados muy pequeños y uniformes. En una olla, calentar un litro de caldo de verduras y mantenerlo caliente a fuego mínimo durante toda la preparación. En una sartén ancha y profunda, derretir una cucharada de manteca con un chorrito de aceite de oliva y sofreír una cebolla finamente picada hasta que esté transparente.',
        2: 'Incorporar los dados de zapallo a la sartén y cocinar por 5 minutos. Luego, añadir el arroz especial para risotto (carnaroli o arborio) y tostarlo revolviendo constantemente hasta que los granos se vean nacarados en los bordes. Verter medio vaso de vino blanco y revolver hasta que el alcohol se haya evaporado por completo.',
        3: "Comenzar a añadir el caldo caliente de a cucharones, vertiendo uno nuevo solo cuando el anterior haya sido absorbido por el arroz. Revolver de forma suave y continua haciendo un movimiento en forma de ocho. Continuar este proceso por 18 a 20 minutos hasta que el arroz esté al dente y cremoso. Apagar el fuego, añadir un buen trozo de manteca fría, abundante queso parmesano rallado, sal, pimienta negra y revolver enérgicamente para 'mantecar'. Servir de inmediato.",
      },
      imagen: '/assets/recetas-img/risotto-de-zapallo.jpg',
      idDificultad: 3,
      comensales: 4,
      otrosIngredientes: [
        'Caldo de verduras (1 litro)',
        'Manteca',
        'Aceite de oliva',
        'Arroz para risotto (carnaroli o arborio)',
        'Vino blanco (1/2 vaso)',
        'Queso parmesano',
        'Sal',
        'Pimienta negra',
      ],
    },
    {
      id: 15,
      title: 'Ensalada de Quinoa, Calabaza y Granada',
      Pasos: {
        1: 'Comenzaremos precalentando el horno a 220 grados. Cortamos la calabaza pelada en dados y la cebolla morada en láminas y las asamos con un poco de sal y una cucharada de aceite de oliva durante 20 minutos.',
        2: 'Por otra parte lavamos la quinoa y la cocemos en agua hirviendo con sal, durante 10 a 15 minutos. La escurrimos y la dejamos drenar totalmente.',
        3: 'Combinamos el resto de ingredientes en un bol. Añadimos la quinoa, la calabaza asada y la cebolla, y removemos. Sazonamos y servimos con las hierbas picadas por encima.',
      },
      imagen: '/assets/recetas-img/ensalada-quinoa.jpg',
      idDificultad: 1,
      comensales: 4,
      otrosIngredientes: [
        'Aceite de oliva virgen extra (75 ml)',
        'Quinoa (200 g)',
        'Mezcla de semillas (30 g)',
        'Sal',
      ],
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
      direccion: 'Av. Libertador 2021',
    },
    {
      id: 2,
      nombre: 'maria',
      apellido: 'gomez',
      mail: 'maria.gomez@example.com',
      nombreUsuario: 'mariag',
      telefono: '1198765432',
      contrasena: '1234',
      direccion: 'Av. San Martin 1254',
    },
    {
      id: 3,
      nombre: 'carlos',
      apellido: 'lopez',
      mail: 'carlos.lopez@example.com',
      nombreUsuario: 'carlopez',
      telefono: '1145678901',
      contrasena: '1234',
      direccion: 'Brasil 1563',
    },
  ],
  pedidos: [
    {
      nroPedido: 1001,
      estado: 'Entregado',
      idUsuario: 1,
      fecha: '2023-11-01T10:00:00Z',
    },
    {
      nroPedido: 1002,
      estado: 'Preparando',
      idUsuario: 2,
      fecha: '2023-11-02T11:30:00Z',
    },
    {
      nroPedido: 1003,
      estado: 'En Camino',
      idUsuario: 3,
      fecha: '2023-11-02T15:45:00Z',
    },
    {
      nroPedido: 1004,
      estado: 'En Camino',
      idUsuario: 3,
      fecha: '2023-11-02T15:45:00Z',
    },
  ],
  
  pedidoDetalle: [
    {
      idPedido: 1001,
      idProducto: 1,
      cantidad: 2.5,
      precio: 3000,
    },
    {
      idPedido: 1001,
      idProducto: 3,
      cantidad: 1,
      precio: 700,
    },
    {
      idPedido: 1002,
      idProducto: 5,
      cantidad: 2,
      precio: 3000,
    },
    {
      idPedido: 1003,
      idProducto: 14,
      cantidad: 1.5,
      precio: 750,
    },
    {
      idPedido: 1003,
      idProducto: 12,
      cantidad: 1,
      precio: 3500,
    },
  ],
};

const LOCAL_KEYS = {
  usuarios: 'usuarios_extra_tiziana',
  pedidos: 'pedidos_extra_tiziana',
  pedidoDetalle: 'pedido_detalle_extra_tiziana',
};

function readLocalArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalArray(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch {
    // ignore storage errors
  }
}

function mergeWithLocalExtras(fallbackKey, baseList) {
  const safeBase = Array.isArray(baseList) ? baseList : [];

  if (fallbackKey === 'usuarios') {
    const extras = readLocalArray(LOCAL_KEYS.usuarios);
    const seenIds = new Set(safeBase.map((u) => Number(u.id)));
    const seenMails = new Set(
      safeBase.map((u) => String(u.mail || '').toLowerCase())
    );
    const uniqueExtras = extras.filter(
      (u) =>
        !seenIds.has(Number(u.id)) &&
        !seenMails.has(String(u.mail || '').toLowerCase())
    );
    return [...safeBase, ...uniqueExtras];
  }

  if (fallbackKey === 'pedidos') {
    const extras = readLocalArray(LOCAL_KEYS.pedidos);
    const seenNros = new Set(safeBase.map((p) => Number(p.nroPedido)));
    const uniqueExtras = extras.filter(
      (p) => !seenNros.has(Number(p.nroPedido))
    );
    return [...safeBase, ...uniqueExtras];
  }

  if (fallbackKey === 'pedidoDetalle') {
    const extras = readLocalArray(LOCAL_KEYS.pedidoDetalle);
    const seenKeys = new Set(
      safeBase.map(
        (d) => `${d.idPedido}-${d.idProducto}-${d.unidad || 'kg'}-${d.cantidad}`
      )
    );
    const uniqueExtras = extras.filter(
      (d) =>
        !seenKeys.has(
          `${d.idPedido}-${d.idProducto}-${d.unidad || 'kg'}-${d.cantidad}`
        )
    );
    return [...safeBase, ...uniqueExtras];
  }

  return safeBase;
}

export async function fetchWithFallback(endpoint, fallbackKey) {
  let baseData;
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error('API no disponible');
    baseData = await response.json();
  } catch {
    baseData = fallbackData[fallbackKey];
  }
  return mergeWithLocalExtras(fallbackKey, baseData);
}

export async function registrarUsuario({
  nombre,
  apellido,
  mail,
  telefono,
  direccion,
  contrasena,
}) {
  const usuariosActuales = await fetchWithFallback('/usuarios', 'usuarios');
  const cleanMail = String(mail || '').trim().toLowerCase();

  const existe = usuariosActuales.some(
    (u) => String(u.mail || '').toLowerCase() === cleanMail
  );
  if (existe) {
    throw new Error('Ya existe una cuenta registrada con ese email.');
  }

  const maxId = usuariosActuales.reduce(
    (max, u) => Math.max(max, Number(u.id) || 0),
    0
  );
  const nuevoUsuario = {
    id: maxId + 1,
    nombre: String(nombre || '').trim(),
    apellido: String(apellido || '').trim(),
    mail: cleanMail,
    nombreUsuario: cleanMail.split('@')[0],
    telefono: String(telefono || '').trim(),
    direccion: String(direccion || '').trim(),
    contrasena: String(contrasena || ''),
  };

  try {
    await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });
  } catch {
    // fallback local
  }

  const extras = readLocalArray(LOCAL_KEYS.usuarios);
  writeLocalArray(LOCAL_KEYS.usuarios, [...extras, nuevoUsuario]);

  return nuevoUsuario;
}

export async function crearPedidoDesdeCarrito({
  usuarioId,
  cartItems,
  metodoPago,
  tipoEntrega,
  direccion,
  notas,
}) {
  const pedidosActuales = await fetchWithFallback('/pedidos', 'pedidos');
  const maxNro = pedidosActuales.reduce(
    (max, p) => Math.max(max, Number(p.nroPedido) || 1000),
    1000
  );
  const nroPedido = maxNro + 1;

  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const ahorroTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.savedAmount) || 0),
    0
  );

  const nuevoPedido = {
    nroPedido,
    estado: 'Preparando',
    idUsuario: Number(usuarioId),
    fecha: new Date().toISOString(),
    metodoPago: metodoPago || 'Mercado Pago',
    tipoEntrega:
      tipoEntrega === 'retiro' ? 'Retiro en local' : 'Envío a domicilio',
    direccion:
      tipoEntrega === 'retiro'
        ? 'Retiro en local — Av. Perez Galdos 8360'
        : String(direccion || '').trim(),
    notas: String(notas || '').trim(),
    total,
    ahorroTotal,
  };

  const nuevosDetalles = cartItems.map((item) => {
    const qty = Number(item.cantidadEscalada) || 1;
    const lineTotal = Number(item.price) || 0;
    return {
      idPedido: nroPedido,
      idProducto: Number(item.idProducto),
      nombre: item.nombre,
      imagen: item.imagen,
      cantidad: qty,
      unidad: item.unidad || 'kg',
      displayQty:
        item.displayQty || formatCartDisplayQty(qty, item.unidad || 'kg'),
      precio: qty > 0 ? Number((lineTotal / qty).toFixed(4)) : lineTotal,
      subtotal: lineTotal,
    };
  });

  try {
    await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido),
    });
    await Promise.all(
      nuevosDetalles.map((det) =>
        fetch(`${API_URL}/pedidoDetalle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(det),
        })
      )
    );
  } catch {
    // fallback local
  }

  const pedidosExtra = readLocalArray(LOCAL_KEYS.pedidos);
  writeLocalArray(LOCAL_KEYS.pedidos, [nuevoPedido, ...pedidosExtra]);

  const detallesExtra = readLocalArray(LOCAL_KEYS.pedidoDetalle);
  writeLocalArray(LOCAL_KEYS.pedidoDetalle, [
    ...nuevosDetalles,
    ...detallesExtra,
  ]);

  return { pedido: nuevoPedido, detalles: nuevosDetalles };
}

export const PRODUCT_UNIT_CONFIG = {
  1: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 180 }, // Tomate Perita
  2: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 200 }, // Papa Negra
  3: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 160 }, // Cebolla
  4: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 140 }, // Zanahoria
  5: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 180 }, // Manzana Roja
  6: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 160 }, // Banana
  7: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 120 }, // Limón
  8: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 220 }, // Morrón Rojo
  9: { unidadesDisponibles: ['unidad', 'gramos'], unidadDefault: 'unidad', pesoUnidadGramos: 70 }, // Ajo (cabeza ~70g)
  10: { unidadesDisponibles: ['planta', 'kg', 'gramos'], unidadDefault: 'planta', pesoUnidadGramos: 400 }, // Lechuga Capuchina
  11: { unidadesDisponibles: ['unidad', 'kg', 'gramos'], unidadDefault: 'unidad', pesoUnidadGramos: 220 }, // Palta Hass
  12: { unidadesDisponibles: ['kg', 'gramos'], unidadDefault: 'kg' }, // Frutilla
  13: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 180 }, // Naranja Jugo
  14: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 900 }, // Zapallo Anco
  15: { unidadesDisponibles: ['kg', 'gramos'], unidadDefault: 'kg' }, // Uva Negra
  16: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 250 }, // Berenjena
  17: { unidadesDisponibles: ['gramos', 'kg'], unidadDefault: 'gramos' }, // Jengibre
  18: { unidadesDisponibles: ['atado'], unidadDefault: 'atado', esPrecioDirectoUnidad: true }, // Albahaca
  19: { unidadesDisponibles: ['atado'], unidadDefault: 'atado', esPrecioDirectoUnidad: true }, // Cilantro
  20: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 250 }, // Calabacín
  21: { unidadesDisponibles: ['atado'], unidadDefault: 'atado', esPrecioDirectoUnidad: true }, // Espinaca
  22: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 250 }, // Pepino
  23: { unidadesDisponibles: ['planta'], unidadDefault: 'planta', esPrecioDirectoUnidad: true }, // Apio
  24: { unidadesDisponibles: ['kg', 'gramos', 'unidad'], unidadDefault: 'kg', pesoUnidadGramos: 100 }, // Kiwi
  25: { unidadesDisponibles: ['unidad'], unidadDefault: 'unidad', esPrecioDirectoUnidad: true }, // Ananá entero
  26: { unidadesDisponibles: ['atado'], unidadDefault: 'atado', esPrecioDirectoUnidad: true }, // Menta
  27: { unidadesDisponibles: ['unidad', 'kg', 'gramos'], unidadDefault: 'unidad', pesoUnidadGramos: 280 }, // Granada
};

export function getProductUnitMeta(productOrId) {
  const id =
    typeof productOrId === 'object' && productOrId !== null
      ? Number(productOrId.id ?? productOrId.idProducto)
      : Number(productOrId);

  const configured = PRODUCT_UNIT_CONFIG[id];
  if (configured) {
    return {
      unidadesDisponibles: configured.unidadesDisponibles,
      unidadDefault: configured.unidadDefault,
      pesoUnidadGramos: configured.pesoUnidadGramos || null,
      esPrecioDirectoUnidad: Boolean(configured.esPrecioDirectoUnidad),
    };
  }

  return {
    unidadesDisponibles: ['kg', 'gramos', 'unidad'],
    unidadDefault: 'kg',
    pesoUnidadGramos: 180,
    esPrecioDirectoUnidad: false,
  };
}

export function getUnitShortLabel(unidad = 'kg') {
  const norm = normalizeCartUnit(unidad);
  if (norm === 'kg') return 'kg';
  if (norm === 'gramos') return 'g';
  if (norm === 'unidad') return 'unid.';
  if (norm === 'atado') return 'atado';
  if (norm === 'planta') return 'planta';
  if (norm === 'dientes') return 'dientes';
  if (norm === 'ml') return 'ml';
  return norm;
}

export function getDefaultQtyForUnit(unidad = 'kg', idProducto = null) {
  const norm = normalizeCartUnit(unidad);
  if (norm === 'kg') return 0.5;
  if (norm === 'gramos') {
    return Number(idProducto) === 17 || Number(idProducto) === 9 ? 100 : 250;
  }
  if (norm === 'ml') return 50;
  return 1;
}

export function getDisplayPriceForUnit(product, unidad, discountPct = 0) {
  const meta = getProductUnitMeta(product);
  const normUnit = normalizeCartUnit(unidad || meta.unidadDefault);
  const precioBase = Number(product?.precioPorPeso) || 0;
  const factor = 1 - (Number(discountPct) || 0) / 100;

  if (meta.esPrecioDirectoUnidad) {
    const suffixMap = {
      atado: '/atado',
      planta: '/planta',
      unidad: '/unid.',
    };
    return {
      original: Math.round(precioBase),
      actual: Math.round(precioBase * factor),
      unitSuffix: suffixMap[normUnit] || `/${normUnit}`,
      weightHint: null,
    };
  }

  if (normUnit === 'gramos') {
    const raw100g = precioBase * 0.1;
    return {
      original: Math.round(raw100g),
      actual: Math.round(raw100g * factor),
      unitSuffix: '/100g',
      weightHint: null,
    };
  }

  if (normUnit === 'unidad' || normUnit === 'planta') {
    const grams = meta.pesoUnidadGramos || 180;
    const rawPerUnit = (grams / 1000) * precioBase;
    return {
      original: Math.round(rawPerUnit),
      actual: Math.round(rawPerUnit * factor),
      unitSuffix: normUnit === 'planta' ? '/planta' : '/unid.',
      weightHint: `~${grams}g c/u`,
    };
  }

  return {
    original: Math.round(precioBase),
    actual: Math.round(precioBase * factor),
    unitSuffix: '/kg',
    weightHint: null,
  };
}

export function normalizeCartUnit(unidad = 'kg') {
  const u = String(unidad || 'kg').trim().toLowerCase();
  if (u === 'unidades' || u === 'unidad' || u === 'unid.' || u === 'u') return 'unidad';
  if (u === 'atados' || u === 'atado') return 'atado';
  if (u === 'plantas' || u === 'planta') return 'planta';
  if (u === 'diente' || u === 'dientes') return 'dientes';
  if (u === 'kilo' || u === 'kilos' || u === 'kg') return 'kg';
  if (u === 'g' || u === 'gr' || u === 'gramo' || u === 'gramos') return 'gramos';
  return u;
}

export function formatCartDisplayQty(qty, unidad = 'kg') {
  const normUnit = normalizeCartUnit(unidad);
  const rounded = Number.isInteger(qty) ? qty : Number(Number(qty).toFixed(2));

  if (normUnit === 'gramos' && rounded >= 1000) {
    const inKg = rounded / 1000;
    return `${Number.isInteger(inKg) ? inKg : Number(inKg.toFixed(2))} kg`;
  }
  if (normUnit === 'unidad') {
    return `${rounded} ${rounded === 1 ? 'unidad' : 'unidades'}`;
  }
  if (normUnit === 'atado') {
    return `${rounded} ${rounded === 1 ? 'atado' : 'atados'}`;
  }
  if (normUnit === 'planta') {
    return `${rounded} ${rounded === 1 ? 'planta' : 'plantas'}`;
  }
  if (normUnit === 'dientes') {
    return `${rounded} ${rounded === 1 ? 'diente' : 'dientes'}`;
  }
  return `${rounded} ${normUnit}`;
}

export function getApproxWeightLabel(qty, unidad, idProducto) {
  const meta = getProductUnitMeta(idProducto);
  if (meta.esPrecioDirectoUnidad) return null;
  const normUnit = normalizeCartUnit(unidad);

  let grams = null;
  if ((normUnit === 'unidad' || normUnit === 'planta') && meta.pesoUnidadGramos) {
    grams = qty * meta.pesoUnidadGramos;
  } else if (normUnit === 'dientes') {
    grams = qty * 7;
  }

  if (!grams || grams <= 0) return null;
  if (grams >= 1000) {
    const kg = Number((grams / 1000).toFixed(2));
    return `≈ ${kg} kg`;
  }
  return `≈ ${Math.round(grams)} g`;
}

export function getCartStepForUnit(unidad = 'kg', currentQty = 1) {
  const norm = normalizeCartUnit(unidad);
  if (norm === 'kg') return 0.5;
  if (norm === 'gramos') return currentQty <= 100 ? 50 : 100;
  if (norm === 'ml') return 10;
  return 1;
}

function quantityToGrams(qty, unidad, meta) {
  if (meta?.esPrecioDirectoUnidad) return null;
  const norm = normalizeCartUnit(unidad);
  const clean = Number(qty) || 0;
  if (norm === 'kg') return clean * 1000;
  if (norm === 'gramos') return clean;
  if ((norm === 'unidad' || norm === 'planta') && meta?.pesoUnidadGramos) {
    return clean * meta.pesoUnidadGramos;
  }
  if (norm === 'dientes') return clean * 7;
  if (norm === 'ml') return clean * 2;
  return null;
}

function gramsToQuantity(grams, targetUnit, meta) {
  const norm = normalizeCartUnit(targetUnit);
  if (norm === 'kg') {
    return Math.max(0.1, Number((grams / 1000).toFixed(2)));
  }
  if (norm === 'gramos') {
    return Math.max(20, Math.round(grams / 10) * 10);
  }
  if (norm === 'unidad' || norm === 'planta') {
    const perUnit = meta?.pesoUnidadGramos || 180;
    return Math.max(1, Math.round(grams / perUnit));
  }
  if (norm === 'dientes') {
    return Math.max(1, Math.round(grams / 7));
  }
  if (norm === 'ml') {
    return Math.max(10, Math.round(grams / 2));
  }
  return Math.max(1, Math.round(grams));
}

export function buildCartItem({
  idProducto,
  nombre,
  imagen,
  categoria,
  cantidad,
  unidad = 'kg',
  precioPorPeso,
  discountPct,
  productos = fallbackData.productos,
  ofertas = fallbackData.Oferta,
}) {
  const prod =
    (productos || []).find((p) => Number(p.id) === Number(idProducto)) ||
    fallbackData.productos.find((p) => Number(p.id) === Number(idProducto));
  const meta = getProductUnitMeta(idProducto);

  let normUnit = normalizeCartUnit(unidad);
  let cleanQty = Number(Number(cantidad).toFixed(2));

  if (
    normUnit === 'unidad' ||
    normUnit === 'atado' ||
    normUnit === 'planta' ||
    normUnit === 'dientes'
  ) {
    cleanQty = Math.max(1, Math.round(cleanQty));
  } else if (normUnit === 'gramos' && cleanQty >= 1000) {
    normUnit = 'kg';
    cleanQty = Number((cleanQty / 1000).toFixed(2));
  }

  const basePrecioPeso =
    precioPorPeso !== undefined
      ? Number(precioPorPeso)
      : Number(prod?.precioPorPeso || 0);

  const offerMap = buildActiveOfferMap(ofertas);
  const resolvedDiscount =
    discountPct !== undefined
      ? Number(discountPct)
      : offerMap[Number(idProducto)] || 0;

  const rawOriginal = calculateIngredientPrice(
    cleanQty,
    normUnit,
    basePrecioPeso,
    1,
    idProducto
  );
  const originalPrice = Math.round(rawOriginal);
  const hasOffer = resolvedDiscount > 0;
  const price = hasOffer
    ? Math.round(rawOriginal * (1 - resolvedDiscount / 100))
    : originalPrice;

  const unidadesParaItem = meta.unidadesDisponibles.includes(normUnit)
    ? meta.unidadesDisponibles
    : [normUnit, ...meta.unidadesDisponibles];

  return {
    cartKey: `${idProducto}-${normUnit}`,
    idProducto: Number(idProducto),
    nombre: nombre || prod?.nombre || 'Producto',
    categoria: categoria || prod?.categoria || '',
    imagen:
      imagen || prod?.imagen || '/assets/productos-img/generico-verduras.png',
    cantidadEscalada: cleanQty,
    unidad: normUnit,
    displayQty: formatCartDisplayQty(cleanQty, normUnit),
    approxWeightLabel: getApproxWeightLabel(cleanQty, normUnit, idProducto),
    unidadesDisponibles: unidadesParaItem,
    precioPorPeso: basePrecioPeso,
    discountPct: resolvedDiscount,
    hasOffer,
    originalPrice,
    price,
    savedAmount: Math.max(0, originalPrice - price),
  };
}

export function mergeIntoCart(
  prevItems = [],
  incomingRaw,
  productos = fallbackData.productos,
  ofertas = fallbackData.Oferta
) {
  const incoming = buildCartItem({
    idProducto: incomingRaw.idProducto,
    nombre: incomingRaw.nombre,
    imagen: incomingRaw.imagen,
    categoria: incomingRaw.categoria,
    cantidad: incomingRaw.cantidadEscalada ?? incomingRaw.cantidad ?? 1,
    unidad: incomingRaw.unidad || 'kg',
    precioPorPeso: incomingRaw.precioPorPeso,
    discountPct: incomingRaw.discountPct,
    productos,
    ofertas,
  });

  if (!incoming.cantidadEscalada || incoming.cantidadEscalada <= 0) {
    return prevItems;
  }

  const meta = getProductUnitMeta(incoming.idProducto);
  const incomingGrams = quantityToGrams(
    incoming.cantidadEscalada,
    incoming.unidad,
    meta
  );

  const updated = [...prevItems];

  const existingIndex = updated.findIndex((c) => {
    if (Number(c.idProducto) !== Number(incoming.idProducto)) return false;
    const existingNorm = normalizeCartUnit(c.unidad);
    if (existingNorm === incoming.unidad) return true;
    const existingGrams = quantityToGrams(
      c.cantidadEscalada,
      existingNorm,
      meta
    );
    return incomingGrams !== null && existingGrams !== null;
  });

  if (existingIndex >= 0) {
    const existing = updated[existingIndex];
    const existingNorm = normalizeCartUnit(existing.unidad);

    let targetUnit = existingNorm;
    let combinedQty =
      Number(existing.cantidadEscalada) + incoming.cantidadEscalada;

    if (existingNorm === incoming.unidad) {
      if (targetUnit === 'gramos' && combinedQty >= 1000) {
        targetUnit = 'kg';
        combinedQty = Number((combinedQty / 1000).toFixed(2));
      } else {
        combinedQty = Number(combinedQty.toFixed(2));
      }
    } else {
      const existingGrams =
        quantityToGrams(existing.cantidadEscalada, existingNorm, meta) || 0;
      const totalGrams = existingGrams + (incomingGrams || 0);

      if (incoming.unidad === 'unidad' || incoming.unidad === 'planta') {
        targetUnit = incoming.unidad;
        combinedQty = gramsToQuantity(totalGrams, targetUnit, meta);
      } else if (totalGrams >= 1000 || incoming.unidad === 'kg' || existingNorm === 'kg') {
        targetUnit = 'kg';
        combinedQty = Number((totalGrams / 1000).toFixed(2));
      } else {
        targetUnit = 'gramos';
        combinedQty = Math.round(totalGrams);
      }
    }

    updated[existingIndex] = buildCartItem({
      idProducto: existing.idProducto,
      nombre: existing.nombre || incoming.nombre,
      imagen: existing.imagen || incoming.imagen,
      categoria: existing.categoria || incoming.categoria,
      cantidad: combinedQty,
      unidad: targetUnit,
      precioPorPeso: existing.precioPorPeso ?? incoming.precioPorPeso,
      discountPct: Math.max(
        Number(existing.discountPct || 0),
        Number(incoming.discountPct || 0)
      ),
      productos,
      ofertas,
    });
  } else {
    updated.push(incoming);
  }

  return updated;
}

export function updateCartItemQuantity(
  prevItems = [],
  idProducto,
  unidad,
  newQty,
  productos = fallbackData.productos,
  ofertas = fallbackData.Oferta
) {
  const normTarget = normalizeCartUnit(unidad);
  const cleanQty = Number(Number(newQty).toFixed(2));

  if (!cleanQty || cleanQty <= 0) {
    return prevItems.filter(
      (item) =>
        !(
          Number(item.idProducto) === Number(idProducto) &&
          normalizeCartUnit(item.unidad) === normTarget
        )
    );
  }

  return prevItems.map((item) => {
    if (
      Number(item.idProducto) === Number(idProducto) &&
      normalizeCartUnit(item.unidad) === normTarget
    ) {
      let targetUnit = normTarget;
      let targetQty = cleanQty;
      if (targetUnit === 'gramos' && targetQty >= 1000) {
        targetUnit = 'kg';
        targetQty = Number((targetQty / 1000).toFixed(2));
      }
      return buildCartItem({
        idProducto: item.idProducto,
        nombre: item.nombre,
        imagen: item.imagen,
        categoria: item.categoria,
        cantidad: targetQty,
        unidad: targetUnit,
        precioPorPeso: item.precioPorPeso,
        discountPct: item.discountPct,
        productos,
        ofertas,
      });
    }
    return item;
  });
}

export function convertCartItemUnit(
  prevItems = [],
  idProducto,
  fromUnidad,
  toUnidad,
  productos = fallbackData.productos,
  ofertas = fallbackData.Oferta
) {
  const normFrom = normalizeCartUnit(fromUnidad);
  const normTo = normalizeCartUnit(toUnidad);
  if (normFrom === normTo) return prevItems;

  const meta = getProductUnitMeta(idProducto);
  const targetIdx = prevItems.findIndex(
    (item) =>
      Number(item.idProducto) === Number(idProducto) &&
      normalizeCartUnit(item.unidad) === normFrom
  );
  if (targetIdx < 0) return prevItems;

  const currentItem = prevItems[targetIdx];
  const grams = quantityToGrams(currentItem.cantidadEscalada, normFrom, meta);
  const convertedQty =
    grams !== null
      ? gramsToQuantity(grams, normTo, meta)
      : getDefaultQtyForUnit(normTo, idProducto);

  const withoutCurrent = prevItems.filter((_, idx) => idx !== targetIdx);
  return mergeIntoCart(
    withoutCurrent,
    {
      ...currentItem,
      cantidadEscalada: convertedQty,
      unidad: normTo,
    },
    productos,
    ofertas
  );
}

export function formatScaledIngredient(baseQty, unidad, scaleFactor) {
  const scaled = baseQty * scaleFactor;
  const normUnit = normalizeCartUnit(unidad);

  if (
    normUnit === 'unidad' ||
    normUnit === 'atado' ||
    normUnit === 'planta' ||
    normUnit === 'dientes'
  ) {
    const whole = Math.max(1, Math.round(scaled));
    return formatCartDisplayQty(whole, normUnit);
  }

  return formatCartDisplayQty(scaled, normUnit);
}

export function calculateIngredientPrice(
  baseQty,
  unidad,
  precioPorPeso,
  scaleFactor = 1,
  idProducto = null
) {
  const meta = idProducto ? getProductUnitMeta(idProducto) : null;
  const scaledRaw = baseQty * scaleFactor;
  const normUnit = normalizeCartUnit(unidad);

  if (meta?.esPrecioDirectoUnidad) {
    const whole =
      normUnit === 'unidad' || normUnit === 'atado' || normUnit === 'planta'
        ? Math.max(1, Math.round(scaledRaw))
        : scaledRaw;
    return whole * precioPorPeso;
  }

  if (normUnit === 'gramos') {
    return (scaledRaw / 1000) * precioPorPeso;
  }
  if (normUnit === 'kg') {
    return scaledRaw * precioPorPeso;
  }
  if (normUnit === 'unidad' || normUnit === 'planta') {
    const whole = Math.max(1, Math.round(scaledRaw));
    const gramsPerUnit = meta?.pesoUnidadGramos || 180;
    return ((whole * gramsPerUnit) / 1000) * precioPorPeso;
  }
  if (normUnit === 'dientes') {
    const whole = Math.max(1, Math.round(scaledRaw));
    return ((whole * 7) / 1000) * precioPorPeso;
  }
  if (normUnit === 'ml') {
    return ((scaledRaw * 2) / 1000) * precioPorPeso;
  }
  return scaledRaw * precioPorPeso;
}

export function buildActiveOfferMap(ofertas = []) {
  const map = {};
  (ofertas || []).forEach((o) => {
    if (o && o.Estado === 'Activa' && Number(o.Porcentaje) > 0) {
      map[Number(o.IdProducto)] = Number(o.Porcentaje);
    }
  });
  return map;
}

export function getRecipeIngredientsWithOffers(
  recetaId,
  ingredientes = [],
  productos = [],
  ofertas = [],
  scaleFactor = 1
) {
  const offerMap = buildActiveOfferMap(ofertas);

  return (ingredientes || [])
    .filter((ing) => Number(ing.idReceta) === Number(recetaId))
    .map((ing) => {
      const prod = (productos || []).find(
        (p) => Number(p.id) === Number(ing.idProducto)
      );
      if (!prod) return null;

      const normUnit = normalizeCartUnit(ing.unidad);
      const isWholeUnit =
        normUnit === 'unidad' ||
        normUnit === 'atado' ||
        normUnit === 'planta' ||
        normUnit === 'dientes';
      const cantidadEscalada = isWholeUnit
        ? Math.max(1, Math.round(ing.cantidad * scaleFactor))
        : Number((ing.cantidad * scaleFactor).toFixed(2));

      const rawOriginal = calculateIngredientPrice(
        ing.cantidad,
        ing.unidad,
        prod.precioPorPeso,
        scaleFactor,
        prod.id
      );
      const originalPrice = Math.round(rawOriginal);
      const discountPct = offerMap[Number(prod.id)] || 0;
      const hasOffer = discountPct > 0;
      const price = hasOffer
        ? Math.round(rawOriginal * (1 - discountPct / 100))
        : originalPrice;

      const approxWeight = getApproxWeightLabel(
        cantidadEscalada,
        normUnit,
        prod.id
      );
      const baseDisplayQty = formatScaledIngredient(
        ing.cantidad,
        ing.unidad,
        scaleFactor
      );
      const displayQty = approxWeight
        ? `${baseDisplayQty} (${approxWeight})`
        : baseDisplayQty;

      return {
        idProducto: prod.id,
        nombre: prod.nombre,
        categoria: prod.categoria,
        imagen: prod.imagen,
        cantidadEscalada,
        unidad: normUnit,
        displayQty,
        approxWeightLabel: approxWeight,
        originalPrice,
        price,
        discountPct,
        hasOffer,
        savedAmount: Math.max(0, originalPrice - price),
      };
    })
    .filter(Boolean);
}

export function getRecipeOfferInfo(
  recetaId,
  ingredientes = [],
  productos = [],
  ofertas = []
) {
  const items = getRecipeIngredientsWithOffers(
    recetaId,
    ingredientes,
    productos,
    ofertas,
    1
  );

  const discountedItems = items.filter((i) => i.hasOffer);
  if (discountedItems.length === 0) {
    return {
      hasOffer: false,
      maxDiscountPct: 0,
      avgDiscountPct: 0,
      totalOriginal: items.reduce((a, b) => a + b.originalPrice, 0),
      totalDiscounted: items.reduce((a, b) => a + b.price, 0),
      totalSaved: 0,
      discountedItems: [],
      badgeText: '',
      detailText: '',
    };
  }

  const maxDiscountPct = Math.max(
    ...discountedItems.map((i) => i.discountPct)
  );
  const totalOriginal = items.reduce((a, b) => a + b.originalPrice, 0);
  const totalDiscounted = items.reduce((a, b) => a + b.price, 0);
  const totalSaved = Math.max(0, totalOriginal - totalDiscounted);
  const avgDiscountPct =
    totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : maxDiscountPct;

  const hasVerduras = discountedItems.some(
    (i) => (i.categoria || '').toLowerCase() === 'verduras'
  );
  const tipoLabel = hasVerduras ? 'verduras' : 'frutas';

  const displayPct = maxDiscountPct;
  const badgeText = `🔥 Ahorrá hasta ${displayPct}%`;
  const detailText = discountedItems
    .map((i) => `${i.nombre} (-${i.discountPct}%)`)
    .join(', ');

  return {
    hasOffer: true,
    maxDiscountPct,
    avgDiscountPct,
    totalOriginal,
    totalDiscounted,
    totalSaved,
    discountedItems,
    tipoLabel,
    badgeText,
    detailText,
  };
}

export async function patchWithFallback(endpoint, fallbackKey, id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}${endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) throw new Error('API no disponible');
    return await response.json();
  } catch {
   
    const lista = fallbackData[fallbackKey];
    const index = lista.findIndex((item) => Number(item.id) === Number(id));

    if (index === -1) {
      throw new Error('Usuario no encontrado en mockData');
    }

    lista[index] = {
      ...lista[index],
      ...datosActualizados,
    };

    return lista[index];
  }
}