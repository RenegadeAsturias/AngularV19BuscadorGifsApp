import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyItem, GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0); // Añadimos esta señal para controlar el offset


  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i=0; i<this.trendingGifs().length; i+=3) {
      console.log(this.trendingGifs().slice(i,i+3));
      groups.push(this.trendingGifs().slice(i,i+3));
    }
    console.log(groups);
    return groups;
  });

  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs',historyString);
  });

  // Ejemplo de llamada PHYURL
  // https://api.giphy.com/v1/gifs/trending?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&limit=25&offset=0&rating=g&bundle=messaging_non_clips

  loadTrendingGifs() {

    // Queremos peticiones de una a una, no que nos bombardeen con peticiones
    if(this.trendingGifsLoading()) return; // Añadimos una condición para chequear que no está cargando

    this.trendingGifsLoading.set(true); // Establecemos el valor a true a la señal para que de momento no entren más peticiones

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20, // Añadimos el cálculo del offset basado en el valor de la señal
      },
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs => [
        ...currentGifs, // Añadimos al array los gifs que acabamos de leer
        ...gifs, // Y los añadimos a los que ya habíamos leído
      ]);
      // Actualizamos la página leída con +1, sino me mostraría siempre los mismos Gifs
      this.trendingPage.update(currentPage => currentPage+1);
      this.trendingGifsLoading = signal(false);
      console.log({gifs});
    });

  }

  // Ejemplo de llamada PHYURL
  // https://api.giphy.com/v1/gifs/search?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&q=DragonBall&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips

  searchGifs(query: string):Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      },
    })
    .pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update( history => ({ // Estoy construyendo un objeto implicito: Record<string,Gif[]>
          ...history,
          [query.toLowerCase()]: items,
        }));
      })
    );
  }

  getHistoryGifs(query: string):Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}

/**
function tab(arg0: (items: any) => void): import("rxjs").OperatorFunction<Gif[], unknown> {
  throw new Error('Function not implemented.');
} */

