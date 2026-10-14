import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Pokedex');

  @HostListener('window:keydown', ['$event'])
  manejarAtajosDeTeclado(event: KeyboardEvent) {
    
    const elementoActivo = document.activeElement?.tagName;
    if (elementoActivo === 'INPUT' || elementoActivo === 'TEXTAREA') {
      return; 
    }

    const tecla = event.key.toLowerCase();

    if (tecla === 'a') {
      window.open('https://www.youtube.com/watch?v=oL8Ds54R_GA&list=RDoL8Ds54R_GA&start_radio=1', '_blank');
    } 
    else if (tecla === 'b') {
      window.open('https://www.google.com/', '_blank');
    }
  }
}
