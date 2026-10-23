# Próximos pasos para activar los pagos por PSE

Guía en lenguaje sencillo para la Junta de Acción Comunal Los Álamos.
Explica qué falta para que los vecinos puedan pagar los eventos desde la página web.

> **En una frase:** lo que falta **no es programación** — eso ya está hecho.
> Es papeleo y decisiones de la Junta.

---

## Lo primero: hay dos caminos, y uno no nos sirve

### Camino A — Vincularse directo con ACH Colombia

Es el formulario oficial de PSE. Ahí preguntan si la organización tiene
*"infraestructura tecnológica y equipo técnico"*. Eso significa: servidores propios,
programadores, base de datos de transacciones y soporte permanente.

Una Junta de Acción Comunal no tiene nada de eso, y mantenerlo costaría más de lo
que se va a recaudar en los eventos.

### Camino B — Vincularse a una pasarela de pagos ✅

Wompi, ePayco, Bold o PayU son empresas que **ya están conectadas a PSE**. La Junta
se registra con ellas como comercio y ellas ponen toda la tecnología.

Es el camino correcto y el que usan la gran mayoría de los negocios pequeños en
Colombia.

> **Si se llena el formulario de ACH, en esa pregunta hay que marcar "No".**
> No descalifica a la Junta: el asesor simplemente va a dirigirla hacia una pasarela,
> que es donde debe estar. En realidad **ni siquiera hace falta llenar ese formulario**:
> se puede ir directo a la pasarela.

---

## Lo que ya quedó hecho

Nada de esto hay que volverlo a hacer.

| Qué | Estado |
|---|---|
| Botón de pago con el logo de PSE | Listo, en Viejoteca y Taller Navideño |
| Política de tratamiento de datos personales | Escrita y publicada |
| Términos y condiciones, con reglas de devolución | Escritos y publicados |
| Seguridad del sitio (HTTPS, cabeceras, sin rastreadores) | Listo |
| Sitio web funcionando y público | Listo |

Esto es justamente lo que revisa una pasarela al verificar a un comercio. Ya está.

---

## Lo que falta, paso a paso

### Paso 1 · Conseguir los documentos de la Junta

Es lo que más demora. **Empezar por aquí.**

- [ ] **Certificado de existencia y representación legal**
      ⚠️ Para una JAC **no lo expide la Cámara de Comercio**, sino el **IDPAC** o la
      alcaldía local. Es el documento que prueba que la Junta existe y quién la representa.
- [ ] **RUT de la Junta**, de la DIAN, a nombre de la Junta (no de una persona)
- [ ] **Cédula del representante legal**
- [ ] **Acta de nombramiento** del representante legal
- [ ] **Certificación bancaria** de una cuenta a nombre de la Junta
      (la emite el banco, normalmente el mismo día)

> ### ⚠️ Lo más importante de todo
> La cuenta bancaria debe estar **a nombre de la Junta**, nunca a nombre de un
> miembro. Si está a nombre de una persona, la pasarela **rechaza la vinculación**,
> y además sería un problema legal manejar dinero de la comunidad en una cuenta
> personal.

### Paso 2 · Decidir los precios

- [ ] Definir cuánto cuesta la **Viejoteca del año**
- [ ] Definir cuánto cuesta el **Taller Navideño**

Hoy la página dice *"Valor por confirmar"* en los dos. Sin ese número no se puede
crear el cobro.

### Paso 3 · Aprobar las políticas en asamblea

- [ ] Aprobar en reunión la política de datos y los términos, **dejando constancia en acta**
- [ ] Conseguir el **NIT de la Junta** (en la política aparece marcado en naranja como *"por completar"*)

Es un requisito legal (Ley 1581 de 2012) y las pasarelas lo verifican.

### Paso 4 · Elegir la pasarela

- [ ] Comparar y decidir

**Recomendación: Wompi.** Es de Bancolombia, el registro es sencillo y no cobra
mensualidad, solo un porcentaje por transacción. **ePayco** es la otra buena opción.

Antes de decidir, preguntarles tres cosas:

1. ¿Cuánto cobran por cada transacción?
2. ¿Cuántos días tardan en pasar el dinero a la cuenta?
3. ¿Cobran mensualidad?

### Paso 5 · Registrarse

- [ ] Crear la cuenta en la web de la pasarela

Registrarse **como organización / persona jurídica**, nunca como persona natural.
Ahí se suben los documentos del Paso 1.

### Paso 6 · Esperar la verificación

- [ ] Responder lo que pidan

Tarda entre **2 y 10 días hábiles**. Pueden pedir documentos adicionales. Van a
preguntar por la página web: se les da la dirección del sitio publicado.

### Paso 7 · Crear los enlaces de pago

- [ ] Enlace para *Viejoteca del año – 7 de noviembre*, con su valor
- [ ] Enlace para *Taller Navideño – 3 de noviembre*, con su valor

Ya aprobados, en el panel de la pasarela se busca **"Enlaces de pago"** o
**"Botones de cobro"** y se crea **uno por cada evento**. Cada uno entrega una
dirección web, algo como `https://checkout.wompi.co/l/AbC123`.

### Paso 8 · Pegarlos en la página

- [ ] Conectar cada enlace a su botón

En **PAGOS.md** está explicado exactamente dónde va cada uno. Es cambiar una línea
por evento.

### Paso 9 · Probar antes de anunciarlo

- [ ] Hacer un pago completo en el **modo de pruebas** de la pasarela

Tienen bancos y cuentas falsas para probar de principio a fin sin mover dinero real.

### Paso 10 · Prueba real y lanzamiento

- [ ] Activar el modo real
- [ ] Hacer **un pago de verdad, de poco valor**, desde otra cuenta
- [ ] Confirmar que el dinero llegó a la cuenta de la Junta
- [ ] Anunciarlo a los vecinos

---

## Pendientes del lado del sitio web

Dos cosas pequeñas, en cuanto haya datos:

- [ ] **El NIT** → va en la política de tratamiento de datos
- [ ] **El dominio definitivo** → hay direcciones en el sitio que todavía apuntan a
      GitHub y hay que actualizarlas; si no, Google indexa la dirección equivocada

---

## En resumen

Lo que falta es **papeleo y decisiones de la Junta**: conseguir los documentos, tener
la cuenta bancaria a nombre de la Junta, definir los precios y aprobar las políticas
en acta.

**Por dónde empezar:** el certificado del IDPAC y la certificación bancaria, que son
los que más demoran. Con eso en mano, el registro en la pasarela toma menos de media hora.

---

## Documentos relacionados

| Archivo | Para qué sirve |
|---|---|
| `PAGOS.md` | El detalle técnico de dónde se pegan los enlaces de pago |
| `INFRAESTRUCTURA.md` | Qué tiene el sitio en seguridad y tecnología, y qué responder en el formulario de ACH |
