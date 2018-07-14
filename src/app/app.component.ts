import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {ICategory} from './app.interface';
import {Node} from './models/node.model';
import {AddNodeFormService} from './services/add-node-form.service';
import Category from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories: Array<Node<ICategory>>;

  categoryModel = new Category();
  categoryModelParent: Node<ICategory> = null;
  categoryModalState = false;

  constructor(
    private apiService: ApiService,
    private addNodeFormService: AddNodeFormService,
  ) { }

  ngOnInit(): void {

    /**
     * Fetch categories from api service
     */
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories.map( category => new Node(category));
    });

    /**
     * State of modal window
     */
    this.addNodeFormService.state.subscribe( state => {
      this.categoryModalState = state;
    });

    /**
     * Getting parent node for add category
     */
    this.addNodeFormService.getNode().subscribe( node => {
      this.categoryModelParent = node;
    });

  }

  onSubmitNewNode() {
    this.addNodeFormService.setResult(this.categoryModel, this.categoryModelParent);
  }

  closeModal(event: MouseEvent) {
    this.addNodeFormService.state.next(false);
  }
}
