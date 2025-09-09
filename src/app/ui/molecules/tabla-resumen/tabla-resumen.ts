import { Component, effect, Input } from '@angular/core';
import { DataResumen } from '../../../ipsa/services/search.service';
import { ItemList } from "../../atoms/item-list/item-list";

export interface TablaDetallesItem {columna: string, valor: string}

@Component({
  selector: 'app-tabla-resumen',
  imports: [ItemList],
  templateUrl: './tabla-resumen.html',
  styleUrl: './tabla-resumen.css'
})
export class TablaResumen {
  @Input("resumen") resumen!: DataResumen | null
  tablas: {header:TablaDetallesItem, lista: TablaDetallesItem[]}[] = []
  lista: TablaDetallesItem[] = []

  constructor() {
    effect(() => {
      if (this.resumen) {
        this.construirLista();
      }
    });
  }

  construirLista() {
    
    const data: TablaDetallesItem[] = [
      {columna:"MERCADO",         "valor": "" +this.resumen?.info.marketName},
      {columna:"APERTURA",        "valor": "" +this.resumen?.price.openPrice},
      {columna:"CIERRE ANTERIOR", "valor": "" +this.resumen?.price.closePrice},
      {columna:"MÁXIMO DIARIO",   "valor": "" +this.resumen?.price.maxDay},
      {columna:"MÍNIMO DIARIO",   "valor": "" +this.resumen?.price.minDay},
      {columna:"MÁXIMO 52 SEMANAS", "valor": "" +this.resumen?.price.max52W},
      {columna:"MÍNIMO 52 SEMANAS", "valor": "" +this.resumen?.price.min52W},
    ] 
    data.map((item:TablaDetallesItem) => this.lista.push(item))
    let headerTabla1 = {columna:"Cotización", valor: "" +this.resumen?.price.datetimeLastPrice}

    this.tablas.push({header: headerTabla1, lista: this.lista})
  }
}
