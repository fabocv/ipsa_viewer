import { Component, signal, input } from '@angular/core';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

/*** 
 * SearchBarComponent: Barra de búsqueda de instrumentos.
 * 
 */

@Component({
  selector: 'app-search-bar-component',
  imports: [Button, InputTextModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent {
  query = input<string>("");
}
