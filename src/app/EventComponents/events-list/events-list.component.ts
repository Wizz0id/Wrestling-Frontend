import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventService} from '../../Service/Event.service';
import {EventCardComponent} from '../event-card/event-card.component';
import {EventWrestling} from '../../DTO/EventWrestling';

@Component({
  selector: 'app-events-list',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EventCardComponent
  ],
  standalone: true,
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit{
  eventList: EventWrestling[] = [];
  searchQuery: FormControl = new FormControl("");

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void{
    this.eventService.getEvents(this.searchQuery.value).subscribe((list) => this.eventList = list);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    if (keyboardEvent.key === 'Enter') {
      this.loadEvents();
    }
  }
}
