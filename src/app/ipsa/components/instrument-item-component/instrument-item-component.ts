import { Component, inject, Input } from '@angular/core';
import { Constituent } from '../../services/indices.service';
import { Valor } from "../../../ui/atoms/valor/valor";
import { DecimalPipe } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Button } from "primeng/button";

@Component({
  selector: 'app-instrument-item-component',
  imports: [Valor, DecimalPipe, Button],
  templateUrl: './instrument-item-component.html',
  styleUrl: './instrument-item-component.css'
})
export class InstrumentItemComponent {
  search = inject(SearchService);
  @Input("data") data!: Constituent;

  actualizarInstrumento(codeInstrument: string) {
    this.search.instrumento.set(codeInstrument)
  }
}
