import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Node} from '../models/node.model';
import {ICategory} from '../app.interface';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddNodeFormService {

  private parentNode = new Subject<Node<ICategory>>();
  state = new Subject<boolean>();
  result = new Subject<ICategory>();

  constructor(
    private apiService: ApiService
  ) {

    this.state.next(false);

  }

  callForm(node: Node<ICategory>): Observable<ICategory> {
    this.state.next(true);
    this.parentNode.next(node);
    return this.result;
  }

  getNode(): Subject<Node<ICategory>> {
    return this.parentNode;
  }

  setResult(entity: ICategory, parent: Node<ICategory>) {
    this.apiService.addCategory(entity, parent).subscribe( result => {
      this.parentNode.next(null);
      this.state.next(false);
      this.result.next(result);
    });
  }
}
