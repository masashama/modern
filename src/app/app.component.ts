import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {ICategory} from './app.interface';
import {Node} from './models/node.model';
import {AddNodeFormService} from './services/add-node-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories: Array<Node<ICategory>>;

  addNodeAddFormState = false;
  addNodeAddFormParentNode: Node<ICategory> = null;

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

    this.addNodeFormService.getNode().subscribe( node => {
      this.addNodeAddFormState = true;
      this.addNodeAddFormParentNode = node;
      console.log('Add for node', node);
    });

  }

}
