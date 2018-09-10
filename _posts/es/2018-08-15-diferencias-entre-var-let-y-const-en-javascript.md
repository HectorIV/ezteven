---

title: Diferencias entre var, let y const en JavaScript
description: Al la hora de declarar variables es común utilizar var, ya que es el método normalmente conocido. Sin embargo, desde ECMAScript 6, se introdujo a JavaScript dos nuevas palabras claves para declarar variables, las cuales son let y const. Para entender la necesidad de estas primero vamos a ver algunos puntos de como funciona var.
image: /assets/img/desktop/js-code.jpeg
thumbnail: /assets/img/thumbnail/js-code.jpg
categories: Tech
tags: code javascript
locale: es

---

Una de las características que posee JavaScript es su versatilidad. Al ser un lenguaje débilmente tipado y flexible nos permite hacer ciertas cosas que, aunque convenientes, no son las mejores prácticas y nos pueden llevar a cometer errores en nuestro código más adelante.

<img src="/assets/img/desktop/js-code.jpeg" alt="Código" width="100%"/>

Al la hora de declarar variables es común utilizar `var`, ya que es el método normalmente conocido. Sin embargo, desde [ECMAScript 6](https://www.w3schools.com/js/js_es6.asp), se introdujo a JavaScript dos nuevas palabras claves para declarar variables, las cuales son `let` y `const`. Para entender la necesidad de estas primero vamos a ver algunos puntos de como funciona `var`.

Las variables declaradas con `var` son añadidas al inicio de código en tiempo de ejecución, por lo que son variables globales.

Por ejemplo, tenemos esta función con una variable declarada dentro

```javascript
function miFuncion (numero, comparar) {
  var estado
  if (numero < comparar) {
    estado = 'El número es menor'
  } else if (numero > comparar) {
    estado = 'El número es mayor'
  } else {
    estado = 'El número es igual'
  }
  return estado
}

miFuncion(1, 2) // EL número es menor
```

Lo que sucede en realidad es lo siguiente

```javascript
var estado // 'estado' es globalizada

function miFuncion (numero, comparar) {
  if (numero < comparar) {
    estado = 'El número es menor'
  } else if (numero > comparar) {
    estado = 'El número es mayor'
  } else {
    estado = 'El número es igual'
  }
  return estado
}

miFuncion(1, 2) // EL número es menor

// por lo que si usaramos la variable estado fuera de la función, existiría, solo que estaría indefinida.
console.log(estado) // undefined
```

Incluso esto funcionaría sin problemas (aunque es mala práctica)

```javascript
function miFuncion (numero, comparar) {
  if (numero < comparar) {
    estado = 'El número es menor'
  } else if (numero > comparar) {
    estado = 'El número es mayor'
  } else {
    estado = 'El número es igual'
  }
  var estado // no lo hagan
  return estado
}

miFuncion(1, 2) // EL número es menor
```

Este comportamiento es llamado __hoisting__, y sucede aunque lo queramos o no.

Sin embargo `let` y `const` no funcionan de esa forma. _A diferencia de `var` estas si funcionan a nivel de bloque de código y no son transformadas a variables globales en tiempo de ejecución. Esto nos permite tener más control de cómo y dónde declaramos las variables y en qué lugares estas pueden ser manipuladas._

{% include in-article-ad.html %}

La palabra clave `const` como lo dice su nombre, se diferencia de `let` en que sus valores no pueden ser modificados una vez es inicializada, por lo que debe ser inicializada con un valor. Esto es bueno pues nunca tendremos variables de tipo constante indefinidas.

Utilizando el mismo ejemplo con `let`

```javascript
function miFuncion (numero, comparar) {
  let estado
  if (numero < comparar) {
    estado = 'El número es menor'
  } else if (numero > comparar) {
    estado = 'El número es mayor'
  } else {
    estado = 'El número es igual'
  }
  return estado
}

miFuncion(1, 2) // EL número es menor

// en este caso la variable estado no existe fuera de la función ‘miFuncion’
// por lo que marcaría error.
console.log(estado) // ReferenceError: estado is not defined
```

Ahora el mismo ejemplo con `const`

```javascript
function miFuncion (numero, comparar) {
  const estado
  if (numero < comparar) {
    estado = 'El número es menor' // TypeError: Assignment to constant variable.
  } else if (numero > comparar) {
    estado = 'El número es mayor' // TypeError: Assignment to constant variable.
  } else {
    estado = 'El número es igual' // TypeError: Assignment to constant variable.
  }
  return estado
}

miFuncion(1, 2) // TypeError: Assignment to constant variable.
```

Si bien `const` nos da la posibilidad de declarar constantes. Un punto a tomar en cuenta es que cuando el valor de la constante es una referencia, es decir, un `object`, a la constante no se le puede reasignar otro objeto pero si se le puede modificar el que ya posee. Esto debido a que la referencia al objeto se mantiene, aunque sus propiedades se vean modificadas.

Ejemplo

```javascript
// válido
const persona = {
  nombre: '',
  apellido: '',
  edad: ''
}
const coche = {
  ruedas: '',
  color: '',
  puertas: ''
}

// no marca error, pues la referencia a 'persona' no esta siendo modificada.
persona.nombre = 'Carlos'

// TypeError: Assignment to constant variable
// Error, pues se esta intentando cambiar la referencia del objecto 'persona' por la del objecto 'coche'
persona = coche
```

Debido a estas razones es muy recomendable usar `let` en vez de `var`. Además cuando declaremos constantes, utilizar `const`. Con esto evitamos malas prácticas y adquirimos más control sobre el funcionamiento de nuestra aplicación.
