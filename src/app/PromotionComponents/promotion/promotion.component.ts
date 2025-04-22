import {Component, OnInit} from '@angular/core';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Wrestler} from '../../DTO/Wrestler';
import {WrestlerService} from '../../Service/Wrestler.service';
import {WrestlerComponent} from '../../WrestlerComponents/wrestler-card/wrestler-card.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TitleService} from '../../Service/Title.service';
import {Title} from '../../DTO/Title';
import {EventService} from '../../Service/Event.service';

@Component({
  selector: 'app-promotion',
  imports: [
    WrestlerComponent,
    ReactiveFormsModule
  ],
  standalone:true,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent implements OnInit{
  promotion!: Promotion;
  wrestlersList: Wrestler[] = [];
  isWrestlersLoaded: boolean = false;
  createTitleFormVisible: boolean = false;
  createEventFormVisible: boolean = false;
  titleForm: FormGroup;
  eventForm: FormGroup;
  title: Title = {id: 0,
    name: '',
    picture: '',
    promotionName: "",
    promotionPicture: "",
    wrestlersId: []
  }
  readonly role: string;

  constructor(private promotionService: PromotionService, private route: ActivatedRoute, private wrestlerService: WrestlerService, private router: Router,
              private fb: FormBuilder, private titleService: TitleService, private eventService: EventService) {
    this.role = localStorage.getItem('role') || "";
    this.titleForm = this.fb.group({
      name: ['', Validators.required],
      picture: [''],
    });
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
    {
      const promoId = params.get('id');
      if(promoId){
        this.promotionService.getPromotionById(promoId).subscribe(promo => this.promotion = promo);
      }
    }
  )
  }
  createWrestler(){
    this.router.navigate([`wrestler-create/${this.promotion.id}`]).then();
  }

  createTitle(){
    this.createTitleFormVisible = !this.createTitleFormVisible;
  }

  createEvent(){
    this.createEventFormVisible = !this.createEventFormVisible;
  }

  submitEvent(){
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.promotion.id, this.eventForm.value).subscribe();
      this.router.navigate([`promotions/${this.promotion.id}`]).then();
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
  }

  submitTitle(){
    if (this.titleForm.valid) {
      this.title.name = this.titleForm.value.name;
      this.titleService.createTitle(this.promotion.id, this.title).subscribe();
      this.router.navigate([`promotions/${this.promotion.id}`]).then();
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
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
            this.title.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  updatePromotion() {
    this.promotionService.updatePromotion(this.promotion.id, this.promotion).subscribe(promotion => this.promotion = promotion);
  }

  getWrestlers()
  {
    if((this.wrestlersList.length == 0)) this.wrestlerService.getWrestlersByPromotion(this.promotion.id).subscribe(wrestlers => this.wrestlersList = wrestlers);
    this.isWrestlersLoaded = !this.isWrestlersLoaded;
  }
}
