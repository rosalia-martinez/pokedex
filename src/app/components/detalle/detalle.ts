import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { TarjetaPokemon } from '../tarjeta-pokemon/tarjeta-pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  styleUrl: './detalle.scss',
  templateUrl: './detalle.html',
  imports: [TarjetaPokemon],
})
export class Detalle implements OnChanges {

  @Input() pokemon?: Pokemon;
  @Input() abierto: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  descripcion: string = '';

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) { }

  async ngOnChanges(): Promise<void> {
    if (this.pokemon?.id) {
      this.descripcion = await this.pokemonService.getDescription(this.pokemon.id);
      this.cdr.detectChanges();
    }
  }
}