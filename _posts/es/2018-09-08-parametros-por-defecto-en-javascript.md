---

title: Parámetros por defecto en JavaScript
description: Al manipular información muchas veces desconocemos si obtendremos toda la información que esperamos o a veces necesitamos que, en caso de un error, tengamos una forma sencilla y simple de proporcionar un 'fallback' o valor de respaldo.
image: /assets/img/desktop/default-param.jpeg
thumbnail: /assets/img/thumbnail/default-param.jpg
categories: Tech
tags: code javascript
locale: es

---

<img  src="/assets/img/desktop/default-param.jpeg"  alt="Espiral de espejos"  width="100%"/>

## Introducción

Al manipular información muchas veces desconocemos si obtendremos toda la información que esperamos o a veces necesitamos que, en caso de un error, tengamos una forma sencilla y simple de proporcionar un 'fallback' o valor de respaldo. En JavaScript las funciones pueden tener valores por defecto, es decir, recibir un valor en caso de que no sea proporcionado.

## Parámetros por defecto

Usaremos como ejemplo una simple función de suma:

```javascript
function suma (a, b) {
  return a + b
}

suma(5, 5)          // 10
suma(5, null)       // 5
suma(5, undefined)  // NaN
suma(5, '')         // "5"
suma(5, 0)          // 5
```
Normalmente para, por ejemplo, transformar a `0` los valores recibidos en caso de que fueran inválidos se podría hacer lo siguiente:

```javascript
function suma (a, b) {
  // si 'a' no es válida, igualar a 0
  if (!a) {
    a = 0
  }
  // si 'b' no es válida, igualar a 0
  if (!b) {
    b = 0
  }
  return a + b
}

suma(5, 5)          // 10
suma(5, null)       // 5
suma(5, undefined)  // 5
suma(5, '')         // 5
suma(5, 0)          // 5
```

Sin embargo utilizando parámetros por defecto podriamos transformar esa misma función de la siguiente forma:

```javascript
// definimos el valor por defecto de 'a' y 'b' igual a 0
function suma (a = 0, b = 0) {
  return a + b
}

suma(5, 5)          // 10
suma(5, null)       // 5
suma(5, undefined)  // 5
suma(5, '')         // 5
suma(5, 0)          // 5
```

{% include in-article-ad.html %}

Ahora otro ejemplo con un 'Hola Mundo!':

```javascript
function holaMundo(nombre) {
  return 'Hola ' + nombre + '!'
}

holaMundo()         // 'Hola undefined!'
holaMundo(null)     // 'Hola null!'

holaMundo('Mundo')  // 'Hola Mundo!'
```
Si no enviamos los parámetros apropiados terminamos con resultados inesperados, en este caso `Hola undefined!` y `Hola null!`.

Podemos corregir esto utilizando parámetros por defecto:

```javascript
function holaMundo(nombre = 'Mundo') {
  return 'Hola ' + nombre + '!'
}

holaMundo()           // 'Hola Mundo!'
holaMundo(null)       // 'Hola Mundo!'
holaMundo('Mundo')    // 'Hola Mundo!'
holaMundo('Ezteven')  // 'Hola Ezteven!'
```
Vemos que en caso de que no se envíe ningún parámetro, la función utiliza el default, en este caso, `Mundo`.

Ahora veamos otro ejemplo concatenando arreglos:

```javascript
function ensalada(frutas, vegetales) {
	return frutas.concat(vegetales)
}

ensalada()          // TypeError: Cannot read property 'concat' of undefined
ensalada(['uvas'])  // ['uvas', undefined]

ensalada(['manzana', 'pera'], []) // ['manzana', 'pera']
ensalada(['manzana', 'pera'], ['lechuga', 'cebolla']) // ['manzana', 'pera', 'lechuga', 'cebolla']
```
Con parámetros por defecto:

```javascript
function ensalada(frutas = [], vegetales = []) {
  return frutas.concat(vegetales)
}

ensalada()  //  []
ensalada(['uvas'])  //  ['uvas']
ensalada(['manzana', 'pera'], [])  //  ['manzana', 'pera']
ensalada(['manzana', 'pera'], ['lechuga', 'cebolla'])  //  ['manzana', 'pera', 'lechuga', 'cebolla']
```
Los parámetros por defecto pueden simplificar considerablemente las validaciones a la hora de crear funciones. Estos pueden ser de cualquier tipo, es decir, `number`, `object`, `string`, etc. incluso funciones o parámetros por defecto previamente definidos.

Por lo cual esto es totalmente válido:

```javascript
function suma (a = 5, b = 3, c = a - b) {
  return a + b + c
}

suma()		// 10	(5 + 3 + 2)
suma(3)		// 6	(3 + 3 + 0)
suma(10)	// 20	(10 + 3 + 7)

function suma2(a = suma(10), b = 5) {
  return a + b
}

suma2()		// 25	(20 + 5)
suma2(10)	// 15	(10 + 5)
```

¿Interesante verdad? Si te gustó, no olvides darle 'Like' :thumbsup: y comentar. :smile: