
import { Component, Input } from '@angular/core';
import { Valor } from "../valor/valor";

@Component({
  selector: 'app-indice',
  imports: [Valor],
  templateUrl: './indice.html',
  styleUrl: './indice.css'
})
export class Indice {
  @Input("titulo") titulo!: string
  @Input("valor") valor!: number
  @Input("tend") tend!: string | null
  @Input("porcentual") porcentual!: boolean
}
