---

title: ¿Cómo llamar un API GraphQL con JavaScript?
description: Una vez tenemos un servidor con un API GraphQL funcionando, necesitamos una forma de acceder a esa información desde nuestra aplicación. A continuación les mostraré distintas formas de consultar un API GraphQL desde JavaScript.
image: /assets/img/desktop/mac-code-side.jpeg
thumbnail: /assets/img/thumbnail/mac-code-side.jpg
categories: Tech
tags: code graphql javascript
locale: es

---

<img class="thumbnail" src="/assets/img/desktop/mac-code-side.jpeg" alt="Express GraphQL home page" width="100%" />

{% include toc.md %}

Una vez tenemos un servidor con un API GraphQL funcionando, necesitamos una forma de acceder a esa información desde nuestra aplicación. A continuación les mostraré distintas formas de consultar un API GraphQL desde JavaScript.

Para las consultas usaremos las mismas `Query` que utilizamos en el post [Crea un servidor Express con GraphQL]({{ site.url }}/tech/2018/08/02/crea-un-servidor-express-con-graphql.html). Las pruebas se encuentran en la sección [Pruebas con GraphiQL]({{ site.url }}/tech/2018/08/02/crea-un-servidor-express-con-graphql.html#pruebas-con-graphiql) de ese post.

Estaremos usando `back-tick`, es decir (\` \`) en vez de `(" ")` o `(' ')` para las cadenas ya que estas nos permiten colocar cadenas multilíneas en JavaScript.

## Axios
`Axios` es una librería para hacer consultas con ajax. Es popular por su simplicidad y su uso basado en `Promises` además de tener soporte para `async` y `await`.

```javascript
// query de personas con edad de 18 años
axios({
  url: 'http://localhost:4000/graphql',
  method: 'POST',
  data: {
    query: `
      query {
        personas(edad: 18) {
          id
          nombre
          apellido
          edad
          hobbies
        }
      }
    `
  }
})
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err))
```

## Fetch
`Fetch` es una función nativa de JavaScript para hacer consultas ajax, sin embargo no tiene soporte en navegadores antiguos.

```javascript
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `
    query {
      persona(id: 1) {
        id
        nombre
        apellido
        hobbies
      }
    }
  ` }),
})
  .then(res => res.json())
  .then(res => console.log(res))
```

{% include in-article-ad.html %}

## XMLHttpRequest
Al igual que `fetch`, `XMLHttpRequest` es una función nativa de JavaScript, solo que a diferencia de `fetch` tiene mucho mejor soporte para navegadores más antiguos.

```javascript
let query = {
  query: `
    query {
      persona(id: 1) {
        id
        nombre
        apellido
        hobbies
      }
    }`,
}

let xhr = new XMLHttpRequest()
xhr.responseType = 'json'
xhr.open('POST', 'http://localhost:4000/graphql')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.onload = function () {
  console.log(xhr.response)
}

xhr.send(JSON.stringify(query))
```
## Misceláneos
Podemos crear funciones alrededor de estos métodos de consulta que nos permitan acortar código y nos eviten repetir lo mismo una y otra vez. Mostraré un ejemplo con axios.

```javascript
// wrapper para consultar un api graphql con axios
function gql (query) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'POST',
      data: { query },
    })
      .then((res) => resolve(res.data['data']))
      .catch((err) => reject(err))
  })
}
```
Luego podríamos usar esta función de la siguiente forma

```javascript
gql(`
  query {
    persona(id: 1) {
      id
      nombre
      apellido
      hobbies
    }
  }
`)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
```
De esta forma podemos consumir nuestro API con el método que sea de nuestra preferencia.

Espero esta guía les sea de ayuda. ¡Saludos!