import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valor',
  imports: [DecimalPipe],
  templateUrl: './valor.html',
  styleUrl: './valor.css'
})
export class Valor {
  @Input("valor") valor!: number | undefined;
  @Input("porcentual") porcentual!: boolean;
}
