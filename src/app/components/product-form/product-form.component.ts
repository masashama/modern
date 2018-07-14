import { Component, OnInit } from '@angular/core';
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

  constructor(
    private productFormService: ProductFormService,
  ) { }

  ngOnInit() {

    this.productFormService.product.subscribe( product => {
      if ( product ) {
        this._product = product;
        this.product = new Product(product);
      } else {
        this._product = null;
        this.product = null;
      }
    });

  }

  onSubmit() {
    this.productFormService.result.next(this.product);
  }

}
