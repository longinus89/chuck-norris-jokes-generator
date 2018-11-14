import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../session/session.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  public redirectUrl: string;

  constructor(private router: Router,
              private sessionService: SessionService) {
    this.redirectUrl = '';
  }

  canActivateChild(): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(this.sessionService.isActive());
      observer.complete();
    });
  }

  canActivate(_ign_route: ActivatedRouteSnapshot): Observable<boolean> {
    this.sessionService.load();
    return new Observable((observer) => {
      const isActive = this.sessionService.isActive();
      if (isActive) {
        observer.next(true);
        observer.complete();
      } else {
        this.redirectToLogin();
        observer.next(false);
        observer.complete();
      }
    });
  }

  redirectToLogin () {
    this.router.navigate(['/login']);
  }
}
