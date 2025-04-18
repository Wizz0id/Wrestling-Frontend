import {Component, OnDestroy, OnInit} from '@angular/core';
import {WrestlerService} from '../../Service/Wrestler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Wrestler} from '../../DTO/Wrestler';
import {DatePipe} from '@angular/common';
import {Promotion} from '../../DTO/Promotion';
import {Match} from '../../DTO/Match';
import {MatchService} from '../../Service/Match.service';
import {MatchCardComponent} from '../../MatchComponents/match-card/match-card.component';
import {TitleService} from '../../Service/Title.service';
import {Title} from '../../DTO/Title';
import {TitleCardComponent} from '../../TitleComponents/title-card/title-card.component';
import {AppComponent} from '../../app.component';
import {GimmicksListComponent} from '../gimmicks-list/gimmicks-list.component';

@Component({
  selector: 'app-wrestler',
  imports: [
    DatePipe,
    MatchCardComponent,
    TitleCardComponent,
    GimmicksListComponent
  ],
  standalone: true,
  templateUrl: './wrestler.component.html',
  styleUrl: './wrestler.component.css'
})
export class WrestlerCardComponent implements OnInit, OnDestroy{
  wrestler!: Wrestler;
  promotion!: Promotion;
  matchList: Match[] = [];
  titleList: Title[] = [];

  constructor(private wrestlerService: WrestlerService, private route: ActivatedRoute, private router: Router,
              private matchService: MatchService, private titleService: TitleService, private appComp: AppComponent) {
  }

  ngOnDestroy() {
    const background = document.querySelector<HTMLElement>('.animation');
    if (background) {
      background.classList.remove('static');
      this.appComp.changeBackground();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const wrestlerId = params.get('id');
      if(wrestlerId)
      {
        this.wrestlerService.getWrestlerById(wrestlerId).subscribe(wrestlerWithPromo => {
          this.wrestler = wrestlerWithPromo.wrestler;
          this.promotion = wrestlerWithPromo.promotion;
          const background = document.querySelector<HTMLElement>('.animation');
          if (background) {
            background.classList.add('static');
            background.style.backgroundImage = `url('data:image/jpeg;base64,${wrestlerWithPromo.wrestler.picture}')`;
          }
        })
      }
    })
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64Image = e.target?.result?.toString().split(',')[1];
          if (base64Image) {
            this.wrestler.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  updateWrestler() {
    this.wrestlerService.updateWrestler(this.wrestler.id, this.wrestler).subscribe(wrestler => {
      wrestler.countOfMatches = this.wrestler.countOfMatches;
      this.wrestler = wrestler;
    });
  }
  getMatches(){
    this.matchService.getMatchesByWrestler(this.wrestler.id).subscribe(matches => this.matchList = matches);
  }
  getTitles(){
    this.titleService.getTitlesByWrestler(this.wrestler.id).subscribe(titles => this.titleList = titles)
  }
  ToPromotion()
  {
    this.router.navigate([`/promotions/${this.promotion.id}`]).then();
  }
}
