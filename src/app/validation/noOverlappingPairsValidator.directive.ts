import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noOverlappingPairsValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const nameRe = /([a-z])\1{1}/mg;
    const value = control.value;
    let validationResultFailed = false;
    const results = [];
    let result;
    while ((result = nameRe.exec(value)) !== null) {
      results.push({position: result.index, value: result[0]});
    }
    let overlappingStatus = false;
    for (const index in results) {
      if (results[index]) {
        const entry = results[index];
        const nextIndex = parseInt(index, 10) + 1;
        const nextMatch = results[nextIndex];
        if (nextMatch && entry.value === nextMatch.value && nextMatch.position - entry.position < 3) {
          overlappingStatus = true;
        }
      }
    }
    validationResultFailed = value !== '' && results.length < 2 || overlappingStatus;
    return validationResultFailed ? {'noOverlappingPairs': {value: control.value}} : null;
  };
}

