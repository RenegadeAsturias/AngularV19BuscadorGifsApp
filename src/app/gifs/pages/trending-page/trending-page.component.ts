import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

/** Ahora ya no vamos a necesitar este array a a fuego de imágenes cargadas en el array
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
*/

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  // gifs = imageUrls; *Dejamos de utilizar el array de Gifs a fuego que implementamos al principio
  gifService = inject(GifService)
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // cuando la vista ya está inicializada y los componentes ya están renderizados
  // comprobamos que existe/está cargado el elemento html scrollDiv
  // Y si lo está asignamos el valor guardado en la señal del servicio
  // a la variable que maneja el punto del scroll donde lo dejamos la última vez
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    // console.log(scrollDiv);
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    console.log({isAtBottom, scrollTotal: scrollTop+clientHeight, scrollTop, clientHeight, scrollHeight});

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom) {
      // Cargar la siguiente página de gifs al acercarse al final de la página
      this.gifService.loadTrendingGifs();
    }

  }

}
