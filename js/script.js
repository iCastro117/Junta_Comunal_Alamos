/* ============================================================
   JUNTA DE ACCIÓN COMUNAL LOS ÁLAMOS
   Carrusel del banner principal
   ============================================================ */

/* ------------------------------------------------------------
   AQUÍ SE EDITAN LOS BANNERS
   Cada bloque es un banner. Cambia el texto y la imagen y listo.
   - imagen: la foto dentro de assets/banner/
   - titulo: cada línea del título grande (una por renglón)
   - texto:  cada línea del párrafo de abajo
   ------------------------------------------------------------ */
const banners = [
  {
    imagen: "assets/banner/banner-1.jpg",
    titulo: ["Juntos", "construimos", "un mejor barrio"],
    texto: ["Participación, solidaridad y bienestar", "para nuestra comunidad."]
  },
  {
    imagen: "assets/banner/banner-2.jpg",
    titulo: ["Día Dulce", "de los Niños"],
    texto: ["Gran evento de celebración", "30 de octubre, 5pm a 8pm"]
  },
  {
    imagen: "assets/banner/banner-3.jpg",
    titulo: ["Así se vivió el ", "Simulacro de Emergenciasl", "en Los Álamos"],
    texto: ["Escribe aquí el texto de apoyo", "del tercer banner."]
  },
  {
    imagen: "assets/banner/banner-4.jpg",
    titulo: ["Viejoteca", "Este 7 de noviembre!"],
    texto: ["Disfruta de música, baile y buenos recuerdos con vecinos", "y amigos en el Salón Comunal."]
  }
];

const fondo = document.getElementById("heroFondo");
const textos = document.getElementById("heroTextos");
const titulo = document.getElementById("heroTitulo");
const texto = document.getElementById("heroTexto");
const puntos = Array.from(document.querySelectorAll("#heroPuntos .punto"));
const anterior = document.getElementById("heroAnterior");
const siguiente = document.getElementById("heroSiguiente");

let actual = 0;

/* Escribe las líneas dentro de un elemento, separadas por saltos de línea */
function escribirLineas(elemento, lineas) {
  elemento.textContent = "";
  lineas.forEach(function (linea, i) {
    if (i > 0) elemento.appendChild(document.createElement("br"));
    elemento.appendChild(document.createTextNode(linea));
  });
}

/* Muestra el banner indicado con una transición suave */
function mostrarBanner(indice) {
  actual = (indice + banners.length) % banners.length;
  const banner = banners[actual];

  fondo.classList.add("esta-cambiando");
  textos.classList.add("esta-cambiando");

  setTimeout(function () {
    fondo.style.backgroundImage = 'url("' + banner.imagen + '")';
    escribirLineas(titulo, banner.titulo);
    escribirLineas(texto, banner.texto);

    fondo.classList.remove("esta-cambiando");
    textos.classList.remove("esta-cambiando");
  }, 220);

  puntos.forEach(function (punto, i) {
    punto.classList.toggle("punto--activo", i === actual);
  });
}

/* Flechas laterales */
anterior.addEventListener("click", function () {
  mostrarBanner(actual - 1);
});

siguiente.addEventListener("click", function () {
  mostrarBanner(actual + 1);
});

/* Puntos de abajo */
puntos.forEach(function (punto, i) {
  punto.addEventListener("click", function () {
    mostrarBanner(i);
  });
});

/* Primer banner al cargar la página */
mostrarBanner(0);
