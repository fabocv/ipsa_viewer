import { Component, Input } from '@angular/core';
import { Constituent } from '../../services/indices.service';
import { InstrumentItemComponent } from '../instrument-item-component/instrument-item-component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-instrument-list-component',
  imports: [InstrumentItemComponent, PaginatorModule],
  templateUrl: './instrument-list-component.html',
  styleUrl: './instrument-list-component.css'
})
export class InstrumentListComponent {
  @Input("indice") indice: Constituent[] = [];
  first: number = 0;
  rows: number = 10;

  onPageChange(event: any){
    this.first = event.first
  }
}
