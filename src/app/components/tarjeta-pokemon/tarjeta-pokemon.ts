import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  standalone: true,
  imports: [TitleCasePipe],
  styleUrl: './tarjeta-pokemon.scss',
  templateUrl: './tarjeta-pokemon.html',
})
export class TarjetaPokemon implements OnChanges {

  constructor(private pokemonService: PokemonService) { }

  @Input() data?: Resultado | Pokemon;
  @Input() seleccionado: boolean = false;
  @Output() clickeado = new EventEmitter<string>();
  id: string = "0";

  ngOnChanges(): void {
    this.extraerInformacion();
  }

  extraerInformacion(): void {
    if (!this.data) return;

    if ('id' in this.data && this.data.id) {
      this.id = this.data.id.toString();
    }
    else if ('url' in this.data && this.data.url) {
      const partes = this.data.url.split('/').filter(Boolean);
      this.id = partes[partes.length - 1] || "0";
    }
  }
}
