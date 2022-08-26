import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let serviceGet: PokemonService;
  let httpClientSpy: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PokemonService);
    serviceGet = TestBed.inject(PokemonService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PokemonService(httpClientSpy as any);
    serviceGet = new PokemonService(httpClientSpyGet as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar objeto cuando la creacion de un pokemon sea correcta', (done: DoneFn) => {
    const mockPokemon = {
      name: 'Raikiu',
      image:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png',
      attack: 83,
      defense: 64,
      hp: 100,
      type: 'golden',
      idAuthor: 1,
    };
    const mpockResultPokemon = {
      id: 3779,
      name: 'Raikiu',
      image:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png',
      attack: 83,
      defense: 64,
      hp: 100,
      type: 'golden',
      id_author: 1,
    };
    httpClientSpy.post.and.returnValue(of(mpockResultPokemon));
    service.postCrearPokemon(mockPokemon).subscribe({
      next: (resp) =>{
        expect(resp).toEqual(mpockResultPokemon)
        done()
      }
    });
  });

  it('Debe retornar una lista de objeto de pokemon cuando se consulte por get', (done: DoneFn) => {
    const mockPokemon = 1;
    const mpockResultPokemon = [
      {
          "id": 445,
          "name": "pikachu",
          "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
          "attack": 66,
          "defense": 85,
          "hp": 100,
          "type": "Pokemon",
          "id_author": 2
      },
      {
          "id": 940,
          "name": "Raikiu",
          "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png",
          "attack": 83,
          "defense": 64,
          "hp": 100,
          "type": "golden",
          "id_author": 2
      }];
    httpClientSpyGet.get.and.returnValue(of(mpockResultPokemon));
    serviceGet.getPokemonAutor(mockPokemon).subscribe({
      next: (resp) =>{
        expect(resp).toEqual(mpockResultPokemon)
        done()
      }
    });
  });

});
