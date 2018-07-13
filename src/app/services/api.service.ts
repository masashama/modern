import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

import { ICategory } from '../app.interface';

import { categoryMock } from '../mock/entity.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: HttpClient
  ) { }

  /**
   * Get categories by parent ID
   * if id null than return root categories
   *
   * @param {number} parent
   * @returns {Observable<Array<ICategory>>}
   */
  getCategoryes(parent: number = null): Observable<Array<ICategory>> {
    return of(categoryMock
      .filter( entity => entity.parent === parent )
      .map( entity => <ICategory>entity)
    );
  }

}
