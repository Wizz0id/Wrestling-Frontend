import {Promotion} from './Promotion';
import {Wrestler} from './Wrestler';

export interface WrestlerWithPromotion{
  promotion: Promotion;
  wrestler: Wrestler;
}
