import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Title} from '../../DTO/Title';
import {Router} from '@angular/router';

@Component({
  selector: 'app-title-card',
  imports: [
  ],
  templateUrl: './title-card.component.html',
  standalone: true,
  styleUrl: './title-card.component.css'
})
export class TitleCardComponent {
  @Input() title!: Title;
  @Output() event = new EventEmitter<number>()

  constructor(private router: Router) {
  }
  redirectToTitle():void{
    this.router.navigate([`/titles/${this.title.id}`]).then();
  }
  getReign(start:Date, end: Date): number
  {
    let startDate = new Date(start);
    let endDate = new Date(end);
    return Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}
