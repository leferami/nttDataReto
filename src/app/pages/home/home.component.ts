import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { IPokemon, IPokemonC } from 'src/app/entity/IPokemon';
import { PokemonService } from 'src/app/service/pokemon.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID: any;
  first: number = 0;
  rows: number = 10;
  bandera = false;
  loading = false;
  displayModal = false;
  listaPokemon: IPokemon[] = [];
  listaPokemonFiltrado: IPokemon[] = [];
  formPokemon!: FormGroup;
  nuevoPokemon!: IPokemonC;
  idPokemon!: number;
  constructor(private servicePokmon: PokemonService,
    private serviceToast: ToastService,
    protected confirmDialog: ConfirmationService,) { 
    this.ID = this.serviceToast.generarIDToast();
  }

  ngOnInit(): void {
    this.getPokemon();
    this.buildForm();
  }

  private buildForm() {
    this.formPokemon = new FormGroup({
      attack: new FormControl(0, [Validators.required, Validators.min(1)]),
      defense: new FormControl(0, [Validators.required, Validators.min(1)]),
      hp: new FormControl(50, [Validators.required]),
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('',[Validators.required]), 
      idAuthor: new FormControl(1)
    });
  }

  getPokemon() {
    this.loading = true;
    this.servicePokmon.getPokemonAutor(1).subscribe({
      next: (resp) => {
        this.listaPokemon = resp;
        this.listaPokemonFiltrado = resp;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  crearModificaPokemon() {
    if (this.bandera){
      this.crearPokemon();
    } else {
      this.actualizaPokemon();
    }
  }

  crearPokemon(){
    if(this.formPokemon.valid) {
      this.loading = true;
      this.nuevoPokemon = this.formPokemon.value;
      this.servicePokmon.postCrearPokemon(this.nuevoPokemon).subscribe({
        next: () => {
          this.cancelar();
          this.serviceToast.showSuccess('Pokemon ingresado con éxito', this.ID);
          this.getPokemon();
        },
        error: () => {
          this.loading = false;
          this.serviceToast.showError('Ocurrio un error', this.ID);
        }
      });
    } 
  }

  actualizaPokemon() {
    if(this.formPokemon.valid) {
      this.nuevoPokemon = this.formPokemon.value;
      this.loading = true;
      this.servicePokmon.putPokemonActualizar(this.nuevoPokemon, this.idPokemon).subscribe({
        next: () => {
          this.cancelar();
          this.serviceToast.showSuccess('Pokemon actualizado con éxito', this.ID);
          this.getPokemon();
        },
        error: () => {
          this.loading = false;
          this.serviceToast.showError('Ocurrio un error', this.ID);
        }
      });
    } 
  }

  buscar(evento: any){
    if (evento && evento.target && evento.target.value){
      this.listaPokemon = this.listaPokemonFiltrado.filter(
          poke => {
            return (poke.name as string).toLowerCase().includes(evento.target.value.toLowerCase());
          }
        );
    }
    else{
      this.listaPokemon = this.listaPokemonFiltrado;
    }
  }

  nuevo(){
    this.displayModal = true;
    this.bandera = true;
  }

  mostrarDialogConfirmacion(dato: IPokemon){
    this.confirmDialog.confirm({
      message: `Seguro que desea eliminar el pokemon: ${dato.name }`,
      header: 'Confirmación',
      key: 'elimiPokemon',
      accept: () => {
        this.eliminarPokemon(dato.id);
      },
    });
  }

  EditaRetail(dato: IPokemon){
    this.formPokemon.get('name')?.setValue(dato.name);
    this.formPokemon.get('attack')?.setValue(dato.attack);
    this.formPokemon.get('defense')?.setValue(dato.defense);
    this.formPokemon.get('hp')?.setValue(dato.hp);
    this.formPokemon.get('image')?.setValue(dato.image);
    this.formPokemon.get('type')?.setValue(dato.type);
    this.displayModal = true;
    this.bandera = false;
    this.idPokemon = dato.id;
  }

  cancelar(){
    this.displayModal = false;
    this.formPokemon.reset();
  }

  eliminarPokemon(id: number) {
    this.loading = true;
    this.servicePokmon.deltePokemonActualizar(id).subscribe({
      next: () => {
        this.serviceToast.showSuccess('Pokemon eliminado', this.ID);
        this.getPokemon();
      },
      error: () => {
        this.loading = false;
        this.serviceToast.showError('Ocurrio un error', this.ID);
      }
    });
  }
}
