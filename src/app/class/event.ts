import {Food} from './food/food';

export class Event {
  id: number;
  eventDate: any;
  timestamp: number;
  eventDescription: string;
  eventName: string;
  priceNoDrinks: number;
  priceWithDrinks: number;
  food: Food[];
  realPriceDrink: string | null;
  realPriceNoDrink: string | null;
}
