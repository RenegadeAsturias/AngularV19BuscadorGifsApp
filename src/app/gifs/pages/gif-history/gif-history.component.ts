import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gif-history-page',
  imports: [],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryPageComponent {
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log({params});
  });
}
