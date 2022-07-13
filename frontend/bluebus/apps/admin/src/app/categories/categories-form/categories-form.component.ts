import { CategoriesFormMode as CategoriesFormMode } from '../models/categories-form-mode';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebus/products';
import { MessageService } from 'primeng/api';
import { timer, Subscription } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
    public form = this.fb.group({
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]]
    });
    public dialogMode: CategoriesFormMode = {
        editMode: false,
        title: 'Add Category',
        subTitle: 'Create a new Category',
        saveButton: 'Create',
        saveButtonIcon: 'pi pi-save'
    };
    private subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.isEditMode();
    }

    private isEditMode(): void {
        this.subscriptions.push(
            this.route.params.subscribe((params) => {
                if (params?.['id']) {
                    this.dialogMode = {
                        categoryId: params?.['id'],
                        editMode: true,
                        title: 'Edit Category',
                        subTitle: 'Edit the current category',
                        saveButton: 'Update',
                        saveButtonIcon: 'pi pi-pencil'
                    };

                    this.categoriesService.getCategory(params?.['id']).subscribe((category) => {
                        this.form.patchValue(category);
                    });
                }
            })
        );
    }

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
        };
        if (this.dialogMode.editMode) {
            this.updateCategory(category);
        } else {
            this.createCategory(category);
        }
    }

    private updateCategory(category: Category): void {
        if (this.dialogMode.categoryId) {
            this.categoriesService.updateCategory(this.dialogMode.categoryId, category).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The category was successfully updated' });
                    timer(2000).subscribe(() => this.location.back());
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update the category' });
                }
            });
        }
    }

    private createCategory(category: Category): void {
        this.categoriesService.createCategory(category).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New category was added' });
                timer(2000).subscribe(() => this.location.back());
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create the new category' });
            }
        });
    }

    public onCancel(): void {
        this.location.back();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((x) => x.unsubscribe());
    }
}
