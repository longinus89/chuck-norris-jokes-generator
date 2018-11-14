import { Component } from '@angular/core';
import { SessionService } from 'src/app/session/session.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent {

  public username: string;

  constructor(private sessionService: SessionService, private authenticationService: AuthenticationService) {
    this.username = this.sessionService.userName;
  }

  public logout () {
    this.authenticationService.logout();
  }

}
