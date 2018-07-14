import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

import { ICategory } from '../app.interface';

import { categoryMock } from '../mock/entity.mock';
import Category from '../models/category.model';
import {Node} from '../models/node.model';


let mock = categoryMock;

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
    return of(mock
      .map( entity => new Category(entity))
      .filter( entity => entity.parent === parent )
    );
  }

  addCategory(entity: ICategory, parent: Node<ICategory>) {
    const newId = mock[mock.length - 1].id + 1;
    const newEntity = {...entity, id: newId, parent: parent.entity.id};
    mock.push(newEntity);
    return of(newEntity);
  }
}
