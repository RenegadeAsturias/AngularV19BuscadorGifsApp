import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history-page',
  imports: [],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryPageComponent {
  /**
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

}
