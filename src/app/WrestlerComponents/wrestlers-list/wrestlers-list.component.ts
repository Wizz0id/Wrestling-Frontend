import {Component, OnInit} from '@angular/core';
import {Wrestler} from '../../DTO/Wrestler';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {WrestlerService} from '../../Service/Wrestler.service';
import {WrestlerComponent} from '../wrestler-card/wrestler-card.component';

@Component({
  selector: 'app-wrestlers-list',
  imports: [
    ReactiveFormsModule,
    WrestlerComponent
  ],
  standalone: true,
  templateUrl: './wrestlers-list.component.html',
  styleUrl: './wrestlers-list.component.css'
})
export class WrestlersListComponent implements OnInit{
  wrestlersList: Wrestler[] = [];
  searchQuery: FormControl = new FormControl("");

  constructor(private wrestlerService: WrestlerService) {
  }

  ngOnInit(): void {
    this.loadWrestlers();
  }

  loadWrestlers(): void{
    this.wrestlerService.getWrestlers(this.searchQuery.value).subscribe((list) => this.wrestlersList = list);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    if (keyboardEvent.key === 'Enter') {
      this.loadWrestlers();
    }
  }
}
