import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notContainingConsecutiveCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let validationResultFailed = true;
    const originString = control.value;
    for (let i = 0; i < originString.length; i++) {
      const substr = originString.substr(i, 3);
      if (substr.length === 3 && checkConsecutive(substr[0], substr[1]) && checkConsecutive(substr[1], substr[2])) {
        validationResultFailed = false;
        break;
      }
    }
    return validationResultFailed ? {'notContainingConsecutiveCharacters': {value: control.value}} : null;
  };
}

function checkConsecutive (chFirst, chSecond) {
  return isLetter(chFirst) && isLetter(chSecond) && chFirst.charCodeAt() + 1 === chSecond.charCodeAt();
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

