import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wrestler} from '../../DTO/Wrestler';
import {Gimmick} from '../../DTO/Gimmick';
import {GimmickService} from '../../Service/Gimmick.service';

@Component({
  selector: 'app-gimmicks-list',
  imports: [],
  standalone: true,
  templateUrl: './gimmicks-list.component.html',
  styleUrl: './gimmicks-list.component.css'
})
export class GimmicksListComponent implements OnInit{
  @Input() wrestler!: Wrestler;
  @Output() event = new EventEmitter<number>()
  gimmickList: Gimmick[] = [];

  constructor(private gimmickService: GimmickService) {
  }

  ngOnInit() {
    this.gimmickService.getGimmicks(this.wrestler.id.toString()).subscribe(gimmicks => this.gimmickList = gimmicks);
  }
}
