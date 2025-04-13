import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventRenew} from '../../DTO/EventRenew';

@Component({
  selector: 'app-event-renew',
  imports: [],
  standalone: true,
  templateUrl: './event-renew.component.html',
  styleUrl: './event-renew.component.css'
})
export class EventRenewComponent {
  @Input() renew!: EventRenew;
  @Output() event = new EventEmitter<number>()
}
