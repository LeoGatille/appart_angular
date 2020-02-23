import {Food} from './food/food';

export class Event {
  id: number;
  eventDate: Date;
  timestamp: number;
  eventDescription: string;
  eventName: string;
  priceNoDrinks: number;
  priceWithDrinks: number;
  food: Food[];
}
