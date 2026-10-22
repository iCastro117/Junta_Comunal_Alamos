# Infraestructura tecnológica y seguridad

Documento para quien responda el formulario de vinculación de PSE (ACH Colombia)
y para quien mantenga el sitio.

---

## 1. La respuesta al formulario de ACH

El formulario de vinculación directa a PSE pregunta:

> **¿Tu empresa cuenta con la infraestructura tecnológica y el equipo técnico para
> desarrollar e implementar la integración con PSE?**

Con el sitio **tal como está hoy**, la respuesta honesta es **NO**, y responder
que sí haría que la vinculación se caiga en la etapa técnica.

### Por qué

La integración directa con PSE exige, como mínimo:

| Requisito de ACH | ¿Lo tiene el sitio hoy? |
|---|---|
| Servidor propio con lógica de backend | **No.** Es un sitio estático (solo HTML, CSS y JS en el navegador) |
| Endpoint público para recibir la confirmación del pago (webhook) | **No.** Un sitio estático no puede recibir peticiones POST |
| Almacenamiento seguro de llaves y secretos | **No.** Todo lo que está aquí es público: el repositorio es abierto |
| Base de datos de transacciones y conciliación | **No** |
| Registro de auditoría (logs) de cada transacción | **No** |
| Certificado SSL sobre dominio propio | **Parcial.** HTTPS sí, pero sobre el dominio de GitHub |
| Equipo técnico de soporte, pruebas y mantenimiento | **No**, salvo que se contrate |
| Ambiente de pruebas separado del de producción | **No** |

### Qué responder entonces

Marcar **"No"** en esa pregunta no descalifica a la Junta: simplemente dirige la
conversación hacia el camino correcto, que es **vincularse a través de una pasarela
de pagos** ya certificada por ACH (Wompi, ePayco, Bold, PayU, PlacetoPay,
Mercado Pago). La pasarela ya tiene toda esa infraestructura y la Junta se vincula
como comercio, no como integrador.

Los pasos de esa ruta están en **PAGOS.md**.

### Si algún día se quiere la integración directa

Habría que montar, como mínimo:

1. Un backend (Node.js, Python o PHP) en un servidor propio o en la nube.
2. Un dominio propio con certificado SSL.
3. Base de datos para órdenes y transacciones.
4. Endpoint de confirmación (webhook) con validación de firma.
5. Gestor de secretos (variables de entorno, nunca en el repositorio).
6. Logs de auditoría con retención definida.
7. Ambientes separados de pruebas y producción.
8. Una persona o empresa responsable del soporte.

Para el volumen de una Junta de Acción Comunal, **esto no se justifica**: el costo
de mantenerlo supera lo que se recauda.

---

## 2. Qué tiene el sitio hoy

### Arquitectura

```
Sitio estático · HTML + CSS + JavaScript, sin dependencias externas
│
├── index.html                      Página principal
├── noticia-1..6.html               Detalle de cada noticia
├── politica-de-privacidad.html     Ley 1581 de 2012
├── terminos-y-condiciones.html     Condiciones de los pagos
├── 404.html                        Página de error
│
├── css/estilos.css                 Hoja de estilos única
├── js/script.js                    Menú, carrusel, galería y formulario
│
├── datos/noticias.json             Fuente de datos en JSON
├── manifest.webmanifest            Instalable como app en el celular
├── robots.txt · sitemap.xml        Indexación en buscadores
├── vercel.json                     Cabeceras de seguridad (Vercel)
├── _headers                        Cabeceras de seguridad (Netlify/Cloudflare)
└── .well-known/security.txt        Contacto para reportar fallas
```

No usa frameworks, ni librerías de terceros, ni rastreadores. Cero dependencias
significa cero vulnerabilidades heredadas y nada que actualizar por seguridad.

### Seguridad aplicada

| Medida | Dónde | Qué evita |
|---|---|---|
| **Content-Security-Policy** | `<meta>` en cada HTML y en `_headers` | Que se inyecte y ejecute código de otro origen (XSS) |
| **X-Content-Type-Options: nosniff** | `<meta>`, `vercel.json` y `_headers` | Que el navegador adivine el tipo de archivo |
| **Referrer-Policy** | `<meta>`, `vercel.json` y `_headers` | Que se filtre la URL completa a sitios externos |
| **Permissions-Policy** | `vercel.json` y `_headers` | Que algo use cámara, micrófono o ubicación |
| **X-Frame-Options / frame-ancestors** | `vercel.json` y `_headers` | Que el sitio se incruste en otro para engañar (clickjacking) |
| **Strict-Transport-Security** | `vercel.json` y `_headers` | Que alguien fuerce una conexión sin cifrar |
| **`rel="noopener"`** | Enlaces externos | Que la pestaña abierta manipule la original |
| **Validación del formulario** | `js/script.js` | Envíos vacíos o con datos mal formados |
| **Sin llaves ni secretos** | Todo el proyecto | Que se filtren credenciales en un repositorio público |
| **Sin rastreadores** | Todo el proyecto | Compartir datos de los vecinos con terceros |

> **Las cabeceras dependen de dónde se publique el sitio:**
>
> | Dónde | Archivo que manda | ¿Cabeceras completas? |
> |---|---|---|
> | **Vercel** | `vercel.json` | Sí |
> | Netlify / Cloudflare Pages | `vercel.json` y `_headers` | Sí |
> | GitHub Pages | ninguno: no deja configurar cabeceras | No, solo el `<meta>` de CSP |
>
> El sitio se publica en **Vercel**, así que las cabeceras activas son las de
> `vercel.json`. `_headers` se deja por si algún día se migra a Netlify o Cloudflare.
> Si el sitio también queda servido desde GitHub Pages, ahí solo protege la etiqueta
> `<meta>` de CSP, que cubre lo esencial pero no `X-Frame-Options` ni `HSTS`.

### Protección de datos

- **Política de tratamiento de datos** publicada y enlazada desde el pie de página
  y desde la casilla del formulario, como exige la Ley 1581 de 2012.
- **Términos y condiciones** de los pagos, con reglas de devolución.
- El formulario **no envía datos a ningún servidor**: arma un correo con lo que la
  persona escribió y lo abre en su propio gestor de correo. Nada se almacena aquí.
- No hay cookies, ni analítica, ni píxeles de seguimiento.

---

## 3. Pendientes

Ordenados por impacto:

1. **Completar el NIT** de la Junta en `politica-de-privacidad.html`.
2. **Aprobar en acta** la política de datos y los términos, por la junta directiva.
3. **Revisar en Vercel** que las cabeceras de `vercel.json` estén activas (pestaña Network del navegador o securityheaders.com).
4. **Dominio propio** (ej. `jaclosalamos.org`): da confianza y es casi un requisito
   para que una pasarela apruebe la vinculación.
5. **Generar los enlaces de pago** y pegarlos en la página de cada evento (ver PAGOS.md).
6. **Correo institucional** en vez de Gmail, si se consigue el dominio.
7. **Formulario con envío automático**: si se quiere que llegue solo al correo sin
   abrir el gestor del usuario, se puede usar un servicio de formularios (Formspree,
   Web3Forms) con el plan gratuito. Requiere registrar el sitio y pegar una clave
   pública en el HTML.
8. **Copia de seguridad**: el repositorio de GitHub ya cumple esa función, siempre
   que los cambios se suban.

---

## 4. Cómo publicar cambios

```bash
git add -A
git commit -m "describe el cambio"
git push
```

El sitio no necesita compilarse ni instalarse nada: lo que está en el repositorio
es exactamente lo que se publica.
