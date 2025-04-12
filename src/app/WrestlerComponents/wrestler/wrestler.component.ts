import {Component, OnInit} from '@angular/core';
import {WrestlerService} from '../../Service/Wrestler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Wrestler} from '../../DTO/Wrestler';
import {DatePipe, NgIf} from '@angular/common';
import {Promotion} from '../../DTO/Promotion';

@Component({
  selector: 'app-wrestler',
  imports: [
    NgIf,
    DatePipe
  ],
  standalone: true,
  templateUrl: './wrestler.component.html',
  styleUrl: './wrestler.component.css'
})
export class WrestlerCardComponent implements OnInit{
  wrestler!: Wrestler;
  promotion!: Promotion;
  constructor(private wrestlerService: WrestlerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const wrestlerId = params.get('id');
      if(wrestlerId)
      {
        this.wrestlerService.getWrestlerById(wrestlerId).subscribe(wrestlerWithPromo => {
          this.wrestler = wrestlerWithPromo.wrestler;
          this.promotion = wrestlerWithPromo.promotion;
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
    this.wrestlerService.updateWrestler(this.wrestler.id, this.wrestler).subscribe(wrestler => this.wrestler = wrestler);
  }
  ToPromotion()
  {
    this.router.navigate([`/promotions/${this.promotion.id}`])
  }
}
