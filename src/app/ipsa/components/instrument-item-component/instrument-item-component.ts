import { Component, Input } from '@angular/core';
import { Constituent } from '../../services/indices.service';
import { Valor } from "../../../ui/atoms/valor/valor";

@Component({
  selector: 'app-instrument-item-component',
  imports: [Valor],
  templateUrl: './instrument-item-component.html',
  styleUrl: './instrument-item-component.css'
})
export class InstrumentItemComponent {
  @Input("data") data!: Constituent;
}
