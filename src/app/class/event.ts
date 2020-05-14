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
  getRealPriceDrink() {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.priceWithDrinks / 100);   
  }
  getRealPriceNoDrink() {
   return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.priceNoDrinks / 100);
  }
  public getEntrees() {
    return this.food.filter((food: Food) => food.type.id === 1);
  }
  public getPlats() {
    return this.food.filter((food: Food) => food.type.id === 2);
  }
  public getDesserts() {
    return this.food.filter((food: Food) => food.type.id === 3);
  }
  public getDecimalPrice(price: number) {
    return price * 100;
  }
  public getFoodsId() {
    
    
    return this.food.map(food => {
      console.log('getFoodId FOOD = ', food);
      return food.id});
  }
}
