---

title: Tareas asíncronas con Promises en JavaScript
description: En JavaScript muchas acciones pueden ser asíncronas, pues son procesos que se pueden mantener en ejecución a la vez y no necesariamente se ejecutan secuencialmente con el resto del código.
image: /assets/img/desktop/light-rays.jpg
thumbnail: /assets/img/thumbnail/light-rays.jpg
categories: Tech
tags: code javascript
locale: es

---

<img src="/assets/img/desktop/light-rays.jpg" alt="Rayos de luz" width="100%"/>

## Introducción

En JavaScript muchas tareas pueden ser asíncronas, pues son procesos que se pueden mantener en ejecución a la vez y no necesariamente se ejecutan secuencialmente con el resto del código.

Este comportamiento solía ser manejado a través de callbacks, sin embargo, esto con el tiempo se volvía tedioso de mantener y la indentación del código se volvía cada vez más problemática entre más validaciones y procesos derivados se tuvieran que realizar. Esto dio paso a la introducción de las Promesas en JavaScript.

{% include toc.md %}

Las Promesas de JavaScript fueron introducidas con ECMAScript 6, y trajeron al lenguaje una forma más concisa de trabajar con funciones asíncronas.

__Cabe notar que las Promesas no están soportadas por Internet Explorer. Para lograrlo es necesario utilizar [polyfills](https://github.com/stefanpenner/es6-promise).__

Las funciones asíncronas incluyen acciones como lecturas de archivos, peticiones a servidores (ajax), funciones que esperan un determinado lapso de tiempo (como `setTimeout`), procesos que pueden ser intensos al CPU como el hash de información, entre otras. 

## Callbacks

Los callbacks son funciones enviadas como parámetros a otra función. De la última se espera que ejecute el código recibido después de un tiempo.

En el caso de la función `setTimeout` que usaremos de ejemplo, recibe una función como parámetro que se ejecuta una vez culmina el periodo definido en milisegundos.

```javascript
let asincrono = function (cb) {
  setTimeout(function () {
    cb('segundo')
  }, 3000)
}

console.log('primero')
asincrono(function (resultado) {
  console.log(resultado)
})
console.log('tercero')
```
El resultado en consola sería:

```javascript
primero
tercero
segundo // luego de 3 segundos
```
Vemos que la impresión de "segundo" no sucede hasta después de un tiempo (en este caso el especificado en `setTimeout` de `3000` ms).

Aquí usamos una función llamada `cb` (puede tener cualquier nombre), para que sea llamada una vez haya culminado el proceso asíncrono, en este caso, un lapso de tiempo de 3 segundos.

{% include in-article-ad.html %}

## Promise()

Las Promesas de JavaScript reciben una función con dos parámetros (`resolve`, `reject`) que son funciones que se llaman una vez el proceso se ejecute con éxito (`resolve`) o falle (`reject`).

Las promesas poseen tres estados:
- Pending (pendiente, esperando ser resuelta o rechazada)
- Fulfilled (resuelta)
- Rejected (rechazada)

Reescribiendo el ejemplo anterior con promesas quedaría de la siguiente forma:

```javascript
// las promesas se instancian con 'new'
let asincrono = new Promise(function (resolve, reject) {
  setTimeout(function () {
	resolve('segundo')
  }, 3000)
})

console.log('primero')
asincrono.then(function (resultado) {
  console.log(resultado)
})
console.log('tercero')
```
La impresión en consola sería la misma que en el ejemplo anterior.

Otro uso de las promesas es poder saber cuando una consulta asíncrona, por ejemplo a un servidor, es culminada.

```javascript
let datosDeServidor = function (url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      resolve(xhr.responseText)	// se accede con 'then()'
    }
    xhr.onerror = function () {
      reject(xhr.statusText)	// se accede con 'catch()'
    }
    xhr.send();
  })
}

datosDeServidor(/* url */)
  .then(function (response) {   // culminó petición
    console.log(response)       // xhr.responseText
  })
  .catch(function (error) {     // error en la petición
    console.log(error)          // xhr.statusText
  })
```
Vemos que se utiliza `then()` para el `resolve` y `catch()` para el `reject`.

Muchas de las librerías utilizadas en JavaScript y NodeJs soportan el uso de Promesas. Por ejemplo, `axios`, utilizada para hacer peticiones ajax esta basada en Promesas, por lo que su uso general es:

```javascript
axios({ /* opciones */ })
  .then(function (response) { // petición exitosa
	console.log(response)
  })
  .catch(function (error) { // fallo en la petición
	console.log(error)
  })
```
## Promise.all()

`Promise.all()` recibe un arreglo de promesas y retorna un arreglo con las promesas una vez estas han sido resueltas. Utilizando como ejemplo la consulta a un servidor, podríamos usar `Promise.all()` si tenemos varias consultas asíncronas sobre las cuales queremos actuar una vez todas culminen.

```javascript
Promise.all([
  datosDeServidor(/* url de servidor x */),
  datosDeServidor(/* url de servidor y */),
  datosDeServidor(/* url de servidor z */)
])
  .then(function (resultados) {
	console.log(resultados[0]) // respuesta de servidor x
	console.log(resultados[1]) // respuesta de servidor y
	console.log(resultados[2]) // respuesta de servidor z
  })
  .catch(function (error) {
	console.log(error) // error de la primera promesa que falle
  })
```
Las Promesas de JavaScript nos dan mayor flexibilidad a la hora de manejar código asíncrono. Uno de los usos más comunes de las promesas en el desarrollo web, es poder controlar el flujo de peticiones (ajax) a servidores web ya que dependiendo de la conexión y otros factores, el tiempo exacto que demora una respuesta es impredecible.
