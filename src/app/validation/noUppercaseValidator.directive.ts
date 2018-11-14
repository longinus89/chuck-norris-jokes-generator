import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noUppercaseValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const success = nameRe.test(control.value);
    return !success ? {'noUppercase': {value: control.value}} : null;
  };
}
