import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Node} from '../models/node.model';
import {ICategory} from '../app.interface';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddNodeFormService {

  private parentNode = new Subject<Node<ICategory>>();
  state = new Subject<boolean>();

  constructor(
    private apiService: ApiService
  ) { }

  callForm(node: Node<ICategory>) {
    this.state.next(true);
    this.parentNode.next(node);
  }

  getNode(): Subject<Node<ICategory>> {
    return this.parentNode;
  }

  setResult(entity: ICategory, parent: Node<ICategory>) {
    this.apiService.addCategory(entity, parent).subscribe( result => {
      this.parentNode.next(null);
      this.state.next(false);
    });
  }
}
