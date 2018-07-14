import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../models/node.model';
import { ApiService } from '../../services/api.service';
import { AddNodeFormService } from '../../services/add-node-form.service';
import { ICategory, IProduct } from '../../app.interface';
import { ProductFormService } from '../../services/product-form.service';



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
    private productFormService: ProductFormService,
  ) {

    this.updateNode = this.updateNode.bind(this);

  }

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
    console.log('Node for update', node);
    node.setChildren(this.fetchChildNodes(node));
    if ( !node.isOpen ) {
      node.isOpen = true;
    }
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
      node.setChildren(this.fetchChildNodes(node));
      node.isOpen = true;
    } else {
      node.isOpen = false;
    }
  }

  /**
   * Fetch Categories and Products return merged array
   * @param {Node<any>} node
   * @returns {Array<IProduct | ICategory>}
   */
  private fetchChildNodes(node: Node<any>): Array<IProduct|ICategory> {
    let _categories = [];
    let _products = [];
    this.apiService.getCategories(node.entity.id).subscribe( categories => {
      _categories = categories;
    });
    this.apiService.getProducts(node.entity.id).subscribe( products => {
      _products = products;
    });
    return [..._categories, ..._products];
  }


  /**
   * Edit product
   * @param {MouseEvent} event
   * @param {Node<IProduct>} node
   */
  onEditProduct(event: MouseEvent, node: Node<IProduct>) {
    const subscribe$ = this.productFormService.callForm(node.entity)
      .subscribe( result => {
        this.apiService.updateProduct(result).subscribe( product => {
          console.log('Result', result);

          // clear form
          this.productFormService.product.next(null);
          this.updateNode(node.getParent());
        });

        // unsubscribe from form
        subscribe$.unsubscribe();
      });
  }

}
