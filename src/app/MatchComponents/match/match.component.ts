import {Component, OnInit} from '@angular/core';
import {Match} from '../../DTO/Match';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../../Service/Match.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatchesRenewsListComponent} from '../matches-renews-list/matches-renews-list.component';
import {Wrestler} from '../../DTO/Wrestler';
import {WrestlerService} from '../../Service/Wrestler.service';
import {WrestlerComponent} from '../../WrestlerComponents/wrestler-card/wrestler-card.component';

@Component({
  selector: 'app-match',
  imports: [
    MatchesRenewsListComponent,
    WrestlerComponent,
  ],
  standalone: true,
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit{
  match!: Match;
  safeUrl!: SafeResourceUrl;
  isMatchesRenewsListLoaded: boolean = false;
  isWinnerLoaded: boolean = false;
  isParticipantsLoaded: boolean = false;
  participants: Wrestler[] = [];
  winner!: Wrestler;
  constructor(private matchService: MatchService, private wrestlerService: WrestlerService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  loadMatchesRenewsList() {
    this.isMatchesRenewsListLoaded = !this.isMatchesRenewsListLoaded;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const matchId = params.get('id');
      if (matchId) {
        this.matchService.getMatchById(matchId).subscribe(match => {
          this.match = match.match;
          this.match.peoplesRating = match.rating;
          if (this.isYouTubeUrl(this.match.url)) {
            const videoId = this.extractYouTubeVideoId(this.match.url);
            if (videoId) {
              this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube.com/embed/${videoId}`
              );
            }
          } else if (this.isVKUrl(this.match.url)) {
            const videoIds = this.extractVKVideoIds(this.match.url);
            if (videoIds) {
              const { ownerId, videoId } = videoIds;
              this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://vk.com/video_ext.php?oid=-${ownerId}&id=${videoId}&hash=&__ref=`
              );
            }
          }
        });
      }
    });
  }

  loadWinner(){
    if(!this.winner) this.wrestlerService.getWrestlerById(this.match.winnerId.toString()).subscribe(winner => this.winner = winner.wrestler);
    this.isWinnerLoaded = !this.isWinnerLoaded;
  }

  loadParticipants(){
    debugger
    if((this.participants.length == 0)) this.wrestlerService.getWrestlersByMatch(this.match.id).subscribe(participants => this.participants = participants);
    this.isParticipantsLoaded = !this.isParticipantsLoaded;
  }

  isYouTubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  isVKUrl(url: string): boolean {
    return url.includes('vk.com') || url.includes('vkvideo.ru');
  }

  extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  extractVKVideoIds(url: string): { ownerId: string; videoId: string } | null {
    const regex = /(?:vk\.com\/video|vkvideo\.ru\/video)-(\d+)_(\d+)/;
    const match = url.match(regex);
    if (match) {
      return { ownerId: match[1], videoId: match[2] };
    }
    return null;
  }

  protected readonly String = String;
}
