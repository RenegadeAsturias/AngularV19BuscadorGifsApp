
* AngularV19GifsApp
* Curso de Angular v19 de Cero a Experto. Regrabado 2025.

************************************************** (12/05/2025)

1º Me creo el proyecto en GitHub: 

echo "# AngularV19GifsApp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/RenegadeAsturias/AngularV19GifsApp.git
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/RenegadeAsturias/AngularV19GifsApp.git
git branch -M main
git push -u origin main


2º Por ejemplo desde el terminal de Bash del VSCode configuro mis credenciales de Git en la máquina virtual:
git config --global user.name "<>" 
git config --global user.email "<>"

3º Me creo el proyecto en el VSCode:
Creo el proyecto: desde /c/angular
$ ng new AngularV19GifsApp

e inicializo el proyecto para utilizar Git: git init

4º Me creo el remoto apuntando al proyecto de GitHub y establezco la rama principal 
git remote add origin https://github.com/RenegadeAsturias/AngularV19GifsApp.git
git branch -M main

5º Y actualizo el proyecto remoto con la nueva aplicación local
git add . 
git commit -m "Curso AngularV19GifsApp" 
git push -u origin main

--Para recuper la info git pull origin main

************************************************** (13/05/2025)

cd src/app
mkdir shared
mkdir gifs
cd gifs
mkdir components
mkdir interfaces
mkdir services
mkdir pages

************************************************** (13/05/2025)

Vamos a utilizar tailwindcss v4.1
https://tailwindcss.com/ -> Get started
https://tailwindcss.com/docs/installation/framework-guides/angular

Install Tailwind CSS with Angular

Setting up Tailwind CSS in an Angular project.
01 Create your project

Start by creating a new Angular project if you don’t have one set up already. The most common approach is to use Angular CLI. Terminal
ng new my-project --style css
cd my-project

02 Install Tailwind CSS
Install @tailwindcss/postcss and its peer dependencies via npm.
Terminal
npm install tailwindcss @tailwindcss/postcss postcss --force

03
Configure PostCSS Plugins
Create a .postcssrc.json file in the root of your project and add the @tailwindcss/postcss plugin to your PostCSS configuration.
.postcssrc.json

{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}

04 Import Tailwind CSS

Add an @import to ./src/styles.css that imports Tailwind CSS.
styles.css

@import "tailwindcss";

05 Start your build process
Run your build process with ng serve.
Terminal
ng serve

06
Start using Tailwind in your project
Start using Tailwind’s utility classes to style your content.
app.component.html

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

************************************************** (14/05/2025)

* Configuración Angular-Schematics en: settings.json

{
    "angular-schematics.schematicsDefaultOptions": {
        "angular-*": {
            "externalTemplate": true,
            "skipStyle": true
        }
    }
}

* Carga Perezosa, carga por defecto de nuestro componente
* Hace una importación que es un promesa y cuando ser recupera la importación carga nuestro componente

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=>import('./gifs/pages/dashboard-page/dashboard-page.component')
      .then((c)=>c.DashboardPageComponent)
  }

* Otra solución es dejar la promesa 
* Y añadirle la definición de la clase del componente un 'default'

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=>import('./gifs/pages/dashboard-page/dashboard-page.component')
  }

Y añadimos 'default'
export default class DashboardPageComponent { }

************************************************** (14/05/2025)

* Rutas hijas: children
* http://localhost:4200/dashboard
* http://localhost:4200/dashboard/search
* http://localhost:4200/dashboard/trending

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=>import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: ()=>import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path: 'search',
        loadComponent: ()=>import('./gifs/pages/search-page/search-page.component')
      },
    ]

************************************************** (14/05/2025)

* Rutas hijas: children * Por defecto
* También podemos añadir una ruta hija por defecto

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=>import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      ------------------------------
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]

************************************************** (14/05/2025)

* Componentes para el menú lateral
* Componente gifs-side-menu
* Componente gifs-side-menu-header
* Componente gifs-side-menu-options

************************************************** (14/05/2025)

RouterLinks: Desde componentes hijos


* Para obtener las fuentes para el menú, descargamos la versión más actual: 6.7.2
https://cdnjs.com/libraries/font-awesome
Copiamos el link de la versión y lo añadimos al index.html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

* Para obtener los iconos de menú utilizamos el buscador de la página:
https://fontawesome.com/icons
Ejemplo del icono de la lupa para el buscador de iconos
<i class="fa-solid fa-magnifying-glass"></i>

************************************************** (16/05/2025)
* Angular: Environments:

$ ng g environments
CREATE src/environments/environment.ts (31 bytes)
CREATE src/environments/environment.development.ts (31 bytes)
UPDATE angular.json (2964 bytes)

export const environment = {
  production: true,
  companyName: 'Gifs',
  companyName2: 'App',
  eslogan: 'Maneja tus gifs',
  // Api keys
  // URLS
};

* En la clase del componente cabecera, creamos una referencia al environment
export class GifsSideMenuHeaderComponent {
  envs = environment;
}

* Y en el html de la cabecera ya pintamos sus valores
Ejemplo: {{envs.companyName}}


************************************************** (16/05/2025)
* Angular: Path Alias

import { environment } from '../../../../../environments/environment';

En typescript configuramos en el tsconfig.json, una propiedad 'baseURL'
Y definimos el alias: @environments que apunta a: src/environments/*"
Una vez añadido el alias borramos el import anterior y ya el assitente nos sugiere la nueva ruta:

// import { environment } from '../../../../../environments/environment';
import { environment } from '@environments/environment';
// que apunta a: module "c:/angular/AngularV19GifsApp/src/environments/environment"
// y que si hacemos clic nos lleva al objeto

"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@environments/*": ["src/environments/*"]
  },



************************************************** (16/05/2025)
* Component gif-list
* Component gif-list-item

************************************************** (19/05/2025)
* Pasar los datos a los componentes, pasos:

1º- De momento, para no crearnos un servicio aún, definimos un array de strings urls
y las añadimos en la clase del componente:
trending-page.component.ts

const imageUrls: string[] = [
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];

export default class TrendingPageComponent {
  gifs = imageUrls; *************************** Puesto que el array está fuera de la clase
}


2º- Vamos a empezar por el objeto más inferior
y añadimos en la clase del componente 'gif-list-item' que vamos a recibir un input con una url
Donde lo que requerimos que nos llegue es 'imageUrl' que una señal:

export class GifListItemComponent {
  imageUrl = input.required<string>(); ********** valor requerido de una url señal
}

3º- En el html de la clase del componente 'gif-list-item'
y puesto que lo que vamos a pintar es una señal tendremos: [src]="imageUrl()"

<img class="h-auto max-w-full rounded-lg" [src]="imageUrl()" alt="" />

4º- En la clase del componente da la lista de gifs : 'gif-list'
nos tiene que llegar el listado de urls:

export class GifListComponent {
  gifs = input.required<string[]>(); ********** valor requerido del listado de urls señal
}

5º- En la etiqueta del html de la clase hay que mandar cada gif al componente hijo
que espera la url de la imagen para pintar el gif

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  @for (gif of gifs(); track gif) {
    <gif-list-item [imageUrl]="gif"/>
  }
</div>

6º- En la etiqueta del html de la clase 'trending-page' pasamos el array de urls

* En la clase del componente
export default class TrendingPageComponent {
  gifs = signal(imageUrls); ******************* Puesto que el array está fuera de la clase
}

* En el html del componente, que también llama a la señal del array
<section class="py-5">
  <gif-list [gifs]="gifs()"/>
</section>

************************************************** (20/05/2025)

Sección 7 - Inicio buscador de gifs








@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

git add . 
git commit -m "Curso AngularV19GifsApp" 
git push -u origin main

