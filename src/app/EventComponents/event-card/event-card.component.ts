import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {EventWrestling} from '../../DTO/EventWrestling';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
  standalone: true,
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: EventWrestling;
  @Output() outputEvent = new EventEmitter<number>()

  constructor(private router: Router) {
  }
  redirectToEvent():void{
    this.router.navigate([`/events/${this.event.id}`]).then();
  }
}
