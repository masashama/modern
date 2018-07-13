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

  /**
   * Toggle node view
   * @param {MouseEvent} event
   * @param {Node<any>} node
   */
  onNodeClick(event: MouseEvent, node: Node<any>) {
    event.preventDefault();
    event.stopPropagation();

    /**
     * If node close then fetch children and open node
     * else close node
     */
    console.log('Click by node');
    if ( !node.isOpen ) {
      this.apiService.getCategories(node.entity.id).subscribe( categories => {
        node.setChildren(categories);
        node.isOpen = true;
      });
    } else {
      node.isOpen = false;
    }
    console.log('Node children', node.children);

  }

  onAddNodeClick(event: MouseEvent, node): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('Add node for ', node);
  }

}
