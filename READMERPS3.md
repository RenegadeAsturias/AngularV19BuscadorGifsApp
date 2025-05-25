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


************************************************** (24/05/2025)+(25/05/2025)

Sección 7 - Inicio buscador de gifs

Comenzamos la sección 7 y vamos a transformar la anterior aplicación AngularV19GifsApp
que mostraba un listado plano de gifs en una aplicación que permitirá buscar gifs...

Vamos a utilizar la API de : GIPHY Developers y lo primero es crearnos una cuenta
https://developers.giphy.com/

Voy a Crear una nueva Api y relleno los datos:
*Your App Name=AngularV19BuscadorGifsAppCurso
*Platform=Web
*App Description=Esto es una aplicación de pruebas de Angular 19 del Curso de Angular v19 de Cero a Experto. Regrabado 2025.
*API Key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP
*API Key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP
*Don't forget! Beta Keys are rate limited to 100 API calls per hour. Upgrade your key to Production to remove this limitation.

*En nuestros ficheros de environments, añadimos la línea a las Api Keys:
export const environment = {
  // Api keys
  giphApiKey : 'AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP'


*Desde el Api Key Explorer https://developers.giphy.com/explorer/
y con nuestra Api creada señalada:
1º- Choose a resource: GIPHY Public Api
2º- Choose an endpoint: Trending
3º- Request URL - Nos muestra el Endpoint correspondiente para nuestra Api
https://api.giphy.com/v1/gifs/trending?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&limit=25&offset=0&rating=g&bundle=messaging_non_clips

Invocamos el servicio y nos devuleve un listado de tipo JSON de Gifs
Response
{
  "data":[... ______________________Como cada gift tiene mucha información copio el resultado en otro fichero: giphy-trending-json.txt
____________________________________y pego un ejemplo de un gif al final de este fichero para tenero la mano
  ]
  "meta":{
  "status":200
  "msg":"OK"
  "response_id":"0lqlxjju0crmjimx6p9besqn9xqbjtt3c7ftj1fm"
  }
  "pagination":{
  "total_count":500
  "count":25
  "offset":0
  }
}

En el Postman, llevamos nuestra Url del endpoint devuelto:
https://api.giphy.com/v1/gifs/trending?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&limit=25&offset=0&rating=g&bundle=messaging_non_clips


************************************************** (26/05/2025)

........... continuar...

La idea es tipar los datos de la llamada en interfaces, creamos un fichero : giphy.interfaces.ts
para que contenga las interfaces de giphy.

1º Desde el Postman copiamos al portapapeles toda la data de la llamada.
2º Desde el VSCode tener el fichero: giphy.interfaces.ts abierto
2º Desde el VSCode abrir la paleta de comandos: Shift+Control+P
3º Buscar Paste JSON as Code
4º Nos pide tipo y selecciono: JSON
5º El asistente nos pide: Top-level type name?
y escribimos GiphyResponse
y nos tipa los datos de la respuesta:

export interface GiphyResponse {
  data:       GiphyItem[];
  meta:       Meta;
  pagination: Pagination;
}

export interface GiphyItem {
  type:                       Type;
  id:                         string;
  ...........
}




@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

git add . 
git commit -m "Curso AngularV19BuscadorGifsApp" 
git push -u origin main

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Ejemplo: gift trending json
{
  "type": "gif",
  "id": "hkE6wynetELGa7xOjq",
  "url": "https://giphy.com/gifs/happybirthday-bday-hbday-hkE6wynetELGa7xOjq",
  "slug": "happybirthday-bday-hbday-hkE6wynetELGa7xOjq",
  "bitly_gif_url": "https://gph.is/g/ZlPD2D2",
  "bitly_url": "https://gph.is/g/ZlPD2D2",
  "embed_url": "https://giphy.com/embed/hkE6wynetELGa7xOjq",
  "username": "Jelene",
  "source": "http://www.jelene.com",
  "title": "Happy Birthday GIF by Jelene",
  "rating": "g",
  "content_url": "",
  "source_tld": "www.jelene.com",
  "source_post_url": "http://www.jelene.com",
  "is_sticker": 0,
  "import_datetime": "2023-02-05 09:59:03",
  "trending_datetime": "0000-00-00 00:00:00",
  "images": {
    "original": {
      "height": "480",
      "width": "480",
      "size": "140500",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/giphy.gif",
      "mp4_size": "160787",
      "mp4": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/giphy.mp4",
      "webp_size": "132296",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/giphy.webp",
      "frames": "4",
      "hash": "63a4d9f5f27588cb43fa1dd809a53fb4"
    },
    "fixed_height": {
      "height": "200",
      "width": "200",
      "size": "44585",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200.gif",
      "mp4_size": "52766",
      "mp4": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200.mp4",
      "webp_size": "47460",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200.webp"
    },
    "fixed_height_downsampled": {
      "height": "200",
      "width": "200",
      "size": "64919",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200_d.gif",
      "webp_size": "46972",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200_d.webp"
    },
    "fixed_height_small": {
      "height": "100",
      "width": "100",
      "size": "18961",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100.gif",
      "mp4_size": "17412",
      "mp4": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100.mp4",
      "webp_size": "14044",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100.webp"
    },
    "fixed_width": {
      "height": "200",
      "width": "200",
      "size": "44585",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200w.gif",
      "mp4_size": "52766",
      "mp4": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200w.mp4",
      "webp_size": "40116",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200w.webp"
    },
    "fixed_width_downsampled": {
      "height": "200",
      "width": "200",
      "size": "64919",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200w_d.gif",
      "webp_size": "46972",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/200w_d.webp"
    },
    "fixed_width_small": {
      "height": "100",
      "width": "100",
      "size": "18961",
      "url": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100w.gif",
      "mp4_size": "17412",
      "mp4": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100w.mp4",
      "webp_size": "14044",
      "webp": "https://media3.giphy.com/media/v1.Y2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/hkE6wynetELGa7xOjq/100w.webp"
    }
  },
  "user": {
    "avatar_url": "https://media4.giphy.com/avatars/Jelene/JUMW6M5wMpyJ.gif",
    "banner_image": "https://media4.giphy.com/channel_assets/Jelene/k8ApsQkM2JgV.gif",
    "banner_url": "https://media4.giphy.com/channel_assets/Jelene/k8ApsQkM2JgV.gif",
    "profile_url": "https://giphy.com/Jelene/",
    "username": "Jelene",
    "display_name": "Jelene",
    "description": "Hi. I’m Jelene. I like art and things.\r\n\r\nOne of the Top 10 GIPHY Artists of 2022!",
    "instagram_url": "https://instagram.com/jelene",
    "website_url": "http://www.jelene.com",
    "is_verified": true
  },
  "analytics_response_payload": "e=ZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZnaWZfaWQ9aGtFNnd5bmV0RUxHYTd4T2pxJmN0PWc",
  "analytics": {
    "onload": {
      "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZnaWZfaWQ9aGtFNnd5bmV0RUxHYTd4T2pxJmN0PWc&action_type=SEEN"
    },
    "onclick": {
      "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZnaWZfaWQ9aGtFNnd5bmV0RUxHYTd4T2pxJmN0PWc&action_type=CLICK"
    },
    "onsent": {
      "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZXZlbnRfdHlwZT1HSUZfVFJFTkRJTkcmY2lkPThiNzllMWZkMGxxbHhqanUwY3JtamlteDZwOWJlc3FuOXhxYmp0dDNjN2Z0ajFmbSZnaWZfaWQ9aGtFNnd5bmV0RUxHYTd4T2pxJmN0PWc&action_type=SENT"
    }
  },
  "alt_text": "Text gif. Multi-colored text, \"Happy Birthday,\" flashes against a black speckled background, each letter with a fun design including confetti, polka dots, squiggles, and hearts. "
}
