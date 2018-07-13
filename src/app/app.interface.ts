/**
 * Describe Product shape
 */
export interface IProduct {
  id: number;
  name: string;
  cost: number;
  isFood: boolean;
  url: string;
  brand: string;
  color: string;
}

/**
 * Describe Category shape
 */
export interface ICategory {
  id: number;
  name: string;
  parent: ICategory;
}
