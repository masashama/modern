import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductFormService} from '../../services/product-form.service';
import {ICategory, IProduct} from '../../app.interface';
import Product from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  private _product: IProduct;
  product: IProduct;
  category: ICategory;

  private s1$;
  private s2$;

  constructor(
    private productFormService: ProductFormService,
  ) { }

  ngOnInit() {
    this.productFormService.must_update.subscribe(r => {
      this.product = null;
      this._product = null;
      this.category = null;
      this.subscribe();
    });
    this.subscribe();
  }

  subscribe() {
    this.s1$ = this.productFormService.product.subscribe( product => {
      if ( product ) {
        this._product = product;
        this.product = new Product(product);
      } else {
        this.clearForm();
      }
    });

    this.s2$ = this.productFormService.category.subscribe( category => {
      if ( category ) {
        this.category = category;
        this.product = new Product();
      } else {
        this.clearForm();
      }

    });
  }

  private clearForm() {
    this.productFormService.clearForm();
    this.subscribe();
  }

  onSubmit() {
    if ( this.category ) {
      this.product.category = this.category.id;
    }
    this.productFormService.result.next(this.product);
  }

  onResetForm() {
    this.clearForm();
    this.productFormService.clearForm();
  }


}
