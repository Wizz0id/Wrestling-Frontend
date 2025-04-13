import {Component, OnInit} from '@angular/core';
import {EventWrestling} from '../../DTO/EventWrestling';
import {EventService} from '../../Service/Event.service';
import {ActivatedRoute} from '@angular/router';
import {EventsRenewsListComponent} from '../events-renews-list/events-renews-list.component';

@Component({
  selector: 'app-event',
  imports: [
    EventsRenewsListComponent
  ],
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  event!: EventWrestling;
  isRenewLoaded: boolean = false;

  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  loadRenewsList() {
    this.isRenewLoaded = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const eventID = params.get('id');
      if(eventID){
        this.eventService.getEventById(eventID).subscribe(event=> this.event = event)
      }
    })
  }

  protected readonly String = String;
}
