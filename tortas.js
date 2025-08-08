// === DATOS COMPLETOS DE TODAS LAS TORTAS ===
const tortasData = [
  {
    nombre: "Merengue Lúcuma",
    ingredientes: ["Merengue horneado", "chantilly", "lúcuma"],
    precios: { "10p": 24900, "15p": 34900, "20p": 39900, "30p": 49900 }
  },
  {
    nombre: "Red Velvet",
    ingredientes: ["Bizcocho red velvet", "frosting queso crema", "chantilly"],
    precios: { "10p": 27900, "15p": 38900, "20p": 45900, "30p": 52900 }
  },
  {
    nombre: "Vainilla Maracuyá",
    ingredientes: ["Bizcocho vainilla", "cremoso maracuyá", "chantilly", "maracuyá"],
    precios: { "10p": 26900, "15p": 37900, "20p": 44900, "30p": 51900 }
  },
  {
    nombre: "Chocolate Maracuyá",
    ingredientes: ["Bizcocho chocolate", "cremoso maracuyá", "ganache", "maracuyá"],
    precios: { "10p": 28900, "15p": 39900, "20p": 48900, "30p": 52900 }
  },
  {
    nombre: "Moka",
    ingredientes: ["Bizcocho chocolate", "muselina choc/café", "muselina vainilla", "chantilly choc"],
    precios: { "10p": 26900, "15p": 37900, "20p": 43900, "30p": 50900 }
  },
  {
    nombre: "Chocolate Naranja",
    ingredientes: ["Bizcocho chocolate", "ganache", "crema naranja", "chantilly choc", "naranjas confitadas"],
    precios: { "10p": 25900, "15p": 35900, "20p": 43900, "30p": 50900 }
  },
  {
    nombre: "Piña Colada",
    ingredientes: ["Bizcocho vainilla", "chantilly", "piña", "coco", "ron"],
    precios: { "10p": 24900, "15p": 34900, "20p": 42900, "30p": 49900 }
  },
  {
    nombre: "Piña Clásica",
    ingredientes: ["Bizcocho vainilla", "chantilly", "piña"],
    precios: { "10p": 22900, "15p": 31900, "20p": 39900, "30p": 48900 }
  },
  {
    nombre: "Oreo",
    ingredientes: ["Bizcocho chocolate", "ganache", "crema Oreo"],
    precios: { "10p": 27900, "15p": 39900, "20p": 46900, "30p": 54900 }
  },
  {
    nombre: "Amor",
    ingredientes: ["Bizcocho vainilla", "crema pastelera", "frambuesas", "manjar", "merengue", "suspiros", "frambuesas liofilizadas"],
    precios: { "10p": 26900, "15p": 36900, "20p": 43900, "30p": 53900 }
  },
  {
    nombre: "4 Leches",
    ingredientes: ["Bizcocho chocolate", "chantilly choc", "tres leches", "merengue", "chips choc"],
    precios: { "10p": 24900, "15p": 35900, "20p": 42900, "30p": 50900 }
  },
  {
    nombre: "Bariloche",
    ingredientes: ["Bizcocho chocolate", "buttercream manjar", "crema Bariloche", "placas choc"],
    precios: { "10p": 24900, "15p": 35900, "20p": 42900, "30p": 51900 }
  },
  {
    nombre: "Baileys",
    ingredientes: ["Bizcocho chocolate", "ganache Baileys", "placas choc", "trufas", "nueces"],
    precios: { "10p": 26900, "15p": 38900, "20p": 47900, "30p": 53900 }
  },
  {
    nombre: "Merengue Frambuesas (helada)",
    ingredientes: ["Merengue horneado", "crema leche y frambuesa"],
    precios: { "10p": 23900, "15p": 33900, "20p": 39900, "30p": 49900 }
  },
  {
    nombre: "Tres Leches",
    ingredientes: ["Bizcocho vainilla", "manjar", "tres leches", "merengue"],
    precios: { "10p": 23900, "15p": 34900, "20p": 40900, "30p": 49900 }
  }
];

// === TORTAS DESTACADAS (6 iniciales) ===
const tortasDestacadas = [
  "Merengue Lúcuma",
  "Red Velvet",
  "Vainilla Maracuyá",
];

// === SANITIZACIÓN ===
function sanitizeText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.textContent;
}

// === GENERAR OPCIONES DE INGREDIENTES ÚNICOS ===
function generarOpcionesIngredientes() {
  const select = document.getElementById('filtro-ingrediente');
  const todosIngredientes = new Set();

  tortasData.forEach(torta => {
    torta.ingredientes.forEach(ing => {
      const limpio = ing.trim().toLowerCase();
      todosIngredientes.add(limpio);
    });
  });

  // Guardar opciones por defecto
  const defaultOptions = Array.from(select.querySelectorAll('option'))
    .filter(opt => opt.value === '' || opt.value === 'todas');

  // Limpiar todas las opciones
  select.innerHTML = '';

  // Volver a agregar las por defecto
  defaultOptions.forEach(opt => select.appendChild(opt));

  // Agregar ingredientes ordenados
  Array.from(todosIngredientes)
    .sort()
    .forEach(ing => {
      const option = document.createElement('option');
      option.value = ing;
      option.textContent = ing.charAt(0).toUpperCase() + ing.slice(1);
      select.appendChild(option);
    });
}

// === FILTRAR POR INGREDIENTE ===
function aplicarFiltroIngrediente() {
  const filtro = document.getElementById('filtro-ingrediente').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.torta-card');

  cards.forEach(card => {
    const nombreTorta = card.querySelector('h3').textContent.trim();
    const ingredientes = card.dataset.ingredientes;

    let visible = false;

    if (filtro === 'todas') {
      visible = true; // Mostrar todas
    } else if (!filtro) {
      visible = tortasDestacadas.includes(nombreTorta); // Solo destacadas
    } else {
      visible = ingredientes.includes(filtro); // Por ingrediente
    }

    card.style.display = visible ? 'block' : 'none';
  });
}

// === LIMPIAR FILTRO ===
function limpiarFiltro() {
  const select = document.getElementById('filtro-ingrediente');
  select.value = '';
  aplicarFiltroIngrediente();
}

// === GENERAR CARDS ===
function generarCards() {
  const contenedor = document.getElementById('tortas-grid');
  contenedor.innerHTML = '';

  tortasData.forEach(torta => {
    const nombreSeguro = sanitizeText(torta.nombre);
    const ingredientesSeguros = torta.ingredientes.map(ing => sanitizeText(ing));
    const precios = Object.keys(torta.precios);
    const defaultSize = precios[0];
    const defaultPrice = torta.precios[defaultSize];

    const card = document.createElement('div');
    card.className = 'torta-card';
    card.dataset.ingredientes = torta.ingredientes.map(ing => ing.toLowerCase()).join(',');

    // Imagen
    const img = document.createElement('img');
    const nombreArchivo = torta.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    img.src = `img/tortas/${nombreArchivo}.png`;
    img.alt = nombreSeguro;
    img.className = 'torta-img';
    img.onerror = () => { this.src = 'img/tortas/placeholder.svg'; };
    card.prepend(img);

    // Título
    const titulo = document.createElement('h3');
    titulo.textContent = nombreSeguro;
    card.appendChild(titulo);

    // Botón "Ver detalles"
    const btnMas = document.createElement('button');
    btnMas.className = 'btn-mas';
    btnMas.textContent = 'Ver detalles';
    card.appendChild(btnMas);

    // Contenido oculto
    const contenido = document.createElement('div');
    contenido.className = 'contenido-torta oculto';
    card.appendChild(contenido);

    // Ingredientes
    const pIngredientes = document.createElement('p');
    pIngredientes.className = 'ingredientes';
    pIngredientes.textContent = ingredientesSeguros.join(' • ');
    contenido.appendChild(pIngredientes);

    // Selector de porciones
    const divSelector = document.createElement('div');
    divSelector.className = 'selector';
    const label = document.createElement('label');
    label.textContent = 'Porciones:';
    divSelector.appendChild(label);
    const select = document.createElement('select');
    select.className = 'porciones-select';
    select.addEventListener('change', () => actualizarPrecio(select));
    precios.forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.dataset.precio = torta.precios[size];
      option.textContent = size;
      if (size === defaultSize) option.selected = true;
      select.appendChild(option);
    });
    divSelector.appendChild(select);
    contenido.appendChild(divSelector);

    // Precio
    const divPrecio = document.createElement('div');
    divPrecio.className = 'precio';
    const spanPrecio = document.createElement('span');
    spanPrecio.className = 'precio-valor';
    spanPrecio.textContent = defaultPrice.toLocaleString('es-CL');
    divPrecio.appendChild(document.createTextNode('Precio: $'));
    divPrecio.appendChild(spanPrecio);
    contenido.appendChild(divPrecio);

    // Botón Reservar
    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn-reservar';
    btnReservar.textContent = 'Reservar';
    btnReservar.addEventListener('click', () => reservarTorta(nombreSeguro, select));
    contenido.appendChild(btnReservar);

    // Evento del botón "Ver detalles"
    btnMas.addEventListener('click', function () {
      contenido.classList.toggle('oculto');
      btnMas.textContent = contenido.classList.contains('oculto') 
        ? 'Ver detalles' 
        : 'Ocultar';
    });

    contenedor.appendChild(card);
  });
}

// === ACTUALIZAR PRECIO ===
function actualizarPrecio(select) {
  const card = select.closest('.torta-card');
  const priceSpan = card.querySelector('.precio-valor');
  const precio = select.selectedOptions[0].dataset.precio;
  if (priceSpan && precio) {
    priceSpan.textContent = parseInt(precio).toLocaleString('es-CL');
  }
}

// === RESERVAR POR WHATSAPP ===
function reservarTorta(nombre, selectElement) {
  const porciones = selectElement.value;
  const precio = selectElement.selectedOptions[0].dataset.precio;
  const precioFormateado = parseInt(precio).toLocaleString('es-CL');
  const porcionesTexto = porciones.replace('p', ' personas');
  const numeroWhatsApp = '56912345678'; // Cambia por tu número

  const mensaje = `Hola, quiero reservar la torta: *${nombre}*, para ${porcionesTexto}. Precio: $${precioFormateado}. ¿Está disponible?`;
  const mensajeEncoded = encodeURIComponent(mensaje);
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeEncoded}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

// === INICIAR ===
document.addEventListener('DOMContentLoaded', () => {
  try {
    generarCards();
    generarOpcionesIngredientes();
    aplicarFiltroIngrediente();

    // Añadir evento al select
    document.getElementById('filtro-ingrediente').addEventListener('change', aplicarFiltroIngrediente);
  } catch (error) {
    console.error('[Tortas] Error al cargar:', error);
  }
});

