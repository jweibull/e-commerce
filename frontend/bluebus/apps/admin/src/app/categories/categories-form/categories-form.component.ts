import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent {

  public form = this.fb.group({
    name: ['', [ Validators.required ]],
    icon: ['', [ Validators.required ]]
  });

  constructor(private fb: FormBuilder) {}


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

    console.log(this.name.value);
    console.log(this.icon.value);
  }

}
