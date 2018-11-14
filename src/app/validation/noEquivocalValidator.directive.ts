import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noEquivocalValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const success = nameRe.test(control.value);
    return !success ? {'noEquivocal': {value: control.value}} : null;
  };
}

