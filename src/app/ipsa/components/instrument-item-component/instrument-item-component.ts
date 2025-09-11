import { Component, Input } from '@angular/core';
import { Constituent } from '../../services/indices.service';
import { Valor } from "../../../ui/atoms/valor/valor";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-instrument-item-component',
  imports: [Valor, DecimalPipe],
  templateUrl: './instrument-item-component.html',
  styleUrl: './instrument-item-component.css'
})
export class InstrumentItemComponent {
  @Input("data") data!: Constituent;
}
