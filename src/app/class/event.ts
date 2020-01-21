import {Food} from './food/food';

export class Event {
  id: number;
  eventDate: Date;
  eventDescription: string;
  eventName: string;
  priceNoDrinks: number;
  priceWithDrinks: number;
  foods: Food[];
}
