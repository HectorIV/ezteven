---

title: Escribe código más legible con los siguientes consejos
description: Cuando el programa está escrito solo por nosotros, es relativamente fácil comprenderlo porque nosotros mismos nos "entendemos".
image: /assets/img/desktop/mac-clean.jpeg
thumbnail: /assets/img/thumbnail/mac-clean.jpg
categories: Tech
tags: code javascript php eslint
locale: es

---

Cuando el programa está escrito solo por nosotros, es relativamente fácil comprenderlo porque nosotros mismos nos **"entendemos"**.

<img src="/assets/img/desktop/mac-clean.jpeg" alt="Equilibrio" width="100%"/>

Pero resulta que la mayoría de los programas que hagas quizás los realices con otras personas. Y aún si lo haces solo, no sería bueno que los demás lo pudieran entender?

Es por eso que les traigo esta guía de lineamientos **basada en el [estándar](https://standardjs.com/) de programación en JavaScript**.

# Guía de lineamientos
El propósito de la creación de esta guía es estandarizar la forma de escribir el código que se desarrolla. Esto para unificar criterios, reducir el tiempo de análisis y facilitar la comprensión y actualización de código previamente escrito.
Esta guía tiene ejemplos en JavaScript y PHP.

# Comentarios
## Reglas generales para la adición de comentarios.
> JavaScript

```javascript
// no comenzar los comentarios en mayúscula ni finalizarlos con punto '.'

/**
 * Los multilínea si comenzarlos en mayúscula
 * Principalmente porque son en general usados para documentar grandes
 * bloques de código, como por ejemplo, funciones
 */

/* usar espacios entre las barras de comentarios */

let x = 'x' // dejar un espacio entre el fin de la sentencia y las barras '//'
```
# Variables
## Declaración de variables
Al declarar variables, evitar dejar el valor inicial como `null`.
Colocar un espacio entre `variable =` y su valor.
> JavaScript

```javascript
// evitar usar 'var' para declarar variables
let cadena = ''   // variable inicializada como 'string'
let numero = 0    // variable inicializada como 'number'
let objeto = {}   // variable inicializada como 'object'
let arreglo = []  // variable inicializada como 'object'
```
> PHP

```php
$cadena = '';       // variable inicializada como 'string'
$numero = 0;        // variable inicializada como 'number'
$arreglo = [];      // variable inicializada como 'array'
```

{% include in-article-ad.html %}

## Operaciones sobre variables
Se recomienda dejar espacios entre operadores al realizar operaciones sobre variables.
> JavaScript

```javascript
let uno = 1
let dos = 2
let tres = uno + dos
let cuatro = uno * 2 + dos
```
> PHP

```php
$uno = 1;
$dos = 2;
$tres = $uno + $dos;
$cuatro = $uno * 2 + $dos;
```
# Comparación de datos
Se recomienda utilizar operadores de comparación triples `===` en vez de `==`

Esto es debido a que la comparación triple `===` verifica que tanto el valor como el tipo de dato sea igual.
```javascript
if ('25' == 25) {
  // comparación exitosa
}
if ('25' === 25) {
  // comparación fallida ya que se está comparando tipo de dato 'string' con 'number'
}
```
# Cadenas
Se recomienda utilizar comillas simples `''` para el manejo de cadenas.
```javascript
let x = 'cadena'
if (x === 'cadena') {
  // condición exitosa
} else {
  // condición no exitosa
}
```
# Validaciones
En caso de querer validar si alguna variable con la que se trata es de un tipo de dato específico, se pueden utilizar las siguientes formas de validación.
> JavaScript

```javascript
// validar si es de tipo entero
let num = 0
if (typeof num === 'number') {
  // validación exitosa
}

// validar si es de tipo cadena
let str = 'hola'
if (typeof str === 'string') {
  // validación exitosa 
}

// validar si es un objeto
let obj = {}
if (typeof obj === 'object') {
  // validación exitosa
}

// validar si es un arreglo
let arr = []
if (Array.isArray(arr)) {
  // validación exitosa
}

// validar si es booleano
let bool = true
if (typeof bool === 'boolean') {
  // validación exitosa
}
```
Usar `typeof x === 'array'` es un error porque los arreglos en JavaScript son objetos.
> PHP

```php
// validar si es de tipo entero
$num = 0
if (is_int($num)) {
  // validación exitosa
}

// validar si es de tipo cadena
$str = 'hola'
if (is_string($str)) {
  // validación exitosa 
}

// validar si es un objeto
$obj = {}
if (is_object($obj)) {
  // validación exitosa
}

// validar si es un arreglo
$arr = []
if (is_array($arr)) {
  // validación exitosa
}

// validar si es booleano
$bool = []
if (is_bool($bool)) {
  // validación exitosa
}
```

{% include in-article-ad.html %}


# Funciones
## Declaración de funciones y llamado de funciones
Al declarar funciones se debe colocar un espacio entre la palabra clave `function`, el paréntesis `()` y la llave inicial `{`.

Esto para diferenciar la declaración de un llamado de función.

> JavaScript

```javascript
// declaración de una función
function soyUnaFuncion () {
  console.log('Esto es una impresión de texto')
}

// declaración de una función en un objeto
let objeto = {
  soyUnaFuncion: function () {
    console.log('Esto es una impresión de texto')
  }
}

// llamado de una función
soyUnaFuncion()
```
> PHP

```php
// declaración de una función
function soyUnaFuncion () {
  echo 'Esto es una impresión de texto';
}

// llamado de una función
soyUnaFuncion();
```
## Uso de funciones nativas del lenguage

JavaScript considera un valor falso si es:
* `false`
* `0`
* `''` o `""`
* `null`
* `undefined`
* `NaN (ejemplo, divisiones entre 0)`

Condicionales `if` y  `else`
```javascript
if (condicion) {
  // código de primera condición
} else if (otraCondicion) {
  // código de segunda condición
} else {
  // código de tercera condición
}

// condiciones ternarias
let condicion = true
(condicion) ? 'Condición acertada' : 'Condición fallida' // condición acertada
```
Ciclos `while` y `for`
```javascript
for (let a = 0; a < 10; a++) {
  // código repetitivo
}

while (true) {
  // código repetitivo
}

do {
  // código repetitivo
} while (true)

```

