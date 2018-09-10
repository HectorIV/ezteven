---

title: Crea y administra proyectos en VueJs desde una interfaz gráfica
description: Con el nuevo Vue CLI, podemos crear y administrar proyectos en VueJs con una interfaz gráfica. Además de esto el cli nos permite, a través de la misma interfaz, realizar otras tareas como administrar plugins, dependencias y configuraciones.
image: /assets/img/desktop/vue-ui-dashboard.png
thumbnail: /assets/img/thumbnail/vue-ui-dashboard.jpg
categories: Tech
tags: code vue javascript development
locale: es

---

Con el nuevo Vue CLI, podemos crear y administrar proyectos en VueJs con una interfaz gráfica. Además de esto el cli nos permite, a través de la misma interfaz, realizar otras tareas como administrar plugins, dependencias y configuraciones.

<img src="/assets/img/desktop/vue-ui-dashboard.png" alt="VueJs UI" width="100%"/>

{% include toc.md %}

Ahora que frameworks como Angular, React y Vue se han popularizado entre los desarrolladores frontend, es común encontrarnos usando la terminal para crear proyectos, instalar módulos de `npm` y manejar plugins y configuraciones que nuestra aplicación requiere. El nuevo `cli` de `vue` nos permite realizar estas mismas cosas a través de `vue ui`, un medio gráfico que se ejecuta en el navegador que nos posibilita administrar, actualizar y analizar nuestro proyecto a través de paneles, gráficos.

A continuación les mostraré como instalar y ejecutar `vue ui` para generar una aplicación con VueJS.

## Prerrequisitos
Para ejecutar y comprender mejor los pasos es necesario tener:
* `nodejs` instalado y por ende `npm` también.
* Conocimiento general de la sintaxis de Vuejs y su funcionamiento.

{% include in-article-ad.html %}

## Instalación
Ejecutamos el siguiente comando en la consola para instalar el nuevo `cli` de `vuejs`.

```bash
$ npm install -g @vue/cli
```
En linux quizás sea necesario ejecutar el comando con `sudo`.

Luego de que se complete la instalación del `cli` solo debemos navegar al directorio donde deseamos crear el proyecto, abrimos la consola y escribimos:

```bash
$ vue ui
```
El comando mostrará un mensaje similar a este:

```bash
$ vue ui
Starting GUI...
Ready on http://localhost:8000
```
Abrimos nuestro navegador de preferencia y escribimos `http://localhost:8080`. Se nos debe mostrar una aplicación web con una pantalla similar a esta donde saldría el listado de proyectos creados.

<img src="/assets/img/desktop/vue-ui-main.png" alt="Página inicial de vue ui" width="100%"/>

## Creación de una aplicación

Para crear una aplicación con VueJs, procedemos a la pestaña que dice `Create`, buscamos la ruta donde vamos a crear el proyecto y hacemos click en el botón verde en la parte inferior que dice `Create a new project here`.

Luego de elegir el lugar donde crear la aplicación, veremos una pantalla como esta.

<p align="center">
<img src="/assets/img/desktop/vue-ui-create-details.png" alt="Detalles al crear proyecto" width="75%"/>
</p>

Procedemos a darle un nombre al proyecto donde dice `Project folder`. Seleccionamos el manejador de paquetes, entre las opciones tenemos `npm` y `yarn`. Podemos seleccionar cualquiera de los dos. En la siguiente opción seleccionamos si deseamos inicializarlo como un proyecto con control de versiones `git` o no.

Se nos mostrará la siguiente pantalla.

<img src="/assets/img/desktop/vue-ui-create-presets.png" alt="Presets de vue ui" width="100%"/>

Aquí seleccionamos el `preset` que queremos usar para la aplicación. Un `preset` no es más que un conjunto de plugins y configuraciones con los que se creará el proyecto. Si seleccionamos `Default preset` el proyecto se creará con `babel` que transpila JavaScript 'moderno' para que funcione en navegadores más antiguos. Además de eso configurará `eslint` que permite mostrar errores de sintaxis cuando programamos con JavaScript. `eslint` está basada en [JavaScript Standard](https://standardjs.com/) del cual hice un [resumen general aquí](/tech/2018/07/14/escribe-codigo-mas-legible-con-los-siguientes-consejos.html).

Procedemos a seleccionar `Default preset` y luego el botón verde en la parte inferior derecha que dice `Create Project`. Mientras se crea el proyecto veremos la siguiente pantalla.

<p align="center">
<img src="/assets/img/desktop/vue-ui-create-creating.png" alt="Creando proyecto con vue ui" width="75%"/>
</p>

Luego veremos lo siguiente

<img src="/assets/img/desktop/vue-ui-project.png" alt="Pantalla después de creación de proyecto" width="100%"/>

## Plugins
El nuevo `vue-cli` usa una arquitectura basada en plugins, los plugins son paquetes que comienzan con `@vue/cli-plugin-` y que tienen al capacidad de añadir funcionalidades a los proyectos a través de modificaciones a las configuraciones del mismo. La mayor parte de la creación de un proyecto se hace a través de plugins, en nuestro caso el `Default preset` hace uso de plugins como `@vue/cli-service`, `@vue/cli-plugin-babel` y el `@vue/cli-plugin-eslint`.

A través de `vue-ui` podemos agregarle funcionalidades a la aplicación como:
* Internacionalización (soporte para múltiples idiomas).
* Soporte para [TypeScript](https://www.typescriptlang.org/).
* Soporte para PWA (Progressive Web Application).
* Además de frameworks de diseño como Bootstrap, Vuetify, Bulma, ElementUI, entre otros.

Para hacerlo solo basta con dar click en el botón `Add plugin` que se encuentra en la parte superior derecha y seleccionar un plugin del listado.

<img src="/assets/img/desktop/vue-ui-project-plugins.png" alt="Agregar plugins a vuejs" width="100%"/>

## Dependencias
Las dependencias son módulos que son utilizados por los desarrolladores o por otros módulos. Estos se guardan en la carpeta `node_modules` y son manejados por las propiedades `dependencies` y `devDependencies` del `package.json` del proyecto. Cualquier proyecto inicializado con `npm` posee un `package.json`.

<img src="/assets/img/desktop/vue-ui-project-dependencies.png" alt="Dependencias del proyecto" width="100%"/>

`vue-ui` permite buscar, agregar y quitar dependencias desde un entorno gráfico. Navegamos a el panel de dependencias, el cual es la siguiente opción al panel de plugins. Veremos las dependencias principales instaladas por defecto. Al igual que con los plugins, podemos hacer click sobre el botón verde que se encuentra en la parte superior derecha para agregar nuevas dependencias.

<img src="/assets/img/desktop/vue-ui-project-dependencies-search.png" alt="Búsqueda de dependencias" width="100%"/>

## Ejecución
Normalmente para ejecutar un proyecto generado por `vue-cli` en modo desarrollo, se abre una consola de comandos dentro de la carpeta del proyecto y se escribe `npm run serve`. Sin embargo `vue ui` tiene una pantalla llamada `tasks`, la cual es la última opción del panel izquierdo. Para correr el proyecto, hacemos click en `serve` y luego en `run task`. Esto construye el proyecto y lo ejecuta,

<img src="/assets/img/desktop/vue-ui-project-tasks.png" alt="Panel de tareas" width="100%"/>

Cuando el proyecto está listo, procedemos a hacer click en el botón que dice `open app` para abrir en una pestaña nueva la aplicación.

<img src="/assets/img/desktop/vue-ui-project-run.png" alt="Aplicación lista" width="100%"/>

La página de la aplicación será similar a esta.

<img src="/assets/img/desktop/vue-ui-app.png" alt="Aplicación vue" width="100%"/>

## Misceláneos
## Importación de proyectos ya existentes
Si ya tenemos proyectos creados con `vue init` , podemos importarlos también y administrarlos desde la interfaz de `vue cli`. Para eso en la pantalla principal de `vue ui` nos desplazamos a la pestaña de `Import` y seleccionamos el proyecto que deseamos importar.

<img src="/assets/img/desktop/vue-ui-project-import.png" alt="Importación de proyecto" width="100%"/>

## Pestaña de configuraciones
En el panel derecho hay una pestaña llamada `Configuration`, esta nos da opciones ya más avanzadas para configurar nuestro proyecto. Entre esas opciones esta el folder donde se construirá el proyecto, las reglas de sintaxis que queremos sean requeridas en nuestro proyecto, entre otras opciones. Las configuraciones por defecto funcionan para la mayoría de proyectos.

<img src="/assets/img/desktop/vue-ui-project-settings.png" alt="Configuraciones del proyecto" width="100%"/>

## Tema oscuro
En parte inferior de la página podemos cambiar el tema a tema oscuro. Para hacerlo solo debemos hacer click sobre el ícono de gotita.

<p align="center">
<img src="/assets/img/desktop/vue-ui-change-theme.png" alt="Cambio de tema" width="75%"/>
</p>
## Conclusiones
El nuevo `vue-cli` nos da a los desarrolladores herramientas que nos facilitan la creación y posterior administración de nuestros proyectos al permitirnos importar proyectos ya creados con vue y darnos la facilidad de manejar las dependencias de los mismos, sus configuraciones y ejecución desde una interfaz simple, amigable y con mucha información que nos ayuda en la toma de decisiones. Una vez creado el proyecto, podemos proceder a programar nuestra aplicación en nuestro editor de texto preferido. A medida que guardemos nuestros cambios, el `cli` refrescará automáticamente nuestra aplicación y nos mostrar errores en caso de que los haya.

Espero esta guía les permita familiarizarse con el nuevo `vue ui` y les permita simplificar el proceso de administración de sus proyectos.

¡Saludos!