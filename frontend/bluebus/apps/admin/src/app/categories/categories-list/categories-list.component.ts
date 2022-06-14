import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bluebus/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit{
  categories: Category[] = [];
  constructor(private categoriesService: CategoriesService) {}
  
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      }
    });
  }
}
