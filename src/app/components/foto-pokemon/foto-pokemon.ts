import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  imports: [],
  selector: 'app-foto-pokemon',
  standalone: true,
  styleUrl: './foto-pokemon.scss',
  templateUrl: './foto-pokemon.html',
})
export class FotoPokemon {
  @Input() pokemon?:Pokemon;
}
