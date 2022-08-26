import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientSpy: { post: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PokemonService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new PokemonService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar objeto cuando la creacion sea correcta', (done: DoneFn) => {
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
});
