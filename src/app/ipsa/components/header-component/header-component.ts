import { Component, effect, inject } from '@angular/core';
import { DataResumen, SearchService } from '../../services/search.service';
import { IndicesHeader } from "../../../ui/molecules/indices-header/indices-header";

@Component({
  selector: 'app-header-component',
  imports: [IndicesHeader],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  search = inject(SearchService);
  resumen!: DataResumen | null

  constructor() {
    effect(() => {
      this.search.instrumento(); //prevenir desfaces entre componentes
      this.resumen = this.search.resumen();
      this.search.dataset(); //prevenir desfaces entre componentes
    });
  }
}
