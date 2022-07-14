import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  public onDelete(event: Event, category: Category): void {
    if (category) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete the <em>${category.name}</em> category?`,
        header: 'Delete Category?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.categoriesService.deleteCategory(category.id as string).subscribe({
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
          // this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
        }
      });
    }
  }

  public onEdit(categoryId: string): void {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private refreshData(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      }
    });
  }
}
