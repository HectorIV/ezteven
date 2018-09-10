---

title: Crea un servidor Express con GraphQL
description: Entre las tecnologías más interesantes de estos últimos años en lo que a desarrollo web se refiere, se encuentra la librería Express para crear servidores en nodejs y GraphQL, un lenguage de consulta para APIs que permite solicitar exactamente la información que se necesita de forma dinámica.
image: /assets/img/desktop/mac-code-hand.jpeg
thumbnail: /assets/img/thumbnail/mac-code-hand.jpg
categories: Tech
tags: code express graphql javascript
locale: es

---

<img class="thumbnail" src="/assets/img/desktop/mac-code-hand.jpeg" alt="Express GraphQL home page" width="100%" />

{% include toc.md %}

Entre las tecnologías más interesantes de estos últimos años en lo que a desarrollo web se refiere, se encuentra la librería Express para crear servidores en nodejs y GraphQL, un lenguage de consulta para APIs que permite solicitar exactamente la información que se necesita de forma dinámica.

Pueden interactuar con la ejecución de esta guía haciendo [click en este enlace](https://ez-playground.herokuapp.com/blog/crea-un-servidor-express-con-graphql).

## Prerrequisitos
Para ejecutar y comprender mejor los pasos es necesario tener:
* `nodejs` instalado y por ende `npm` también.

## Creación del proyecto
Crear un servidor con Express y GraphQL es relativamente sencillo, para comenzar navegamos a la carpeta donde vamos a crear nuestro servidor. Dentro de la carpeta abrimos la consola, creamos un directorio y navegamos dentro de el. En este caso la carpeta se llamará `express-gql`.

```bash
$ mkdir express-gql
$ cd express-gql
```
Vamos a inicializar el proyecto con `npm` utilizando `npm init`, rellenamos las opciones que nos solicita.

```bash
$ npm init
```
Luego vamos completando las opciones, si no colocamos nada, automáticamente se seleccionara el valor por defecto. Pueden reemplazar `<nombre-de-autor>` por sus nombres.

```bash
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (express-gql)
version: (1.0.0)
description: Un servidor con graphql
entry point: (index.js)
test command:
git repository:
keywords:
author: <nombre-de-autor>
license: (ISC) MIT
About to write to /<...path-to-folder>/express-gql/package.json:

{  
  "name": "express-gql",  
  "version": "1.0.0",  
  "description": "Un servidor con graphql",  
  "main": "index.js",  
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"  
  },
  "author": "<nombre-de-autor>",
  "license": "MIT"
}


Is this OK? (yes) yes
```

{% include in-article-ad.html %}


Luego de esto instalamos las dependencias que vamos a necesitar con el siguiente comando:

```bash
$ npm install --save express graphql express-graphql
```

Una vez las dependencias estén instaladas, procedemos a crear el archivo principal que vamos a usar con el nombre de `index.js`.

En nuestro editor de texto de preferencia, abrimos el archivo `index.js`.

Procederemos a escribir y explicar el código.

Primero importaremos los paquetes que necesitamos.

```javascript
const express = require('express')
const expressGraphQL = require('express-graphql')
const { buildSchema } = require('graphql')
```
Luego creamos un esquema, un esquema en graphql es donde definimos que tipo de acción se puede realizar (ej. Query, Mutation), el nombre de la misma y el tipo de dato que retorna. Además de esto también podemos definir nuevos tipos de datos.

Los `Query` son usados para traer información y los `Mutation` para modificar la misma.

Vamos a crear tres `Query`, un `Mutation` y un tipo de dato nuevo.

```javascript
// esquema de graphql
const schema = buildSchema(`
  type Query {
    mensaje: String
    persona(id: Int!): Persona
    personas(edad: Int!): [Persona]
  },
  type Mutation {
    actualizarEdad(id: Int!, edad: Int!): Persona
  },
  type Persona {
    id: Int,
    nombre: String,
    apellido: String,
    edad: Int,
    hobbies: [String]
  }
`)
```

{% include in-article-ad.html %}


Definimos tres `Query`, `mensaje`, `persona` y `personas`. Tanto `persona` como `personas` requieren parámetros. Colocamos un `!` luego del tipo de dato para especificar que es un parámetro requerido. `persona` retorna un objeto de tipo `Persona` y `personas` retorna un arreglo de objetos de tipo `Persona`.

Definimos también una mutación llamada `actualizarEdad` que recibe dos parámetros de tipo `Int` y retorna un objeto de tipo `Persona`.	

Por último definimos un nuevo tipo de dato llamado `Persona`, que contiene las propiedades `id`, `nombre`, `apellido`, `edad` y `hobbies`. `hobbies` fue definido como `[String]` por lo que puede contener un arreglo de cadenas.

Como no estamos usando una base de datos en esta guía, vamos a crear un archivo `.json` que contenga la información que vamos a manipular. Vamos a crear un archivo nuevo llamado `personas.json`.

Y le agregamos la siguiente información al archivo:

```json
[
  {
    "id": 1,
    "nombre": "Carlos",
    "apellido": "Rodriguez",
    "edad": 21,
    "hobbies": ["programar", "cantar", "cine", "dibujar"]
  },
  {
    "id": 2,
    "nombre": "Jesus",
    "apellido": "Medina",
    "edad": 23,
    "hobbies": ["cocinar", "música", "cine", "salir"]
  },
  {
    "id": 3,
    "nombre": "Karla",
    "apellido": "Araúz",
    "edad": 18,
    "hobbies": ["dibujar", "cocinar", "salir"]
  },
  {
    "id": 4,
    "nombre": "Marcos",
    "apellido": "Navarro",
    "edad": 25,
    "hobbies": ["programar", "musica"]
  },
  {
    "id": 5,
    "nombre": "Jose",
    "apellido": "Mendoza",
    "edad": 18,
    "hobbies": ["editar videos", "cantar", "tocar guitarra"]
  }
]
```
Procedemos a traer el archivo en nuestro `index.js`. El código quedaría así:

```javascript
const express = require('express')
const expressGraphQL = require('express-graphql')
const { buildSchema } = require('graphql')
// linea nueva
let personas = require('./personas.json')
```

{% include in-article-ad.html %}


Ahora le diremos a la API de graphql como traer esa información que definimos en el esquema. Para esto crearemos funciones que manipulen el arreglo de objetos `personas` que requerimos hace poco. Es importante saber que las modificaciones que se hagan sobre los datos en tiempo de ejecución no se modificarán en el archivo real, es decir en `personas.json`, ya que estamos usando una variable temporal con la cual requerimos el archivo.

Procedo a colocar el código con las funciones que se le aplicarán a nuestro esquema. Cuando se lleva  acabo una consulta con graphql se recibe un objeto de argumentos, estos argumentos son los parámetros enviados con la consulta.  Estaré utilizando `destructuración de objetos` para utilizar las propiedades directamente al crear la función. Más información [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring).

```javascript
// para los query
const getMensaje = () => 'Hola desde el servidor con graphql'
const getPersona = ({ id }) => personas.filter((persona) => persona.id === id)[0] || []
const getPersonas = ({ edad }) => personas.filter((persona) => persona.edad === edad)
// para la mutación
const actualizarEdad = ({ id, edad }) => {
  personas.map((persona) => {
    if (persona.id === id) { persona.edad = edad }
    return persona
  })
  return getPersona({ id })
}
```
`express-graphql` recibe un objeto con una propiedad llamada `rootValue`, el 	`rootValue` recibe un objeto con los mismos nombres definidos en el esquema y como éstas consultas serán procesadas.

Procedemos a crear un objeto llamado `root` y le pasamos las funciones creadas arriba:

```javascript
const root = {
  mensaje: getMensaje,
  persona: getPersona,
  personas: getPersonas,
  actualizarEdad: actualizarEdad
}
```
Por último vamos a crear el servidor express con el endpoint `/graphql` manejado por `expressGraphQL`:

```javascript
// creamos el servidor express con graphql en el endpoint /graphql
const app = express()
const port = 4000
app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port, () => console.log(`Servidor graphql corriendo en http://localhost:${port}/graphql`))
```

El archivo `index.js` debe quedar de la siguiente forma:

```javascript
const express = require('express')
const expressGraphQL = require('express-graphql')
const { buildSchema } = require('graphql')
let personas = require('./personas.json')

// esquema de graphql
const schema = buildSchema(`
  type Query {
    mensaje: String
    persona(id: Int!): Persona
    personas(edad: Int!): [Persona]
  },
  type Mutation {
	  actualizarEdad(id: Int!, edad: Int!): Persona
  },
  type Persona {
    id: Int,
    nombre: String,
    apellido: String,
    edad: Int,
    hobbies: [String]
  }
`)

// para los query
const getMensaje = () => 'Hola desde el servidor con graphql'
const getPersona = ({ id }) => personas.filter((persona) => persona.id === id)[0] || []
const getPersonas = ({ edad }) => personas.filter((persona) => persona.edad === edad)
// para la mutación
const actualizarEdad = ({ id, edad }) => {
  personas.map((persona) => {
    if (persona.id === id) { persona.edad = edad }
    return persona
  })
  return getPersona({ id })
}

const root = {
  mensaje: getMensaje,
  persona: getPersona,
  personas: getPersonas,
  actualizarEdad: actualizarEdad
}

// creamos el servidor express con graphql en el endpoint /graphql
const app = express()
const port = 4000
app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port, () => console.log(`Servidor graphql corriendo en http://localhost:${port}/graphql`))
```
{% include in-article-ad.html %}

## Ejecución

Pueden interactuar con la ejecución de esta guía haciendo [click en este enlace](https://ez-playground.herokuapp.com/blog/crea-un-servidor-express-con-graphql).

Para correr nuestro servidor ejecutamos el siguiente comando en la consola dentro del proyecto:

```bash
$ node index.js
```

Al navegar a [http://localhost:4000/graphql](http://localhost:4000/graphql), se les deberá mostrar la siguiente página:

<img src="/assets/img/desktop/express-graphql-home.png" alt="Express GraphQL home page" width="100%" />

Tenemos acceso a un panel gráfico para interactuar con nuestro API ya que colocamos `graphiql: true` al crear el endpoint.

## Pruebas con GraphiQL
Si colocamos `{ mensaje }` del lado derecho, el API debe mostrar el siguiente resultado:

<img src="/assets/img/desktop/express-graphql-home-1.png" alt="Express GraphQL home page" width="100%" />

También podemos pasar parámetros a nuestras consulta, podemos por ejemplo, traer `persona` con `id: 1` y especificar que propiedades queremos obtener de la siguiente forma:

<img src="/assets/img/desktop/express-graphql-home-2.png" alt="Express GraphQL home page" width="100%" />

Vemos que solo estamos mostrando las propiedades `id`, `nombre` y `hobbies`.

Podemos también emplear el `Query` que creamos llamado `personas` que recibe una edad.

<img src="/assets/img/desktop/express-graphql-home-3.png" alt="Express GraphQL home page" width="100%" />

Para ejecutar una mutación debemos primero definirla como tal, en este caso definimos una mutación llamada actualizarEdad y especificamos que debe tener `id` y `edad` de tipo `Int`. Veremos que luego de ejecutar la mutación la función que definimos retorna el objeto donde se puede ver la información de la edad modificada.

Ahora cambiaremos la edad de `Carlos` de `21` años a  `18` ejecutando la mutación que creamos:

<img src="/assets/img/desktop/express-graphql-home-4.png" alt="Express GraphQL home page" width="100%" />

Cabe señalar que como definimos una mutatición con variables `$id` y `$edad` es necesario definirlas en la parte de abajo donde dice `Query Variables`.

Si consultamos nuevamente el query `personas` con edad `18` veremos que ahora `Carlos` aparecer en el listado:

<img src="/assets/img/desktop/express-graphql-home-5.png" alt="Express GraphQL home page" width="100%" />

## Conclusiones
Con estos ejemplos vemos que GraphQL nos brinda un entorno gráfico donde podemos probar nuestros esquemas y procesos. Específicamente en nuestro caso logramos emplear diversos conceptos de GraphQL como son los esquemas, los métodos que resuelven los mismos y la configuración de estos en un servidor Express.

Espero esta guía les sea de ayuda. ¡Saludos!
