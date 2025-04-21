import {Component, OnInit} from '@angular/core';
import {Title} from '../../DTO/Title';
import {WrestlerService} from '../../Service/Wrestler.service';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../../Service/Title.service';
import {Wrestler} from '../../DTO/Wrestler';
import {WrestlerComponent} from '../../WrestlerComponents/wrestler-card/wrestler-card.component';

@Component({
  selector: 'app-title',
  imports: [
    WrestlerComponent
  ],
  standalone: true,
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit{
  title!: Title;
  wrestlerList: Wrestler[] = [];
  isWrestlersLoaded: boolean = false;
  constructor(private titleService: TitleService, private route: ActivatedRoute, private wrestlerService: WrestlerService) {
  }
  getChampions(){
    if((this.wrestlerList.length == 0))this.wrestlerService.getWrestlersByTitle(this.title.id).subscribe(wrestlers => this.wrestlerList = wrestlers);
    this.isWrestlersLoaded =!this.isWrestlersLoaded;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const titleId = params.get('id');
      if(titleId){
        this.titleService.getTitleById(titleId).subscribe(title => this.title = title);
      }
    });
  }
}
