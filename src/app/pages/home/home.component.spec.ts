import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PokemonService } from 'src/app/service/pokemon.service';
import { ToastService } from 'src/app/service/toast.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule
                ],
      providers: [MessageService, ConfirmationService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const name = app.formPokemon.controls['name'];
    name.setValue('pikachu');
    expect(app.formPokemon.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const name = app.formPokemon.controls['name'];
    const attack = app.formPokemon.controls['attack'];
    const defense = app.formPokemon.controls['defense'];
    const hp = app.formPokemon.controls['hp'];
    const image = app.formPokemon.controls['image'];
    const type = app.formPokemon.controls['type'];
  
    name.setValue('pikachu');
    attack.setValue(50);
    defense.setValue(40);
    hp.setValue(30);
    image.setValue('httpppp');
    type.setValue('agua');
    expect(app.formPokemon.valid).toBeTrue();
  });
});
