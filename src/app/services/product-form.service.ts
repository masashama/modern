import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IProduct} from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  product: Subject<IProduct> = new Subject<IProduct>();
  result: Subject<IProduct> = new Subject<IProduct>();

  constructor() { }

  callForm(product: IProduct): Observable<IProduct> {
    this.product.next(product);
    return this.result;
  }

}
