import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Node} from '../models/node.model';
import {ICategory} from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class AddNodeFormService {

  private parentNode = new Subject<Node<ICategory>>();

  constructor() { }

  callForm(node: Node<ICategory>) {
    this.parentNode.next(node);
  }

  getNode(): Subject<Node<ICategory>> {
    return this.parentNode;
  }

}
