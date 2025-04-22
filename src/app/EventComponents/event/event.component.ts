import {Component, OnInit} from '@angular/core';
import {EventWrestling} from '../../DTO/EventWrestling';
import {EventService} from '../../Service/Event.service';
import {ActivatedRoute} from '@angular/router';
import {EventsRenewsListComponent} from '../events-renews-list/events-renews-list.component';
import {MatchService} from '../../Service/Match.service';
import {Match} from '../../DTO/Match';
import {MatchCardComponent} from '../../MatchComponents/match-card/match-card.component';
import {FormsModule} from '@angular/forms';
import {MatchType} from '../../MatchComponents/MatchType';
import {Wrestler} from '../../DTO/Wrestler';
import {WrestlerService} from '../../Service/Wrestler.service';

@Component({
  selector: 'app-event',
  imports: [
    EventsRenewsListComponent,
    MatchCardComponent,
    FormsModule
  ],
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  event!: EventWrestling;
  matchList: Match[] = [];
  isRenewLoaded: boolean = false;
  isMatchLoaded: boolean = false;
  matchTypes = Object.values(MatchType);
  wrestlers: Wrestler[] = [];
  selectedWrestlers: Wrestler[] = [];
  addMatchVisible: boolean = false;
  newMatch:Match= {
    id: 0,
    name: '',
    type: '',
    url: '',
    professionalRating: 0,
    eventId: 0,
    winnerId: 0,
    peoplesRating: 0,
    wrestlersId: [] as number[]
  };

  constructor(private eventService: EventService, private route: ActivatedRoute, private matchService: MatchService, private wrestlerService: WrestlerService) {
    if(localStorage.getItem('role') == "ADMIN"){
      this.wrestlerService.getWrestlers().subscribe(wrestlers => this.wrestlers = wrestlers);
    }
  }

  loadRenewsList() {
    this.isRenewLoaded = !this.isRenewLoaded;
  }

  getAllMatches()
  {
    if((this.matchList.length == 0)) this.matchService.getMatchesByEvent(this.event.id).subscribe(matches => this.matchList = matches);
    this.isMatchLoaded = !this.isMatchLoaded;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const eventID = params.get('id');
      if(eventID){
        this.eventService.getEventById(eventID).subscribe(event=> this.event = event)
      }
    })
  }
  createMatch(){
    this.addMatchVisible = !this.addMatchVisible;
  }
  addMatch() {
    if (this.newMatch.winnerId != 0 && this.newMatch.url != '' && this.newMatch.name != '' && this.newMatch.type != '') {
      this.newMatch.eventId = this.event.id;
      this.matchService.createMatch(this.newMatch).subscribe();
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
  }
  toggleWrestler(wrestler: Wrestler) {
    const index = this.selectedWrestlers.indexOf(wrestler);
    if (index === -1) {
      this.selectedWrestlers.push(wrestler);
      this.newMatch.wrestlersId.push(wrestler.id);
    } else {
      this.selectedWrestlers.splice(index, 1);
      this.newMatch.wrestlersId.splice(index, 1);
    }
  }

  protected readonly String = String;
  protected readonly localStorage = localStorage;
}
