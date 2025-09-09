import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  @Input("columna") columna!: string
  @Input("valor") valor!: string | undefined
}
