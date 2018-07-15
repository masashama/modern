import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ICategory, IProduct} from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  product: Subject<IProduct> = new Subject<IProduct>();
  result: Subject<IProduct> = new Subject<IProduct>();
  category: Subject<ICategory> = new Subject<ICategory>();

  constructor() { }

  callForm(product: IProduct): Observable<IProduct> {
    this.product.next(product);
    return this.result;
  }

  callNewForm(category: ICategory): Observable<IProduct> {
    this.category.next(category);
    return this.result;
  }
  
  clearForm() {
    this.category.next(null);
  }

}
