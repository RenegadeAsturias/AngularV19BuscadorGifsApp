import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyItem, GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string,Gif[]>>({});
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  // Ejemplo de llamada PHYURL
  // https://api.giphy.com/v1/gifs/trending?api_key=AwurkMOOhmwe2wSNIQLSkqeAV9bILeNP&limit=25&offset=0&rating=g&bundle=messaging_non_clips

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
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

