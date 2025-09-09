import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-searcher',
  imports: [InputTextModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './searcher.html',
  styleUrl: './searcher.css'
})
export class Searcher {
  //@Input({ required: true }) value!: Signal<string>;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
}
