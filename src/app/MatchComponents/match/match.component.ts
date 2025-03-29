import {Component, OnInit} from '@angular/core';
import {Match} from '../../DTO/Match';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../../Service/Match.service';
import {NgIf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-match',
  imports: [
    NgIf
  ],
  standalone: true,
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit{
  match!: Match;
  safeUrl!: SafeResourceUrl;
  constructor(private matchService: MatchService,private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const matchId = params.get('id');
      if (matchId) {
        this.matchService.getMatchById(matchId).subscribe(match => {
          this.match = match;
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
}
