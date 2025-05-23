import {Component, Input, OnInit} from '@angular/core';
import {MatchRenewComponent} from '../match-renew/match-renew.component';
import {MatchRenew} from '../../DTO/MatchRenew';
import {MatchRenewService} from '../../Service/MatchRenew.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../Service/Auth.service';

@Component({
  selector: 'app-matches-renews-list',
  imports: [
    MatchRenewComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './matches-renews-list.component.html',
  styleUrl: './matches-renews-list.component.css'
})
export class MatchesRenewsListComponent implements OnInit{
  @Input() matchId!: string;
  isReviewFormVisible: boolean = false;
  renewList: MatchRenew[] = [];
  renewForm!: FormGroup;
  readonly isAuth: boolean = false;
  constructor(private matchRenewService: MatchRenewService, private authService: AuthService, private fb: FormBuilder) {
    this.isAuth = this.authService.isAuthenticatedUser();
  }

  ngOnInit(): void {
    this.loadRenews(this.matchId);
  }

  loadRenews(id: string)
  {
    this.matchRenewService.getRenews(id).subscribe(renews => this.renewList = renews);
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
    this.matchRenewService.createRenew(this.matchId, this.renewForm.value).subscribe();
    this.isReviewFormVisible = false;
  }
}
