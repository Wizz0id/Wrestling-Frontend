import { Routes } from '@angular/router';
import {WrestlersListComponent} from './WrestlerComponents/wrestlers-list/wrestlers-list.component';
import {PromotionsListComponent} from './PromotionComponents/promotions-list/promotions-list.component';
import {MatchesListComponent} from './MatchComponents/matches-list/matches-list.component';
import {EventsListComponent} from './EventComponents/events-list/events-list.component';
import {WrestlerCardComponent} from './WrestlerComponents/wrestler/wrestler-card.component';
import {MatchComponent} from './MatchComponents/match/match.component';

export const routes: Routes = [
  {path: 'wrestlers', component: WrestlersListComponent},
  {path: 'wrestlers/:id', component: WrestlerCardComponent},
  {path: 'promotions', component: PromotionsListComponent},
  {path: 'matches', component: MatchesListComponent},
  {path: 'matches/:id', component: MatchComponent},
  {path: 'events', component: EventsListComponent}
];
