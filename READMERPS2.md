
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

