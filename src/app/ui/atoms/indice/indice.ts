import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indice',
  imports: [DecimalPipe],
  templateUrl: './indice.html',
  styleUrl: './indice.css'
})
export class Indice {
  @Input("titulo") titulo!: string
  @Input("valor") valor!: number
  @Input("tend") tend!: string | null
  @Input("porcentual") porcentual!: boolean
}
