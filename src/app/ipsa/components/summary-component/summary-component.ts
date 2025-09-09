import { Component, effect, inject } from '@angular/core';
import { DataResumen, SearchService } from '../../services/search.service';
import { TablaResumen } from "../../../ui/molecules/tabla-resumen/tabla-resumen";

@Component({
  selector: 'app-summary-component',
  imports: [TablaResumen],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.css'
})
export class SummaryComponent {
  search = inject(SearchService);
  resumen!: DataResumen | null

  constructor() {
    effect(() => {
      const resumen = this.search.resumen();
      this.resumen = resumen;
    });
  }
}
