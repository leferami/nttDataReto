import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPokemon, IPokemonC } from '../entity/IPokemon';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  createHeader() {
    let headers: HttpHeaders;
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*');
      return headers;
  }
  getPokemonAutor(idAutor: number): Observable<IPokemon[]> {
    const headers = this.createHeader();
    const url = environment.url_pokemon;
    let params = {};
      params = {
        idAuthor: idAutor,
      };
    return this.http.get<IPokemon[]>(url, { headers, params });
  }

  postCrearPokemon(pokemon: IPokemonC) {
    const headers = this.createHeader();
    const url = environment.url_pokemon;
    const body = pokemon;
    return this.http.post(url, body, { headers });
  }

  putPokemonActualizar(pokemon: IPokemonC, idPokemon: number) {
    const headers = this.createHeader();
    const url = environment.url_pokemon + idPokemon;
    const body = pokemon;
    return this.http.put(url, body, { headers });
  }

  deltePokemonActualizar(idPokemon: number) {
    const headers = this.createHeader();
    const url = environment.url_pokemon + idPokemon;
    return this.http.delete(url,{ headers });
  }
  
}
