import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebus/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent {

  public form = this.fb.group({
    name: ['', [ Validators.required ]],
    icon: ['', [ Validators.required ]]
  });

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}


  public get name(): AbstractControl {
    return this.form.controls?.['name'];
  }
  public get icon(): AbstractControl {
    return this.form.controls?.['icon'];
  }

  public hasError(control: AbstractControl): boolean {
    if (control.invalid && (control.dirty || control.touched)) {
      return true;
    }
    return false;
  }

  public onSubmit(): void {

    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.name.value,
      icon: this.icon.value
    }
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'New category was added'});
      },
      error: () => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Could not create the new category'});
      }
    });
  }

}
