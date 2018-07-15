import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appCategoryNameValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CategoryNameValidatorDirective, multi: true}]
})
export class CategoryNameValidatorDirective implements Validator {

  @Input('appCategoryNameValidator') categoryName: string;

  constructor() { }

  validate(c: AbstractControl): ValidationErrors | null {
    return /[^а-яА-Я-]+/.test(c.value) ? null : {'categoryName': 'Name must be [^а-яА-Я-]'};
  }

}
