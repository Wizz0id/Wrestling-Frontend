import {Component, OnInit} from '@angular/core';
import {EventWrestling} from '../../DTO/EventWrestling';
import {EventService} from '../../Service/Event.service';
import {ActivatedRoute} from '@angular/router';
import {EventsRenewsListComponent} from '../events-renews-list/events-renews-list.component';
import {MatchService} from '../../Service/Match.service';
import {Match} from '../../DTO/Match';
import {MatchCardComponent} from '../../MatchComponents/match-card/match-card.component';

@Component({
  selector: 'app-event',
  imports: [
    EventsRenewsListComponent,
    MatchCardComponent
  ],
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  event!: EventWrestling;
  matchList: Match[] = [];
  isRenewLoaded: boolean = false;

  constructor(private eventService: EventService, private route: ActivatedRoute, private matchService: MatchService) {
  }

  loadRenewsList() {
    this.isRenewLoaded = true;
  }

  getAllMatches()
  {
    this.matchService.getMatchesByEvent(this.event.id).subscribe(matches => this.matchList = matches);
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
