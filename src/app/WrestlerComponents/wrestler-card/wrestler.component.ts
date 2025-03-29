import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Wrestler} from '../../DTO/Wrestler';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-wrestler',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './wrestler.component.html',
  styleUrl: './wrestler.component.css'
})
export class WrestlerComponent {
  @Input() wrestler!: Wrestler;
  @Output() event = new EventEmitter<number>()

  constructor(private router: Router) {
  }
  redirectToWrestlerCard():void{
    this.router.navigate([`/wrestlers/${this.wrestler.id}`]);
  }
}
