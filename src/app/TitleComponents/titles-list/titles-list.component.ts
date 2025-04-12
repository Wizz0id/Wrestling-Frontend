import {Component, OnInit} from '@angular/core';
import {Title} from '../../DTO/Title';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TitleService} from '../../Service/Title.service';
import {TitleCardComponent} from '../title-card/title-card.component';

@Component({
  selector: 'app-titles-list',
  imports: [
    ReactiveFormsModule,
    TitleCardComponent,
  ],
  standalone: true,
  templateUrl: './titles-list.component.html',
  styleUrl: './titles-list.component.css'
})
export class TitlesListComponent implements OnInit{
  titleList: Title[] = [];
  searchQuery: FormControl = new FormControl("");
  constructor(private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.loadTitles();
  }
  loadTitles(){
    this.titleService.getTitles(this.searchQuery.value).subscribe((list) => this.titleList = list);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    if (keyboardEvent.key === 'Enter') {
      this.loadTitles();
    }
  }
}
