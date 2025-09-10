import { Component, Input } from '@angular/core';
import { Valor } from "../valor/valor";

@Component({
  selector: 'app-item-list',
  imports: [Valor],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  @Input("columna") columna!: string
  @Input("valor") valor!: number | undefined
  @Input("valorStr") valorStr!: string | undefined;
  @Input("porcentual") porcentual!: boolean;
}
