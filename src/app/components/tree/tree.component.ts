import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../models/node.model';
import {ApiService} from '../../services/api.service';
import {AddNodeFormService} from '../../services/add-node-form.service';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() nodes: Node<any>;

  constructor(
    private apiService: ApiService,
    private addNodeFormService: AddNodeFormService,
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
    this.openNode(node);
  }

  /**
   * Call for for add subcategory
   * @param {MouseEvent} event
   * @param {Node<any>} node
   */
  onAddNodeClick(event: MouseEvent, node: Node<any>): void {
    event.preventDefault();
    event.stopPropagation();
    const subscribe$ = this.addNodeFormService.callForm(node).subscribe(entity => {
      this.updateNode(node);

      // unsubscribe form form
      subscribe$.unsubscribe();
    });

  }

  /**
   * Update node, if node close then open
   * @param {Node<any>} node
   */
  private updateNode(node: Node<any>) {
    this.apiService.getCategories(node.entity.id).subscribe( categories => {
      node.setChildren(categories);
      if ( !node.isOpen ) {
        node.isOpen = true;
      }
    });
  }

  /**
   * Toggle node
   * @param {Node<any>} node
   */
  private openNode(node: Node<any>) {
    /**
     * If node close then fetch children and open node
     * else close node
     */
    if ( !node.isOpen ) {
      this.apiService.getCategories(node.entity.id).subscribe( categories => {
        node.setChildren(categories);
        node.isOpen = true;
      });
    } else {
      node.isOpen = false;
    }
  }

}
