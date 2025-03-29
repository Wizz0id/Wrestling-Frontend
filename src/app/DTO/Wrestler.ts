export interface Wrestler{
  id: number;
  fio: string;
  height: number;
  weight: number;
  picture: number[];
  gender: string;
  trainer: string;
  startOfCareer: Date;
  retired: boolean;
  promotionID: number;
}
