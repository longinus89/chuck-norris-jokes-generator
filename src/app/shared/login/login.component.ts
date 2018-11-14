import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { FormControl, Validators } from '@angular/forms';

import { noUppercaseValidator } from '../../validation/noUppercaseValidator.directive';
import { noEquivocalValidator } from '../../validation/noEquivocalValidator.directive';
import { noOverlappingPairsValidator } from 'src/app/validation/noOverlappingPairsValidator.directive';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginTitle: string;
  public credentials: {
    username: string
  };
  public loggingIn: boolean;
  public password: FormControl;
  public hidePassword: boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  public getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value for the password.';
    } else if (this.password.hasError('maxlength')) {
      return 'The password length cannot be greater than 32.';
    } else if (this.password.hasError('noEquivocal')) {
      return 'You cannot use i, O or l characters in the password.';
    } else if (this.password.hasError('noUppercase')) {
      return 'You cannot use uppercase characters in the password.';
    } else if (this.password.hasError('noOverlappingPairs')) {
      return 'The string must contain at least 2 not overlapping pairs of characters.';
    }
  }

  public ngOnInit() {

    this.loginTitle = 'Login in the application';

    const validators = [];
    validators.push(Validators.required),
    validators.push(Validators.maxLength(32));
    validators.push(noUppercaseValidator(/^((?![A-Z]).)*$/));
    validators.push(noEquivocalValidator(/^((?![iOl]).)*$/));
    validators.push(noOverlappingPairsValidator());
    this.password = new FormControl('', validators);

    this.hidePassword = true;
    this.credentials = {
      username: ''
    };
  }

  public doLogin() {
    this.loggingIn = true;
    this.authenticationService.login({...this.credentials, ...this.password.value}).subscribe(response => {
      if (response) {
        this.router.navigate(['jokes']);
      }
    });
  }
}
