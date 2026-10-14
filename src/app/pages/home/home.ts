import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { FotoPokemon } from '../../components/foto-pokemon/foto-pokemon';
import { TarjetaPokemon } from '../../components/tarjeta-pokemon/tarjeta-pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { Detalle } from '../../components/detalle/detalle';

@Component({
  imports: [FotoPokemon, TarjetaPokemon, Detalle, NgClass],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  listaPokemon: Resultado[] = [];
  pagina: number = 1;
  cargando: boolean = false;
  pokemonSeleccionado?: Pokemon;
  detalle: boolean = false;

  ngOnInit(): void {
    this.cargarLista();
    this.pokemonService.getById("1");
  }

  async cargarLista() {
    if (this.cargando) return;
    this.cargando = true;
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    this.cdr.detectChanges();
    this.pagina++;
    this.cargando = false;
  }

  onScroll(e: any) {
    if (
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.cargarLista();
    }
  }

  async tarjetaClickeada(id: string) {
    if (this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString()) {
      return this.cambiarEstadoDetalle();
    }
    this.pokemonSeleccionado = await this.pokemonService.getById(id);
    this.cdr.detectChanges();
  }

  cambiarEstadoDetalle() {
    if (this.pokemonSeleccionado) this.detalle = !this.detalle;
    console.log(this.detalle);
  }
}