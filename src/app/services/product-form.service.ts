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

  must_update: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  callForm(product: IProduct): Observable<IProduct> {
    this.product.next(product);
    console.log('callform');
    return this.result;
  }

  callNewForm(category: ICategory): Observable<IProduct> {
    this.category.next(category);
    return this.result;
  }

  clearForm() {
    this.category = new Subject<ICategory>();
    this.result = new Subject<IProduct>();
    this.product = new Subject<IProduct>();
    this.must_update.next(true);
  }

}
