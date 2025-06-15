import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";


@Component({
  selector: 'app-gif-history-page',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryPageComponent {

  gifService = inject(GifService);

  /** Primero, habíamos contemplado utilizar un Observable y nos suscribíamos
   *  para recorrer nuestros parámetros y localizar el nuestro, pero con esa solución
   *  no podremos filtrar para recoger el parámetro que nos interesa por eso lo cambiamos
   *  utilizando un toSignal() que convierte nuestro Observable en una señal
   * Y las señales tiene el operador: pipe que nos permite filtrar
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']);
  });  */

  // En Angular, la función toSignal se usa para convertir un observable en una señal (Signal) reactiva, parte de las nuevas APIs reactivas introducidas con Angular 16 en adelante.
  // A partir de Angular 16, puedes importarla directamente desde @angular/core: import { toSignal } from '@angular/core/rxjs-interop';
  // (alias) toSignal<Params>(source: Observable<Params> | Subscribable<Params>): Signal<Params | undefined>
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'])
    )
  );

  /** Lo podríamos hacer así, con el return
  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  }); */

  /** O como es una lína sola, se pude simplificar en una sola línea
  *   en la variable query tenemos el key que hemos recogido de la Ruta Activa
  *   ese parámetro era dinámico y lo extraemos de la URL,
  *   aquí hacemos una señal computada de forma que si el key cambia
  *   porque otra opción de menú ha sido seleccionada también cambiará
  *   el valor de nuestro resultado de Gif[] obtenido por: gifsByKey */
  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));

}
