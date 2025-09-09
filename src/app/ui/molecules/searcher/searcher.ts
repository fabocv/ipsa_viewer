import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-searcher',
  imports: [FormsModule,AutoCompleteModule,InputTextModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './searcher.html',
  styleUrl: './searcher.css'
})
export class Searcher {
  filteredItems: string[] = []
  @Input() value: string = '';
  @Input("items") items: string[] = [];
  @Output() valueChange = new EventEmitter<string>();

  constructor() {
    this.filteredItems = this.items;
  }

  change(event: AutoCompleteCompleteEvent){
    this.valueChange.emit(event.query)
  }

  blur() {
    const check = this.items.filter(item =>
      item.toUpperCase().includes(this.value.toUpperCase())
    ).length == 1;
    if (!check){
      this.valueChange.emit("")
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    const input = event.query
    this.filteredItems = this.items.filter(item =>
      item.toUpperCase().includes(input.toUpperCase())
    );

    this.valueChange.emit(input)
  }
}
