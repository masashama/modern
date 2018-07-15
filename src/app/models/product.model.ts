import { IProduct } from '../app.interface';

/**
 * Category Entity
 */
export default class Product implements IProduct {

  id: number;
  name: string;
  cost: number;
  category: number;
  isFood: boolean = false;
  brand: string;
  color: string = 'BLACK';
  url: string;

  constructor(product?: IProduct) {
    if ( product ) {
      this.id = product.id;
      this.name = product.name;
      this.cost = product.cost;
      this.category = product.category;
      this.isFood = product.isFood;

      if ( this.isFood ) {
        this.color = product.color;
        this.brand = product.brand;
        this.url = product.url;
      }

    }
  }



}
