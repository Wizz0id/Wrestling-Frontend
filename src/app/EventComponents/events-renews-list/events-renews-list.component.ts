import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventRenew} from '../../DTO/EventRenew';
import {EventRenewService} from '../../Service/EventRenew.service';
import {EventRenewComponent} from '../event-renew/event-renew.component';
import {AuthService} from '../../Service/Auth.service';

@Component({
  selector: 'app-events-renews-list',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EventRenewComponent
  ],
  standalone: true,
  templateUrl: './events-renews-list.component.html',
  styleUrl: './events-renews-list.component.css'
})
export class EventsRenewsListComponent implements OnInit{
  @Input() eventID!: string;
  isReviewFormVisible: boolean = false;
  renewList: EventRenew[] = [];
  renewForm!: FormGroup;
  readonly isAuth:boolean;

  constructor(private eventRenewService: EventRenewService, private fb: FormBuilder, private authService: AuthService) {
    this.isAuth = authService.isAuthenticatedUser();
  }

  ngOnInit(): void {
    this.loadRenews(this.eventID)
  }

  loadRenews(id: string){
    this.eventRenewService.getRenews(id).subscribe(renews => this.renewList = renews)
  }
  toggleReviewForm() {
    this.isReviewFormVisible = !this.isReviewFormVisible;
    this.renewForm = this.fb.group({
      username: localStorage.getItem('username'),
      rating: 0,
      renew: "",
    });
  }

  submitReview() {
    this.renewList.push(this.renewForm.value);
    this.eventRenewService.createRenew(this.eventID, this.renewForm.value).subscribe();
    this.isReviewFormVisible = false;
  }
}
