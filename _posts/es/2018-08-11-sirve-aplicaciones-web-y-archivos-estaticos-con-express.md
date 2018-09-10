---

title: Sirve aplicaciones web y archivos estáticos con Express
description: Podemos configurar nuestro servidor Express para servir archivos estáticos como aplicaciones web hechas en Angular, React, Vue, imágenes o archivos.
image: /assets/img/desktop/media-grid.jpeg
thumbnail: /assets/img/thumbnail/media-grid.jpg
categories: Tech
tags: code express javascript
locale: es

---

Podemos configurar nuestro servidor Express para servir archivos estáticos como aplicaciones web hechas en Angular, React, Vue, imágenes o archivos.

<img src="/assets/img/desktop/media-grid.jpeg" alt="Grid multimédia" width="100%"/>

{% include toc.md %}

## Creación del servidor
Creamos la carpeta donde irá el servidor Express. Creamos un archivo llamado `index.js` abrimos la consola y escribimos:

```bash
npm init
```
Completamos las opciones que nos solicita. Luego instalamos el módulo express utilizando el siguiente comando:

```bash
npm install --save express
```

Creamos una carpeta dentro del proyecto donde irán nuestros archivos estáticos. En este caso la carpeta se llamará `app`. El árbol de archivos debe quedar así.

```
|-- app
|-- node_modules
|-- index.js
|-- package-lock.json
|-- package.json
```

## Configuración de directorios
Colocamos los archivos estáticos en la carpeta `/app`, por ejemplo, nuestro sitio web, imágenes, archivos css, etc. Para que el servidor Express utilice esa carpeta como fuente de archivos estáticos solo tendríamos que usar el código `express.static()` de la siguiente manera en `index.js`.

```javascript
const express = require('express')
const app = express()

// le decimos al servidor que use /app como fuente de archivos estáticos
app.use(express.static('app'))

// corremos el servidor en el puerto 3000
app.listen(3000, ()=> console.log('Corriendo en http://localhost:3000'))
```
Si por ejemplo en `/app` hubieran archivos llamados `cat.jpeg`, `main.css`, `index.html`, podríamos acceder desde el servidor con las rutas:

```
http://localhost:3000/cat.jpeg
http://localhost:3000/main.css
http://localhost:3000/index.html
```

Si por ejemplo hubiese otra carpeta llamada `static` que también queremos usar como fuente de archivos estáticos simplemente hay que llamar la función nuevamente.

```javascript
// le decimos al servidor que use /app y /static como fuente de archivos estáticos
app.use(express.static('app'))
app.use(express.static('static'))
```
_Express buscará los archivos en el orden que definan los directorios estáticos._

{% include in-article-ad.html %}

## Rutas personalizadas
Si queremos crear una ruta personalizada con la cual acceder los archivos estáticos, lo podemos hacer pasando el nombre como primer parámetro de la función de la siguiente manera:

```javascript
// le decimos al servidor que use /app y /static como fuente de archivos estáticos
app.use('/static', express.static('app'))
app.use('/static', express.static('static'))
```
Accederíamos a los archivos de esta forma:

```
http://localhost:3000/static/cat.jpeg
http://localhost:3000/static/main.css
http://localhost:3000/static/index.html
```
## Configuración para SPA
Si tenemos una aplicación desarrollada en frameworks como Angular, React  o Vue y deseamos que nuestro servidor pueda servir estas aplicaciones y redirigir las rutas para que sean manejadas por la aplicación web, podemos configurar el servidor de la siguiente forma:

_Suponiendo que nuestra aplicación se encuentra en una carpeta llamada `/app`_

```javascript
const express = require('express')
const path = require('path')
const app = express()

// le decimos al servidor que use /app como fuente de archivos estáticos
app.use(express.static('app'))

// redirigimos todas las rutas para que sean manejadas por nuestra aplicación
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/index.html'))
})

// corremos el servidor en el puerto 3000
app.listen(3000, ()=> console.log('Corriendo en http://localhost:3000'))
```
## Conclusiones
A través de `express.static()` el manejo de archivos estáticos se vuelve mucho más simple. Además de permitirnos utilizar un servidor Express para servir aplicaciones web.

Si solo necesitas servir un sitio web estático puede que no necesites un servidor como tal, hay opciones gratuitas para hosting de aplicaciones web entre las que se encuentran `Github Pages`, `Netlify`, `Firebase Hosting` y `Surge`.

Espero este artículo les sea de ayuda. ¡Saludos!