* AngularV19BuscadorGifsApp
* Curso de Angular v19 de Cero a Experto. Regrabado 2025.

Este proyecto es la segunda parte del proyecto: AngularV19GifsApp

************************************************** (20/05/2025)

Tenía ya el proyecto actualizado en GitHub
y simplemente desde GitHub quería hacer un fork de mi proyecto: AngularV19GifsApp
pero si lo intentas sale un mensaje de que no puedes hacer un fork de tu propio proyecto.

Cannot fork because you own this repository
and are not a member of any organizations.

Pero lo he conseguido siguiendo los siguientes pasos:
1º Vete al proyecto de partida y copia la ruta al portapapeles
2º Vete al botón crear nuevo proyecto
3º En la pantalla donde se introduce el nombre del nuevo proyecto
aparece un botón de importar desde proyecto así que pega la ruta del proyecto origen
y listo, ya tienes una copia de tu proyecto en GitHub con el nuevo nombre

________________________________________________________________________________________
echo "# AngularV19BuscadorGifsApp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git
git branch -M main
git push -u origin main
________________________________________________________________________________________


4º Desde la consola del VsStudio clonamos el nuevo proyecto

reneg@DESKTOP-LMA62OH MINGW64 /c/angular
$ git clone https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git
Cloning into 'AngularV19BuscadorGifsApp'...
remote: Enumerating objects: 155, done.
remote: Counting objects: 100% (155/155), done.
remote: Compressing objects: 100% (88/88), done.
remote: Total 155 (delta 53), reused 155 (delta 53), pack-reused 0 (from 0)
Receiving objects: 100% (155/155), 167.11 KiB | 592.00 KiB/s, done.
Resolving deltas: 100% (53/53), done.

5º Me cambio a la carperta del nuevo proyecto
cd AngularV19BuscadorGifsApp 

6º Como he clonado el proyecto de github ya se me ha creado el remoto apuntando a mi repositorio
Así que esto ya no me hace falta
--Me creo el remoto apuntando al proyecto de GitHub y establezco la rama principal 
--git remote add origin https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git
--git branch -M main

En caso de dudas puedes comprobar los remotos y borrarlos con:
$ git remote -v
origin  https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git (fetch)
origin  https://github.com/RenegadeAsturias/AngularV19BuscadorGifsApp.git (push)
--git remote rm origin

7º Y actualizo el proyecto remoto con la nueva aplicación local
git add . 
git commit -m "Curso AngularV19BuscadorGifsApp" 
git push -u origin main

8º Ojooooooo que he creado el proyecto con el contenido de github, si trato de arrancarlo
reneg@DESKTOP-LMA62OH MINGW64 /c/angular/AngularV19BuscadorGifsApp (main)
$ ng serve -o
Node packages may not be installed. Try installing with 'npm install'.
Error: Could not find the '@angular-devkit/build-angular:dev-server' builder's node package.

9º ¡Me dará error!, hay que instarlar los módulos con: npm install
reneg@DESKTOP-LMA62OH MINGW64 /c/angular/AngularV19BuscadorGifsApp (main)
$ npm install


************************************************** (24/05/2025)

Sección 7 - Inicio buscador de gifs

Comenzamos la sección 7 y vamos a transformar la anterior aplicación AngularV19GifsApp
que mostraba un listado plano de gifs en una aplicación que permitirá buscar gifs...

Vamos a utilizar la API de : GIPHY Developers y lo primero es crearnos una cuenta
https://developers.giphy.com/





@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

git add . 
git commit -m "Curso AngularV19BuscadorGifsApp" 
git push -u origin main

