
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
git remote add origin https://github.com/RenegadeAsturias/AngularV19GifsApp.git
git branch -M main

5º Y actualizo el proyecto local con el proyecto remoto 
git pull origin main

6º Actualizo el README y actualizo los cambios locales en el remoto 
git add . 
git commit -m "Curso AngularV19GifsApp" 
git push -u origin main

--Para recuper la info git pull origin main

************************************************** (12/05/2025)

