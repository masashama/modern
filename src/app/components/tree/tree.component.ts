import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../models/node.model';
import { ApiService } from '../../services/api.service';
import { AddNodeFormService } from '../../services/add-node-form.service';
import { ICategory, IProduct } from '../../app.interface';
import { ProductFormService } from '../../services/product-form.service';
import {forkJoin, Observable, Subscription} from 'rxjs';



@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() nodes: Node<any>;

  private editSubscribe$: Subscription;
  private addSubscription$: Subscription;

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

    // for clearing before request
    node.setChildren([]);

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
      console.log('New Entity');
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
    const categories$ = this.apiService.getCategories(node.entity.id);
    const products$ = this.apiService.getProducts( node.entity.id );

    // join stream request
    forkJoin(categories$, products$)
      .subscribe( ([categories, products]) =>
        node.setChildren([...categories, ...products])
      );

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
      const categories$ = this.apiService.getCategories(node.entity.id);
      const products$ = this.apiService.getProducts( node.entity.id );

      // join stream request
      forkJoin(categories$, products$)
        .subscribe( ([categories, products]) =>
          node.setChildren([...categories, ...products])
        );
      node.isOpen = true;
    } else {
      node.isOpen = false;
    }
  }

  /**
   * Fetch Categories and Products return merged array
   * @deprecated
   * @param {Node<any>} node
   * @returns {Array<IProduct | ICategory>}
   */
  private fetchChildNodes(node: Node<any>): Array<IProduct|ICategory> {
    let _categories = [];

    this.apiService.getCategories(node.entity.id).subscribe( categories => {
      console.log(categories);
      _categories = categories;
    });
    // this.apiService.getProducts(node.entity.id).subscribe( products => {
    //   _products = products;
    // });

    return _categories;
  }


  /**
   * Edit product
   * @param {MouseEvent} event
   * @param {Node<IProduct>} node
   */
  onEditProduct(event: MouseEvent, node: Node<IProduct>) {
    event.preventDefault();
    event.stopPropagation();

    // costil by sasha
    node.entity.category = node.getParent().entity.id;

    if ( this.editSubscribe$ ) {
      this.editSubscribe$.unsubscribe();
    }

    this.editSubscribe$ = this.productFormService.callForm(node.entity)
      .subscribe( result => {
        const editSubscribe$ = this.apiService.updateProduct(result).subscribe( product => {

          // clear form
          this.productFormService.clearForm();
          this.updateNode(node.getParent());
          editSubscribe$.unsubscribe();
        });

        // unsubscribe from form
        this.editSubscribe$.unsubscribe();
      });
  }

  /**
   * Add new product to category
   * @param {MouseEvent} $event
   * @param {Node<ICategory>} node
   */
  onAddProduct($event: MouseEvent, node: Node<ICategory>) {
    event.preventDefault();
    event.stopPropagation();

    if ( this.addSubscription$ ) {
      this.addSubscription$.unsubscribe();
    }

    this.addSubscription$ = this.productFormService.callNewForm(node.entity)
      .subscribe( result => {
        const addSubscribe$ = this.apiService.addProduct(result).subscribe( product => {

          // clear form
          this.productFormService.clearForm();
          this.updateNode(node);
          addSubscribe$.unsubscribe();
          this.addSubscription$.unsubscribe();
        });

      });

    console.log('Add product', node);
  }

  /**
   * Delete category
   * @param {MouseEvent} $vent
   * @param {Node<ICategory>} node
   */
  onRemoveNode($vent: MouseEvent, node: Node<ICategory>) {
    event.preventDefault();
    event.stopPropagation();
    const $subscribe = this.apiService.removeCategory(node.entity.id).subscribe( r => {
      let parent: Node<ICategory>;
      if ( parent = node.getParent() ) {
        this.updateNode(parent);
        $subscribe.unsubscribe();
      }
    });
  }

  onRemoveProduct($event, node: Node<IProduct>) {
    event.preventDefault();
    event.stopPropagation();

    this.apiService.removeProduct(node.entity.id).subscribe( r => {
      this.updateNode(node.getParent());
    })

  }

  onCountTree($event, node) {
    event.preventDefault();
    event.stopPropagation();
    this.apiService.countTree(node.entity.id).subscribe( r => alert(r));
  }
}
