import { Component, signal, input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

/*** 
 * SearchBarComponent: Barra de búsqueda de instrumentos.
 * 
 */

@Component({
  selector: 'app-search-bar-component',
  imports: [InputTextModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent {
  query = signal<string>("");

  doSomething(){
    alert("hola!")
  }
}
