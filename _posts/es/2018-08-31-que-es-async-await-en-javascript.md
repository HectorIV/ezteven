---

title: ¿Qué es async await en JavaScript?
description: Las funciones asíncronas llegaron a JavaScript como un medio para simplificar los procesos asíncronos anidados.
image: /assets/img/desktop/glass-spiral.jpeg
thumbnail: /assets/img/thumbnail/glass-spiral.jpg
categories: Tech
tags: code javascript
locale: es

---

<img  src="/assets/img/desktop/glass-spiral.jpeg"  alt="Espiral de espejos"  width="100%"/>

{% include toc.md %}

## Introducción

Las funciones asíncronas utilizan la sintaxis `async` y `await` para esperar que una promesa sea resuelta. Para comprender mejor este artículo es recomendable conocer cómo funcionan las promesas. [Pueden conocer sobre las mismas aquí]({{ site.url }}/tech/2018/08/24/js-promises-para-codigo-asincrono.html).

## Callback hell

Una de las razones por las que se introdujo async/await era para evitar el conocido "callback hell" en el que las funciones se anidaban varios niveles. Esto sucede muy comúnmente cuando el resultado de una función requiere de posteriores consultas y validaciones.

Crearemos un flujo de procesos sencillos para ejemplificar un "callback hell":

```javascript
function suma (a, b, cb) {
  cb(a + b) // retorna la suma de dos numeros en un callback
}
function restar (valor, cantidad, cb) {
  cb(valor - cantidad) // resta una cantidad determinada a un valor
}
function esMayorACero (valor, cb) {
  if (valor > 0) {
    cb('Mayor a cero')
  } else {
    cb('Menor a cero')
  }
}

const x = 10
const y = 20
// si hubieran aún mas procesos derivados, se anidaría más y más
suma(x, y, function (resultado_de_suma) {                       // Resultado: 30
  restar(resultado_de_suma, 15, function (resultado_de_resta) { // Resultado: 15
    esMayorACero(resultado_de_resta, function (respuesta) {     // Resultado: 'Mayor a cero'
      console.log(respuesta) // Mayor a cero
    })
  })
})
```
__Este es un ejemplo representativo ya que los callbacks son usados más comúnmente para procesos asíncronos como peticiones a un servidor.__

{% include in-article-ad.html %}

## Promesas

Para reescribir el ejemplo anterior, transformaremos las funciones en promesas:

```javascript
function suma (a, b) {
  return new Promise(function (resolve, reject) {
    resolve(a + b)
  })
}
function restar (valor, cantidad) {
  return new Promise(function (resolve, reject) {
    resolve(valor - cantidad)
  })
}
function esMayorACero (valor) {
  return new Promise(function (resolve, reject) {
    if (valor > 0) {
      resolve('Mayor a cero')
    } else {
      resolve('Menor a cero')
    }
  })
}

const x = 10
const y = 20

suma(x, y)
  .then(function (resultado_de_suma) {      // Resultado: 30
    return restar(resultado_de_suma, 15)
  })
  .then(function (resultado_de_resta) {     // Resultado: 15
    return esMayorACero(resultado_de_resta)
  })
  .then(function (respuesta) {              // Resultado: 'Mayor a cero'
    console.log(respuesta)
  })
```
Al retornar una promesa, podemos encadenar los `then()` a medida que se resuelven.

## Async/Await

Ahora reescribiremos el ejemplo usando async/await. Como esto funciona con promesas, usaremos las mismas funcionas declaradas en el código anterior.

__Async/Await solo funcionan dentro de funciones asíncronas, es decir, las funciones con la sintaxis `async function nombre_de_funcion () {}`.__

```javascript
const x = 10
const y = 20

// función asíncrona con "async"
async function mayorACero () {
  try {
    let resultado_de_suma = await suma(x, y)                      // Resultado: 30
    let resultado_de_resta = await restar(resultado_de_suma, 15)  // Resultado: 15
    let respuesta = await esMayorACero(resultado_de_resta)        // Resultado: 'Mayor a cero'
    console.log(respuesta)
  }
  catch (err) {
    // manejo de errores
  }
}

mayorACero() // Resultado: 'Mayor a cero'
```
__Si usaramos la sintaxis `await` fuera de una función con `async` resultaría en un error.__

Gracias a async/await podemos manejar funciones asíncronas de manera más secuencial,  brindándole más claridad a nuestro código.

Se recomienda que al usar `await` se haga dentro de un `try {} catch() {}` para poder tener control en el `catch() {}` de las promesas que fallen. Esto porque si una promesa falla dentro del `try`, el error se propagará al bloque `catch`.

__Debido a que async/await es relativamente nuevo, se recomienda usarlo con precaución ya que no funciona en navegadores antiguos como IE11. Pueden ver el soporte de la misma [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Browser_compatibility).__

Espero este artículo les haya ayudado a familiarizarse con algunas de las novedades de ECMAScript7, en este caso, async/await.

No olviden comentar si tienen alguna duda,

¡Saludos!
