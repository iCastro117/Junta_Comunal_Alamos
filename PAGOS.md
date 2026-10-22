# Activar los pagos por PSE

Guía para quien haga la vinculación de la Junta de Acción Comunal Los Álamos.

El cobro **vive dentro de la página de cada evento**, no en el inicio. Hoy hay una
caja de pago en tres páginas:

| Evento | Página | Fecha | Valor |
|---|---|---|---|
| Viejoteca del año | `noticia-4.html` | 7 de noviembre | Por confirmar |
| Taller Navideño | `noticia-6.html` | 3 de noviembre | Por confirmar |

Las cajas ya están listas visualmente, pero **todavía no cobran nada**: el botón
apunta a `#` en vez de a un enlace de pago real, y el valor sigue sin definirse.

Las demás actividades son **gratuitas** y no llevan botón de pago. El Día Dulces
de los Niños (`noticia-1.html`) muestra una caja de entrada libre, sin cobro.

---

## Lo primero que hay que entender

PSE no es un botón que se pegue en el HTML. PSE es un servicio de **ACH Colombia**,
y para usarlo hay dos caminos:

| Camino | Qué implica | Recomendado |
|---|---|---|
| **Integración directa con ACH Colombia** | Carta de presentación bancaria, desarrollo propio, certificaciones de seguridad, servidor propio | No, para este caso es demasiado |
| **Pasarela de pagos** (Wompi, Bold, ePayco, PayU, Mercado Pago, PlacetoPay) | Te registras, te verifican, ellos ya están conectados a PSE | **Sí** |

La pasarela es la vía correcta porque además de PSE habilita tarjeta débito,
crédito, Nequi y pagos en efectivo, sin trabajo técnico extra.

## Por qué aquí se usa "enlace de pago" y no un script

Este sitio es **HTML puro, sin servidor** (está en GitHub). Las integraciones por
script o API necesitan un backend para firmar la transacción y confirmar el pago;
si se pusieran las llaves en el HTML quedarían a la vista de cualquiera y el monto
se podría alterar desde el navegador.

Por eso los botones usan **enlaces de pago** (también llamados *links de pago* o
*botones de cobro*): una URL que genera la pasarela en su panel, que ya lleva el
monto y el concepto. Es seguro, no requiere programar y se cambia en segundos.

---

## Pasos

### 1. Reunir los documentos

Para una Junta de Acción Comunal se suele pedir:

- Certificado de existencia y representación legal (lo expide la **alcaldía local
  o el IDPAC**, no la Cámara de Comercio, por ser organismo comunal)
- RUT de la Junta
- Cédula del representante legal
- Certificación bancaria de la **cuenta a nombre de la Junta** (no de una persona)
- Acta de nombramiento del representante legal

### 2. Elegir la pasarela y crear la cuenta

Comparar comisión por transacción, tiempo de desembolso y si cobran mensualidad.
Para organizaciones comunales suelen funcionar bien **Wompi** (de Bancolombia) y
**ePayco**. Crear la cuenta como **persona jurídica / organización**, nunca
como persona natural.

### 3. Esperar la verificación

La pasarela valida los documentos y la cuenta bancaria. Suele tardar entre
**2 y 10 días hábiles**. Pueden pedir documentos adicionales.

### 4. Generar un enlace de pago por cada evento

En el panel de la pasarela, buscar *Enlaces de pago* / *Links de pago* / *Botones
de cobro* y crear uno por cada cobro. Para cada uno se define:

- Nombre del cobro (ej. `Viejoteca del año - 7 de noviembre`)
- Valor (o "monto abierto" para el aporte voluntario)
- Si pide datos del comprador (nombre, correo, teléfono)
- Si tiene cupo o fecha límite

### 5. Pegar el enlace en la página de su evento

Abrir la página del evento (`noticia-4.html` o `noticia-6.html`)
y buscar el bloque marcado con el comentario `PAGO DE ESTE EVENTO`. Ahí está:

```html
<a class="btn btn--pse" href="#">
```

Cambiarlo por el enlace real de **ese** evento:

```html
<a class="btn btn--pse" href="https://checkout.wompi.co/l/XXXXXX" target="_blank" rel="noopener">
```

Cada evento lleva su propio enlace: no se repite el mismo en los tres.

### 6. Poner los valores reales

En ese mismo bloque, cambiar `Valor por confirmar` por el valor real del evento y
quitar la clase `pago-evento__valor--pendiente` para que se vea como cifra grande.
Debe coincidir
con el valor configurado en el enlace de pago.

### 6b. Agregar el cobro a otro evento

Copiar el bloque completo `<aside class="pago-evento"> … </aside>` de una página que
ya lo tenga, pegarlo en la nueva justo antes del botón *Volver a noticias*, y cambiar
el título, la fecha, el valor y el enlace. El estilo funciona solo.

### 7. Probar en modo de pruebas

Las pasarelas tienen un **modo sandbox** con bancos y cuentas de prueba.
Hacer un pago completo de principio a fin antes de publicarlo.

### 8. Pasar a producción y hacer una prueba real

Activar el modo producción y hacer **un pago real de valor bajo** desde otra
cuenta, para confirmar que el dinero llega a la cuenta de la Junta.

---

## Pendientes legales

- **Política de tratamiento de datos:** el enlace del pie de página apunta a
  `#ubicacion` y debería llevar a una página real con la política. Es obligatorio
  por la Ley 1581 de 2012 y las pasarelas lo revisan.
- **Términos y condiciones de los cobros:** qué incluye, si hay devoluciones y a
  quién reclamar.
- **Comprobantes:** definir quién concilia los pagos recibidos contra la lista de
  inscritos a cada evento.

---

## Lo que nunca debe hacerse

- Pedir en el sitio la clave, el usuario del banco o el token. Eso solo se escribe
  en la página del banco, a la que redirige la pasarela.
- Poner llaves privadas o secretos de integridad en el HTML o el JavaScript:
  este repositorio es público y quedarían expuestos.
- Recibir los pagos en una cuenta personal en lugar de la cuenta de la Junta.
