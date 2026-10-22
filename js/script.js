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

/* ============================================================
   MENU PARA CELULAR (las tres rayitas del header)
   Funciona en todas las paginas del sitio.
   ============================================================ */
const botonMenu = document.getElementById("botonMenu");
const menu = document.getElementById("menu");

if (botonMenu && menu) {
  /* Abre y cierra el menu */
  botonMenu.addEventListener("click", function () {
    const abierto = menu.classList.toggle("nav--abierto");
    botonMenu.classList.toggle("menu-movil--abierto", abierto);
    botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  /* Al tocar cualquier enlace del menu, se cierra solo */
  menu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      menu.classList.remove("nav--abierto");
      botonMenu.classList.remove("menu-movil--abierto");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.setAttribute("aria-label", "Abrir menú");
    });
  });

  /* Si se agranda la pantalla, se vuelve al menu normal */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      menu.classList.remove("nav--abierto");
      botonMenu.classList.remove("menu-movil--abierto");
      botonMenu.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============================================================
   FILTROS DEL CANAL DE NOTICIAS (solo en la pagina principal)
   Cada tarjeta lleva data-categoria y cada boton data-filtro.
   ============================================================ */
const filtros = document.getElementById("filtros");
const gridNoticias = document.getElementById("gridNoticias");

if (filtros && gridNoticias) {
  const botones = Array.from(filtros.querySelectorAll(".filtro"));
  const tarjetas = Array.from(gridNoticias.querySelectorAll(".noticia"));

  filtros.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".filtro");
    if (!boton) return;

    const elegida = boton.dataset.filtro;

    /* Marca el boton activo */
    botones.forEach(function (otro) {
      const activo = otro === boton;
      otro.classList.toggle("filtro--activo", activo);
      otro.setAttribute("aria-pressed", activo ? "true" : "false");
    });

    /* Muestra solo las tarjetas de esa categoria */
    tarjetas.forEach(function (tarjeta) {
      const coincide = elegida === "todas" || tarjeta.dataset.categoria === elegida;
      tarjeta.classList.toggle("noticia--oculta", !coincide);
    });
  });
}

/* ============================================================
   FORMULARIO DE CONTACTO
   El sitio no tiene servidor, asi que el envio se arma como un
   correo con los datos ya escritos. Ver INFRAESTRUCTURA.md si se
   quiere que el envio quede automatico.
   ============================================================ */
const CORREO_JUNTA = "juntadeaccioncomunallosalamos@gmail.com";

const formContacto = document.getElementById("formContacto");
const avisoForm = document.getElementById("avisoForm");

if (formContacto && avisoForm) {

  function mostrarAviso(texto, tipo) {
    avisoForm.textContent = texto;
    avisoForm.className = "aviso-form campo--ancho aviso-form--" + tipo;
    avisoForm.hidden = false;
  }

  formContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = formContacto.querySelector("#c-nombre");
    const correo = formContacto.querySelector("#c-correo");
    const telefono = formContacto.querySelector("#c-telefono");
    const asunto = formContacto.querySelector("#c-asunto");
    const mensaje = formContacto.querySelector("#c-mensaje");
    const datos = formContacto.querySelector("#c-datos");

    /* Validacion campo por campo */
    if (!nombre.value.trim()) {
      mostrarAviso("Escribe tu nombre completo.", "error");
      nombre.focus();
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.value.trim());
    if (!correoValido) {
      mostrarAviso("Revisa tu correo electrónico: no parece válido.", "error");
      correo.focus();
      return;
    }

    if (!asunto.value.trim()) {
      mostrarAviso("Cuéntanos de qué se trata en el asunto.", "error");
      asunto.focus();
      return;
    }

    if (mensaje.value.trim().length < 10) {
      mostrarAviso("El mensaje es muy corto. Escríbenos un poco más.", "error");
      mensaje.focus();
      return;
    }

    if (!datos.checked) {
      mostrarAviso("Necesitamos tu autorización para tratar los datos.", "error");
      datos.focus();
      return;
    }

    /* Se arma el correo con todo lo escrito */
    const cuerpo =
      "Nombre: " + nombre.value.trim() + "\n" +
      "Correo: " + correo.value.trim() + "\n" +
      "Teléfono: " + (telefono.value.trim() || "No indicado") + "\n\n" +
      "Mensaje:\n" + mensaje.value.trim() + "\n\n" +
      "---\n" +
      "Enviado desde el sitio web de la JAC Los Álamos.\n" +
      "El remitente autorizó el tratamiento de sus datos personales.";

    const enlace =
      "mailto:" + CORREO_JUNTA +
      "?subject=" + encodeURIComponent("[Web] " + asunto.value.trim()) +
      "&body=" + encodeURIComponent(cuerpo);

    window.location.href = enlace;

    mostrarAviso(
      "Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a " +
      CORREO_JUNTA,
      "ok"
    );
  });
}

/* ============================================================
   GALERIA DE FOTOS (solo en las noticias que la tengan)
   Al tocar una miniatura, esa foto pasa a verse en grande.
   ============================================================ */
const galeriaMiniaturas = document.getElementById("galeriaMiniaturas");
const galeriaImagen = document.getElementById("galeriaImagen");
const galeriaContador = document.getElementById("galeriaContador");

if (galeriaMiniaturas && galeriaImagen) {
  const miniaturas = Array.from(galeriaMiniaturas.querySelectorAll(".miniatura"));

  miniaturas.forEach(function (miniatura, i) {
    miniatura.addEventListener("click", function () {
      galeriaImagen.src = miniatura.dataset.imagen;

      miniaturas.forEach(function (otra) {
        otra.classList.remove("miniatura--activa");
      });
      miniatura.classList.add("miniatura--activa");

      if (galeriaContador) galeriaContador.textContent = i + 1;
    });
  });
}

/* ============================================================
   CARRUSEL (solo corre en la pagina principal)
   ============================================================ */
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

/* El carrusel solo existe en index.html; en las paginas de noticia no se activa */
if (fondo && anterior && siguiente) {

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
}
