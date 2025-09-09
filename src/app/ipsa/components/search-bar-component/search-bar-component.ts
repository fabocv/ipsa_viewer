import { Component, signal } from '@angular/core';
import { Searcher } from "../../../ui/molecules/searcher/searcher";
import { SearchService } from '../../services/search.service';

/*** 
 * SearchBarComponent: Barra de búsqueda de instrumentos.
 * 
 */

@Component({
  selector: 'app-search-bar-component',
  imports: [Searcher],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent {
  query = signal<string>("");

  constructor(public search: SearchService) {}
}
