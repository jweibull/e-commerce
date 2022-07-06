import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bluebus/products';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit{
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  public onDelete(event: Event, category: Category): void {
    if (category.id) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Delete Category?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.categoriesService.deleteCategory(category.id!).subscribe({
            next: () => {
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Category succesfully deleted'});
              this.refreshData();
            },
            error: () => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Could not delete the category'});
            }
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
        }
      });
    }
  }

  public onEdit(category: Category): void {
    console.log(category);
  }

  private refreshData(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      }
    });
  }
}
