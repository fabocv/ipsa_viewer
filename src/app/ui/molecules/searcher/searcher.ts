import { Component, EventEmitter, Input, Output, Signal, SimpleChanges } from '@angular/core';
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
    const current = (this.value || '').toUpperCase();
    const matches = this.items.filter(item =>
      item.toUpperCase().includes(current)
    );
    if (matches.length !== 1) {
      this.valueChange.emit('');
    } else {
      // 1 match siempre en mayúsculas
      this.valueChange.emit(matches[0]);
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    const input = event.query || '';
    this.filteredItems = this.items.filter(item =>
      item.toUpperCase().includes(input.toUpperCase())
    );
    // emitir el texto tecleado (no seleccion)
    this.valueChange.emit(input);
  }

  onInput(query: string) {
    this.valueChange.emit(query);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['value']) {
      const input = (this.value || '').toUpperCase();
      this.filteredItems = this.items.filter(item =>
        item.toUpperCase().includes(input)
      );
    }
  }
}
