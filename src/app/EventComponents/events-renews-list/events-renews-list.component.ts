import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventRenew} from '../../DTO/EventRenew';
import {EventRenewService} from '../../Service/EventRenew.service';
import {EventRenewComponent} from '../event-renew/event-renew.component';

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

  constructor(private eventRenewService: EventRenewService, private fb: FormBuilder) {
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
