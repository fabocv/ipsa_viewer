import { Component, effect, Input } from '@angular/core';
import { DataResumen } from '../../../ipsa/services/search.service';
import { ItemList } from "../../atoms/item-list/item-list";

export interface TablaDetallesItem {columna: string, valor: number | undefined, valorStr: string | undefined}

@Component({
  selector: 'app-tabla-resumen',
  imports: [ItemList],
  templateUrl: './tabla-resumen.html',
  styleUrl: './tabla-resumen.css'
})
export class TablaResumen {
  @Input("resumen") resumen!: DataResumen | null
  tablas: {header:{columna: string, valorStr: string}, lista: TablaDetallesItem[], porcentual: boolean}[] = []

  constructor() {
    effect(() => {
      if (this.resumen) {
        this.construirLista();
      }
    });
  }

  construirLista() {
    const lista: TablaDetallesItem[] = []
    const data: TablaDetallesItem[] = [
      {columna:"MERCADO",         "valorStr": '' + this.resumen?.info.marketName, "valor":undefined},
      {columna:"APERTURA",        "valor": Number('' + this.resumen?.price.openPrice), valorStr:undefined},
      {columna:"CIERRE ANTERIOR", "valor": Number('' + this.resumen?.price.closePrice), valorStr:undefined},
      {columna:"MÁXIMO DIARIO",   "valor": Number('' + this.resumen?.price.maxDay), valorStr:undefined},
      {columna:"MÍNIMO DIARIO",   "valor": Number('' + this.resumen?.price.minDay), valorStr:undefined},
      {columna:"MÁXIMO 52 SEMANAS", "valor": Number('' + this.resumen?.price.max52W), valorStr:undefined},
      {columna:"MÍNIMO 52 SEMANAS", "valor": Number('' + this.resumen?.price.min52W), valorStr:undefined},
    ] 
    data.map((item:TablaDetallesItem) => lista.push(item))
    let headerTabla1 = {columna:"Cotización", valorStr: String('' + this.resumen?.price.datetimeLastPrice), "valor":undefined}

    const lista2: TablaDetallesItem[] = [
      {columna:"1 MES",         "valor": Number('' + this.resumen?.price.pct30D), valorStr:undefined},
      {columna:"1 AÑO",         "valor": Number('' + this.resumen?.price.pctRelCY), valorStr:undefined},
      {columna:"AÑO A LA FECHA","valor": Number('' + this.resumen?.price.pct30D), valorStr:undefined},
    ];
    
    let headerTabla2 = {columna:"Variación**", valorStr: "%"}

    this.tablas.push({header: headerTabla1, lista: lista, porcentual: false})
    this.tablas.push({header: headerTabla2, lista: lista2, porcentual: true})
  }
}
