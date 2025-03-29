import {Component, OnInit} from '@angular/core';
import {Match} from '../../DTO/Match';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatchService} from '../../Service/Match.service';
import {NgForOf} from '@angular/common';
import {MatchCardComponent} from '../match-card/match-card.component';

@Component({
  selector: 'app-matches-list',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    MatchCardComponent
  ],
  standalone: true,
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.css'
})
export class MatchesListComponent implements OnInit{
  matchesList: Match[] = [];
  searchQuery: FormControl = new FormControl("");

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.loadWrestlers();
  }

  loadWrestlers(): void{
    this.matchService.getMatches(this.searchQuery.value).subscribe((list) => this.matchesList = list);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    if (keyboardEvent.key === 'Enter') {
      this.loadWrestlers();
    }
  }
}
