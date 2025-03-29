import {Component, OnInit} from '@angular/core';
import {WrestlerService} from '../../Service/Wrestler.service';
import {ActivatedRoute} from '@angular/router';
import {Wrestler} from '../../DTO/Wrestler';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-wrestler-card',
  imports: [
    NgIf,
    DatePipe
  ],
  standalone: true,
  templateUrl: './wrestler-card.component.html',
  styleUrl: './wrestler-card.component.css'
})
export class WrestlerCardComponent implements OnInit{
  wrestler!: Wrestler;
  constructor(private wrestlerService: WrestlerService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const wrestlerId = params.get('id');
      if(wrestlerId)
      {
        this.wrestlerService.getWrestlerById(wrestlerId).subscribe(wrestler => {
          this.wrestler = wrestler;
        })
      }
    })
  }
}
