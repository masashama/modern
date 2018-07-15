import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true}]
})
export class UrlValidatorDirective implements Validator {

  @Input('appUrlValidator') url: string;

  constructor() { }

  validate(c: AbstractControl): ValidationErrors | null {
    if (! c.value ) {
      return null;
    }
    return /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)*$/.test(c.value)
      ? null
      : { 'url': 'Не валидный url'};
  }

}
