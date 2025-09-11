import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ipsa_viewer');
}
