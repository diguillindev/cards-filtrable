// === CARRUSEL.JS ===

// Asumimos que tortasData ya está definido globalmente
let currentIndex = 0;
const cardsPerView = 2; // Mover de a 3
const carrusel = document.getElementById('carrusel-resultados');

// ✅ Nuevo: almacenar las tortas actuales (originales al inicio)
let tortasFiltradas = [...tortasData]; // Copia inicial

// === GENERAR TARJETAS DEL CARRUSEL ===
function generarCarrusel() {
  if (!carrusel) return;

  // Limpiar carrusel
  carrusel.innerHTML = '';

  // ✅ Generar solo con tortasFiltradas
  tortasFiltradas.forEach(torta => {
    const card = crearTarjetaCarrusel(torta);
    carrusel.appendChild(card);
  });

  // Reiniciar índice al regenerar (por filtro o carga)
  currentIndex = 0;

  // Centrar si hay pocas tarjetas
  ajustarAlineacion();

  // Ajustar posición inicial
  actualizarPosicionCarrusel();
}

// === CREAR TARJETA (igual que tenías) ===
function crearTarjetaCarrusel(torta) {
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
  img.onerror = function () {
    this.src = 'img/tortas/placeholder.svg';
  };
  card.appendChild(img);

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

  return card;
}

// === AJUSTAR ALINEACIÓN: centrar si hay pocas tarjetas ===
function ajustarAlineacion() {
  // ✅ Usar tortasFiltradas.length
  const totalCards = tortasFiltradas.length;

  if (totalCards <= 3) {
    carrusel.style.justifyContent = 'center'; 
  } else {
    carrusel.style.justifyContent = 'flex-start';
  }
}

// === MOVER EL CARRUSEL ===
function moverCarrusel(direccion) {
  // ✅ Usar tortasFiltradas.length
  const totalCards = tortasFiltradas.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView); // Evita negativos

  currentIndex += direccion * cardsPerView;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  actualizarPosicionCarrusel();
}

// === ACTUALIZAR POSICIÓN VISUAL ===
function actualizarPosicionCarrusel() {
  const card = carrusel.querySelector('.torta-card');
  if (!card) return;

  const gap = parseFloat(getComputedStyle(carrusel).gap) || 0;
  const step = card.offsetWidth + gap;

  carrusel.style.transform = `translateX(-${currentIndex * step}px)`;
}

// === INICIAR CARRUSEL ===
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('carrusel-resultados')) {
    // ✅ Inicialmente, tortasFiltradas ya es igual a tortasData
    generarCarrusel();
  }
});

// ✅ Si quieres resetear
window.resetearCarrusel = function () {
  tortasFiltradas = [...tortasData];
  generarCarrusel();
};