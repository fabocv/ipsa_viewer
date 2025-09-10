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

  constructor() {
    // evito escuchar en tiempo real para prevenir  ExpressionChangedAfterItHasBeenCheckedError
    // effect(() => { this.resumen = this.search.resumen(); });
  }

  get resumen(): DataResumen | null {
    return this.search.resumen();
  }
}
