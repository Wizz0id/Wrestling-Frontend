import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Wrestler} from '../../DTO/Wrestler';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-wrestler-card',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './wrestler-card.component.html',
  styleUrl: './wrestler-card.component.css'
})
export class WrestlerComponent {
  @Input() wrestler!: Wrestler;
  @Output() event = new EventEmitter<number>()

  constructor(private router: Router) {
  }
  redirectToWrestler():void{
    this.router.navigate([`/wrestlers/${this.wrestler.id}`]).then();
  }
}
