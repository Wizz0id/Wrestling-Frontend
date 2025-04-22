import { Routes } from '@angular/router';
import {WrestlersListComponent} from './WrestlerComponents/wrestlers-list/wrestlers-list.component';
import {PromotionsListComponent} from './PromotionComponents/promotions-list/promotions-list.component';
import {MatchesListComponent} from './MatchComponents/matches-list/matches-list.component';
import {EventsListComponent} from './EventComponents/events-list/events-list.component';
import {WrestlerCardComponent} from './WrestlerComponents/wrestler/wrestler.component';
import {MatchComponent} from './MatchComponents/match/match.component';
import {TitlesListComponent} from './TitleComponents/titles-list/titles-list.component';
import {PromotionComponent} from './PromotionComponents/promotion/promotion.component';
import {EventComponent} from './EventComponents/event/event.component';
import {TitleComponent} from './TitleComponents/title/title.component';
import {WrestlerAddComponent} from './PromotionComponents/wrestler-add/wrestler-add.component';

export const routes: Routes = [
  {path: 'wrestlers', component: WrestlersListComponent},
  {path: 'wrestlers/:id', component: WrestlerCardComponent},
  {path: 'wrestler-create/:id', component: WrestlerAddComponent},
  {path: 'promotions', component: PromotionsListComponent},
  {path: 'promotions/:id', component: PromotionComponent},
  {path: 'matches', component: MatchesListComponent},
  {path: 'matches/:id', component: MatchComponent},
  {path: 'events', component: EventsListComponent},
  {path: 'events/:id', component: EventComponent},
  {path: 'titles', component: TitlesListComponent},
  {path: 'titles/:id', component: TitleComponent}
];
