import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchRenew} from '../../DTO/MatchRenew';
import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-match-renew',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './match-renew.component.html',
  styleUrl: './match-renew.component.css'
})
export class MatchRenewComponent{
  @Input() renew!: MatchRenew;
  @Output() event = new EventEmitter<number>()
}
