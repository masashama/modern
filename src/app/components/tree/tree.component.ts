import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../models/node.model';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() nodes: Node<any>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  onNodeClick(event: MouseEvent, node: Node<any>) {
    event.preventDefault();
    event.stopPropagation();

    console.log('Click by node');
    this.apiService.getCategories(node.entity.id).subscribe( categories => {
      node.setChildren(categories);
    });
    console.log('Node children', node.children);

  }

}
