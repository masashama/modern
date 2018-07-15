import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {ICategory, IProduct} from '../app.interface';
import { Node } from '../models/node.model';
import Category from '../models/category.model';
import Product from '../models/product.model';

import { categoryMock, productMock } from '../mock/entity.mock';
import {a} from '@angular/core/src/render3';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

const mock = categoryMock;
let pMock = productMock;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: HttpClient
  ) {}

  /**
   * Get categories by parent ID
   * if id null than return root categories
   *
   * @param {number} parent
   * @returns {Observable<Array<ICategory>>}
   */
  getCategories(parent: number = null): Observable<Array<ICategory>> {
    return this.httpService.get<Array<ICategory>>(parent ? `/api/category/${parent}` : `/api/category`);
  }

  getProducts(category: number): Observable<Array<IProduct>> {
    return this.httpService.get<Array<IProduct>>(`/api/product/${category}`);
  }

  addCategory(entity: ICategory, parent: Node<ICategory>): Observable<ICategory> {
    const newEntity = {...entity, parent: parent.entity.id};
    return this.httpService.post<ICategory>('/api/category', newEntity, httpOptions);
  }

  updateProduct(result: IProduct) {
    const updatedProduct = {...result};
    pMock = pMock.map( product => {
      if (result.id === product.id) {
        return updatedProduct;
      } else {
        return product;
      }
    });

    return of(updatedProduct);

  }

  addProduct(result: IProduct): Observable<IProduct> {
    const product = {...result};
    pMock.push(product);
    return of(product);
  }

  removeCategory(id: number): Observable<any> {
    return this.httpService.get(`/api/category/delete/${id}`);
  }
}
