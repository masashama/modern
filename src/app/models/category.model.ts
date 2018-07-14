import {ICategory} from '../app.interface';

/**
 * Category Entity
 */
export default class Category implements ICategory {
  id: number;
  name: string;
  parent: number;

  constructor(category?: ICategory) {
    if ( category ) {
      this.id = category.id;
      this.name = category.name;
      this.parent = category.parent;
    }
  }

}
