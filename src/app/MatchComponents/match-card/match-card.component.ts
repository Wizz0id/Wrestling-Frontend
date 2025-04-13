import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Match} from '../../DTO/Match';

@Component({
  selector: 'app-match-card',
  imports: [ ],
  standalone: true,
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {
  @Input() match!: Match;
  @Output() event = new EventEmitter<number>()

  constructor(private router: Router) {
  }
  redirectToMatch():void{
    this.router.navigate([`/matches/${this.match.id}`]).then();
  }
}
