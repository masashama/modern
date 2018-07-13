import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {ICategory} from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  private categories: Array<ICategory>;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    /**
     * Fetch categories from api service
     */
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log('Categories', this.categories);
    });
  }

}
