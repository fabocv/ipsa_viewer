import { Component, Input } from '@angular/core';
import { PriceResumen } from '../../../ipsa/services/search.service';
import { Indice } from '../../atoms/indice/indice';

@Component({
  selector: 'app-indices-header',
  imports: [Indice],
  templateUrl: './indices-header.html',
  styleUrl: './indices-header.css'
})
export class IndicesHeader {
  @Input("precios") precios!: PriceResumen
  titles = ["Valor Actual", "Var.% Actual", "Var. Puntos Actual"]
}
