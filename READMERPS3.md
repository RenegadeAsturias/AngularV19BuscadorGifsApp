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

************************************************** (27/05/2025)

1º- Creamos un servicio para toda la lógica de la gestión de gifs:
/scr/app/gifs/services/gifs.service.ts

@Injectable({providedIn: 'root'})
export class GifService {
  ....
}

2º- Añadimos en nuestros environments una variable para guardar la base url de giphy
export const environment = {
  // Api keys
  giphyUrl : 'https://api.giphy.com/v1'
}

3º En nuestro servicio, en lugar de 'fetch' vamos a utilizar el HttpCliente
así que lo inyectamos en nustro servicio:

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient)  <<- inyectamos HttpClient (tiene que ser proveído, más abajo)
  ... ... ...
}

4º Para que nos inyecte el HttpClient ya hemos puesto la línea en le servicio
pero ahora nos falta proveerlo (de dónde viene)
para ello, vamos al 'app.config.ts' y añadimos el siguiente provider:

*Si lo dejamos así: provideHttpClient(),
-Angular va a estar utilizando en el fondo las peticiones xhr tradicionales

*Si lo dejamos así: provideHttpClient(withFetch()),
-Para trabajar con el nuevo estardar que es el fetch
trabajamos con los Observables pero en el fondo van a ser peticiones fetch

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),  <<-- proveemos el cliente HttpClient (para que pueda ser inyectado)
  ]
};

************************************************** (28/05/2025)

* Cuando hacemos una petición GET, PUT, PATCH, DELETE, ...
  la petición no se va a disparar hasta que no te subscribas a la petición

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe((resp)=>{
      console.log({resp});
    });
  }

* En nuestro TrendingPageComponent inyectamos el servicio
que por estar definido como un: @Injectable({providedIn: 'root'})
se comportaría como un singleton y nos devolvería una instancia del servicio
si ya existe una instancia, nos devuelve esa y si no existe una instancia nos crea una.

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifs = imageUrls;

  gifService = inject(GifService)
}


************************************************** (29/05/2025)

* La interface que construimos para obtener los datos del servicio
es realmente muy compleja, nos interesa más crear una nueva interface más pequeña 
y más simple para encapsular las propiedades que vamos a manejar en la aplicación:

creamos una nueva interface: interfaces/gif.interface.ts

export interface Gif {
  id: string;
  title: string;
  url: string;
}

* En nuestro servicio definimos una variable para contener nuestro listado de Gifs

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient)
  trendingGifs = signal<Gif[]>([]) <<--- Esta señal es un array de Gifs

* Para convertir los datos que viene de la llamada http en objectos de tipo Gif
de la nueva interface, necesitamos un mapper, nos creamos uno para ello:
/mappers/gif.mapper.ts

export class GifMapper {

  // Un método para convertir una clase GiphyItem en Gif
  static mapGiphyItemToGif(item: GiphyItem): Gif {  
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    };
  }

  // Un método para convertir un Array de clases GiphyItem en un Array de clases Gif
  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {   
    return items.map(this.mapGiphyItemToGif); <--- LLamamos al metódo anterior recursivamente
  }

}

* Ahora en la llamada a la petición http del servicio
utilizamos el Mapper en la subscripción para mapear el tipo de la respuesta.
Y asignamos el array de Gifs obtenido a nuestra variable creada anteriormente:


@Injectable({providedIn: 'root'})
export class GifService {

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data); <<<--mapeamos la respuesta con el mapper

      // Y ahora asignamos a nuestra variable anterior: 
      // trendingGifs = signal<Gif[]>([]) <<--- Esta señal es un array de Gifs
      // El array de Gifs devuelto y mapeado:
      this.trendingGifs.set(gifs);  <<<--- Array asignado

      console.log({gifs});
    });
  }

}

************************************************** (30/05/2025)
* Mostrar Gifs en pantalla

* En nuestro servicio, añadimos una nueva señal para controlar cuando se han cargado ya los gifs
* La inicializamos en la clase a false, cuando los gisfs todavía no están cargados
* Y cuando se terminan de cargar los datos, se actualiza 

@Injectable({providedIn: 'root'})
export class GifService {
  trendingGifsLoading = signal(true); <<<--------------- Inicializamos las variable

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading = signal(false); <<<--------------- Gifs ya cargados
    });
  }

}

* En nuestro component trending-page.component.ts
* 1º Eliminamos el array estático de gifs a fuego que utilizábamos
* 2º Podríamos sustituiro con una señal computada, pero de momento dejamos solo el servicio
gifs = computed(()=> this.gifService.trendingGifs());

export default class TrendingPageComponent {
  // gifs = imageUrls; <<<--------1º Eliminamos el array estático de gifs a fuego que utilizábamos

  gifService = inject(GifService)
}

* En nuestro trending-page.component.html, enviábamos el array de gifs que quitamos
<section class="py-5">
  <gif-list [gifs]="gifs"/> <<<---Teníamos un array de strings con las urls
</section>

* Y ahora tenemos que llamar al servicio para obtener el array
* e ir cambian en las clases el tipo de array 
* porque el anterior era del tipo: <string> y el nuevo es de tipo <Gif>
<section class="py-5">
  <gif-list [gifs]="gifService.trendingGifs()"/> <<<---Ahora enviamos un array de Gifs
</section>

* Como esto estaba en cascada, ahora hay que arreglar también: gif-list.component.html
* Aquí me llegaba un gif, que era un string con la url, pero con el cambio anterior
* ahora me está llegando un objeto Gif y le estoy mandando a [imageUrl]
* un objeto cuando está esperando un string con la url como antes
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  @for (gif of gifs(); track gif) {
    <gif-list-item [imageUrl]="gif"/> <<<---Aquí me llegaba un gif, que era un string con la url
  }
</div>

* Para solucionarlo:
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  @for (gif of gifs(); track gif) {
    <gif-list-item [imageUrl]="gif.url"/> <<<---Así mando la url del objeto Gif y solucionado
  }
</div>

* Ahora se muestran correctamente los Gifs traídos del API

************************************************** (31/05/2025)
* Diseño de pantalla: Buscador de Gifs

* En nuestra página: search-page.component.html
* Creamos un input buscador y escuchamos el evento Enter
* con #txtSearch creamos una referencia local al objeto
* y con esa referencia obtenemos el valor de la cadena de entrada en el input.

<section class="flex flex-col gap-4">
  <input type="text" placeholder="Buscar gifs" class="mt-3 border border-gray-300 rounded-md p-2"
    (keyup.enter)="onSearh(txtSearch.value)" 
    #txtSearch <<<----------------Referencia local al objeto
  />
</section>

* Y en la clase implementamos un método que recibe el valor introducido y lo muestra
export default class SearchPageComponent {
  onSearch(query:string) {
    console.log({query});
  }
}

* Para implementar el Search necesitamos el servicio de de Giphy:

* Habíamos creado un API Key para una sección anterior
* Y recuperamos el EndPoint para el Trending
* Ahora buscamos el EndPoint para el Search

* En el formulario nos pide un valor para el parámetro 'q'
* que representa la query. Por ejemplo: DragonBall
* que concatenará en la URL con q=DragonBall

Request URL
https://api.giphy.com/v1/gifs/search?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&q=DragonBall&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips

* Creamos en el servicio el método de búsqueda e implementamos la query de búsqueda

************************************************** (01/06/2025)

* Implmentamos la búsqueda en el servicio GifService (de momento solo imprimimos en resultado en el log)

 searchGifs(query: string) {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      }
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      console.log({search: gifs});
    })
  }

* Y en el search-page.component.ts, inyectamos el servicio
* Y cuando de enter en la caja de búsqueda llamamos al método: searchGifs
* del servicio con la llamada a la Api y al EndPoint search 

export default class SearchPageComponent {

  gifService = inject(GifService);

  onSearch(query:string) {
    console.log("query="+{query});
    this.gifService.searchGifs(query);
  }
}

************************************************** (02/06/2025)

* Mostrar resultados de la búsqueda

* 1º En el search-page.component.ts
* Inicializamos nuestro array de Gifs para la búsqueda

export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]); <<<------Inicializamos el array de Gifs para la búsqueda

* 2º En el search-page.component.html, 
* para mostrar los Gifs en el html: 

<section class="py-5">
  <gif-list [gifs]="[gifs()]"/> <<<-----Utilizamos el array de Gifs de la clase
</section>

??????????????????????????????????????????????????????????????????????

* Cambiamos el método y quitamos el subscribe, 
* Y si no hay nadie suscrito no se llama a la petición
* Añadimos un return inicial y con esto lo que devolvemos es un Observable
* Es un patrón que vamos a ver donde el servicio devuvel un Observable.

searchGifs(query: string) {
    // ... Con este return la función devuelve un Observable
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      }
    });
}

* Ojo!!! esto nos devolvería: Un Observable<GiphyResponse>
* (method) GifService.searchGifs(query: string): Observable<GiphyResponse>

* Y ahora desde la clase del component search-page.component.ts
* nos subscribimos 
* Ojo!!! la respuesta de un Observable<GiphyResponse>
* es un objeto GiphyResponse, pero nosotros no queremos eso,
* queremos un array de Gifs

export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query:string) {
    this.gifService.searchGifs(query).subscribe((resp)=> {
      console.log(resp); <<<--- Ojo!!! la respuesta de un Observable<GiphyResponse> 
      ...................<<<--- es un objeto GiphyResponse pero queremos un array de Gifs
    })
  }

* Para solucionar el problema utilizaremos los operadores de rxjs
* que se encadenan con el método: pipe
* que permite encadenamientos especiales de los Observables
* Importamos tap :import { tap } from 'rxjs';
* que sirve para disparar efectos secundarios 

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      },
    })
    .pipe(
      tap( resp => console.log({tap: resp}) )
    );
  }

* Cuando el Obvservable emita la respuesta, esta pasará 
* por todos los operadores rxjs. Ejemplo:

  .pipe(
    tap( resp => console.log({tap1: resp}) ),
    tap( resp => console.log({tap2: resp}) ),
    tap( resp => console.log({tap3: resp}) ),
  );

* Esto pasa por operador: tap1, tap2, tap3 y luego el Observable


* El tap, no permite hacer transformaciones, permite hacer efectos secundarios
* Para eso utilizamos el operador map, 
* que permite hacer una transformación completamente diferente
* Importamos map :import { map } from 'rxjs';

* Por ejemplo: .pipe(map(resp => console.log('Hola mundo')));
* que devolvería un Hola mundo en la consolta
* Otro ejemplo: .pipe(map(resp => console.log(`Hola Mundo ${resp.data.length}`)));

* 1º- En la primera transformación desestructuramos la {data} del objeto GiphyResponse
* con esto lo que obtemos es: (parameter) data: GiphyItem[] ---> Un array de GiphyItem
  .pipe(
    map(({data}) => data),
  );

* 2º- Y ahora transformamos el array de tipo GiphyItem[] en array de tipo Gif[]
* (method) GifMapper.mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[]
  .pipe(
    map(({data}) => data),
    map((items)  => GifMapper.mapGiphyItemsToGifArray(items)),
  );

* 3º- Incluso sería posible dejarlo en una sola línea
  .pipe(
    map(({data}) => GifMapper.mapGiphyItemsToGifArray(items)),
  );

* 4º- Establecemos en el array de la señal el array Gif[] de la respuesta
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query:string) {
    this.gifService.searchGifs(query).subscribe((resp)=> {
      this.gifs.set(resp) <<<--- Establecemos la respuesta que es un array de Gif[]
    })
  }
}

* 5º- Asegurarse que en el html
* obtenemos los datos de la señal
<section class="py-5">
  <gif-list [gifs]="[gifs()]"/>
</section>

************************************************** (03/06/2025)

* Historial y Caché de búsqueda

* Con lo que tenemos ahora, cuando se refresca la pantalla del navegador
* se pierden los datos, obviamente porque no tenemos los datos persistidos.
* Vamos a crear una especie de caché para que se guarden las búsquedas
* que realiza el usurio y los datos consultados

* Lo queremos guardar algo así, búsquedas:
{
  'goku': [gif1,gif2,gif3],
  'saitama': [gif1,gif2,gif3],
  'dragon ball': [gif1,gif2,gif3],
}

* Esa estructura la guardamos en un tipo propio de TS, que se llama Record
* Record<string, Gif[]>

* En nuestro servicio GifService creamos un señal
searchHistory = signal<Record<string,Gif[]>>({});

************************************************** (04/06/2025)

* Para mostrar en el menú las keys de cada Record para mostrarlas en el menú,
* utilizamos una señal computada, al ser una señal computada cada vez
* que se actualice el 'searchHistory' con un nuevo valor 
* se va a volver a computar nuestro objeto: searchHistoryKeys

searchHistory = signal<Record<string,Gif[]>>({});
searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

* Cada vez que busque un personaje y obtenga valores de la consulta
* voy a necesitar un efecto secundario,
* el operador de rxjs para efectos secundarios es: tap
* en el mismo servicio, en la llamada a searchGifs añadimos:

  // Historial
  tap(items => {
    this.searchHistory.update( history => ({ // <<<---Estoy construyendo un objeto implicito: Record<string,Gif[]>
      ...history,
      [query.toLowerCase()]: items,
    }));
  })

* Vamos a actualizar el valor de una señal y lo hacemos con update
* cuando depende de los valores que tenía previamente.
* history => ({ <<<- Vamos a hacer un return implícito de un nuevo objeto
* Con el spread del history: '...history' recuperamos el history que teníamos previamente
* Y ahora vamos a poner una propiedad computada del objeto que va a ser igual que 'query'
* que es el valor que entra como parámetro en la función + un toLowerCase()
* y que "va a apuntar a los items que devuelve nuestra petición ':items'
* Estoy construyendo un objeto implicito: Record<string,Gif[]>

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      },
    })
    .pipe(
      map(({data}) => data),
      map((items)  => GifMapper.mapGiphyItemsToGifArray(items)),
      // Historial
      tap(items => {
        this.searchHistory.update( history => ({ // <<<---Estoy construyendo un objeto implicito: Record<string,Gif[]>
          ...history,
          [query.toLowerCase()]: items,
        }));
      })
    );
  }

* Lo siguiente es utilizar este nuevo array searchHistory para mostrar en el menú
* una nueva opción por cada una de las opciones del array, habrá que añadir otro @for

************************************************** (05/06/2025)

* En nuestra clase: gifs-side-menu-options.component.ts
* tenemos definidas estas dos opciones de menú fijas

export class GifsSideMenuOptionsComponent {
  menuOptions:MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    },
  ]

* Tareas
* 1º-Inyectar el servicio:

export class GifsSideMenuOptionsComponent {
  gifService = inject(GifService); <<<---Inyectar el Servicio: GifService

* 2º-Ir al html: gifs-side-menu-options.component.html
* Donde teníamos un bucle para mostar el array estático de opciones:

<div id="nav" class="w-full px-6">
  @for (item of menuOptions; track item.route) {
    <a  [routerLink]="item.route" 
        routerLinkActive="bg-blue-800" class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
      <div>
        <i class="{{item.icon}}"></i>
      </div>
      <div class="flex flex-col">
        <span class="text-lg font-bold leading-5 text-white">{{item.label}}</span>
        <span class="text-sm text-white/50 hidden md:block">{{item.subLabel}}</span>
      </div>
    </a>
  }
</div>

* 3º- Accediendo al servicio podríamos obtener el historial tratado anteriormente:
  searchHistory = signal<Record<string,Gif[]>>({});
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

* 3º-Al final, crear otro bucle
* recorremos la señal computada : gifService.searchHistoryKeys()
* con las claves de las búsquedas.
* Y utilizamos key como clave porque siempre va a ser único en el mapa.

@for(key of gifService.searchHistoryKeys(); track key) {
    <a  [routerLink]="['/dashboard/search']" <<<-------- De momento dejamos esto (lo cambiaremos después)
        routerLinkActive="bg-blue-800" class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
      <div>
        <!-- <i class="{{item.icon}}"></i> -->
        <i class="fa-solid fa-clock-rotate-left"></i> <<<-------Seleccionamos un icono
      </div>
      <div class="flex flex-col">
        <span class="text-lg font-bold leading-5 text-white">{{key}}</span> <<<----------key
      </div>
    </a>
}

************************************************** (06/06/2025)
* Me ha surgido un error y tengo que seguir investigando como solucionarlo.
* Argument of type 'unknown' is not assignable to parameter of type 'Gif[]'.ts
* Parece que la respuesta no encaja con lo esperado Gif[]

  onSearch(query:string) {
    this.gifService.searchGifs(query).subscribe((resp)=> {
      this.gifs.set(resp) <<<--- Argument of type 'unknown' is not assignable to parameter of type 'Gif[]'.ts
    });
  }

* OK, ya lo he corregido, había un typo en el comando tap y no se estaba devolviendo correctamente un Gif[]

  tap(items => {
    this.searchHistory.update( history => ({ // Estoy construyendo un objeto implicito: Record<string,Gif[]>
      ...history,
      [query.toLowerCase()]: items,
    }));
  })





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
