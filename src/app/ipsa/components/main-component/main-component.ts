import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar-component/search-bar-component";
import { ChartComponent } from "../chart-component/chart-component";
import { TabComponent } from '../tab-component/tab-component';
import { HeaderComponent } from "../header-component/header-component";
import { SummaryComponent } from '../summary-component/summary-component';
import { InstrumentListComponent } from '../instrument-list-component/instrument-list-component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-main',
  imports: [SearchBarComponent,
    ChartComponent,
    TabComponent,
    HeaderComponent,
    SummaryComponent,
    InstrumentListComponent,
    ButtonModule
  ],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {

}
