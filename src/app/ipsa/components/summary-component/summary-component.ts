import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-summary-component',
  imports: [],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.css'
})
export class SummaryComponent {

  constructor(public search: SearchService) {}
}
