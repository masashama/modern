import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {ICategory} from './app.interface';
import {Node} from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories: Array<Node<ICategory>>;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    /**
     * Fetch categories from api service
     */
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories.map( category => new Node(category));
      console.log('Categories', this.categories);
    });
  }

}
